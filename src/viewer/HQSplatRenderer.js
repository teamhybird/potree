import * as THREE from '../../libs/three.js/build/three.module.js';
import { NormalizationMaterial } from '../materials/NormalizationMaterial.js';
import { NormalizationEDLMaterial } from '../materials/NormalizationEDLMaterial.js';
import { PointCloudMaterial } from '../materials/PointCloudMaterial.js';
import { PointShape } from '../defines.js';
import { SphereVolume } from '../utils/Volume.js';
import { Utils } from '../utils.js';

export class HQSplatRenderer {
  constructor(viewer, params = {}) {
    this.viewer = viewer;
    this.renderer = viewer.renderer;
    this.pRenderer = viewer.pRenderer;
    this.mainViewer = params.mainViewer || viewer;
    this.gl = this.renderer.getContext();

    this.depthMaterials = new Map();
    this.attributeMaterials = new Map();
    this.normalizationMaterial = null;

    this.rtDepth = null;
    this.rtAttribute = null;

    this.initialized = false;
  }

  init() {
    if (this.initialized) {
      return;
    }

    this.normalizationMaterial = new NormalizationMaterial();
    this.normalizationMaterial.depthTest = true;
    this.normalizationMaterial.depthWrite = true;
    this.normalizationMaterial.transparent = true;

    this.normalizationEDLMaterial = new NormalizationEDLMaterial();
    this.normalizationEDLMaterial.depthTest = true;
    this.normalizationEDLMaterial.depthWrite = true;
    this.normalizationEDLMaterial.transparent = true;

    this.rtDepth = new THREE.WebGLRenderTarget(1024, 1024, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      depthTexture: new THREE.DepthTexture(undefined, undefined, THREE.UnsignedIntType),
    });

