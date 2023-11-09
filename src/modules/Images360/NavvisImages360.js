import * as THREE from '../../../libs/three.js/build/three.module.js';
import { EventDispatcher } from '../../EventDispatcher.js';
import { Utils } from '../../utils.js';

let sgHigh = new THREE.SphereGeometry(1, 128, 128);

let sm = new THREE.MeshBasicMaterial({ side: THREE.BackSide, depthTest: false, depthWrite: false, transparent: true });
let footprintDefaultOpacity = 0.2,
  footprintHoveredOpacity = 1;

let raycaster = new THREE.Raycaster();
let currentlyHovered = null;
let previousFOV = null,
  previousPointBudget = null,
  previousUseHQ = null;

let previousView = {
  controls: null,
  position: null,
  target: null,
};

let previousImage360 = null;

class Image360 {
  constructor(id, file, time, longitude, latitude, altitude, x, y, z, w, panoLongitude, panoLatitude, panoAltitude, panoX, panoY, panoZ, panoW) {
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
    this.id = id;
  }
}

export class NavvisImages360 extends EventDispatcher {
  constructor(viewer, fetchTiles) {
    super();

    this.viewer = viewer;
    this.fetchTiles = fetchTiles;

    this.images = [];
    this.node = new THREE.Object3D();
    this.footprints = [];
    this._showFootprints = false;
    this._footprintsVisible = true;
    this._view360Enabled = false;

    this.sphere = new THREE.Group();
    this._visible = true;
    this.focusedImage = null;

    this.scene = new THREE.Scene();
    this.scene.name = 'scene_360_images';
    this.light = new THREE.PointLight(0xffffff, 1.0);
    this.scene.add(this.light);
    this.photoSphereViewer = null;

    this.viewer.inputHandler.registerInteractiveScene(this.scene);

    this.viewer.addEventListener('update', () => {
      this.update(this.viewer);
    });
    this.viewer.addEventListener('render.pass.scene', (e) => this.render(e));
    this.viewer.addEventListener('scene_changed', this.onSceneChange.bind(this));

    this.viewer.inputHandler.addInputListener(this);

    let domElement = this.viewer.renderer.domElement;
    let mouseMoved = false;
    let mouseMove = (e) => {
      mouseMoved = true;
    };
    let mouseUp = (e) => {
      if (!mouseMoved) {
        if (currentlyHovered && currentlyHovered.image360) {
          this.focus(currentlyHovered.image360);
        }
      }
      domElement.removeEventListener('mousemove', mouseMove);
    };

    let mouseDown = (e) => {
      mouseMoved = false;
      domElement.addEventListener('mousemove', mouseMove);
    };

    this.addEventListener('mouseup', mouseUp);
    this.addEventListener('mousedown', mouseDown);
    this.viewer.scene.addEventListener('360_images_added', this.onAdd.bind(this));
    this.viewer.scene.addEventListener('360_images_removed', this.onRemove.bind(this));
  }

  onRemove(e) {
    this.scene.remove(e.images.node);
  }

  onAdd(e) {
    this.scene.add(e.images.node);
  }

  onSceneChange(e) {
    if (e.oldScene) {
      e.oldScene.removeEventListener('360_images_added', this.onAdd.bind(this));
      e.oldScene.removeEventListener('360_images_removed', this.onRemove.bind(this));
    }

    e.scene.addEventListener('360_images_added', this.onAdd.bind(this));
    e.scene.addEventListener('360_images_removed', this.onRemove.bind(this));
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
    this._view360Enabled = view360Enabled;
  }

  get view360Enabled() {
    return this._view360Enabled;
  }

  set showFootprints(showFootprints) {
    this._showFootprints = showFootprints;
    for (const footprint of this.footprints) {
      footprint.material.opacity = showFootprints ? footprintDefaultOpacity : 0;
    }
  }

  get showFootprints() {
    return this._showFootprints;
  }

  set footprintsVisible(footprintsVisible) {
    this._footprintsVisible = footprintsVisible;
    for (const footprint of this.footprints) {
      footprint.visible = footprintsVisible;
    }
  }

