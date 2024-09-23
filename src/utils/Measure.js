import * as THREE from '../../libs/three.js/build/three.module.js';
import { TextSprite } from '../TextSprite.js';
import { Utils } from '../utils.js';
import { Line2 } from '../../libs/three.js/lines/Line2.js';
import { LineGeometry } from '../../libs/three.js/lines/LineGeometry.js';
import { LineMaterial } from '../../libs/three.js/lines/LineMaterial.js';
import { SystemType, MeasurementTransparancy } from '../defines.js';

const allMeasureVariants = [
  { systemType: SystemType.cluster, colorNames: ['green'] },
  { systemType: SystemType.component, colorNames: ['yellow', 'lightOrange', 'orange', 'green', 'lightBlue', 'blue', 'purple', 'red'] },
  {
    systemType: SystemType.defect,
    colorNames: ['yellow', 'lightOrange', 'orange', 'green', 'lightBlue', 'blue', 'purple', 'red'],
    subSystemType: ['ACCIDENT', 'CONCERN', 'DAMAGE', 'DEFECT', 'HAZARD', 'NEAR-MISS'],
  },
  { systemType: SystemType.inspect, colorNames: ['green'] },
  { systemType: SystemType.measurement, colorNames: ['yellow', 'lightOrange', 'orange', 'green', 'lightBlue', 'blue', 'purple', 'red'] },
  { systemType: SystemType.notification, colorNames: ['green'] },
  { systemType: SystemType.rgMeasurementLocation, colorNames: ['yellow', 'lightOrange', 'orange', 'green', 'lightBlue', 'blue', 'purple', 'red'] },
  { systemType: SystemType.rgMeasurementPoint, colorNames: ['yellow', 'lightOrange', 'orange', 'green', 'lightBlue', 'blue', 'purple', 'red'] },
];

let previousTransparency = null;

function createHeightLine(transparency) {
  let lineGeometry = new LineGeometry();

  lineGeometry.setPositions([0, 0, 0, 0, 0, 0]);

  let lineMaterial = new LineMaterial({
    color: 0x00ff00,
    dashSize: 5,
    gapSize: 2,
    linewidth: 2,
    resolution: new THREE.Vector2(1000, 1000),
    transparent: true,
  });

  // lineMaterial.depthTest = false;
  const heightEdge = new Line2(lineGeometry, lineMaterial);
  heightEdge.material.uniforms.opacity.value = transparency;
  heightEdge.visible = false;

  //this.add(this.heightEdge);

  return heightEdge;
}

function createHeightLabel(selected, transparency) {
  const heightLabel = new TextSprite('');

  heightLabel.setTextColor({ r: 255, g: 255, b: 255, a: 1.0 });
  heightLabel.setBorderColor({ r: 0, g: 0, b: 0, a: 1.0 });
  heightLabel.setBackgroundColor({ r: 0, g: 0, b: 0, a: 1.0 });
  heightLabel.fontsize = 16;
  // heightLabel.material.depthTest = false;
  heightLabel.material.opacity = transparency;
  heightLabel.visible = false;

  return heightLabel;
}

function createAreaLabel(selected, transparency) {
  const areaLabel = new TextSprite('');

  areaLabel.setTextColor({ r: 255, g: 255, b: 255, a: 1.0 });
  areaLabel.setBorderColor({ r: 0, g: 0, b: 0, a: 1.0 });
  areaLabel.setBackgroundColor({ r: 0, g: 0, b: 0, a: 1.0 });
  areaLabel.fontsize = 16;
  // areaLabel.material.depthTest = false;
  areaLabel.material.opacity = transparency;
  areaLabel.visible = false;

  return areaLabel;
}

function createCircleMesh(color) {
  let circleMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: color, transparent: true, opacity: 0.2 });
  let circleGeometry = new THREE.CircleGeometry(1, 32);

  const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
  circleMesh.scale.set(0, 0, 1);
  circleMesh.visible = false;

  return circleMesh;
}

function createCircleRadiusLabel() {
  const circleRadiusLabel = new TextSprite('');

  circleRadiusLabel.setTextColor({ r: 140, g: 250, b: 140, a: 1.0 });
  circleRadiusLabel.setBorderColor({ r: 0, g: 0, b: 0, a: 1.0 });
  circleRadiusLabel.setBackgroundColor({ r: 0, g: 0, b: 0, a: 1.0 });
  circleRadiusLabel.fontsize = 16;
  // circleRadiusLabel.material.depthTest = false;
  circleRadiusLabel.material.opacity = 1;
  circleRadiusLabel.visible = false;

  return circleRadiusLabel;
}

function createCircleRadiusLine() {
  const lineGeometry = new LineGeometry();

  lineGeometry.setPositions([0, 0, 0, 0, 0, 0]);

  const lineMaterial = new LineMaterial({
    color: 0xff0000,
    linewidth: 2,
    resolution: new THREE.Vector2(1000, 1000),
    gapSize: 1,
    dashed: true,
  });

  // lineMaterial.depthTest = false;

  const circleRadiusLine = new Line2(lineGeometry, lineMaterial);
  circleRadiusLine.visible = false;

  return circleRadiusLine;
}

