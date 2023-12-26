/**
 * @author mschuetz / http://mschuetz.at
 *
 * adapted from THREE.OrbitControls by
 *
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 *
 *
 *
 */

import * as THREE from '../../libs/three.js/build/three.module.js';
import { MOUSE } from '../defines.js';
import { EventDispatcher } from '../EventDispatcher.js';

export class PanoControls extends EventDispatcher {
  constructor(viewer) {
    super();

    this.viewer = viewer;
    this.renderer = viewer.renderer;

    this.scene = null;
    this.sceneControls = new THREE.Scene();

    this.moveSpeed = 10;

    this.fadeFactor = 50;
    this.yawDelta = 0;
    this.pitchDelta = 0;
    this.translationDelta = new THREE.Vector3(0, 0, 0);
    this.translationWorldDelta = new THREE.Vector3(0, 0, 0);
    this.scrollTimer = null;

    this.tweens = [];

    let drag = (e) => {
      // if (e.drag.object !== null) {
      //   return;
      // }
      let view = this.scene.view;

      if (e.drag.startHandled === undefined) {
        e.drag.startHandled = true;

        this.dispatchEvent({ type: 'start' });
      }

      let ndrag = {
        x: -e.drag.lastDrag.x / this.renderer.domElement.clientWidth,
        y: -e.drag.lastDrag.y / this.renderer.domElement.clientHeight,
      };

      if (e.drag.mouse === MOUSE.LEFT) {
        const rotationSpeed = this.viewer.getFOV() / 10;
        let yawDelta = ndrag.x * rotationSpeed * 0.5;
        this.pitchDelta += ndrag.y * rotationSpeed;
        let pitchDelta = ndrag.y * rotationSpeed * 0.2;
        {
          // apply rotation
          let yaw = view.yaw;
          let pitch = view.pitch;
          yaw -= yawDelta;
          pitch -= pitchDelta;
          view.yaw = yaw;
          view.pitch = THREE.Math.clamp(pitch, -Math.PI / 2, Math.PI / 2);
        }
      }
    };

    let drop = (e) => {
      this.dispatchEvent({ type: 'end' });
    };

    let scroll = (e) => {
      let fov = this.viewer.getFOV();

      if (e.delta < 0) {
        fov = fov + 1;
      } else if (e.delta > 0) {
        fov = fov - 1;
      }

      fov = Math.min(Math.max(fov, 10), 100);

      this.viewer.setFOV(fov);

      if (this.scrollTimer !== null) {
        clearTimeout(this.scrollTimer);
      }
      this.scrollTimer = setTimeout(() => {
        this.dispatchEvent({ type: 'scroll_end' });
      }, 150);
    };

    this.addEventListener('drag', drag);
    this.addEventListener('drop', drop);
    this.addEventListener('mousewheel', scroll);
  }

  // Overrides default zoomInOut behaviour
  zoomInOut(direction = 1) {
    let fov = this.viewer.getFOV();
    fov = fov - direction * 10;
    fov = Math.min(Math.max(fov, 10), 100);
    this.viewer.setFOV(fov, 500);
    this.viewer.controls.dispatchEvent({ type: 'end' });
  }

  setScene(scene) {
    this.scene = scene;
  }

  stop() {
    this.yawDelta = 0;
    this.pitchDelta = 0;
    this.translationDelta.set(0, 0, 0);
  }

  update(delta) {
    let view = this.scene.view;

    {
      // cancel move animations on user input
      let changes = [this.yawDelta, this.pitchDelta, this.translationDelta.length(), this.translationWorldDelta.length()];
      let changeHappens = changes.some((e) => Math.abs(e) > 0.001);
      if (changeHappens && this.tweens.length > 0) {
        this.tweens.forEach((e) => e.stop());
        this.tweens = [];
      }
    }

    // {
    //   // apply rotation
    //   let yaw = view.yaw;
    //   let pitch = view.pitch;

    //   yaw -= this.yawDelta * delta;
    //   pitch -= this.pitchDelta * delta;

    //   view.yaw = yaw;
    //   view.pitch = pitch;
    // }

    {
      // apply translation
      view.translate(this.translationDelta.x * delta, this.translationDelta.y * delta, this.translationDelta.z * delta);

      view.translateWorld(this.translationWorldDelta.x * delta, this.translationWorldDelta.y * delta, this.translationWorldDelta.z * delta);
    }

    {
      // set view target according to speed
      view.radius = 3 * this.viewer.getMoveSpeed();
    }

    {
      // decelerate over time
      let attenuation = Math.max(0, 1 - this.fadeFactor * delta);
      this.yawDelta *= attenuation;
      this.pitchDelta *= attenuation;
      this.translationDelta.multiplyScalar(attenuation);
      this.translationWorldDelta.multiplyScalar(attenuation);
    }
  }
}
