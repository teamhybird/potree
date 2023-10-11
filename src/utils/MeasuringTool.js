import * as THREE from '../../libs/three.js/build/three.module.js';
import { Measure } from './Measure.js';
import { Utils } from '../utils.js';
import { CameraMode, SystemType } from '../defines.js';
import { EventDispatcher } from '../EventDispatcher.js';

function updateAzimuth(viewer, measure) {
  const azimuth = measure.azimuth;

  const isOkay = measure.points.length === 2;

  azimuth.node.visible = isOkay && measure.showAzimuth;

  if (!azimuth.node.visible) {
    return;
  }

  const camera = viewer.scene.getActiveCamera();
  const renderAreaSize = viewer.renderer.getSize(new THREE.Vector2());
  const width = renderAreaSize.width;
  const height = renderAreaSize.height;

  const [p0, p1] = measure.points;
  const r = p0.position.distanceTo(p1.position);
  const northVec = Utils.getNorthVec(p0.position, r, viewer.getProjection());
  const northPos = p0.position.clone().add(northVec);

  azimuth.center.position.copy(p0.position);
  azimuth.center.scale.set(2, 2, 2);

  azimuth.center.visible = false;
  // azimuth.target.visible = false;

  {
    // north
    azimuth.north.position.copy(northPos);
    azimuth.north.scale.set(2, 2, 2);

    let distance = azimuth.north.position.distanceTo(camera.position);
    let pr = Utils.projectedRadius(1, camera, distance, width, height);

    let scale = 5 / pr;
    azimuth.north.scale.set(scale, scale, scale);
  }

  {
    // target
    azimuth.target.position.copy(p1.position);
    azimuth.target.position.z = azimuth.north.position.z;

    let distance = azimuth.target.position.distanceTo(camera.position);
    let pr = Utils.projectedRadius(1, camera, distance, width, height);

    let scale = 5 / pr;
    azimuth.target.scale.set(scale, scale, scale);
  }

  azimuth.circle.position.copy(p0.position);
  azimuth.circle.scale.set(r, r, r);
  azimuth.circle.material.resolution.set(width, height);

  // to target
  azimuth.centerToTarget.geometry.setPositions([0, 0, 0, ...p1.position.clone().sub(p0.position).toArray()]);
  azimuth.centerToTarget.position.copy(p0.position);
  azimuth.centerToTarget.geometry.verticesNeedUpdate = true;
  azimuth.centerToTarget.geometry.computeBoundingSphere();
  azimuth.centerToTarget.computeLineDistances();
  azimuth.centerToTarget.material.resolution.set(width, height);

  // to target ground
  azimuth.centerToTargetground.geometry.setPositions([0, 0, 0, p1.position.x - p0.position.x, p1.position.y - p0.position.y, 0]);
  azimuth.centerToTargetground.position.copy(p0.position);
  azimuth.centerToTargetground.geometry.verticesNeedUpdate = true;
  azimuth.centerToTargetground.geometry.computeBoundingSphere();
  azimuth.centerToTargetground.computeLineDistances();
  azimuth.centerToTargetground.material.resolution.set(width, height);

  // to north
  azimuth.centerToNorth.geometry.setPositions([0, 0, 0, northPos.x - p0.position.x, northPos.y - p0.position.y, 0]);
  azimuth.centerToNorth.position.copy(p0.position);
  azimuth.centerToNorth.geometry.verticesNeedUpdate = true;
  azimuth.centerToNorth.geometry.computeBoundingSphere();
  azimuth.centerToNorth.computeLineDistances();
  azimuth.centerToNorth.material.resolution.set(width, height);

  // label
  const radians = Utils.computeAzimuth(p0.position, p1.position, viewer.getProjection());
  let degrees = THREE.Math.radToDeg(radians);
  if (degrees < 0) {
    degrees = 360 + degrees;
  }
  const txtDegrees = `${degrees.toFixed(2)}°`;
  const labelDir = northPos.clone().add(p1.position).multiplyScalar(0.5).sub(p0.position);
  if (labelDir.length() > 0) {
    labelDir.z = 0;
    labelDir.normalize();
    const labelVec = labelDir.clone().multiplyScalar(r);
    const labelPos = p0.position.clone().add(labelVec);
    azimuth.label.position.copy(labelPos);
  }
  azimuth.label.setText(txtDegrees);
  let distance = azimuth.label.position.distanceTo(camera.position);
  let pr = Utils.projectedRadius(1, camera, distance, width, height);
  let scale = 70 / pr;
  azimuth.label.scale.set(scale, scale, scale);
}