function createCircleLine() {
  const coordinates = [];

  let n = 128;
  for (let i = 0; i <= n; i++) {
    let u0 = 2 * Math.PI * (i / n);
    let u1 = (2 * Math.PI * (i + 1)) / n;

    let p0 = new THREE.Vector3(Math.cos(u0), Math.sin(u0), 0);

    let p1 = new THREE.Vector3(Math.cos(u1), Math.sin(u1), 0);

    coordinates.push(...p0.toArray(), ...p1.toArray());
  }

  const geometry = new LineGeometry();
  geometry.setPositions(coordinates);

  const material = new LineMaterial({
    color: 0xff0000,
    dashSize: 5,
    gapSize: 2,
    linewidth: 2,
    resolution: new THREE.Vector2(1000, 1000),
  });

  // material.depthTest = false;

  const circleLine = new Line2(geometry, material);
  circleLine.visible = false;
  circleLine.computeLineDistances();

  return circleLine;
}

function createCircleCenter() {
  const sg = new THREE.SphereGeometry(1, 32, 32);
  const sm = new THREE.MeshNormalMaterial();

  const circleCenter = new THREE.Mesh(sg, sm);
  circleCenter.visible = false;

  return circleCenter;
}

function createLine(color, transparency) {
  const geometry = new LineGeometry();

  geometry.setPositions([0, 0, 0, 0, 0, 0]);

  const material = new LineMaterial({
    color,
    linewidth: 2,
    resolution: new THREE.Vector2(1000, 1000),
    gapSize: 1,
    dashed: true,
    transparent: true,
  });

  // material.depthTest = false;

  const line = new Line2(geometry, material);
  line.material.uniforms.opacity.value = transparency;

  return line;
}

function createCircle(color) {
  const coordinates = [];

  let n = 128;
  for (let i = 0; i <= n; i++) {
    let u0 = 2 * Math.PI * (i / n);
    let u1 = (2 * Math.PI * (i + 1)) / n;

    let p0 = new THREE.Vector3(Math.cos(u0), Math.sin(u0), 0);

    let p1 = new THREE.Vector3(Math.cos(u1), Math.sin(u1), 0);

    coordinates.push(...p0.toArray(), ...p1.toArray());
  }

  const geometry = new LineGeometry();
  geometry.setPositions(coordinates);

  const material = new LineMaterial({
    color,
    dashSize: 5,
    gapSize: 2,
    linewidth: 2,
    resolution: new THREE.Vector2(1000, 1000),
    transparent: true,
  });

  // material.depthTest = false;

  const line = new Line2(geometry, material);
  line.computeLineDistances();

  return line;
}

function createAzimuth(color, transparency) {
  const azimuth = {
    label: null,
    center: null,
    target: null,
    north: null,
    centerToNorth: null,
    centerToTarget: null,
    centerToTargetground: null,
    targetgroundToTarget: null,
    circle: null,

    node: null,
  };

  const sg = new THREE.SphereGeometry(1, 32, 32);
  const sm = new THREE.MeshNormalMaterial();

  {
    const label = new TextSprite('');

    label.setTextColor({ r: 140, g: 250, b: 140, a: 1.0 });
    label.setBorderColor({ r: 0, g: 0, b: 0, a: 1.0 });
    label.setBackgroundColor({ r: 0, g: 0, b: 0, a: 1.0 });
    label.fontsize = 16;
    // label.material.depthTest = false;
    label.material.opacity = transparency;

    azimuth.label = label;
  }

  azimuth.center = new THREE.Mesh(sg, sm);
  azimuth.target = new THREE.Mesh(sg, sm);
  azimuth.north = new THREE.Mesh(sg, sm);
  azimuth.centerToNorth = createLine(color, transparency);
  azimuth.centerToTarget = createLine(color, transparency);
  azimuth.centerToTargetground = createLine(color, transparency);
  azimuth.targetgroundToTarget = createLine(color, transparency);
  azimuth.circle = createCircle(color);

  azimuth.node = new THREE.Object3D();
  azimuth.node.add(
    azimuth.centerToNorth,
    azimuth.centerToTarget,
    azimuth.centerToTargetground,
    azimuth.targetgroundToTarget,
    azimuth.circle,
    azimuth.label,
    azimuth.center,
    azimuth.target,
    azimuth.north
  );

  return azimuth;
}

