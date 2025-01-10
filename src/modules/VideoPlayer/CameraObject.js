import * as THREE from '../../../libs/three.js/build/three.module.js';
import { GLTFLoader } from '../../../libs/three.js/loaders/GLTFLoader.js';
import { Utils } from '../../utils.js';

export class CameraObject extends THREE.Object3D {
  constructor(mainViewer, camera) {
    super();

    this.mainViewer = mainViewer;
    this.camera = camera;

    // Create the sphere (player position)
    // const sphereGeometry = new THREE.SphereGeometry(1, 100, 100);
    // const sphereMaterial = new THREE.MeshStandardMaterial({
    //   color: '#58B895',
    //   emissive: '#58B895',
    //   emissiveIntensity: 0.3,
    // });
    // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    // Load the GLTF/GLB Model
    const loader = new GLTFLoader();
    let path = Potree.resourcePath + '/models';

    loader.load(
      `${path}/Boston Robot Dinamic1.glb`,
      (gltf) => {
        const sphere = gltf.scene; // Access the loaded scene

        // set initial local rotation and position
        sphere.rotation.y = Math.PI / 2;
        sphere.position.y = -2;
        sphere.position.x = 0.4;
        // Create the arrow (player direction)
        const arrowGroup = new THREE.Group();

        const arrowConeGeometry = new THREE.ConeGeometry(0.7, 1.5, 32);
        const arrowMaterial = new THREE.MeshStandardMaterial({
          color: '#58B895',
          emissive: '#58B895',
          emissiveIntensity: 0.3,
        });
        const arrowCone = new THREE.Mesh(arrowConeGeometry, arrowMaterial);
        arrowCone.rotation.x = -Math.PI / 2; // Rotate to point forward
        arrowGroup.add(arrowCone);

        const arrowShaftGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32);
        const arrowShaft = new THREE.Mesh(arrowShaftGeometry, arrowMaterial);
        arrowShaft.rotation.x = -Math.PI / 2; // Rotate to align with the cone
        arrowShaft.position.set(0, 0, 1); // Position behind the arrow cone
        arrowGroup.add(arrowShaft);

        // Add the arrow to the sphere
        this.add(arrowGroup);

        // Position the arrow relative to the sphere
        arrowGroup.position.set(0, 0, -3);

        // Add the sphere to the main object
        this.add(sphere);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened:', error);
      }
    );
  }

  update() {
    // Camera from main view
    const camera = this.mainViewer.scene.getActiveCamera();
    const renderAreaSize = this.mainViewer.renderer.getSize(new THREE.Vector2());
    let clientWidth = renderAreaSize.width;
    let clientHeight = renderAreaSize.height;

    this.position.copy(this.camera.position);
    this.quaternion.copy(this.camera.quaternion);

    let distance = camera.position.distanceTo(this.getWorldPosition(new THREE.Vector3()));
    let pr = Utils.projectedRadius(1, camera, distance, clientWidth, clientHeight);
    let scale = Math.max(Math.min(15 / pr, 4), 0.2); // Clamp scale

    this.scale.set(scale, scale, scale);
  }
}
