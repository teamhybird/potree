import * as THREE from '../../libs/three.js/build/three.module.js';
import { EventDispatcher } from '../EventDispatcher.js';
import { Features } from '../Features.js';
import { Renderer } from '../PotreeRenderer.js';
import { EDLRenderer } from './EDLRenderer.js';
import { HQSplatRenderer } from './HQSplatRenderer.js';
import { PotreeRenderer } from './PotreeRenderer.js';
import { Scene } from './Scene.js';
import { InputHandler } from '../navigation/InputHandler.js';
import { CameraMode } from '../defines.js';
import { MeasuringTool } from '../Potree.js';

export class VideoViewer extends EventDispatcher {
  constructor(domElement, viewer, args = {}) {
    super();

    this.renderArea = domElement;
    this.mainViewer = viewer;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // Only keep camera and renderer
    this.initThree();

    // Initialize PotreeRenderer
    this.pRenderer = new Renderer(this.renderer);

    let scene = new Scene(this.renderer);

    this.fpControls = new EventDispatcher();

    this.setScene(scene);

    {
      this.inputHandler = new InputHandler(this);
      this.inputHandler.setScene(this.scene);

      this.addEventListener('scene_changed', (e) => {
        this.inputHandler.setScene(e.scene);
      });
    }

    // this.scene.cameraMode = CameraMode.ORTHOGRAPHIC;

    this.measuringTool = new MeasuringTool(this);

    // Start render loop
    this.renderer.setAnimationLoop(this.loop.bind(this));
  }

  getPRenderer() {
    if (this.mainViewer.useHQ) {
      if (!this.hqRenderer) {
        this.hqRenderer = new HQSplatRenderer(this, { mainViewer: this.mainViewer });
      }
      this.hqRenderer.useEDL = this.useEDL;
      return this.hqRenderer;
    } else {
      if (this.mainViewer.useEDL && Features.SHADER_EDL.isSupported()) {
        if (!this.edlRenderer) {
          this.edlRenderer = new EDLRenderer(this, { mainViewer: this.mainViewer });
        }

        return this.edlRenderer;
      } else {
        if (!this.potreeRenderer) {
          this.potreeRenderer = new PotreeRenderer(this, { mainViewer: this.mainViewer });
        }
        return this.potreeRenderer;
      }
    }
  }

  renderDefault() {
    let pRenderer = this.getPRenderer();

    if (!pRenderer) {
      return;
    }
    const scene = this.scene;
    {
      // resize
      const width = this.renderArea.clientWidth;
      const height = this.renderArea.clientHeight;

      this.renderer.setSize(width, height);
    }

    pRenderer.clear();

    pRenderer.render(this.renderer);
  }