export class MeasuringTool extends EventDispatcher {
  constructor(viewer) {
    super();

    this.viewer = viewer;
    this.renderer = viewer.renderer;

    this.addEventListener('start_inserting_measurement', (e) => {
      this.viewer.dispatchEvent({
        type: 'cancel_insertions',
      });
    });

    this.showLabels = true;
    this.scene = new THREE.Scene();
    this.scene.name = 'scene_measurement';
    this.light = new THREE.PointLight(0xffffff, 1.0);
    this.scene.add(this.light);

    this.viewer.inputHandler.registerInteractiveScene(this.scene);

    this.onRemove = (e) => {
      this.scene.remove(e.measurement);
      // Dispose
      if (e.measurement.geometry) {
        e.measurement.geometry.dispose();
      }

      if (e.measurement.material) {
        if (e.measurement.material.length) {
          for (let i = 0; i < e.measurement.material.length; ++i) {
            e.measurement.material[i].dispose();
          }
        } else {
          e.measurement.material.dispose();
        }
      }
    };
    this.onAdd = (e) => {
      this.scene.add(e.measurement);
    };

    for (let measurement of viewer.scene.measurements) {
      this.onAdd({ measurement: measurement });
    }

    viewer.addEventListener('update', this.update.bind(this));
    viewer.addEventListener('render.pass.perspective_overlay', this.render.bind(this));
    viewer.addEventListener('scene_changed', this.onSceneChange.bind(this));

    viewer.scene.addEventListener('measurement_added', this.onAdd);
    viewer.scene.addEventListener('measurement_removed', this.onRemove);
  }

  onSceneChange(e) {
    if (e.oldScene) {
      e.oldScene.removeEventListener('measurement_added', this.onAdd);
      e.oldScene.removeEventListener('measurement_removed', this.onRemove);
    }

    e.scene.addEventListener('measurement_added', this.onAdd);
    e.scene.addEventListener('measurement_removed', this.onRemove);
  }