  get footprintsVisible() {
    return this._footprintsVisible;
  }

  setView360Enabled(view360Enabled) {
    if (this.view360Enabled === view360Enabled) {
      return false;
    }
    if (view360Enabled) {
      if (!previousImage360 && this.images.length === 0) {
        return false;
      }
      this.view360Enabled = view360Enabled;
      for (const pointcloud of this.viewer.scene.pointclouds) {
        pointcloud.material.opacity = 0;
      }
      previousView = {
        controls: this.viewer.controls,
        position: this.viewer.scene.view.position.clone(),
        target: this.viewer.scene.view.getPivot(),
      };
      this.viewer.setControls(this.viewer.panoControls);
      this.focus(previousImage360 || this.images[0], false);
      // remember FOV
      previousFOV = this.viewer.getFOV();
      previousPointBudget = this.viewer.getPointBudget();
      previousUseHQ = this.viewer.useHQ;
      // set to medium quality
      this.viewer.setPointBudget(3 * 1000 * 1000);
      this.viewer.useHQ = false;
    } else {
      this.view360Enabled = view360Enabled;

      for (const pointcloud of this.viewer.scene.pointclouds) {
        pointcloud.material.opacity = 1;
      }
      if (previousView.controls) this.viewer.setControls(previousView.controls);
      this.unfocus(false);
      // restart FOV
      if (previousFOV) {
        this.viewer.setFOV(previousFOV);
      }
      if (previousPointBudget) {
        this.viewer.setPointBudget(previousPointBudget);
      }
      if (previousUseHQ !== null) {
        this.viewer.useHQ = previousUseHQ;
      }
      this.viewer.showLoadingScreen(false);
    }
    return true;
  }

  setView(position, target = null, duration = 0, callback = null) {
    this.viewer.scene.view.setView(position, target, duration, (...args) => {
      this.viewer.controls.dispatchEvent({ type: 'end' });
      if (callback) callback(...args);
    });
  }

  focus(image360, withAnimation = true) {
    if (this.focusedImage !== null) {
      this.unfocus();
    }

    if (image360.mesh) {
      image360.mesh.visible = false;
    }

    this.sphere.visible = true;

    const setSpherePositionAndRotation = (callback = () => null) => {
      {
        // orientation
        let { panoX, panoY, panoZ, panoW } = image360;

        this.sphere.setRotationFromQuaternion(new THREE.Quaternion(panoX, panoY, panoZ, panoW));
        this.sphere.rotateX(THREE.Math.degToRad(90));
        this.sphere.rotateY(THREE.Math.degToRad(90)); // Texture is rotated by 90 degrees on Y axis
      }
      let { panoLongitude, panoLatitude, panoAltitude } = image360;

      this.sphere.position.set(panoLongitude, panoLatitude, panoAltitude);

      let target = new THREE.Vector3().copy(this.sphere.position);
      let dir = target.clone().sub(this.viewer.scene.view.position).normalize();
      let move = dir.multiplyScalar(0.000001);
      let newCamPos = target.clone().sub(move);

      this.setView(newCamPos, null, this.view360Enabled ? 0 : withAnimation ? 500 : 0, callback);
    };

    const moveToTarget = () => {
      this.sphere.visible = false;

      if (this.view360Enabled) {
        this.viewer.showLoadingScreen(true);
        setSpherePositionAndRotation();
        this.node.remove(this.sphere);
        this.load(image360)
          .then(() => {
            if (!this.view360Enabled) {
              throw new Error("ABORTED: Image loaded but couldn't be renderered because the view was switched in the meantime while the image was loading");
            }
            this.sphere.visible = true;
            this.node.add(this.sphere);
            for (const footprint of this.footprints) {
              footprint.visible = true;
            }
            // reset fov whenever in 360 view and 360 image is loaded
            if (previousFOV) {
              this.viewer.setFOV(previousFOV);
            }
            this.viewer.showLoadingScreen(false);
          })
          .catch((e) => {
            console.log(e);
            this.view360Enabled = false;
            this.viewer.showLoadingScreen(false);
          });

        // this.load(image360)
        //   .then(() => {
        //     if (!this.view360Enabled) {
        //       throw new Error("ABORTED: Image loaded but couldn't be renderered because the view was switched in the meantime while the image was loading");
        //     }
        //     this.sphere.visible = true;
        //     this.sphere.material.map = image360.texture;
        //     this.sphere.material.depthTest = false;
        //     this.sphere.material.depthWrite = false;
        //     this.sphere.material.needsUpdate = true;
        //     for (const footprint of this.footprints) {
        //       footprint.visible = true;
        //     }
        //     // reset fov whenever in 360 view and 360 image is loaded
        //     if (previousFOV) {
        //       this.viewer.setFOV(previousFOV);
        //     }
        //     this.viewer.showLoadingScreen(false);
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //     this.view360Enabled = false;
        //     this.viewer.showLoadingScreen(false);
        //   });
      } else {
        for (const footprint of this.footprints) {
          footprint.visible = true;
        }
        setSpherePositionAndRotation();
      }
    };

    if (this.view360Enabled && previousImage360) {
      let { panoLongitude, panoLatitude, panoAltitude } = image360;
      let target = new THREE.Vector3(panoLongitude, panoLatitude, panoAltitude);
      let dir = new THREE.Vector3().subVectors(target, this.viewer.scene.view.position).normalize();
      let move = dir.multiplyScalar(0.02);
      let newCamPos = this.viewer.scene.view.position.clone().add(move);
      // disable all footprints while animation is playing
      for (const footprint of this.footprints) {
        footprint.visible = false;
      }

      this.setView(newCamPos, null, withAnimation ? 500 : 0, () => moveToTarget());
    } else {
      moveToTarget();
    }

    this.focusedImage = image360;
  }