  initThree() {
    let width = this.renderArea.clientWidth;
    let height = this.renderArea.clientHeight;

    let contextAttributes = {
      alpha: true,
      depth: true,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    };

    let canvas = document.createElement('canvas');
    let context = canvas.getContext('webgl', contextAttributes);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      premultipliedAlpha: false,
      canvas: canvas,
      context: context,
    });

    this.renderer.sortObjects = false;
    this.renderer.setSize(width, height);
    this.renderer.autoClear = false;
    this.renderArea.appendChild(this.renderer.domElement);
    this.renderer.domElement.tabIndex = '2222';
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.addEventListener('mousedown', () => {
      this.renderer.domElement.focus();
    });
    //this.renderer.domElement.focus();

    // NOTE: If extension errors occur, pass the string into this.renderer.extensions.get(x) before enabling
    // enable frag_depth extension for the interpolation shader, if available
    let gl = this.renderer.getContext();
    gl.getExtension('EXT_frag_depth');
    gl.getExtension('WEBGL_depth_texture');
    gl.getExtension('WEBGL_color_buffer_float'); // Enable explicitly for more portability, EXT_color_buffer_float is the proper name in WebGL 2

    if (gl.createVertexArray == null) {
      let extVAO = gl.getExtension('OES_vertex_array_object');

      if (!extVAO) {
        throw new Error('OES_vertex_array_object extension not supported');
      }

      gl.createVertexArray = extVAO.createVertexArrayOES.bind(extVAO);
      gl.bindVertexArray = extVAO.bindVertexArrayOES.bind(extVAO);
    }
  }

  getBoundingBox(pointclouds) {
    return this.mainViewer.scene.getBoundingBox(pointclouds);
  }

  setScene(scene) {
    if (scene === this.scene) {
      return;
    }

    let oldScene = this.scene;
    this.scene = scene;

    this.dispatchEvent({
      type: 'scene_changed',
      oldScene: oldScene,
      scene: scene,
    });
  }

  setCameraPosition(camPos, cameraRot, animationDuration = 0) {
    let view = this.scene.view;
    let camera = this.scene.cameraP.clone();

    camera.updateMatrix();
    camera.updateMatrixWorld();
    camera.position.set(camPos.x, camPos.y, camPos.z);
    camera.rotation.copy(cameraRot);

    camera.rotation.order = 'ZXY';
    let endYaw = camera.rotation.z;
    let endPitch = camera.rotation.x - Math.PI / 2;
    let endRoll = camera.rotation.y - Math.PI / 2;

    let startPosition = view.position.clone();
    let endPosition = camera.position.clone();
    let easing = TWEEN.Easing.Quartic.Out;

    {
      // animate camera position
      let pos = startPosition.clone();
      let tween = new TWEEN.Tween(pos).to(endPosition, animationDuration);
      tween.easing(easing);

      tween.onUpdate(() => {
        view.position.copy(pos);
      });

      tween.start();
    }

    view.pitch = endPitch;
    view.yaw = endYaw;
    view.roll = endRoll;
  }

  render() {
    this.renderDefault();
  }

  update(delta, timestamp) {
    const camera = this.scene.getActiveCamera();

    this.dispatchEvent({
      type: 'update_start',
      delta: delta,
      timestamp: timestamp,
    });

    const visiblePointClouds = this.mainViewer.scene.pointclouds.filter((pc) => pc.visible);

    const lTarget = camera.position.clone().add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(1000));
    this.scene.directionalLight.position.copy(camera.position);
    this.scene.directionalLight.lookAt(lTarget);

    let lowestProgress = 100;
    for (let pointcloud of visiblePointClouds) {
      pointcloud.showBoundingBox = this.mainViewer.showBoundingBox;
      pointcloud.generateDEM = this.mainViewer.generateDEM;
      pointcloud.minimumNodePixelSize = this.mainViewer.minNodeSize;

      let material = pointcloud.material;

      material.uniforms.uFilterReturnNumberRange.value = this.mainViewer.filterReturnNumberRange;
      material.uniforms.uFilterNumberOfReturnsRange.value = this.mainViewer.filterNumberOfReturnsRange;
      material.uniforms.uFilterGPSTimeClipRange.value = this.mainViewer.filterGPSTimeRange;
      material.uniforms.uFilterPointSourceIDClipRange.value = this.mainViewer.filterPointSourceIDRange;

      material.classification = this.mainViewer.classifications;
      material.recomputeClassification();

      if (pointcloud.progress < lowestProgress) {
        lowestProgress = pointcloud.progress;
      }

      this.mainViewer.updateMaterialDefaults(pointcloud);
    }

    if (!this.mainViewer.freeze) {
      let result = Potree.updatePointClouds(this.mainViewer.scene.pointclouds, camera, this.renderer);

      if (result.lowestSpacing !== Infinity) {
        let near = result.lowestSpacing * 10.0;
        let far = -this.getBoundingBox().applyMatrix4(camera.matrixWorldInverse).min.z;

        far = Math.max(far * 1.5, 10000);
        near = Math.min(100.0, Math.max(0.01, near));
        far = Math.max(far, near + 10000);

        if (near === Infinity) {
          near = 0.1;
        }

        camera.near = near;
        camera.far = far;
      } else {
        // don't change near and far in this case
      }

      // Override near plane to avoid clipping
      camera.near = 0.1;
    }

    camera.updateMatrix();
    camera.updateMatrixWorld();
    camera.matrixWorldInverse.copy(camera.matrixWorld).invert();

    TWEEN.update(timestamp);

    this.dispatchEvent({
      type: 'update',
      delta: delta,
      timestamp: timestamp,
    });
  }

  loop(timestamp) {
    this.update(this.clock.getDelta(), timestamp);
    this.render();
  }
}
