import * as THREE from '../../libs/three.js/build/three.module.js';
import { MOUSE } from '../defines.js';
import { Utils } from '../utils.js';
import { EventDispatcher } from '../EventDispatcher.js';

export class EarthControls extends EventDispatcher {
  constructor(viewer) {
    super(viewer);

    this.viewer = viewer;
    this.renderer = viewer.renderer;

    this.scene = null;
    this.sceneControls = new THREE.Scene();

    this.rotationSpeed = 10;

    this.fadeFactor = 20;
    this.wheelDelta = 0;
    this.panDelta = new THREE.Vector2(0, 0);
    this.zoomDelta = new THREE.Vector3();
    this.camStart = null;
    this.scrollTimer = null;
    this.touchZoomStart = null;

    this.tweens = [];

    {
      let sg = new THREE.SphereGeometry(1, 16, 16);
      let sm = new THREE.MeshNormalMaterial();
      this.pivotIndicator = new THREE.Mesh(sg, sm);
      this.pivotIndicator.visible = false;
      // this.sceneControls.add(this.pivotIndicator);
    }

    let drag = (e) => {
      // if (e.drag.object !== null) {
      // 	return;
      // }

      if (!this.pivot) {
        return;
      }

      if (e.drag.startHandled === undefined) {
        e.drag.startHandled = true;

        this.dispatchEvent({ type: 'start' });
      }

      let camStart = this.camStart;
      let camera = this.scene.getActiveCamera();
      let view = this.viewer.scene.view;

      // let camera = this.viewer.scene.camera;
      let mouse = e.drag.end;
      let domElement = this.viewer.renderer.domElement;

      if (e.drag.mouse === MOUSE.RIGHT || (e.drag.mouse === MOUSE.LEFT && e.event.ctrlKey)) {
        let ndrag = {
          x: e.drag.lastDrag.x / this.renderer.domElement.clientWidth,
          y: e.drag.lastDrag.y / this.renderer.domElement.clientHeight,
        };

        let yawDelta = -ndrag.x * this.rotationSpeed * 0.5;
        let pitchDelta = -ndrag.y * this.rotationSpeed * 0.2;

        let originalPitch = view.pitch;
        let tmpView = view.clone();
        tmpView.pitch = tmpView.pitch + pitchDelta;
        pitchDelta = tmpView.pitch - originalPitch;

        let pivotToCam = new THREE.Vector3().subVectors(view.position, this.pivot);
        let pivotToCamTarget = new THREE.Vector3().subVectors(view.getPivot(), this.pivot);
        let side = view.getSide();

        pivotToCam.applyAxisAngle(side, pitchDelta);
        pivotToCamTarget.applyAxisAngle(side, pitchDelta);

        pivotToCam.applyAxisAngle(new THREE.Vector3(0, 0, 1), yawDelta);
        pivotToCamTarget.applyAxisAngle(new THREE.Vector3(0, 0, 1), yawDelta);

        let newCam = new THREE.Vector3().addVectors(this.pivot, pivotToCam);
        // TODO: Unused: let newCamTarget = new THREE.Vector3().addVectors(this.pivot, pivotToCamTarget);

        view.position.copy(newCam);
        view.yaw += yawDelta;
        view.pitch += pitchDelta;
      } else if (e.drag.mouse === MOUSE.LEFT) {
        if (!camStart) {
          let ndrag = {
            x: e.drag.lastDrag.x / this.renderer.domElement.clientWidth,
            y: e.drag.lastDrag.y / this.renderer.domElement.clientHeight,
          };

          this.panDelta.x += ndrag.x;
          this.panDelta.y += ndrag.y;
          this.stopTweens();
          return;
        }
        let ray = Utils.mouseToRay(mouse, camera, domElement.clientWidth, domElement.clientHeight);
        let plane = new THREE.Plane().setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 0, 1), this.pivot);

        let distanceToPlane = ray.distanceToPlane(plane);

        if (distanceToPlane > 0) {
          let I = new THREE.Vector3().addVectors(camStart.position, ray.direction.clone().multiplyScalar(distanceToPlane));

          let movedBy = new THREE.Vector3().subVectors(I, this.pivot);

          let newCamPos = camStart.position.clone().sub(movedBy);

          view.position.copy(newCamPos);

          {
            let distance = newCamPos.distanceTo(this.pivot);
            view.radius = distance;
            // let speed = view.radius / 2.5;
            // this.viewer.setMoveSpeed(speed);
          }
        }
      }
    };

    let onMouseDown = (e) => {
      let I = Utils.getMousePointCloudIntersection(e.mouse, this.scene.getActiveCamera(), this.viewer, this.scene.pointclouds, { pickClipped: false });

      if (I) {
        this.pivot = I.location;
        this.camStart = this.scene.getActiveCamera().clone();
        this.pivotIndicator.visible = true;
        this.pivotIndicator.position.copy(I.location);
        this.dispatchEvent({ type: 'pointcloud-clicked', position: I.location });
      } else {
        this.pivot = this.scene.view.getPivot();
      }
    };

    let previousTouch = null;

    let onTouchStart = (e) => {
      previousTouch = e;
      if (e.touches.length > 0) {
        let I = Utils.getMousePointCloudIntersection(e.mouse, this.scene.getActiveCamera(), this.viewer, this.scene.pointclouds, { pickClipped: false });
        if (e.touches.length === 2) {
          let rect = this.domElement.getBoundingClientRect();
          let x1 = e.touches[0].pageX - rect.left;
          let y1 = e.touches[0].pageY - rect.top;
          let x2 = e.touches[1].pageX - rect.left;
          let y2 = e.touches[1].pageY - rect.top;
          let x = (x1 + x2) / 2;
          let y = (y1 + y2) / 2;
          this.touchZoomStart = { x, y };
        }

        if (I) {
          if (e.touches.length === 1) {
            this.pivot = I.location;
            this.camStart = this.scene.getActiveCamera().clone();
            this.pivotIndicator.visible = true;
            this.pivotIndicator.position.copy(I.location);
            this.dispatchEvent({ type: 'pointcloud-clicked', position: I.location });
          } else {
            this.pivot = this.scene.view.getPivot();
          }
        } else {
          this.pivot = this.scene.view.getPivot();
        }
      }
    };

    let drop = (e) => {
      if (e.drag.object !== null) {
        return;
      }
      this.dispatchEvent({ type: 'end' });
    };

    let onMouseUp = (e) => {
      this.camStart = null;
      this.pivot = null;
      this.pivotIndicator.visible = false;
    };

    let onTouchEnd = (e) => {
      this.camStart = null;
      this.pivot = null;
      this.pivotIndicator.visible = false;
      previousTouch = e;
      if (this.touchZoomStart) {
        this.touchZoomStart = null;
        this.dispatchEvent({ type: 'scroll_end' });
      }
    };

    let onTouchMove = (e) => {
      if (e.touches.length === 2 && previousTouch.touches.length === 2) {
        let prev = previousTouch;
        let curr = e;

        let prevDX = prev.touches[0].pageX - prev.touches[1].pageX;
        let prevDY = prev.touches[0].pageY - prev.touches[1].pageY;
        let prevDist = Math.sqrt(prevDX * prevDX + prevDY * prevDY);

        let currDX = curr.touches[0].pageX - curr.touches[1].pageX;
        let currDY = curr.touches[0].pageY - curr.touches[1].pageY;
        let currDist = Math.sqrt(currDX * currDX + currDY * currDY);

        let delta = currDist / prevDist;
        this.wheelDelta += currDist > prevDist ? delta : -delta;

        this.stopTweens();
      } else if (e.touches.length === 3 && previousTouch.touches.length === 3) {
        let prev = previousTouch;
        let curr = e;

        let prevMeanX = (prev.touches[0].pageX + prev.touches[1].pageX + prev.touches[2].pageX) / 3;
        let prevMeanY = (prev.touches[0].pageY + prev.touches[1].pageY + prev.touches[2].pageY) / 3;

        let currMeanX = (curr.touches[0].pageX + curr.touches[1].pageX + curr.touches[2].pageX) / 3;
        let currMeanY = (curr.touches[0].pageY + curr.touches[1].pageY + curr.touches[2].pageY) / 3;

        let delta = {
          x: (currMeanX - prevMeanX) / this.renderer.domElement.clientWidth,
          y: (currMeanY - prevMeanY) / this.renderer.domElement.clientHeight,
        };

        this.panDelta.x += delta.x;
        this.panDelta.y += delta.y;

        this.stopTweens();
      }

      previousTouch = e;
    };

    let scroll = (e) => {
      this.wheelDelta += e.delta;
      if (this.scrollTimer !== null) {
        clearTimeout(this.scrollTimer);
      }
      this.scrollTimer = setTimeout(() => {
        this.dispatchEvent({ type: 'scroll_end' });
      }, 150);
    };

    let dblclick = (e) => {
      this.zoomToLocation(e.mouse);
    };

    this.addEventListener('drag', drag);
    this.addEventListener('drop', drop);
    this.addEventListener('mousewheel', scroll);
    this.addEventListener('mousedown', onMouseDown);
    this.addEventListener('mouseup', onMouseUp);
    this.addEventListener('touchstart', onTouchStart);
    this.addEventListener('touchend', onTouchEnd);
    this.addEventListener('touchmove', onTouchMove);
    this.addEventListener('dblclick', dblclick);
  }

  setScene(scene) {
    this.scene = scene;
  }

  stop() {
    this.wheelDelta = 0;
    this.zoomDelta.set(0, 0, 0);
    this.panDelta.set(0, 0);
  }

  stopTweens() {
    this.tweens.forEach((e) => e.stop());
    this.tweens = [];
  }

  zoomToLocation(mouse) {
    let camera = this.scene.getActiveCamera();

    let I = Utils.getMousePointCloudIntersection(mouse, camera, this.viewer, this.scene.pointclouds);

    if (I === null) {
      return;
    }

    let targetRadius = 0;
    {
      let minimumJumpDistance = 0.2;

      let domElement = this.renderer.domElement;
      let ray = Utils.mouseToRay(mouse, camera, domElement.clientWidth, domElement.clientHeight);

      let nodes = I.pointcloud.nodesOnRay(I.pointcloud.visibleNodes, ray);
      let lastNode = nodes[nodes.length - 1];
      let radius = lastNode.getBoundingSphere(new THREE.Sphere()).radius;
      targetRadius = Math.min(this.scene.view.radius, radius);
      targetRadius = Math.max(minimumJumpDistance, targetRadius);
    }

    let d = this.scene.view.direction.multiplyScalar(-1);
    let cameraTargetPosition = new THREE.Vector3().addVectors(I.location, d.multiplyScalar(targetRadius));
    // TODO Unused: let controlsTargetPosition = I.location;

    let animationDuration = 600;
    let easing = TWEEN.Easing.Quartic.Out;

    {
      // animate
      let value = { x: 0 };
      let tween = new TWEEN.Tween(value).to({ x: 1 }, animationDuration);
      tween.easing(easing);
      this.tweens.push(tween);

      let startPos = this.scene.view.position.clone();
      let targetPos = cameraTargetPosition.clone();
      let startRadius = this.scene.view.radius;
      let targetRadius = cameraTargetPosition.distanceTo(I.location);

      tween.onUpdate(() => {
        let t = value.x;
        this.scene.view.position.x = (1 - t) * startPos.x + t * targetPos.x;
        this.scene.view.position.y = (1 - t) * startPos.y + t * targetPos.y;
        this.scene.view.position.z = (1 - t) * startPos.z + t * targetPos.z;

        this.scene.view.radius = (1 - t) * startRadius + t * targetRadius;
        // this.viewer.setMoveSpeed(this.scene.view.radius / 2.5);
      });

      tween.onComplete(() => {
        this.tweens = this.tweens.filter((e) => e !== tween);
      });

      tween.start();
    }
  }

  update(delta) {
    let view = this.scene.view;
    let fade = Math.pow(0.5, this.fadeFactor * delta);
    let progression = 1 - fade;
    let camera = this.scene.getActiveCamera();

    // compute zoom
    if (this.wheelDelta !== 0) {
      let I = Utils.getMousePointCloudIntersection(this.touchZoomStart || this.viewer.inputHandler.mouse, this.scene.getActiveCamera(), this.viewer, this.scene.pointclouds);

      if (I) {
        let resolvedPos = new THREE.Vector3().addVectors(view.position, this.zoomDelta);
        let jumpDistance = this.viewer.zoomSpeed * this.wheelDelta;
        let targetDir = new THREE.Vector3().subVectors(I.location, view.position);
        targetDir.normalize();

        resolvedPos.add(targetDir.multiplyScalar(jumpDistance));
        this.zoomDelta.subVectors(resolvedPos, view.position);

        {
          // let speed = 4;
          // this.viewer.setMoveSpeed(speed);
        }
      } else {
        let resolvedPos = new THREE.Vector3().addVectors(view.position, this.zoomDelta);
        let pivot = view.getPivot();
        let jumpDistance = this.viewer.zoomSpeed * this.wheelDelta;
        let targetDir = new THREE.Vector3().subVectors(pivot, view.position);
        targetDir.normalize();

        resolvedPos.add(targetDir.multiplyScalar(jumpDistance));
        this.zoomDelta.subVectors(resolvedPos, view.position);

        {
          // let speed = 4;
          // this.viewer.setMoveSpeed(speed);
        }
      }
    }

    // apply zoom
    if (this.zoomDelta.length() !== 0) {
      let p = this.zoomDelta.clone().multiplyScalar(progression);

      let newPos = new THREE.Vector3().addVectors(view.position, p);
      view.position.copy(newPos);
    }

    if (this.pivotIndicator.visible) {
      let distance = this.pivotIndicator.position.distanceTo(view.position);
      let pixelwidth = this.renderer.domElement.clientwidth;
      let pixelHeight = this.renderer.domElement.clientHeight;
      let pr = Utils.projectedRadius(1, camera, distance, pixelwidth, pixelHeight);
      let scale = 10 / pr;
      this.pivotIndicator.scale.set(scale, scale, scale);
    }

    {
      // apply pan
      let progression = Math.min(1, this.fadeFactor * delta);
      let panDistance = progression * view.radius * 3;

      let px = -this.panDelta.x * panDistance;
      let py = this.panDelta.y * panDistance;

      view.pan(px, py);
    }

    // decelerate over time
    {
      let attenuation = Math.max(0, 1 - this.fadeFactor * delta);

      this.panDelta.multiplyScalar(attenuation);
      this.zoomDelta.multiplyScalar(fade);
      this.wheelDelta = 0;
    }
  }
}
