import * as THREE from '../../../libs/three.js/build/three.module.js';
import { EventDispatcher } from '../../EventDispatcher.js';
import { TextSprite } from '../../TextSprite.js';
import { Utils } from '../../utils.js';

let sgHigh = new THREE.SphereGeometry(1, 128, 128);

let sm = new THREE.MeshBasicMaterial({ side: THREE.BackSide, depthTest: false });
let footprintDefaultOpacity = 0.2,
  footprintHoveredOpacity = 1;

let raycaster = new THREE.Raycaster();
let currentlyHovered = null;

let previousView = {
  controls: null,
  position: null,
  target: null,
};

let previousImage360 = null;

class Image360 {
  constructor(file, time, longitude, latitude, altitude, x, y, z, w, panoLongitude, panoLatitude, panoAltitude, panoX, panoY, panoZ, panoW) {
    this.file = file;
    this.time = time;
    this.panoLongitude = panoLongitude;
    this.panoLatitude = panoLatitude;
    this.panoAltitude = panoAltitude;
    this.panoX = panoX;
    this.panoY = panoY;
    this.panoZ = panoZ;
    this.panoW = panoW;
    this.longitude = longitude;
    this.latitude = latitude;
    this.altitude = altitude;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.mesh = null;
  }
}

export class NavvisImages360 extends EventDispatcher {
  constructor(viewer) {
    super();

    this.viewer = viewer;

    this.images = [];
    this.node = new THREE.Object3D();
    this.footprints = [];
    this._view360Enabled = false;

    this.sphere = new THREE.Mesh(sgHigh, sm);
    this.sphere.visible = false;
    this.sphere.scale.set(1, 1, 1);
    this.node.add(this.sphere);
    this._visible = true;
    // this.node.add(label);

    this.focusedImage = null;

    let elUnfocus = document.createElement('input');
    elUnfocus.type = 'button';
    elUnfocus.value = 'unfocus';
    elUnfocus.style.position = 'absolute';
    elUnfocus.style.right = '10px';
    elUnfocus.style.bottom = '10px';
    elUnfocus.style.zIndex = '10000';
    elUnfocus.style.fontSize = '2em';
    elUnfocus.addEventListener('click', () => this.unfocus());
    this.elUnfocus = elUnfocus;

    this.domRoot = viewer.renderer.domElement.parentElement;
    this.domRoot.appendChild(elUnfocus);
    this.elUnfocus.style.display = 'none';

    viewer.addEventListener('update', () => {
      this.update(viewer);
    });
    viewer.inputHandler.addInputListener(this);

    this.addEventListener('mousedown', () => {
      if (currentlyHovered && currentlyHovered.image360) {
        this.focus(currentlyHovered.image360);
      }
    });
  }

  set visible(visible) {
    if (this._visible === visible) {
      return;
    }

    this.sphere.visible = visible && this.focusedImage != null;
    this._visible = visible;
    this.dispatchEvent({
      type: 'visibility_changed',
      images: this,
    });
  }

  get visible() {
    return this._visible;
  }

  set view360Enabled(view360Enabled) {
    if (this._view360Enabled === view360Enabled) {
      return;
    }
    this._view360Enabled = view360Enabled;
    if (view360Enabled) {
      for (const pointcloud of this.viewer.scene.pointclouds) {
        pointcloud.visible = false;
      }
      this.focus(previousImage360 || this.images[0]);
    } else {
      for (const pointcloud of this.viewer.scene.pointclouds) {
        pointcloud.visible = true;
      }
      this.unfocus();
    }
  }

  get view360Enabled() {
    return this._view360Enabled;
  }

  focus(image360) {
    if (this.focusedImage !== null) {
      this.unfocus();
    }

    image360.mesh.visible = false;

    previousView = {
      controls: this.viewer.controls,
      position: this.viewer.scene.view.position.clone(),
      target: viewer.scene.view.getPivot(),
    };
    this.sphere.visible = true;

    const moveToTarget = () => {
      this.sphere.visible = false;

      if (this.view360Enabled) {
        this.viewer.setControls(this.viewer.fpControls);

        this.load(image360).then(() => {
          previousImage360 = image360;

          this.sphere.visible = true;
          this.sphere.material.map = image360.texture;
          this.sphere.material.needsUpdate = true;
          for (const footprint of this.footprints) {
            footprint.visible = true;
          }
        });
      } else {
        for (const footprint of this.footprints) {
          footprint.visible = true;
        }
      }

      {
        // orientation
        let { panoX, panoY, panoZ, panoW } = image360;

        this.sphere.setRotationFromQuaternion(new THREE.Quaternion(panoX, panoY, panoZ, panoW));
        this.sphere.rotateX(THREE.Math.degToRad(90));
      }
      let { panoLongitude, panoLatitude, panoAltitude } = image360;

      this.sphere.position.set(panoLongitude, panoLatitude, panoAltitude);

      let target = new THREE.Vector3().copy(this.sphere.position);
      let dir = target.clone().sub(viewer.scene.view.position).normalize();
      let move = dir.multiplyScalar(0.000001);
      let newCamPos = target.clone().sub(move);
      viewer.scene.view.setView(newCamPos, target, this.view360Enabled ? 0 : 500);
    };

    if (this.view360Enabled && previousImage360) {
      let { panoLongitude, panoLatitude, panoAltitude } = image360;
      let target = new THREE.Vector3(panoLongitude, panoLatitude, panoAltitude);
      let dir = new THREE.Vector3().subVectors(target, viewer.scene.view.position).normalize();
      let move = dir.multiplyScalar(0.2);
      let newCamPos = viewer.scene.view.position.clone().add(move);
      // disable all footprints while animation is playing
      for (const footprint of this.footprints) {
        footprint.visible = false;
      }

      viewer.scene.view.setView(newCamPos, newCamPos, 500, () => moveToTarget());
    } else {
      moveToTarget();
    }

    this.focusedImage = image360;

    this.elUnfocus.style.display = '';
  }

