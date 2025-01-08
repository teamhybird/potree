import * as THREE from '../../libs/three.js/build/three.module.js';
import { PointCloudSM } from '../utils/PointCloudSM.js';
import { EyeDomeLightingMaterial } from '../materials/EyeDomeLightingMaterial.js';
import { SphereVolume } from '../utils/Volume.js';
import { Utils } from '../utils.js';

export class EDLRenderer {
  constructor(viewer, params = {}) {
    this.viewer = viewer;
    this.renderer = viewer.renderer;
    this.pRenderer = viewer.pRenderer;
    this.mainViewer = params.mainViewer || viewer;
    this.gl = this.renderer.getContext();

    this.edlMaterial = null;
    this.rtRegular;
    this.rtEDL;

    this.shadowMap = new PointCloudSM(this.pRenderer);
  }

  initEDL() {
    if (this.edlMaterial != null) {
      return;
    }

    this.edlMaterial = new EyeDomeLightingMaterial();
    this.edlMaterial.depthTest = true;
    this.edlMaterial.depthWrite = true;
    this.edlMaterial.transparent = true;

    this.rtEDL = new THREE.WebGLRenderTarget(1024, 1024, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      depthTexture: new THREE.DepthTexture(undefined, undefined, THREE.UnsignedIntType),
    });