  unfocus() {
    let image = this.focusedImage;

    if (image === null) {
      return;
    }

    if (image.mesh) {
      image.mesh.visible = true;
    }

    // this.sphere.material.map = null;
    // this.sphere.material.needsUpdate = true;
    this.sphere.visible = false;

    let pos = this.viewer.scene.view.position;
    let target = this.viewer.scene.view.getPivot();
    let dir = target.clone().sub(pos).normalize();
    let move = dir.multiplyScalar(10);
    let newCamPos = target.clone().sub(move);

    // this.viewer.scene.view.setView(previousView.position, previousView.target, 500);

    this.focusedImage = null;
  }

  async load(image360) {
    const cols = 8,
      rows = 4;
    const imageTilesUrls = [];
    if (this.fetchTiles) {
      try {
        const res = await this.fetchTiles({
          PanoramicImageID: image360.id,
          ImageNumber: `${String(0).padStart(2, '0')}`,
        });
        const { Data } = res.data;
        let resolutionIndex = 0;
        let count = 0;
        Data.forEach((tile, index) => {
          imageTilesUrls.push({
            imageNum: count,
            resolution: resolutionIndex,
            url: tile.URL,
          });
          count++;
          if (count > cols * rows - 1) {
            count = 0;
            resolutionIndex++;
          }
        });

        const pano = {
          minFov: 0,
          maxFov: 100,
          config: {
            width: 256 * cols,
            cols: cols,
            rows: rows,
            levels: [
              {
                width: 128 * cols, // 128 * cols
                cols: cols,
                rows: rows,
                zoomRange: [0, 20],
              },
              {
                width: 256 * cols, // 256 * cols
                cols: cols,
                rows: rows,
                zoomRange: [20, 50],
              },
              {
                width: 512 * cols, // 512 * cols
                cols: cols,
                rows: rows,
                zoomRange: [50, 70],
              },
              {
                width: 1024 * cols, // 1024 * cols
                cols: cols,
                rows: rows,
                zoomRange: [70, 100],
              },
            ],
            // baseUrl: image360.file,
            tileUrl: (col, row, level) => {
              const num = row * 8 + col;
              const foundIndex = imageTilesUrls.findIndex((tile) => tile.resolution === level && tile.imageNum === num);
              if (foundIndex > -1) {
                return imageTilesUrls[foundIndex].url;
              } else {
                console.warn('Tile not found', level, num);
                return null;
              }
            },
          },
        };

        if (this.photoSphereViewer) {
          this.photoSphereViewer.destroy();
        }
        let camera = this.viewer.scene.getActiveCamera();
        this.photoSphereViewer = new PhotoSphereViewer.Viewer({
          container: 'potree_render_area',
          camera: camera,
          meshContainer: this.sphere,
          potreeViewer: this.viewer,
          adapter: [
            PhotoSphereViewer.EquirectangularTilesAdapter,
            {
              // showErrorTile: true,
              // baseBlur: true,
              resolution: 32,
              // debug: true,
            },
          ],
        });
        this.photoSphereViewer.setOption('minFov', pano.minFov);
        this.photoSphereViewer.setOption('maxFov', pano.maxFov);
        await this.photoSphereViewer.setPanorama(pano.config, pano.options);
        return null;
      } catch (e) {
        console.log('FAIL', e);
        return null;
      }
    }

    // // TEMP - FOR LOCAL TESTING
    // const pano = {
    //   minFov: 0,
    //   maxFov: 100,
    //   config: {
    //     levels: [
    //       {
    //         width: 128 * cols, // 128 * cols
    //         cols: cols,
    //         rows: rows,
    //         zoomRange: [0, 20],
    //       },
    //       {
    //         width: 256 * cols, // 256 * cols
    //         cols: cols,
    //         rows: rows,
    //         zoomRange: [20, 50],
    //       },
    //       {
    //         width: 512 * cols, // 512 * cols
    //         cols: cols,
    //         rows: rows,
    //         zoomRange: [50, 70],
    //       },
    //       {
    //         width: 1024 * cols, // 1024 * cols
    //         cols: cols,
    //         rows: rows,
    //         zoomRange: [70, 100],
    //       },
    //     ],

    //     tileUrl: (col, row, level) => {
    //       const imageNum = 0;
    //       const num = row * 8 + (7 - col);
    //       return `${Potree.resourcePath}/assets/tiles/r${level}/0/${String(imageNum).padStart(5, '0')}-pano-tex-r${level}-${String(num).padStart(2, '0')}.jpg`;
    //       // const foundIndex = imageTilesUrls.findIndex((tile) => tile.resolution === level && tile.imageNum === num);
    //       // if (foundIndex > -1) {
    //       //   return imageTilesUrls[foundIndex].url;
    //       // } else {
    //       //   console.warn('Tile not found', level, num);
    //       //   return null;
    //       // }
    //     },
    //   },
    // };

    // this.photoSphereViewer.setOption('minFov', pano.minFov);
    // this.photoSphereViewer.setOption('maxFov', pano.maxFov);
    // await this.photoSphereViewer.setPanorama(pano.config, pano.options);
    // console.log('SET PANORAMA');
    // return null;
    // //TEMP

    // return new Promise((resolve, reject) => {
    //   let texture = new THREE.TextureLoader().load(image360.file, resolve, undefined, (err) => {
    //     reject(err);
    //   });
    //   texture.wrapS = THREE.RepeatWrapping;
    //   texture.repeat.x = -1;

    //   image360.texture = texture;
    // });
  }