export class Measure extends THREE.Object3D {
  constructor() {
    super();

    this.constructor.counter = this.constructor.counter === undefined ? 0 : this.constructor.counter + 1;

    this.name = 'Measure_' + this.constructor.counter;
    this.points = [];
    this._showDistances = true;
    this._showCoordinates = false;
    this._showMeasureText = false;
    this._measureText = null;
    this._coordinatesText = null;
    this._showArea = false;
    this._selected = false;
    this._hovered = false;
    this._transparency = MeasurementTransparancy.SOLID;

    this._closed = true;
    this._showAngles = false;
    this._showCircle = false;
    this._showHeight = false;
    this._showEdges = true;
    this._showAzimuth = false;
    this.maxMarkers = Number.MAX_SAFE_INTEGER;

    this.sphereGeometry = new THREE.SphereGeometry(0.4, 10, 10);

    this.colorName = 'green';
    this.systemType = SystemType.none;
    this.subSystemType = null;

    this.color = new THREE.Color(0x01f6a5);

    this.isInserting = false;
    this.enableMove = true;

    this.meshArea = null;
    this.spheres = [];
    this.edges = [];
    this.sphereLabels = [];
    this.edgeLabels = [];
    this.angleLabels = [];
    this.coordinateLabels = [];
    this.measureLabels = [];

    this.heightEdge = createHeightLine(this.transparency);
    this.heightLabel = createHeightLabel(this.selected, this.transparency);
    this.areaLabel = createAreaLabel(this.selected, this.transparency);
    // this.circleRadiusLabel = createCircleRadiusLabel();
    // this.circleRadiusLine = createCircleRadiusLine();
    // this.circleLine = createCircleLine();
    // this.circleCenter = createCircleCenter();
    this.circleMesh = createCircleMesh(this.color);

    this.azimuth = createAzimuth(this.color, this.transparency);

    this.add(this.heightEdge);
    this.add(this.heightLabel);
    this.add(this.areaLabel);
    // this.add(this.circleRadiusLabel);
    // this.add(this.circleRadiusLine);
    // this.add(this.circleLine);
    // this.add(this.circleCenter);
    this.add(this.circleMesh);

    this.add(this.azimuth.node);
  }

  setColorByName(colorName) {
    this.color = new THREE.Color(Utils.getColorFromString(colorName));
  }

  getTexturePath(systemType, colorName, subSystemType) {
    let path = Potree.resourcePath + '/textures/';
    // Determine which path to use
    let subFolder = subSystemType ? `${subSystemType}/` : '';

    switch (systemType) {
      case SystemType.measurement:
        path += `measurement-icons/${subFolder}`;
        break;
      case SystemType.defect:
        path += `defect-icons/${subFolder}`;
        break;
      case SystemType.component:
        path += `component-icons/${subFolder}`;
        break;
      case SystemType.inspect:
        path += `inspect-icons/${subFolder}`;
        break;
      case SystemType.cluster:
        path += `cluster-icons/${subFolder}`;
        break;
      case SystemType.notification:
        path += `notification-icons/${subFolder}`;
        break;
      case SystemType.rgMeasurementLocation:
        path += `rg-measurement-location-icons/${subFolder}`;
        break;
      case SystemType.rgMeasurementPoint:
        path += `rg-measurement-point-icons/${subFolder}`;
        break;
      default:
        path += '';
        break;
    }
    // Determine which variant to use
    switch (colorName) {
      case 'yellow':
        path += 'point-yellow.svg';
        break;
      case 'lightOrange':
        path += 'point-lightorange.svg';
        break;
      case 'orange':
        path += 'point-orange.svg';
        break;
      case 'green':
        path += 'point-green.svg';
        break;
      case 'lightBlue':
        path += 'point-lightblue.svg';
        break;
      case 'blue':
        path += 'point-blue.svg';
        break;
      case 'purple':
        path += 'point-purple.svg';
        break;
      case 'red':
        path += 'point-red.svg';
        break;
      default:
        path += 'point-green.svg';
        break;
    }
    return path;
  }

  createSphereMaterial() {
    const map = new THREE.TextureLoader().load(this.getTexturePath(this.systemType, this.colorName, this.subSystemType));
    map.minFilter = THREE.LinearFilter;
    map.magFilter = THREE.LinearFilter;
    const material = new THREE.SpriteMaterial({ map });

    return material;
  }

  getSphereInstancedMesh() {
    const path = this.getTexturePath(this.systemType, this.colorName, this.subSystemType);
    return this.instancedMeshes[path];
  }

  createMeasureInstancedMesh(path) {
    const geometry = new THREE.PlaneBufferGeometry(1, 1, 1);
    const map = new THREE.TextureLoader().load(path);
    map.minFilter = THREE.LinearFilter;
    map.magFilter = THREE.LinearFilter;

    const material = new THREE.MeshBasicMaterial({ map, transparent: true });
    material.opacity = this.transparency;

    return new THREE.Mesh(geometry, material);
  }
  createSphereInstancedMeshes() {
    let meshes = {};
    for (let measureVariant of allMeasureVariants) {
      for (let colorName of measureVariant.colorNames) {
        const path = this.getTexturePath(measureVariant.systemType, colorName);
        meshes[path] = this.createMeasureInstancedMesh(path);
        for (let subSystemType of measureVariant.subSystemType) {
          const path = this.getTexturePath(measureVariant.systemType, colorName, subSystemType);
          meshes[path] = this.createMeasureInstancedMesh(path);
        }
      }
    }
    return meshes;
  }