    this.rtRegular = new THREE.WebGLRenderTarget(1024, 1024, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      depthTexture: new THREE.DepthTexture(undefined, undefined, THREE.UnsignedIntType),
    });
  }

  resize(width, height) {
    if (this.screenshot) {
      width = this.screenshot.target.width;
      height = this.screenshot.target.height;
    }

    this.rtEDL.setSize(width, height);
    this.rtRegular.setSize(width, height);
  }

  makeScreenshot(camera, size, callback) {
    if (camera === undefined || camera === null) {
      camera = this.viewer.scene.getActiveCamera();
    }

    if (size === undefined || size === null) {
      size = this.renderer.getSize(new THREE.Vector2());
    }

    let { width, height } = size;

    //let maxTextureSize = this.renderer.capabilities.maxTextureSize;
    //if(width * 4 <
    width = 2 * width;
    height = 2 * height;

    let target = new THREE.WebGLRenderTarget(width, height, {
      format: THREE.RGBAFormat,
    });

    this.screenshot = {
      target: target,
    };

    // HACK? removed because of error, was this important?
    //this.renderer.clearTarget(target, true, true, true);

    this.render();

    let pixelCount = width * height;
    let buffer = new Uint8Array(4 * pixelCount);

    this.renderer.readRenderTargetPixels(target, 0, 0, width, height, buffer);

    // flip vertically
    let bytesPerLine = width * 4;
    for (let i = 0; i < parseInt(height / 2); i++) {
      let j = height - i - 1;

      let lineI = buffer.slice(i * bytesPerLine, i * bytesPerLine + bytesPerLine);
      let lineJ = buffer.slice(j * bytesPerLine, j * bytesPerLine + bytesPerLine);
      buffer.set(lineJ, i * bytesPerLine);
      buffer.set(lineI, j * bytesPerLine);
    }

    this.screenshot.target.dispose();
    delete this.screenshot;

    return {
      width: width,
      height: height,
      buffer: buffer,
    };
  }

  clearTargets() {
    const oldTarget = this.renderer.getRenderTarget();

    this.renderer.setRenderTarget(this.rtEDL);
    this.renderer.clear(true, true, true);

    this.renderer.setRenderTarget(this.rtRegular);
    this.renderer.clear(true, true, false);

    this.renderer.setRenderTarget(oldTarget);
  }

  clear() {
    this.initEDL();

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

  renderShadowMap(visiblePointClouds, camera, lights) {
    const { viewer, mainViewer } = this;

    const doShadows = lights.length > 0 && !lights[0].disableShadowUpdates;
    if (doShadows) {
      let light = lights[0];

      this.shadowMap.setLight(light);

      let originalAttributes = new Map();
      for (let pointcloud of mainViewer.scene.pointclouds) {
        // TODO IMPORTANT !!! check
        originalAttributes.set(pointcloud, pointcloud.material.activeAttributeName);
        pointcloud.material.disableEvents();
        pointcloud.material.activeAttributeName = 'depth';
        //pointcloud.material.pointColorType = PointColorType.DEPTH;
      }

      this.shadowMap.render(mainViewer.scene.scenePointCloud, camera);

      for (let pointcloud of visiblePointClouds) {
        let originalAttribute = originalAttributes.get(pointcloud);
        // TODO IMPORTANT !!! check
        pointcloud.material.activeAttributeName = originalAttribute;
        pointcloud.material.enableEvents();
      }

      viewer.shadowTestCam.updateMatrixWorld();
      viewer.shadowTestCam.matrixWorldInverse.copy(viewer.shadowTestCam.matrixWorld).invert();
      viewer.shadowTestCam.updateProjectionMatrix();
    }
  }

  render(params = {}) {
    this.initEDL();

    const camera = this.viewer.scene.getActiveCamera();
    const { width, height } = this.renderer.getSize(new THREE.Vector2());

    this.viewer.dispatchEvent({ type: 'render.pass.begin', viewer: this.viewer, renderer: this.renderer });

    this.resize(width, height);

    const visiblePointClouds = this.mainViewer.scene.pointclouds.filter((pc) => pc.visible);

    if (this.screenshot) {
      let oldBudget = Potree.pointBudget;
      Potree.pointBudget = Math.max(10 * 1000 * 1000, 2 * oldBudget);
      let result = Potree.updatePointClouds(this.mainViewer.scene.pointclouds, camera, this.renderer);
      Potree.pointBudget = oldBudget;
    }

    let lights = [];
    this.viewer.scene.scene.traverse((node) => {
      if (node.type === 'SpotLight') {
        lights.push(node);
      }
    });

    if (this.mainViewer.background === 'skybox') {
      this.mainViewer.skybox.camera.rotation.copy(this.mainViewer.scene.cameraP.rotation);
      this.mainViewer.skybox.camera.fov = this.mainViewer.scene.cameraP.fov;
      this.mainViewer.skybox.camera.aspect = this.mainViewer.scene.cameraP.aspect;

      this.mainViewer.skybox.parent.rotation.x = 0;
      this.mainViewer.skybox.parent.updateMatrixWorld();

      this.mainViewer.skybox.camera.updateProjectionMatrix();
      this.renderer.render(this.mainViewer.skybox.scene, this.mainViewer.skybox.camera);
    } else if (this.mainViewer.background === 'gradient') {
      this.renderer.render(this.mainViewer.scene.sceneBG, this.mainViewer.scene.cameraBG);
    }

    //TODO adapt to multiple lights
    this.renderShadowMap(visiblePointClouds, camera, lights);

    {
      // COLOR & DEPTH PASS
      for (let pointcloud of visiblePointClouds) {
        let octreeSize = pointcloud.pcoGeometry.boundingBox.getSize(new THREE.Vector3()).x;

        let material = pointcloud.material;
        material.weighted = false;
        material.useLogarithmicDepthBuffer = false;
        material.useEDL = true;

        material.screenWidth = width;
        material.screenHeight = height;
        material.uniforms.visibleNodes.value = pointcloud.material.visibleNodesTexture;
        material.uniforms.octreeSize.value = octreeSize;
        material.spacing = pointcloud.pcoGeometry.spacing; // * Math.max(pointcloud.scale.x, pointcloud.scale.y, pointcloud.scale.z);
      }

      // TODO adapt to multiple lights
      this.renderer.setRenderTarget(this.rtEDL);

      if (lights.length > 0) {
        if (params.camera) {
          console.log('rtEDL 2', this.rtEDL);
        }
        this.pRenderer.render(this.mainViewer.scene.scenePointCloud, camera, this.rtEDL, {
          clipSpheres: this.mainViewer.scene.volumes.filter((v) => v instanceof SphereVolume),
          shadowMaps: [this.shadowMap],
          transparent: false,
        });
      } else {
        // let test = camera.clone();
        // test.matrixAutoUpdate = false;

        // //test.updateMatrixWorld = () => {};

        // let mat = new THREE.Matrix4().set(
        // 	1, 0, 0, 0,
        // 	0, 0, 1, 0,
        // 	0, -1, 0, 0,
        // 	0, 0, 0, 1,
        // );
        // mat.invert()

        // test.matrix.multiplyMatrices(mat, test.matrix);
        // test.updateMatrixWorld();

        //test.matrixWorld.multiplyMatrices(mat, test.matrixWorld);
        //test.matrixWorld.multiply(mat);
        //test.matrixWorldInverse.invert(test.matrixWorld);
        //test.matrixWorldInverse.multiplyMatrices(test.matrixWorldInverse, mat);

        if (params.camera) {
          console.log('rtEDL 3', this.rtEDL);
        }

        this.pRenderer.render(this.mainViewer.scene.scenePointCloud, camera, this.rtEDL, {
          clipSpheres: this.mainViewer.scene.volumes.filter((v) => v instanceof SphereVolume),
          transparent: false,
        });
      }
    }

    this.viewer.dispatchEvent({ type: 'render.pass.before_scene', viewer: this.viewer, renderer: this.renderer });
    this.viewer.dispatchEvent({ type: 'render.pass.scene', viewer: this.viewer, renderer: this.renderer, renderTarget: this.rtRegular });
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.viewer.scene.scene, camera);

    {
      // EDL PASS

      const uniforms = this.edlMaterial.uniforms;

      uniforms.screenWidth.value = width;
      uniforms.screenHeight.value = height;

      let proj = camera.projectionMatrix;
      let projArray = new Float32Array(16);
      projArray.set(proj.elements);

      uniforms.uNear.value = camera.near;
      uniforms.uFar.value = camera.far;
      uniforms.uEDLColor.value = this.rtEDL.texture;
      uniforms.uEDLDepth.value = this.rtEDL.depthTexture;
      uniforms.uProj.value = projArray;

      uniforms.edlStrength.value = this.mainViewer.edlStrength;
      uniforms.radius.value = this.mainViewer.edlRadius;
      uniforms.opacity.value = this.mainViewer.edlOpacity; // HACK

      Utils.screenPass.render(this.renderer, this.edlMaterial);

      if (this.screenshot) {
        Utils.screenPass.render(this.renderer, this.edlMaterial, this.screenshot.target);
      }
    }

    this.viewer.dispatchEvent({ type: 'render.pass.before_scene', viewer: this.viewer, renderer: this.renderer });
    this.viewer.dispatchEvent({ type: 'render.pass.scene', viewer: this.viewer, renderer: this.renderer });

    this.renderer.clearDepth();

    this.viewer.transformationTool && this.viewer.transformationTool.update();

    this.viewer.dispatchEvent({ type: 'render.pass.perspective_overlay', viewer: this.viewer, renderer: this.renderer });

    this.viewer.controls && this.renderer.render(this.viewer.controls.sceneControls, camera);
    this.viewer.clippingTool && this.renderer.render(this.viewer.clippingTool.sceneVolume, camera);
    this.viewer.transformationTool && this.renderer.render(this.viewer.transformationTool.scene, camera);

    this.viewer.dispatchEvent({ type: 'render.pass.end', viewer: this.viewer, renderer: this.renderer });
  }
}