  handleHovering() {
    let mouse = this.viewer.inputHandler.mouse;
    let camera = this.viewer.scene.getActiveCamera();
    let domElement = this.viewer.renderer.domElement;

    let ray = Utils.mouseToRay(mouse, camera, domElement.clientWidth, domElement.clientHeight);

    // let tStart = performance.now();
    raycaster.ray.copy(ray);
    let intersections = raycaster.intersectObjects(
      this.footprints.filter((v) => v.visible),
      false
    );

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

  updateImages(newImages = [], closestImage = null, params = {}) {
    if (!params.transform) {
      params.transform = {
        forward: (a) => a,
      };
    }
    this.images.forEach((image) => {
      this.node.remove(image.mesh);
      this.viewer.scene.scene.remove(image.mesh);
    });

    this.images = [];
    this.footprints = [];

    // Remove all previous images
    newImages.forEach((imageInfo) => {
      const file = imageInfo.ImageURL;
      const { TimeStamp: time } = imageInfo;

      const { X: fLong, Y: fLat, Z: fAlt } = imageInfo.FootPrint.Position;
      const { X: fX, Y: fY, Z: fZ, W: fW } = imageInfo.FootPrint.Orientation;

      const { X: long, Y: lat, Z: alt } = imageInfo.CamHead.Position;
      const { X: x, Y: y, Z: z, W: w } = imageInfo.CamHead.Orientation;

      let image360 = new Image360(imageInfo.ID, file, time, fLong, fLat, fAlt, fX, fY, fZ, fW, long, lat, alt, x, y, z, w);
      let xy = params.transform.forward([fLong, fLat]);
      let position = [...xy, fAlt];
      image360.position = position;
      this.images.push(image360);
    });
    // Closest image
    if (closestImage) {
      const file = closestImage.ImageURL;
      const { TimeStamp: time } = closestImage;

      const { X: fLong, Y: fLat, Z: fAlt } = closestImage.FootPrint.Position;
      const { X: fX, Y: fY, Z: fZ, W: fW } = closestImage.FootPrint.Orientation;

      const { X: long, Y: lat, Z: alt } = closestImage.CamHead.Position;
      const { X: x, Y: y, Z: z, W: w } = closestImage.CamHead.Orientation;

      let image360 = new Image360(closestImage.ID, file, time, fLong, fLat, fAlt, fX, fY, fZ, fW, long, lat, alt, x, y, z, w);
      let xy = params.transform.forward([fLong, fLat]);
      let position = [...xy, fAlt];
      image360.position = position;
      previousImage360 = image360;
    }

    // Add new images if any
    NavvisImages360Loader.createSceneNodes(this, params.transform);
  }

  update() {
    let camera = this.viewer.scene.getActiveCamera();
    this.light.position.copy(camera.position);

    if (currentlyHovered) {
      currentlyHovered.material.opacity = this.showFootprints ? footprintDefaultOpacity : 0;
      currentlyHovered = null;
    }

    this.handleHovering();
  }

  render(params) {
    const renderer = this.viewer.renderer;

    const oldTarget = renderer.getRenderTarget();

    if (params.renderTarget) {
      renderer.setRenderTarget(params.renderTarget);
    }
    renderer.render(this.scene, this.viewer.scene.getActiveCamera());
    renderer.setRenderTarget(oldTarget);
  }
}

export class NavvisImages360Loader {
  static async load(dataset, viewer, params = {}, fetchTiles) {
    if (!params.transform) {
      params.transform = {
        forward: (a) => a,
      };
    }

    let images360 = new NavvisImages360(viewer, fetchTiles);

    for (const imageInfo of dataset.ImageInfos) {
      const file = imageInfo.ImageURL;
      const { TimeStamp: time } = imageInfo;

      const { X: fLong, Y: fLat, Z: fAlt } = imageInfo.FootPrint.Position;
      const { X: fX, Y: fY, Z: fZ, W: fW } = imageInfo.FootPrint.Orientation;

      const { X: long, Y: lat, Z: alt } = imageInfo.CamHead.Position;
      const { X: x, Y: y, Z: z, W: w } = imageInfo.CamHead.Orientation;

      let image360 = new Image360(imageInfo.ID, file, time, fLong, fLat, fAlt, fX, fY, fZ, fW, long, lat, alt, x, y, z, w);

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
      const geometry = new THREE.CircleBufferGeometry(0.5, 32);
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        depthTest: false,
        depthWrite: false,
        opacity: images360.showFootprints ? footprintDefaultOpacity : 0,
        color: 0xffffff,
        alphaTest: footprintDefaultOpacity - 0.1,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...xy, altitude);
      mesh.scale.set(1, 1, 1);
      mesh.visible = images360.footprintsVisible;
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