  addMarker(point) {
    if (point.x != null) {
      point = { position: point };
    } else if (point instanceof Array) {
      point = { position: new THREE.Vector3(...point) };
    }
    this.points.push(point);

    // sphere
    let sphere = this.createMeasureInstancedMesh(this.getTexturePath(this.systemType, this.colorName, this.subSystemType));

    this.add(sphere);
    this.spheres.push(sphere);

    {
      // edges
      let geometry = new THREE.Geometry();
      let material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: this.color, transparent: true, opacity: 0.2 });
      let lineGeometry = new LineGeometry();
      lineGeometry.setPositions([0, 0, 0, 0, 0, 0]);

      let lineMaterial = new LineMaterial({
        color: this.color,
        linewidth: 2,
        resolution: new THREE.Vector2(1000, 1000),
        transparent: true,
      });

      // lineMaterial.depthTest = false;

      let edge = new Line2(lineGeometry, lineMaterial);
      edge.visible = true;
      edge.material.uniforms.opacity.value = this.transparency;

      this.add(edge);
      this.edges.push(edge);

      var mesh = new THREE.Mesh(geometry, material);
      if (this.meshArea && this.meshArea.geometry) {
        this.meshArea.geometry.faces = [];
        this.meshArea.geometry.vertices = [];
        this.meshArea.geometry.verticesNeedUpdate = true;
        this.meshArea.geometry.elementsNeedUpdate = true;
      }
      this.add(mesh);
      this.meshArea = mesh;
    }

    let rgbColor = Utils.hexToRgb('#000000');
    {
      // edge labels
      let edgeLabel = new TextSprite();
      if (rgbColor) {
        edgeLabel.setBorderColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 0.8 });
        edgeLabel.setBackgroundColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 0.8 });
        edgeLabel.setTextColor({ r: 255, g: 255, b: 255, a: 1.0 });
      }
      // edgeLabel.material.depthTest = false;
      edgeLabel.fontsize = 16;
      edgeLabel.material.opacity = this.transparency;
      edgeLabel.visible = false;
      this.edgeLabels.push(edgeLabel);
      this.add(edgeLabel);
    }

    {
      // angle labels
      let angleLabel = new TextSprite();
      if (rgbColor) {
        angleLabel.setBorderColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 0.8 });
        angleLabel.setBackgroundColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 0.8 });
        angleLabel.setTextColor({ r: 255, g: 255, b: 255, a: 1.0 });
      }
      angleLabel.fontsize = 16;
      // angleLabel.material.depthTest = false;
      angleLabel.material.opacity = this.transparency;
      angleLabel.visible = false;
      this.angleLabels.push(angleLabel);
      this.add(angleLabel);
    }

    {
      // coordinate labels
      let coordinateLabel = new TextSprite();
      if (rgbColor) {
        coordinateLabel.setBorderColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 0.6 });
        coordinateLabel.setBackgroundColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 0.6 });
        coordinateLabel.setTextColor({ r: 255, g: 255, b: 255, a: 1.0 });
      }
      coordinateLabel.fontsize = 16;
      // coordinateLabel.material.depthTest = false;
      coordinateLabel.material.opacity = this.transparency;
      coordinateLabel.visible = false;
      this.coordinateLabels.push(coordinateLabel);
      this.add(coordinateLabel);
    }

    {
      // measure labels
      let measureLabel = new TextSprite();
      if (rgbColor) {
        measureLabel.setBorderColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 0 });
        measureLabel.setBackgroundColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 0 });
        measureLabel.setTextColor({ r: 255, g: 255, b: 255, a: 1.0 });
      }
      measureLabel.fontsize = 16;
      measureLabel.material.depthTest = false;
      measureLabel.material.opacity = this.transparency;
      measureLabel.visible = false;
      this.measureLabels.push(measureLabel);
      this.add(measureLabel);
    }

    {
      // area label
      this.areaLabel.setBorderColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 0.8 });
      this.areaLabel.setBackgroundColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b, a: 0.8 });
      this.areaLabel.material.opacity = this.transparency;
    }

    {
      // Event Listeners
      let drag = (e) => {
        let I = Utils.getMousePointCloudIntersection(e.drag.end, e.viewer.scene.getActiveCamera(), e.viewer, e.viewer.scene.pointclouds, { pickClipped: true });

        if (I && this.enableMove) {
          let i = this.spheres.indexOf(e.drag.object);
          if (i !== -1) {
            let point = this.points[i];

            // loop through current keys and cleanup ones that will be orphaned
            for (let key of Object.keys(point)) {
              if (!I.point[key]) {
                delete point[key];
              }
            }

            for (let key of Object.keys(I.point).filter((e) => e !== 'position')) {
              point[key] = I.point[key];
            }

            this.setPosition(i, I.location);
          }
        }
      };

      let drop = (e) => {
        let i = this.spheres.indexOf(e.drag.object);
        if (i !== -1) {
          this.dispatchEvent({
            type: 'marker_dropped',
            measurement: this,
            index: i,
          });
        }
      };

      let mouseover = (e) => {
        let i = this.spheres.indexOf(e.target);
        this.hovered = true;

        this.dispatchEvent({
          type: 'marker_mouseover',
          measurement: this,
          index: i,
        });
      };

      let mouseleave = (e) => {
        let i = this.spheres.indexOf(e.target);
        this.hovered = false;

        this.dispatchEvent({
          type: 'marker_mouseleave',
          measurement: this,
          index: i,
        });
      };

      let mouseclick = (e) => {
        let i = this.spheres.indexOf(e.target);
        if (i !== -1) {
          this.dispatchEvent({
            type: 'marker_clicked',
            measurement: this,
            index: i,
          });
          e.consume();
        }
      };

      sphere.addEventListener('drag', drag);
      sphere.addEventListener('drop', drop);
      sphere.addEventListener('mouseover', mouseover);
      sphere.addEventListener('mouseleave', mouseleave);
      sphere.addEventListener('mousedown', mouseclick);
    }

    let event = {
      type: 'marker_added',
      measurement: this,
      sphere: sphere,
    };
    this.dispatchEvent(event);

    this.setMarker(this.points.length - 1, point);
  }

  removeMarker(index) {
    this.points.splice(index, 1);

    this.remove(this.spheres[index]);

    let edgeIndex = index === 0 ? 0 : index - 1;
    this.remove(this.edges[edgeIndex]);
    this.edges.splice(edgeIndex, 1);

    this.remove(this.edgeLabels[edgeIndex]);
    this.edgeLabels.splice(edgeIndex, 1);
    this.coordinateLabels.splice(index, 1);
    this.measureLabels.splice(index, 1);

    this.remove(this.angleLabels[index]);
    this.angleLabels.splice(index, 1);

    this.spheres.splice(index, 1);

    this.update();

    this.dispatchEvent({ type: 'marker_removed', measurement: this });
  }

  setMarker(index, point) {
    this.points[index] = point;

    let event = {
      type: 'marker_moved',
      measure: this,
      index: index,
      position: point.position.clone(),
    };
    this.dispatchEvent(event);

    this.update();
  }

  setPosition(index, position) {
    let point = this.points[index];
    point.position.copy(position);

    let event = {
      type: 'marker_moved',
      measure: this,
      index: index,
      position: position.clone(),
    };
    this.dispatchEvent(event);

    this.update();
  }

  getArea() {
    let area = 0;
    let j = this.points.length - 1;

    for (let i = 0; i < this.points.length; i++) {
      let p1 = this.points[i].position;
      let p2 = this.points[j].position;
      area += (p2.x + p1.x) * (p1.y - p2.y);
      j = i;
    }

    return Math.abs(area / 2);
  }

  getTotalDistance() {
    if (this.points.length === 0) {
      return 0;
    }

    let distance = 0;

    for (let i = 1; i < this.points.length; i++) {
      let prev = this.points[i - 1].position;
      let curr = this.points[i].position;
      let d = prev.distanceTo(curr);

      distance += d;
    }

    if (this.closed && this.points.length > 1) {
      let first = this.points[0].position;
      let last = this.points[this.points.length - 1].position;
      let d = last.distanceTo(first);

      distance += d;
    }

    return distance;
  }

  getAngleBetweenLines(cornerPoint, point1, point2) {
    let v1 = new THREE.Vector3().subVectors(point1.position, cornerPoint.position);
    let v2 = new THREE.Vector3().subVectors(point2.position, cornerPoint.position);

    // avoid the error printed by threejs if denominator is 0
    const denominator = Math.sqrt(v1.lengthSq() * v2.lengthSq());
    if (denominator === 0) {
      return 0;
    } else {
      return v1.angleTo(v2);
    }
  }

  getAngle(index) {
    if (this.points.length < 3 || index >= this.points.length) {
      return 0;
    }

    let previous = index === 0 ? this.points[this.points.length - 1] : this.points[index - 1];
    let point = this.points[index];
    let next = this.points[(index + 1) % this.points.length];

    return this.getAngleBetweenLines(point, previous, next);
  }

  // updateAzimuth(){
  // 	// if(this.points.length !== 2){
  // 	// 	return;
  // 	// }

  // 	// const azimuth = this.azimuth;

  // 	// const [p0, p1] = this.points;

  // 	// const r = p0.position.distanceTo(p1.position);

  // }

  update() {
    if (this.points.length === 0) {
      return;
    } else if (this.points.length === 1) {
      let point = this.points[0];
      let position = point.position;
      this.spheres[0].position.copy(position);
      this.spheres[0].material.opacity = this.transparency;

      {
        // coordinate labels
        let coordinateLabel = this.coordinateLabels[0];

        let msg = position
          .toArray()
          .map((p) => Utils.addCommas(p.toFixed(2)))
          .join(' / ');
        coordinateLabel.setText(this.coordinatesText || msg);

        coordinateLabel.material.opacity = this.transparency;
      }

      {
        // measure labels
        let measureLabel = this.measureLabels[0];
        measureLabel.setText(this.measureText);

        measureLabel.material.opacity = this.transparency;
      }

      return;
    }

    let lastIndex = this.points.length - 1;

    let centroid = new THREE.Vector3();
    for (let i = 0; i <= lastIndex; i++) {
      let point = this.points[i];
      centroid.add(point.position);
    }
    centroid.divideScalar(this.points.length);

    for (let i = 0; i <= lastIndex; i++) {
      let index = i;
      let nextIndex = i + 1 > lastIndex ? 0 : i + 1;
      let previousIndex = i === 0 ? lastIndex : i - 1;

      let point = this.points[index];
      let nextPoint = this.points[nextIndex];
      let previousPoint = this.points[previousIndex];

      let sphere = this.spheres[index];

      // spheres
      sphere.position.copy(point.position);
      sphere.material.color = this.color;
      sphere.material.opacity = this.transparency;

      {
        // edges
        let edge = this.edges[index];

        edge.material.color = this.color;
        edge.material.uniforms.opacity.value = this.transparency;

        edge.position.copy(point.position);

        edge.geometry.setPositions([0, 0, 0, ...nextPoint.position.clone().sub(point.position).toArray()]);

        edge.geometry.verticesNeedUpdate = true;
        edge.geometry.computeBoundingSphere();
        edge.computeLineDistances();
        edge.visible = index < lastIndex || this.closed;
        if (!this.showEdges) {
          edge.visible = false;
        }
      }

      {
        // edge labels
        let edgeLabel = this.edgeLabels[i];

        let center = new THREE.Vector3().add(point.position);
        center.add(nextPoint.position);
        center = center.multiplyScalar(0.5);
        let distance = point.position.distanceTo(nextPoint.position);

        edgeLabel.position.copy(center);

        let suffix = '';
        if (this.lengthUnit != null && this.lengthUnitDisplay != null) {
          distance = (distance / this.lengthUnit.unitspermeter) * this.lengthUnitDisplay.unitspermeter; //convert to meters then to the display unit
          suffix = this.lengthUnitDisplay.code;
        }

        let txtLength = Utils.addCommas(distance.toFixed(2));
        edgeLabel.setText(`${txtLength} ${suffix}`);
        edgeLabel.visible = this.showDistances && (index < lastIndex || this.closed) && this.points.length >= 2 && distance > 0;
        edgeLabel.material.opacity = this.transparency;
      }

      {
        // angle labels
        let angleLabel = this.angleLabels[i];
        let angle = this.getAngleBetweenLines(point, previousPoint, nextPoint);

        let dir = nextPoint.position.clone().sub(previousPoint.position);
        dir.multiplyScalar(0.5);
        dir = previousPoint.position.clone().add(dir).sub(point.position).normalize();

        let dist = Math.min(point.position.distanceTo(previousPoint.position), point.position.distanceTo(nextPoint.position));
        dist = dist / 9;

        let labelPos = point.position.clone().add(dir.multiplyScalar(dist));
        angleLabel.position.copy(labelPos);

        let msg = Utils.addCommas((angle * (180.0 / Math.PI)).toFixed(1)) + '\u00B0';
        angleLabel.setText(msg);

        angleLabel.visible = this.showAngles && (index < lastIndex || this.closed) && this.points.length >= 3 && angle > 0;
        angleLabel.material.opacity = this.transparency;
      }
    }

    {
      // update area mesh
      if (this.points.length > 3 && this.showArea) {
        this.meshArea.geometry.faces = [];
        this.meshArea.geometry.elementsNeedUpdate = true;
        if (this.meshArea.geometry.vertices && this.meshArea.geometry.vertices.length > 2) {
          var triangles = THREE.ShapeUtils.triangulateShape(this.meshArea.geometry.vertices, []);
          for (var i = 0; i < triangles.length; i++) {
            this.meshArea.geometry.faces.push(new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2]));
          }
        }
        this.meshArea.geometry.vertices = this.points.map((point) => point.position);
        this.meshArea.geometry.mergeVertices();
        this.meshArea.geometry.verticesNeedUpdate = true;
        this.meshArea.geometry.elementsNeedUpdate = true;
      }
    }

    {
      // update circle
      let circle = this.circleMesh;
      circle.visible = this.showCircle;

      if (this.showCircle) {
        circle.material.color = this.color;

        let sorted = this.points.slice().sort((a, b) => a.position.z - b.position.z);
        let lowPoint = sorted[0].position.clone();
        let highPoint = sorted[sorted.length - 1].position.clone();

        let distance = lowPoint.distanceTo(new THREE.Vector3(highPoint.x, highPoint.y, lowPoint.z));

        // let newGeometry = new THREE.CircleGeometry(distance, 32)
        // circle.geometry.dispose();
        // circle.geometry = newGeometry;
        const scale = distance / 1;
        circle.scale.set(scale, scale, scale);
        circle.position.copy(this.points[0].position);

        circle.geometry.verticesNeedUpdate = true;
        circle.geometry.computeBoundingBox();
        circle.geometry.computeBoundingSphere();
      }
    }

    {
      // update height stuff
      let heightEdge = this.heightEdge;
      heightEdge.visible = this.showHeight;
      heightEdge.material.uniforms.opacity.value = this.transparency;
      this.heightLabel.visible = this.showHeight;
      this.heightLabel.material.opacity = this.transparency;

      if (this.showHeight) {
        let sorted = this.points.slice().sort((a, b) => a.position.z - b.position.z);
        let lowPoint = sorted[0].position.clone();
        let highPoint = sorted[sorted.length - 1].position.clone();
        let min = lowPoint.z;
        let max = highPoint.z;

        let start = new THREE.Vector3(highPoint.x, highPoint.y, min);
        let end = new THREE.Vector3(highPoint.x, highPoint.y, max);

        let height = this.showCircle ? new THREE.Vector3(lowPoint.x, lowPoint.y, lowPoint.z).distanceTo(start) : max - min;

        let heightLabelPosition = new THREE.Vector3(0, 0, 0);

        if (this.showCircle && highPoint.equals(this.points[0].position)) {
          start = new THREE.Vector3(lowPoint.x, lowPoint.y, min);
          end = new THREE.Vector3(lowPoint.x, lowPoint.y, max);
          heightEdge.position.copy(highPoint);

          heightEdge.geometry.setPositions([0, 0, 0, ...end.clone().sub(highPoint).toArray(), ...end.clone().sub(highPoint).toArray(), ...start.clone().sub(highPoint).toArray()]);

          heightEdge.geometry.verticesNeedUpdate = true;
          // heightEdge.geometry.computeLineDistances();
          // heightEdge.geometry.lineDistancesNeedUpdate = true;
          heightEdge.geometry.computeBoundingSphere();
          heightEdge.computeLineDistances();
          // heightEdge.material.dashSize = height / 40;
          // heightEdge.material.gapSize = height / 40;
          heightLabelPosition = highPoint.clone().add(end).multiplyScalar(0.5);
        } else {
          heightEdge.position.copy(lowPoint);
          heightEdge.geometry.setPositions([0, 0, 0, ...start.clone().sub(lowPoint).toArray(), ...start.clone().sub(lowPoint).toArray(), ...end.clone().sub(lowPoint).toArray()]);
          heightEdge.geometry.verticesNeedUpdate = true;
          // heightEdge.geometry.computeLineDistances();
          // heightEdge.geometry.lineDistancesNeedUpdate = true;
          heightEdge.geometry.computeBoundingSphere();
          heightEdge.computeLineDistances();
          // heightEdge.material.dashSize = height / 40;
          // heightEdge.material.gapSize = height / 40;
          heightLabelPosition = this.showCircle ? lowPoint.clone().add(start).multiplyScalar(0.5) : start.clone().add(end).multiplyScalar(0.5);
        }
        this.heightLabel.position.copy(heightLabelPosition);

        let suffix = '';
        if (this.lengthUnit != null && this.lengthUnitDisplay != null) {
          height = (height / this.lengthUnit.unitspermeter) * this.lengthUnitDisplay.unitspermeter; //convert to meters then to the display unit
          suffix = this.lengthUnitDisplay.code;
        }

        let txtHeight = Utils.addCommas(height.toFixed(2));
        let msg = `${txtHeight} ${suffix}`;
        this.heightLabel.setText(msg);
      }
    }

    {
      // update circle stuff
      // const circleRadiusLabel = this.circleRadiusLabel;
      // const circleRadiusLine = this.circleRadiusLine;
      // const circleLine = this.circleLine;
      // const circleCenter = this.circleCenter;
      // const circleOkay = this.points.length === 3;
      // circleRadiusLabel.visible = this.showCircle && circleOkay;
      // circleRadiusLine.visible = this.showCircle && circleOkay;
      // circleLine.visible = this.showCircle && circleOkay;
      // circleCenter.visible = this.showCircle && circleOkay;
      // if(this.showCircle && circleOkay){
      // 	const A = this.points[0].position;
      // 	const B = this.points[1].position;
      // 	const C = this.points[2].position;
      // 	const AB = B.clone().sub(A);
      // 	const AC = C.clone().sub(A);
      // 	const N = AC.clone().cross(AB).normalize();
      // 	const center = Utils.computeCircleCenter(A, B, C);
      // 	const radius = center.distanceTo(A);
      // 	const scale = radius / 20;
      // 	circleCenter.position.copy(center);
      // 	circleCenter.scale.set(scale, scale, scale);
      // 	//circleRadiusLine.geometry.vertices[0].set(0, 0, 0);
      // 	//circleRadiusLine.geometry.vertices[1].copy(B.clone().sub(center));
      // 	circleRadiusLine.geometry.setPositions( [
      // 		0, 0, 0,
      // 		...B.clone().sub(center).toArray()
      // 	] );
      // 	circleRadiusLine.geometry.verticesNeedUpdate = true;
      // 	circleRadiusLine.geometry.computeBoundingSphere();
      // 	circleRadiusLine.position.copy(center);
      // 	circleRadiusLine.computeLineDistances();
      // 	const target = center.clone().add(N);
      // 	circleLine.position.copy(center);
      // 	circleLine.scale.set(radius, radius, radius);
      // 	circleLine.lookAt(target);
      // 	circleRadiusLabel.visible = true;
      // 	circleRadiusLabel.position.copy(center.clone().add(B).multiplyScalar(0.5));
      // 	circleRadiusLabel.setText(`${radius.toFixed(3)}`);
      // }
    }

    {
      // update area label
      this.areaLabel.position.copy(centroid);
      this.areaLabel.visible = this.showArea && this.points.length >= 3;
      this.areaLabel.material.opacity = this.transparency;
      let area = this.getArea();

      let suffix = '';
      if (this.lengthUnit != null && this.lengthUnitDisplay != null) {
        area = (area / Math.pow(this.lengthUnit.unitspermeter, 2)) * Math.pow(this.lengthUnitDisplay.unitspermeter, 2); //convert to square meters then to the square display unit
        suffix = this.lengthUnitDisplay.code;
      }

      let txtArea = Utils.addCommas(area.toFixed(1));
      let msg = `${txtArea} ${suffix}\u00B2`;
      this.areaLabel.setText(this.systemType === 'None' ? this.coordinatesText : msg);
    }

    // this.updateAzimuth();
  }

  raycast(raycaster, intersects) {
    for (let i = 0; i < this.points.length; i++) {
      let sphere = this.spheres[i];

      sphere.raycast(raycaster, intersects);
    }

    // recalculate distances because they are not necessarely correct
    // for scaled objects.
    // see https://github.com/mrdoob/three.js/issues/5827
    // TODO: remove this once the bug has been fixed
    for (let i = 0; i < intersects.length; i++) {
      let I = intersects[i];
      I.distance = raycaster.ray.origin.distanceTo(I.point);
    }
    intersects.sort(function (a, b) {
      return a.distance - b.distance;
    });
  }

  get showCoordinates() {
    return this._showCoordinates;
  }

  set showCoordinates(value) {
    this._showCoordinates = value;
    this.update();
  }

  get selected() {
    return this._selected;
  }

  set selected(value) {
    if (this.systemType === SystemType.cluster) {
      // Clusters cannot be selected
      return;
    }
    this._selected = value;
    if (value) {
      this.transparency = MeasurementTransparancy.SOLID;
    } else {
      this.transparency = MeasurementTransparancy.MEDIUM;
    }
  }
  get hovered() {
    return this._hovered;
  }

  set hovered(value) {
    if (this.systemType === SystemType.cluster) {
      // Clusters don't have hover state
      return;
    }
    this._hovered = value;
    if (value) {
      previousTransparency = this.transparency;
      this.transparency = MeasurementTransparancy.SOLID;
    } else if (!this.selected && previousTransparency) {
      this.transparency = previousTransparency;
    }
  }

  get transparency() {
    return this._transparency;
  }

  set transparency(value) {
    this._transparency = value;
    this.update();
  }

  get showMeasureText() {
    return this._showMeasureText;
  }

  set showMeasureText(value) {
    this._showMeasureText = value;
    this.update();
  }

  get showAngles() {
    return this._showAngles;
  }

  set showAngles(value) {
    this._showAngles = value;
    this.update();
  }

  get showCircle() {
    return this._showCircle;
  }

  set showCircle(value) {
    this._showCircle = value;
    this.update();
  }

  get showAzimuth() {
    return this._showAzimuth;
  }

  set showAzimuth(value) {
    this._showAzimuth = value;
    this.update();
  }

  get showEdges() {
    return this._showEdges;
  }

  set showEdges(value) {
    this._showEdges = value;
    this.update();
  }

  get showHeight() {
    return this._showHeight;
  }

  set showHeight(value) {
    this._showHeight = value;
    this.update();
  }

  get showArea() {
    return this._showArea;
  }

  set showArea(value) {
    this._showArea = value;
    this.update();
  }

  get closed() {
    return this._closed;
  }

  set closed(value) {
    this._closed = value;
    this.update();
  }

  get showDistances() {
    return this._showDistances;
  }

  set showDistances(value) {
    this._showDistances = value;
    this.update();
  }

  get enableMove() {
    return this._enableMove;
  }

  set enableMove(value) {
    this._enableMove = value;
  }
}
