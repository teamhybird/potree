import * as THREE from '../../libs/three.js/build/three.module.js';
import { ShapeTypes } from '../defines';
import { TextSprite } from '../TextSprite.js';
import { Utils } from '../utils';

export class Shape extends THREE.Object3D {
  constructor(args = {}) {
    super();

    this.constructor.counter = this.constructor.counter === undefined ? 0 : this.constructor.counter + 1;

    this.name = 'shape_' + this.constructor.counter;

    this._shapeType = args.shapeType || ShapeTypes.cube;
    this._visible = true;
    this.showShapeLabel = false;
    this._modifiable = args.modifiable || true;
    this.color = new THREE.Color(Utils.getColorFromString(args.colorName));
    this._modelDetails = args.modelDetails || {};
    this._transparency = args.transparency || 0.6;

    this.renderShapeType();

    this.label = new TextSprite('0');
    this.label.setBorderColor({ r: 0, g: 255, b: 0, a: 0.0 });
    this.label.setBackgroundColor({ r: 0, g: 255, b: 0, a: 0.0 });
    this.label.material.depthTest = false;
    this.label.material.depthWrite = false;
    this.label.material.transparent = true;
    this.label.position.y -= 0.5;
    this.add(this.label);

    this.label.updateMatrixWorld = () => {
      let shapeWorldPos = new THREE.Vector3();
      shapeWorldPos.setFromMatrixPosition(this.matrixWorld);
      this.label.position.copy(shapeWorldPos);
      this.label.updateMatrix();
      this.label.matrixWorld.copy(this.label.matrix);
      this.label.matrixWorldNeedsUpdate = false;

      for (let i = 0, l = this.label.children.length; i < l; i++) {
        this.label.children[i].updateMatrixWorld(true);
      }
    };

    this.enableMove = typeof args.enableMove === 'undefined' ? true : args.enableMove;

    this.update();
  }

  get shapeType() {
    return this._shapeType;
  }

  set shapeType(value) {
    this.renderShapeType();
    this._shapeType = value;

    this.update();
  }

  get visible() {
    return this._visible;
  }

  set visible(value) {
    if (this._visible !== value) {
      this._visible = value;

      this.dispatchEvent({ type: 'visibility_changed', object: this });
    }
  }

  select(e) {
    console.log();
    this.dispatchEvent({
      type: 'shape_select',
      object: this,
    });
  }

  getShape() {
    return Math.abs(this.scale.x * this.scale.y * this.scale.z);
  }

  cubeConfig() {
    const width = this.modelDetails.width || 1;
    const height = this.modelDetails.height || 1;
    const depth = this.modelDetails.depth || 1;

    const geometry = new THREE.BoxBufferGeometry(width, height, depth);

    const material = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: this.transparency,
    });

    return { geometry, material };
  }

  sphereConfig() {
    const radius = this.modelDetails.radius || 1;
    const widthSegments = 30;
    const heightSegments = 30;

    const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);

    const material = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: this.transparency,
    });

    return { geometry, material };
  }

  cylinderConfig() {
    const radiusTop = this.modelDetails.radiusTop || 1;

    const radiusBottom = this.modelDetails.radiusBottom || 1;

    const height = this.modelDetails.height || 3;

    const radialSegments = 30;

    const geometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments);

    const material = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: this.transparency,
    });

    return { geometry, material };
  }

  ringConfig() {
    const radius = this.modelDetails.radius || 2;

    const tubeRadius = this.modelDetails.tubeRadius || 1;

    const radialSegments = 30;

    const tubularSegments = 30;

    const geometry = new THREE.TorusBufferGeometry(radius, tubeRadius, radialSegments, tubularSegments);

    const material = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: this.transparency,
    });

    return { geometry, material };
  }

  renderShapeType() {
    let meshProps = this.createMeshProps();
    this.material = meshProps.material;
    this.box = new THREE.Mesh(meshProps.geometry, this.material);
    this.box.geometry.computeBoundingBox();
    this.boundingBox = this.box.geometry.boundingBox;

    this.add(this.box);

    var outlineMaterial1 = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide, transparent: true, opacity: this.transparency });
    var outlineMesh1 = new THREE.Mesh(meshProps.geometry, outlineMaterial1);
    outlineMesh1.scale.multiplyScalar(1.01);
    this.add(outlineMesh1);
  }

  createMeshProps() {
    let meshProps = { geometry: null, material: null };
    switch (this.shapeType) {
      case ShapeTypes.cube:
        meshProps = this.cubeConfig();
        break;
      case ShapeTypes.sphere:
        meshProps = this.sphereConfig();
        break;
      case ShapeTypes.cylinder:
        meshProps = this.cylinderConfig();
        break;
      case ShapeTypes.ring:
        meshProps = this.ringConfig();
        break;
      default:
        meshProps = this.cubeConfig();
        break;
    }

    return meshProps;
  }

  setShapePosition(pos) {
    this.position.copy(pos);
  }

  setShapeRotation(rotation) {
    this.rotation.x = rotation.x;
    this.rotation.y = rotation.y;
    this.rotation.z = rotation.z;
  }

  setShapeScale(scale) {
    this.scale.x = scale.x;
    this.scale.y = scale.y;
    this.scale.z = scale.z;
  }

  update() {
    this.boundingBox = this.box.geometry.boundingBox;

    this.box.visible = true;
    this.label.visible = this.showShapeLabel;
  }

  raycast(raycaster, intersects) {
    let is = [];
    this.box.raycast(raycaster, is);

    if (is.length > 0) {
      let I = is[0];
      intersects.push({
        distance: I.distance,
        object: this,
        point: I.point.clone(),
      });
    }
  }

  get modifieable() {
    return this._modifiable;
  }

  set modifieable(value) {
    this._modifiable = value;

    this.update();
  }

  get enableMove() {
    return this._enableMove;
  }

  set enableMove(val) {
    if (val) {
      this.addEventListener('select', this.select);
      this.addEventListener('deselect', (e) => {});
    } else {
      this.removeEventListener('select', this.select);
      this.removeEventListener('deselect', (e) => {});
    }
    this._enableMove = val;
  }

  get transparency() {
    return this._transparency;
  }

  set transparency(value) {
    this._transparency = value;
  }

  get modelDetails() {
    return this._modelDetails;
  }

  set modelDetails(value = {}) {
    this._modelDetails = value;

    // ignore scale or rotation
    if (value.scale) {
      this.setShapeScale(value.scale);
    }
    if (value.rotation) {
      this.setShapeRotation(value.rotation);
    }
    // Update object geometry
    let { geometry } = this.createMeshProps();
    this.box.geometry.dispose();
    this.box.geometry = geometry;
    this.box.geometry.computeBoundingBox();
    this.boundingBox = this.box.geometry.boundingBox;
  }
}