  startInsertion(args = {}) {
    let domElement = this.viewer.renderer.domElement;

    let measure = new Measure();
    measure.isInserting = true;
    measure.enableMove = true;

    this.dispatchEvent({
      type: 'start_inserting_measurement',
      measure: measure,
    });

    const pick = (defaul, alternative) => {
      if (defaul != null) {
        return defaul;
      } else {
        return alternative;
      }
    };

    let configureMeasure = (args = {}) => {
      measure.showDistances = args.showDistances === null ? true : args.showDistances;
      measure.showArea = pick(args.showArea, false);
      measure.showAngles = pick(args.showAngles, false);
      measure.showCoordinates = pick(args.showCoordinates, false);
      measure.measureText = pick(args.measureText, '');
      measure.showMeasureText = pick(args.showMeasureText, false);
      measure.showHeight = pick(args.showHeight, false);
      measure.showCircle = pick(args.showCircle, false);
      measure.closed = pick(args.closed, false);
      measure.showEdges = pick(args.showEdges, true);
      measure.maxMarkers = pick(args.maxMarkers, Infinity);
      measure.name = args.name || 'Measurement';
      measure.colorName = pick(args.colorName, 'green');
      measure.systemType = pick(args.systemType, SystemType.none);
      measure.subSystemType = pick(args.subSystemType, null);
      measure.enableMove = pick(args.enableMove, true);
    };

    configureMeasure(args);

    this.scene.add(measure);

    let cancel = {
      removeLastMarker: measure.maxMarkers > 3,
      callback: null,
    };

    let mouseMoved = false;
    let insertionCallback = (e) => {
      if (!mouseMoved) {
        if (e.button === THREE.MOUSE.LEFT) {
          measure.addMarker(measure.points[measure.points.length - 1].position.clone());

          if (measure.points.length > measure.maxMarkers) {
            cancel.callback(null, true);
          }

          if (measure.maxMarkers !== 1) {
            this.viewer.inputHandler.startDragging(measure.spheres[measure.spheres.length - 1]);
          }
        } else if (e.button === THREE.MOUSE.RIGHT || e.key === 'Escape') {
          if (measure.points.length <= 2) {
            configureMeasure({
              showDistances: false,
              showAngles: false,
              showCoordinates: true,
              showEdges: false,
              showArea: false,
              closed: true,
              maxMarkers: 1,
              name: 'Point',
            });
          }
          cancel.callback(null, true);
        }
      } else {
        this.viewer.inputHandler.startDragging(measure.spheres[measure.spheres.length - 1]);
      }
      domElement.removeEventListener('mousemove', mouseMove);
      mouseMoved = false;
      measure.enableMove = true;
    };

    let doubleClick = (e) => {
      measure.removeMarker(measure.points.length - 1);
      cancel.callback();
    };

    let mouseMove = (e) => {
      mouseMoved = true;
      measure.enableMove = false;

      domElement.removeEventListener('mousemove', mouseMove);
    };

    let mouseDown = (e) => {
      domElement.addEventListener('mousemove', mouseMove);
    };

    cancel.callback = (e, isCanceled = false) => {
      if (cancel.removeLastMarker || isCanceled) {
        measure.removeMarker(measure.points.length - 1);
      }
      this.dispatchEvent({
        type: 'finish_inserting_measurement',
        measure: measure,
      });
      measure.isInserting = false;
      domElement.removeEventListener('mouseup', insertionCallback, false);
      document.removeEventListener('keyup', insertionCallback, true);
      domElement.removeEventListener('mousedown', mouseDown, true);
      domElement.removeEventListener('dblclick', doubleClick, true);
      this.viewer.removeEventListener('cancel_insertions', cancel.callback);
      this.viewer.removeEventListener('cancel_all_insertions', (e) => cancel.callback(e, true));
    };

    if (measure.maxMarkers > 1) {
      this.viewer.addEventListener('cancel_insertions', cancel.callback);
      this.viewer.addEventListener('cancel_all_insertions', (e) => cancel.callback(e, true));
      domElement.addEventListener('mouseup', insertionCallback, false);
      document.addEventListener('keyup', insertionCallback, true);
      domElement.addEventListener('mousedown', mouseDown, true);
      domElement.addEventListener('dblclick', doubleClick, true);
    } else if (measure.maxMarkers === 1) {
      domElement.addEventListener('mouseup', insertionCallback, false);
      document.addEventListener('keyup', insertionCallback, true);
      domElement.addEventListener('mousedown', mouseDown, true);
      this.viewer.addEventListener('cancel_all_insertions', (e) => cancel.callback(e, true));
    }

    measure.addMarker(new THREE.Vector3(0, 0, 0));
    this.viewer.inputHandler.startDragging(measure.spheres[measure.spheres.length - 1]);

    this.viewer.scene.addMeasurement(measure);

    return measure;
  }

  getMeasurePointSize(systemType) {
    let size = 15;
    switch (systemType) {
      case SystemType.measurement:
        size = 15;
        break;
      case SystemType.cluster:
        size = 25;
        break;
      case SystemType.defect:
        size = 20;
        break;
      case SystemType.component:
        size = 20;
        break;
      case SystemType.inspect:
        size = 20;
        break;
      default:
        size = 15;
        break;
    }
    return size;
  }

