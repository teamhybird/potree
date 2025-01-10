import * as THREE from '../../libs/three.js/build/three.module.js';
import { EventDispatcher } from '../EventDispatcher.js';
import { MOUSE } from '../defines.js';

export class FollowCamControls extends EventDispatcher {
  constructor(viewer, referenceCamera) {
    super();

    this.viewer = viewer;
    this.renderer = viewer.renderer;
    this.scene = null;
    this.sceneControls = new THREE.Scene();
    this.referenceCamera = referenceCamera;
    this.lockRotation = false;

    this.rotationSpeed = 10;
    this.enabled = false;

    this.fadeFactor = 50;
    this.yawDelta = 0;
    this.pitchDelta = 0;

    // Store initial rotation to maintain relative changes
    this.initialRotation = new THREE.Euler();
    if (referenceCamera) {
      this.initialRotation.copy(referenceCamera.rotation);
    }

    let drag = (e) => {
      if (e.drag.startHandled === undefined) {
        e.drag.startHandled = true;
        this.dispatchEvent({ type: 'start' });
      }

      let ndrag = {
        x: e.drag.lastDrag.x / this.renderer.domElement.clientWidth,
        y: e.drag.lastDrag.y / this.renderer.domElement.clientHeight,
      };

      if (e.drag.mouse === MOUSE.LEFT) {
        let yawDelta = ndrag.x * this.rotationSpeed * 0.5;
        let pitchDelta = ndrag.y * this.rotationSpeed * 0.2;

        this.yawDelta = yawDelta;
        this.pitchDelta = pitchDelta;
      }
    };

    let drop = (e) => {
      this.dispatchEvent({ type: 'end' });
    };

    this.addEventListener('drag', drag);
    this.addEventListener('drop', drop);
  }

  setScene(scene) {
    this.scene = scene;
  }

  setReferenceCamera(camera) {
    this.referenceCamera = camera;
    if (camera) {
      this.initialRotation.copy(camera.rotation);
    }
  }

  stop() {
    this.yawDelta = 0;
    this.pitchDelta = 0;
  }

  update(delta) {
    if (!this.enabled || !this.referenceCamera) {
      return;
    }

    let view = this.scene.view;

    // Copy reference camera position
    view.position.copy(this.referenceCamera.position);

    if (this.lockRotation) {
      // Get the direction vector from the reference camera's quaternion
      const direction = new THREE.Vector3(0, 0, -1); // Camera looks down negative Z
      direction.applyQuaternion(this.referenceCamera.quaternion);

      // Calculate yaw and pitch from the direction vector
      // For Z-up system: yaw is rotation around Z, pitch is angle from XY plane
      if (direction.x === 0 && direction.y === 0) {
        view.pitch = (Math.PI / 2) * Math.sign(direction.z);
      } else {
        view.yaw = Math.atan2(direction.y, direction.x) - Math.PI / 2;
        view.pitch = Math.atan2(-direction.z, Math.sqrt(direction.x * direction.x + direction.y * direction.y));
      }
    } else {
      // Apply rotation changes
      if (Math.abs(this.yawDelta) > 0 || Math.abs(this.pitchDelta) > 0) {
        let yaw = view.yaw;
        let pitch = view.pitch;

        yaw -= this.yawDelta;
        pitch -= this.pitchDelta;

        // Clamp pitch to avoid camera flipping
        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

        view.yaw = yaw;
        view.pitch = pitch;
      }

      // Decelerate rotation over time
      let attenuation = Math.max(0, 1 - this.fadeFactor * delta);
      this.yawDelta *= attenuation;
      this.pitchDelta *= attenuation;
    }
  }
}