  unfocus() {
    let image = this.focusedImage;

    if (image === null) {
      return;
    }

    image.mesh.visible = true;

    // this.sphere.material.map = null;
    // this.sphere.material.needsUpdate = true;
    this.sphere.visible = false;

    let pos = viewer.scene.view.position;
    let target = viewer.scene.view.getPivot();
    let dir = target.clone().sub(pos).normalize();
    let move = dir.multiplyScalar(10);
    let newCamPos = target.clone().sub(move);

    viewer.setControls(previousView.controls);

    // viewer.scene.view.setView(previousView.position, previousView.target, 500);

    this.focusedImage = null;

    this.elUnfocus.style.display = 'none';
  }

  load(image360) {
    return new Promise((resolve) => {
      let texture = new THREE.TextureLoader().load(image360.file, resolve);
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.x = -1;

      image360.texture = texture;
    });
  }

  handleHovering() {
    let mouse = viewer.inputHandler.mouse;
    let camera = viewer.scene.getActiveCamera();
    let domElement = viewer.renderer.domElement;

    let ray = Utils.mouseToRay(mouse, camera, domElement.clientWidth, domElement.clientHeight);

    // let tStart = performance.now();
    raycaster.ray.copy(ray);
    let intersections = raycaster.intersectObjects(this.footprints);

    if (intersections.length === 0) {
      // label.visible = false;

      return;
    }

    let intersection = intersections[0];
    if (intersection.object && intersection.object.image360 && intersection.object.visible) {
      currentlyHovered = intersection.object;
      currentlyHovered.material.opacity = footprintHoveredOpacity;
    }
    //label.visible = true;
    //label.setText(currentlyHovered.image360.file);
    //currentlyHovered.getWorldPosition(label.position);
  }

  update() {
    let { viewer } = this;

    if (currentlyHovered) {
      currentlyHovered.material.opacity = footprintDefaultOpacity;
      currentlyHovered = null;
    }

    this.handleHovering();
  }
}

export class NavvisImages360Loader {
  static async load(dataset, viewer, params = {}) {
    if (!params.transform) {
      params.transform = {
        forward: (a) => a,
      };
    }

    let images360 = new NavvisImages360(viewer);

    for (const imageInfo of dataset.ImageInfos) {
      const file = imageInfo.S3Path;
      const { TimeStamp: time } = imageInfo;

      const { X: fLong, Y: fLat, Z: fAlt } = imageInfo.FootPrint.Position;
      const { X: fX, Y: fY, Z: fZ, W: fW } = imageInfo.FootPrint.Orientation;

      const { X: long, Y: lat, Z: alt } = imageInfo.CamHead.Position;
      const { X: x, Y: y, Z: z, W: w } = imageInfo.CamHead.Orientation;

      let image360 = new Image360(file, time, fLong, fLat, fAlt, fX, fY, fZ, fW, long, lat, alt, x, y, z, w);

      let xy = params.transform.forward([fLong, fLat]);
      let position = [...xy, fAlt];
      image360.position = position;

      images360.images.push(image360);
    }

    NavvisImages360Loader.createSceneNodes(images360, params.transform);

    return images360;
  }

  static createSceneNodes(images360, transform) {
    for (let image360 of images360.images) {
      let { longitude, latitude, altitude } = image360;
      let xy = transform.forward([longitude, latitude]);

      const footprintImagePath = `${Potree.resourcePath}/textures/footprint360.png`;
      const texture = new THREE.TextureLoader().load(footprintImagePath);
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, color: 0xffffff, alphaTest: footprintDefaultOpacity - 0.1 });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...xy, altitude);
      mesh.scale.set(1, 1, 1);
      mesh.material.opacity = footprintDefaultOpacity;
      mesh.image360 = image360;

      {
        // orientation
        var { x, y, z, w } = image360;

        mesh.setRotationFromQuaternion(new THREE.Quaternion(x, y, z, w));
        const v = new THREE.Vector3(0, 0, 1).applyQuaternion(mesh.quaternion);
        // add small offset moving up along world axis
        mesh.position.add(v.multiplyScalar(0.01));
        // mesh.add(new THREE.AxesHelper(3));
      }

      images360.node.add(mesh);
      images360.footprints.push(mesh);

      image360.mesh = mesh;
    }
  }
}