  update() {
    let camera = this.viewer.scene.getActiveCamera();
    let measurements = this.viewer.scene.measurements;
    let images360 = this.viewer.scene.images360;

    const renderAreaSize = this.renderer.getSize(new THREE.Vector2());
    let clientWidth = renderAreaSize.width;
    let clientHeight = renderAreaSize.height;

    this.light.position.copy(camera.position);

    // make size independant of distance
    for (let measure of measurements) {
      measure.lengthUnit = this.viewer.lengthUnit;
      measure.lengthUnitDisplay = this.viewer.lengthUnitDisplay;
      measure.update();

      updateAzimuth(this.viewer, measure);

      // spheres
      for (let sphere of measure.spheres) {
        let distance = camera.position.distanceTo(sphere.getWorldPosition(new THREE.Vector3()));
        let pr = Utils.projectedRadius(1, camera, distance, clientWidth, clientHeight);
        let scale = this.getMeasurePointSize(measure.systemType) / pr;
        sphere.scale.set(scale, scale, scale);
        sphere.quaternion.copy(camera.quaternion);
      }

      // labels
      let labels = measure.edgeLabels.concat(measure.angleLabels);
      for (let label of labels) {
        let distance = camera.position.distanceTo(label.getWorldPosition(new THREE.Vector3()));
        let pr = Utils.projectedRadius(1, camera, distance, clientWidth, clientHeight);
        let scale = 70 / pr;

        if (Potree.debug.scale) {
          scale = Potree.debug.scale / pr;
        }

        label.scale.set(scale, scale, scale);
      }

      // coordinate labels
      for (let j = 0; j < measure.coordinateLabels.length; j++) {
        let label = measure.coordinateLabels[j];
        let sphere = measure.spheres[j];

        let distance = camera.position.distanceTo(sphere.getWorldPosition(new THREE.Vector3()));

        let screenPos = sphere.getWorldPosition(new THREE.Vector3()).clone().project(camera);
        screenPos.x = Math.round(((screenPos.x + 1) * clientWidth) / 2);
        screenPos.y = Math.round(((-screenPos.y + 1) * clientHeight) / 2);
        screenPos.z = 0;
        screenPos.y += 40;
        const frustum = new THREE.Frustum();
        const matrix = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
        frustum.setFromProjectionMatrix(matrix);
        label.visible = measure.showCoordinates && frustum.containsPoint(sphere.position);
        // if (images360 && images360[0] && images360[0].view360Enabled) {
        //   const I = Utils.getMousePointCloudIntersection(screenPos, camera, this.viewer, this.viewer.scene.pointclouds, { pickClipped: true });
        //   if (I) {
        //     const d = sphere.getWorldPosition(new THREE.Vector3()).clone().distanceTo(I.location);
        //     sphere.visible = d < 1;
        //     label.visible = label.visible && d < 1;
        //   }
        // }

        let labelPos = new THREE.Vector3((screenPos.x / clientWidth) * 2 - 1, -(screenPos.y / clientHeight) * 2 + 1, 0.5);
        labelPos.unproject(camera);
        if (this.viewer.scene.cameraMode === CameraMode.PERSPECTIVE) {
          let direction = labelPos.sub(camera.position).normalize();
          labelPos = new THREE.Vector3().addVectors(camera.position, direction.multiplyScalar(distance));
        }
        label.position.copy(labelPos);
        let pr = Utils.projectedRadius(1, camera, distance, clientWidth, clientHeight);
        let scale = 70 / pr;
        label.scale.set(scale, scale, scale);
      }

      // measure labels
      for (let j = 0; j < measure.measureLabels.length; j++) {
        let label = measure.measureLabels[j];
        let sphere = measure.spheres[j];

        const frustum = new THREE.Frustum();
        const matrix = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
        frustum.setFromProjectionMatrix(matrix);
        label.visible = measure.showMeasureText && frustum.containsPoint(sphere.position);

        let distance = camera.position.distanceTo(sphere.getWorldPosition(new THREE.Vector3()));

        let screenPos = sphere.getWorldPosition(new THREE.Vector3()).clone().project(camera);
        screenPos.x = Math.round(((screenPos.x + 1) * clientWidth) / 2);
        screenPos.y = Math.round(((-screenPos.y + 1) * clientHeight) / 2);
        screenPos.z = 0;
        screenPos.x += 7.5;
        screenPos.y += 15;

        let labelPos = new THREE.Vector3((screenPos.x / clientWidth) * 2 - 1, -(screenPos.y / clientHeight) * 2 + 1, 0.5);
        labelPos.unproject(camera);
        if (this.viewer.scene.cameraMode === CameraMode.PERSPECTIVE) {
          let direction = labelPos.sub(camera.position).normalize();
          labelPos = new THREE.Vector3().addVectors(camera.position, direction.multiplyScalar(distance));
        }
        label.position.copy(labelPos);
        let pr = Utils.projectedRadius(1, camera, distance, clientWidth, clientHeight);
        let scale = 60 / pr;
        label.scale.set(scale, scale, scale);
      }

      // height label
      if (measure.showHeight) {
        let label = measure.heightLabel;

        {
          let distance = label.position.distanceTo(camera.position);
          let pr = Utils.projectedRadius(1, camera, distance, clientWidth, clientHeight);
          let scale = 70 / pr;
          label.scale.set(scale, scale, scale);
        }

        {
          // height edge
          let edge = measure.heightEdge;

          let sorted = measure.points.slice().sort((a, b) => a.position.z - b.position.z);
          let lowPoint = sorted[0].position.clone();
          let highPoint = sorted[sorted.length - 1].position.clone();
          let min = lowPoint.z;
          let max = highPoint.z;

          let start = new THREE.Vector3(highPoint.x, highPoint.y, min);
          let end = new THREE.Vector3(highPoint.x, highPoint.y, max);

          let lowScreen = lowPoint.clone().project(camera);
          let startScreen = start.clone().project(camera);
          let endScreen = end.clone().project(camera);

          let toPixelCoordinates = (v) => {
            let r = v.clone().addScalar(1).divideScalar(2);
            r.x = r.x * clientWidth;
            r.y = r.y * clientHeight;
            r.z = 0;

            return r;
          };

          let lowEL = toPixelCoordinates(lowScreen);
          let startEL = toPixelCoordinates(startScreen);
          let endEL = toPixelCoordinates(endScreen);

          let lToS = lowEL.distanceTo(startEL);
          let sToE = startEL.distanceTo(endEL);

          edge.geometry.lineDistances = [0, lToS, lToS, lToS + sToE];
          edge.geometry.lineDistancesNeedUpdate = true;

          edge.material.dashSize = 10;
          edge.material.gapSize = 10;
        }
      }

      {
        // area label
        let label = measure.areaLabel;
        let distance = label.position.distanceTo(camera.position);
        let pr = Utils.projectedRadius(1, camera, distance, clientWidth, clientHeight);

        let scale = 70 / pr;
        label.scale.set(scale, scale, scale);
      }

      // { // radius label
      // 	let label = measure.circleRadiusLabel;
      // 	let distance = label.position.distanceTo(camera.position);
      // 	let pr = Utils.projectedRadius(1, camera, distance, clientWidth, clientHeight);

      // 	let scale = (70 / pr);
      // 	label.scale.set(scale, scale, scale);
      // }

      {
        // edges
        const materials = [
          // measure.circleRadiusLine.material,
          ...measure.edges.map((e) => e.material),
          measure.heightEdge.material,
          // measure.circleLine.material,
        ];

        for (const material of materials) {
          material.resolution.set(clientWidth, clientHeight);
        }
      }

      if (!this.showLabels) {
        const labels = [
          ...measure.sphereLabels,
          ...measure.edgeLabels,
          ...measure.angleLabels,
          ...measure.coordinateLabels,
          ...measure.measureLabels,
          measure.heightLabel,
          measure.areaLabel,
          // measure.circleRadiusLabel,
        ];

        for (const label of labels) {
          label.visible = false;
        }
      }
    }
  }

  render() {
    this.viewer.renderer.render(this.scene, this.viewer.scene.getActiveCamera());
  }
}