    this.rtAttribute = new THREE.WebGLRenderTarget(1024, 1024, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      depthTexture: this.rtDepth.depthTexture,
    });

    this.initialized = true;
  }

  resize(width, height) {
    this.rtDepth.setSize(width, height);
    this.rtAttribute.setSize(width, height);
  }

  clearTargets() {
    const oldTarget = this.renderer.getRenderTarget();

    this.renderer.setClearColor(0x000000, 0);

    this.renderer.setRenderTarget(this.rtDepth);
    this.renderer.clear(true, true, true);

    this.renderer.setRenderTarget(this.rtAttribute);
    this.renderer.clear(true, true, true);

    this.renderer.setRenderTarget(oldTarget);
  }

  clear() {
    this.init();

    const { background } = this.mainViewer;

    if (background === 'skybox') {
      this.renderer.setClearColor(0x000000, 0);
    } else if (background === 'gradient') {
      this.renderer.setClearColor(0x000000, 0);
    } else if (background === 'black') {
      this.renderer.setClearColor(0x000000, 1);
    } else if (background === 'white') {
      this.renderer.setClearColor(0xffffff, 1);
    } else {
      this.renderer.setClearColor(background, 1);
    }

    this.renderer.clear();

    this.clearTargets();
  }

  render() {
    this.init();

    const viewer = this.viewer;
    const camera = viewer.scene.getActiveCamera();
    const { width, height } = this.renderer.getSize(new THREE.Vector2());

    viewer.dispatchEvent({ type: 'render.pass.begin', viewer: viewer, renderer: this.renderer });

    this.resize(width, height);

    const visiblePointClouds = this.mainViewer.scene.pointclouds.filter((pc) => pc.visible);
    const originalMaterials = new Map();

    for (let pointcloud of visiblePointClouds) {
      originalMaterials.set(pointcloud, pointcloud.material);

      if (!this.attributeMaterials.has(pointcloud)) {
        let attributeMaterial = new PointCloudMaterial();
        this.attributeMaterials.set(pointcloud, attributeMaterial);
      }

      if (!this.depthMaterials.has(pointcloud)) {
        let depthMaterial = new PointCloudMaterial();

        depthMaterial.setDefine('depth_pass', '#define hq_depth_pass');
        depthMaterial.setDefine('use_edl', '#define use_edl');

        this.depthMaterials.set(pointcloud, depthMaterial);
      }
    }

    {
      // DEPTH PASS
      for (let pointcloud of visiblePointClouds) {
        let octreeSize = pointcloud.pcoGeometry.boundingBox.getSize(new THREE.Vector3()).x;

        let material = originalMaterials.get(pointcloud);
        let depthMaterial = this.depthMaterials.get(pointcloud);

        depthMaterial.size = material.size;
        depthMaterial.minSize = material.minSize;
        depthMaterial.maxSize = material.maxSize;

        depthMaterial.pointSizeType = material.pointSizeType;
        depthMaterial.visibleNodesTexture = material.visibleNodesTexture;
        depthMaterial.weighted = false;
        depthMaterial.screenWidth = width;
        depthMaterial.shape = PointShape.CIRCLE;
        depthMaterial.screenHeight = height;
        depthMaterial.uniforms.visibleNodes.value = material.visibleNodesTexture;
        depthMaterial.uniforms.octreeSize.value = octreeSize;
        depthMaterial.spacing = pointcloud.pcoGeometry.spacing; // * Math.max(...pointcloud.scale.toArray());
        depthMaterial.classification = material.classification;
        depthMaterial.uniforms.classificationLUT.value.image.data = material.uniforms.classificationLUT.value.image.data;
        depthMaterial.classificationTexture.needsUpdate = true;

        depthMaterial.uniforms.uFilterReturnNumberRange.value = material.uniforms.uFilterReturnNumberRange.value;
        depthMaterial.uniforms.uFilterNumberOfReturnsRange.value = material.uniforms.uFilterNumberOfReturnsRange.value;
        depthMaterial.uniforms.uFilterGPSTimeClipRange.value = material.uniforms.uFilterGPSTimeClipRange.value;
        depthMaterial.uniforms.uFilterPointSourceIDClipRange.value = material.uniforms.uFilterPointSourceIDClipRange.value;

        depthMaterial.clipTask = material.clipTask;
        depthMaterial.clipMethod = material.clipMethod;
        depthMaterial.setClipBoxes(material.clipBoxes);
        depthMaterial.setClipPolygons(material.clipPolygons);

        pointcloud.material = depthMaterial;
      }

      this.pRenderer.render(this.mainViewer.scene.scenePointCloud, camera, this.rtDepth, {
        clipSpheres: this.mainViewer.scene.volumes.filter((v) => v instanceof SphereVolume),
      });
    }

    {
      // ATTRIBUTE PASS
      for (let pointcloud of visiblePointClouds) {
        let octreeSize = pointcloud.pcoGeometry.boundingBox.getSize(new THREE.Vector3()).x;

        let material = originalMaterials.get(pointcloud);
        let attributeMaterial = this.attributeMaterials.get(pointcloud);

        attributeMaterial.size = material.size;
        attributeMaterial.minSize = material.minSize;
        attributeMaterial.maxSize = material.maxSize;

        attributeMaterial.pointSizeType = material.pointSizeType;
        attributeMaterial.activeAttributeName = material.activeAttributeName;
        attributeMaterial.visibleNodesTexture = material.visibleNodesTexture;
        attributeMaterial.weighted = true;
        attributeMaterial.screenWidth = width;
        attributeMaterial.screenHeight = height;
        attributeMaterial.shape = PointShape.CIRCLE;
        attributeMaterial.uniforms.visibleNodes.value = material.visibleNodesTexture;
        attributeMaterial.uniforms.octreeSize.value = octreeSize;
        attributeMaterial.spacing = pointcloud.pcoGeometry.spacing; // * Math.max(...pointcloud.scale.toArray());
        attributeMaterial.classification = material.classification;
        attributeMaterial.uniforms.classificationLUT.value.image.data = material.uniforms.classificationLUT.value.image.data;
        attributeMaterial.classificationTexture.needsUpdate = true;

        attributeMaterial.uniforms.uFilterReturnNumberRange.value = material.uniforms.uFilterReturnNumberRange.value;
        attributeMaterial.uniforms.uFilterNumberOfReturnsRange.value = material.uniforms.uFilterNumberOfReturnsRange.value;
        attributeMaterial.uniforms.uFilterGPSTimeClipRange.value = material.uniforms.uFilterGPSTimeClipRange.value;
        attributeMaterial.uniforms.uFilterPointSourceIDClipRange.value = material.uniforms.uFilterPointSourceIDClipRange.value;

        attributeMaterial.elevationGradientRepeat = material.elevationGradientRepeat;
        attributeMaterial.elevationRange = material.elevationRange;
        attributeMaterial.gradient = material.gradient;
        attributeMaterial.matcap = material.matcap;

        attributeMaterial.intensityRange = material.intensityRange;
        attributeMaterial.intensityGamma = material.intensityGamma;
        attributeMaterial.intensityContrast = material.intensityContrast;
        attributeMaterial.intensityBrightness = material.intensityBrightness;

        attributeMaterial.rgbGamma = material.rgbGamma;
        attributeMaterial.rgbContrast = material.rgbContrast;
        attributeMaterial.rgbBrightness = material.rgbBrightness;

        attributeMaterial.weightRGB = material.weightRGB;
        attributeMaterial.weightIntensity = material.weightIntensity;
        attributeMaterial.weightElevation = material.weightElevation;
        attributeMaterial.weightRGB = material.weightRGB;
        attributeMaterial.weightClassification = material.weightClassification;
        attributeMaterial.weightReturnNumber = material.weightReturnNumber;
        attributeMaterial.weightSourceID = material.weightSourceID;

        attributeMaterial.color = material.color;

        attributeMaterial.clipTask = material.clipTask;
        attributeMaterial.clipMethod = material.clipMethod;
        attributeMaterial.setClipBoxes(material.clipBoxes);
        attributeMaterial.setClipPolygons(material.clipPolygons);

        pointcloud.material = attributeMaterial;
      }

      let gl = this.gl;

      this.renderer.setRenderTarget(null);
      this.pRenderer.render(this.mainViewer.scene.scenePointCloud, camera, this.rtAttribute, {
        clipSpheres: this.mainViewer.scene.volumes.filter((v) => v instanceof SphereVolume),
        //material: this.attributeMaterial,
        blendFunc: [gl.SRC_ALPHA, gl.ONE],
        //depthTest: false,
        depthWrite: false,
      });
    }

    for (let [pointcloud, material] of originalMaterials) {
      pointcloud.material = material;
    }

    this.renderer.setRenderTarget(null);
    if (this.mainViewer.background === 'skybox') {
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.clear();
      this.mainViewer.skybox.camera.rotation.copy(this.mainViewer.scene.cameraP.rotation);
      this.mainViewer.skybox.camera.fov = this.mainViewer.scene.cameraP.fov;
      this.mainViewer.skybox.camera.aspect = this.mainViewer.scene.cameraP.aspect;

      this.mainViewer.skybox.parent.rotation.x = 0;
      this.mainViewer.skybox.parent.updateMatrixWorld();

      this.mainViewer.skybox.camera.updateProjectionMatrix();
      this.renderer.render(this.mainViewer.skybox.scene, this.mainViewer.skybox.camera);
    } else if (this.mainViewer.background === 'gradient') {
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.clear();
      this.renderer.render(this.mainViewer.scene.sceneBG, this.mainViewer.scene.cameraBG);
    } else if (this.mainViewer.background === 'black') {
      this.renderer.setClearColor(0x000000, 1);
      this.renderer.clear();
    } else if (this.mainViewer.background === 'white') {
      this.renderer.setClearColor(0xffffff, 1);
      this.renderer.clear();
    } else {
      this.renderer.setClearColor(this.mainViewer.background, 1);
      this.renderer.clear();
    }

    {
      // NORMALIZATION PASS
      let normalizationMaterial = this.useEDL ? this.normalizationEDLMaterial : this.normalizationMaterial;

      if (this.useEDL) {
        normalizationMaterial.uniforms.edlStrength.value = this.mainViewer.edlStrength;
        normalizationMaterial.uniforms.radius.value = this.mainViewer.edlRadius;
        normalizationMaterial.uniforms.screenWidth.value = width;
        normalizationMaterial.uniforms.screenHeight.value = height;
        normalizationMaterial.uniforms.uEDLMap.value = this.rtDepth.texture;
      }

      normalizationMaterial.uniforms.uWeightMap.value = this.rtAttribute.texture;
      normalizationMaterial.uniforms.uDepthMap.value = this.rtAttribute.depthTexture;

      Utils.screenPass.render(this.renderer, normalizationMaterial);
    }

    this.renderer.render(viewer.scene.scene, camera);

    viewer.dispatchEvent({ type: 'render.pass.before_scene', viewer: viewer, renderer: this.renderer });
    viewer.dispatchEvent({ type: 'render.pass.scene', viewer: viewer, renderer: this.renderer });

    this.renderer.clearDepth();

    viewer.transformationTool && viewer.transformationTool.update();

    viewer.dispatchEvent({ type: 'render.pass.perspective_overlay', viewer: viewer, renderer: this.renderer });

    viewer.controls && this.renderer.render(viewer.controls.sceneControls, camera);
    viewer.clippingTool && this.renderer.render(viewer.clippingTool.sceneVolume, camera);
    viewer.transformationTool && this.renderer.render(viewer.transformationTool.scene, camera);

    if (viewer.navigationCube) {
      this.renderer.setViewport(width - viewer.navigationCube.width, height - viewer.navigationCube.width, viewer.navigationCube.width, viewer.navigationCube.width);
      this.renderer.render(viewer.navigationCube, viewer.navigationCube.camera);
      this.renderer.setViewport(0, 0, width, height);
    }

    viewer.dispatchEvent({ type: 'render.pass.end', viewer: viewer, renderer: this.renderer });
  }
}
