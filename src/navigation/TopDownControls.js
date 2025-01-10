import * as THREE from '../../libs/three.js/build/three.module.js';
import { EventDispatcher } from '../EventDispatcher.js';

export class TopDownControls extends EventDispatcher {
  constructor(viewer, referenceCamera) {
    super();

    this.viewer = viewer;
    this.renderer = viewer.renderer;
    this.scene = null;
    this.sceneControls = new THREE.Scene();
    this.referenceCamera = referenceCamera;

    this.enabled = false;
    this.height = 100; // Initial height/distance from target
    this.minHeight = 1;
    this.maxHeight = 1000;
    this.zoomSpeed = 2;

    let onWheel = (e) => {
      if (!this.enabled) return;

      e.preventDefault();

      const delta = Math.sign(e.deltaY);
      this.height *= Math.pow(1.1, delta);
      this.height = Math.max(this.minHeight, Math.min(this.maxHeight, this.height));
    };

    this.renderer.domElement.addEventListener('wheel', onWheel);
  }

  setScene(scene) {
    this.scene = scene;
  }

  setReferenceCamera(camera) {
    this.referenceCamera = camera;
  }

  update(delta) {
    if (!this.enabled || !this.referenceCamera) {
      return;
    }

    let view = this.scene.view;

    // Copy XY position from reference camera
    view.position.x = this.referenceCamera.position.x;
    view.position.y = this.referenceCamera.position.y;

    // Set height above reference camera
    view.position.z = this.referenceCamera.position.z + this.height;

    // Get the direction vector from the reference camera's quaternion
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(this.referenceCamera.quaternion);

    // Calculate yaw from the direction vector (ignoring vertical component)
    view.yaw = Math.atan2(direction.y, direction.x) - Math.PI / 2;

    // Keep looking straight down
    view.pitch = -Math.PI / 2;
  }
}
