import * as THREE from '../../../libs/three.js/build/three.module.js';
import { CameraAnimation } from '../CameraAnimation/CameraAnimation.js';
import { CameraObject } from './CameraObject.js';

const planeDistance = 1;
export class VideoPlayer extends THREE.Object3D {
  constructor(viewer) {
    super();

    this.viewer = viewer;

    this.scene = new THREE.Scene();
    this.scene.name = 'scene_video_player';

    this.mainViewerScene = new THREE.Scene();
    this.mainViewerScene.name = 'main_viewer_scene_video_player';

    this.light = new THREE.PointLight(0xffffff, 1.0);
    this.scene.add(this.light);

    this.mainViewerLight = new THREE.PointLight(0xffffff, 1.0);
    this.mainViewerScene.add(this.mainViewerLight);

    this._video = null;

    this.videoPlane = null;
    this.cameraObject = new CameraObject(this.viewer.mainViewer, this.viewer.scene.getActiveCamera());
    this.cameraAnimation = new CameraAnimation(this.viewer.mainViewer, this.viewer.scene.getActiveCamera()); // this should correspond to each segment of the video, each segment should have its own path
    this.transparency = 1;

    this.viewer.addEventListener('update', this.update.bind(this));
    this.viewer.addEventListener('render.pass.before_scene', this.render.bind(this));
    this.viewer.addEventListener('scene_changed', this.onSceneChange.bind(this));
    this.viewer.mainViewer.addEventListener('update', this.mainViewerUpdate.bind(this));
    this.viewer.mainViewer.addEventListener('render.pass.perspective_overlay', this.mainViewerRender.bind(this));

    this.viewer.scene.addEventListener('video_player_added', this.onAdd.bind(this));
    this.viewer.scene.addEventListener('video_player_removed', this.onRemove.bind(this));
  }

  onRemove(e) {
    this.scene.remove(e.videoPlayer);
  }

  onAdd(e) {
    this.scene.add(e.videoPlayer);

    // Add camera object to the main scene
    this.mainViewerScene.add(this.cameraObject);
    this.mainViewerScene.add(this.cameraAnimation.node);
  }

  async init(cameraPosition, rotationMatrixValues, cameraParams) {
    try {
      this.videoPlane = this.createVideoPlane();

      this.setupCameraForImage(cameraPosition, rotationMatrixValues, cameraParams);

      this.add(this.videoPlane);
    } catch (e) {
      console.error('Cannot load texture: ', e);
    }
  }

  // TEMP: We should adjust video plane on update to track where the camera is and to place plane in front of it
  setupCameraForImage(cameraPosition, rotationMatrixValues, cameraParams) {
    const camera = this.viewer.scene.getActiveCamera();

    cameraPosition = new THREE.Vector3(...cameraPosition);
    camera.position.copy(cameraPosition);

    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.set(...rotationMatrixValues);

    // Apply the rotation matrix to the camera
    camera.quaternion.setFromRotationMatrix(rotationMatrix);
    camera.rotateX(THREE.Math.degToRad(180));

    const focalLength = cameraParams.focalLength;
    const imageHeight = cameraParams.height;
    const imageWidth = cameraParams.width;
    const fovRadians = Math.atan((0.5 * imageHeight) / focalLength);
    // Convert from half FoV to full FoV vertically
    const fov = ((fovRadians * 180) / Math.PI) * 2;
    const aspectRatio = imageWidth / imageHeight;

    camera.fov = fov;
    camera.aspect = aspectRatio;

    camera.updateProjectionMatrix();

    this.viewer.fpControls.dispatchEvent({ type: 'end' });
  }

  createVideoPlane() {
    const texture = new THREE.VideoTexture(this.video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);

    return plane;
  }

  onSceneChange(e) {
    if (e.oldScene) {
      e.oldScene.removeEventListener('video_player_added', this.onAdd.bind(this));
      e.oldScene.removeEventListener('video_player_removed', this.onRemove.bind(this));
    }

    e.scene.addEventListener('video_player_added', this.onAdd.bind(this));
    e.scene.addEventListener('video_player_removed', this.onRemove.bind(this));
  }

  update() {
    let camera = this.viewer.scene.getActiveCamera();

    this.light.position.copy(camera.position);

    {
      // Update position and rotation
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      // Scale the direction vector by the desired distance
      const offset = direction.multiplyScalar(planeDistance);

      // Add the offset to the camera's position to get the new position
      const newPosition = new THREE.Vector3();
      newPosition.copy(camera.position).add(offset);

      this.position.copy(newPosition);
      this.rotation.copy(camera.rotation);

      // Update Video Plane
      if (this.videoPlane) {
        const planeHeight = 2 * planeDistance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        const planeWidth = planeHeight * camera.aspect;

        this.videoPlane.scale.set(planeWidth, planeHeight, 1);
        this.videoPlane.material.opacity = this.transparency;
      }
    }

    this.cameraObject.update();
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

  mainViewerUpdate() {
    this.mainViewerLight.position.copy(this.viewer.mainViewer.scene.getActiveCamera().position);
  }

  mainViewerRender(params) {
    const renderer = this.viewer.mainViewer.renderer;

    if (this.viewer.mainViewer.controls !== this.viewer.mainViewer.followCamControls) {
      renderer.render(this.mainViewerScene, this.viewer.mainViewer.scene.getActiveCamera());
    }
  }

  get video() {
    return this._video;
  }

  set video({ video, cameraPosition, rotationMatrixValues, cameraParams }) {
    this._video = video;
    this.init(cameraPosition, rotationMatrixValues, cameraParams);
  }
}
