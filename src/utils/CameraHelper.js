import * as THREE from "../../libs/three.js/build/three.module.js";

var _vector = new THREE.Vector3();
var _camera = new THREE.Camera();

function setPoint( point, pointMap, geometry, camera, x, y, z ) {

	_vector.set( x, y, z ).unproject( camera );

	var points = pointMap[ point ];

	if ( points !== undefined ) {

    var position = geometry.attributes.position;

		for ( var i = 0, l = points.length; i < l; i++ ) {

			position.setXYZ( points[ i ], _vector.x, _vector.y, _vector.z );

		}

	}

  // 'c', pointMap, geometry, _camera, 0, 0, - 1 
}

export class CameraHelper extends THREE.LineSegments {
  constructor ( viewer, camera, image, { _colorFrustum, _colorCone, _colorUp, _colorCross, _sphereColor }, visible, thumbnailVisible ) {
    var geometry = new THREE.BufferGeometry();
    var material = new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );

    var planes = [];

    var vertices = [];

    var colors = [];

    var pointMap = {};
    var planePointsMap = [];

    // colors

    var colorFrustum = new THREE.Color( _colorFrustum || 0x01f6a5 );
    var colorCone = new THREE.Color( _colorCone || 0x01f6a5 );
    var colorUp = new THREE.Color( _colorUp || 0xffffff );
    var colorCross = new THREE.Color( _colorCross || 0xffffff );

    // near

    addLine( 'n1', 'n2', colorFrustum );
    addLine( 'n2', 'n4', colorFrustum );
    addLine( 'n4', 'n3', colorFrustum );
    addLine( 'n3', 'n1', colorFrustum );

    // far

    addLine( 'f1', 'f2', colorFrustum );
    addLine( 'f2', 'f4', colorFrustum );
    addLine( 'f4', 'f3', colorFrustum );
    addLine( 'f3', 'f1', colorFrustum );

    // sides

    addLine( 'n1', 'f1', colorFrustum );
    addLine( 'n2', 'f2', colorFrustum );
    addLine( 'n3', 'f3', colorFrustum );
    addLine( 'n4', 'f4', colorFrustum );

    // cone

    addLine( 'p', 'n1', colorCone );
    addLine( 'p', 'n2', colorCone );
    addLine( 'p', 'n3', colorCone );
    addLine( 'p', 'n4', colorCone );

    // up

    addLine( 'u1', 'u2', colorUp );
    addLine( 'u2', 'u3', colorUp );
    addLine( 'u3', 'u1', colorUp );

    // target

    // addLine( 'c', 't', colorTarget );
    addLine( 'p', 'c', colorCross );

    // cross

    addLine( 'cn1', 'cn2', colorCross );
    addLine( 'cn3', 'cn4', colorCross );

    addLine( 'cf1', 'cf2', colorCross );
    addLine( 'cf3', 'cf4', colorCross );

    // addPlane('n1','n2','n3','n4');

    function addLine( a, b, color ) {

      addPoint( a, color );
      addPoint( b, color );

    }

		// eslint-disable-next-line
    function addPlane( a, b, c, d ) {
      var planeMaterial = new THREE.MeshBasicMaterial( {
        depthTest: true, 
        depthWrite: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
     
      var planeVertices = [];
      var planePointMap = {};
      var quadUvs =
      [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
      ];

      var quadIndices =
      [
        0, 2, 1, 0, 3, 2
      ];

      addPlanePoint( a, planeVertices, planePointMap );
      addPlanePoint( b, planeVertices, planePointMap );
      addPlanePoint( c, planeVertices, planePointMap );
      addPlanePoint( d, planeVertices, planePointMap );

      // Plane geometry
      var planeGeometry = new THREE.BufferGeometry();
      var positions = new Float32Array(planeVertices.length * 3);
      var uvs = new Float32Array( quadUvs);
      var indices = new Uint32Array( quadIndices );

      for (var i = 0; i < planeVertices.length; i++) {
        positions[i * 3] = planeVertices[i].x;
        positions[i * 3 + 1] = planeVertices[i].y;
        positions[i * 3 + 2] = planeVertices[i].z;
      }
          
      planeGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( planeVertices, 3 ) );
      planeGeometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ));
      planeGeometry.setIndex(new THREE.BufferAttribute( indices, 1 ));

      var plane = new THREE.Mesh(planeGeometry, planeMaterial);
      var loader = new THREE.TextureLoader();
      loader.crossOrigin = 'anonymus';

      loader.load(
        image.src,
        function(texture) {
          plane.material.map = texture;

          plane.geometry.buffersNeedUpdate = true;
          plane.geometry.uvsNeedUpdate = true;
          planeMaterial.needsUpdate = true;
        }
      );
      planes.push(plane);
      planePointsMap.push(planePointMap);
    }

    function addPoint( id, color ) {

      vertices.push( 0, 0, 0 );
      colors.push( color.r, color.g, color.b );

      if ( pointMap[ id ] === undefined ) {

        pointMap[ id ] = [];

      }

      pointMap[ id ].push( ( vertices.length / 3 ) - 1 );

    }

    function addPlanePoint( id, planeVertices, planePointMap ) {

      planeVertices.push( 0, 0, 0 );

      if ( planePointMap[ id ] === undefined ) {

        planePointMap[ id ] = [];

      }

      planePointMap[ id ].push( ( planeVertices.length / 3 ) - 1 );

    }
 
    // Line geometry
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    super( geometry, material );

    this.viewer = viewer;
    this.camera = camera;
    if ( this.camera.updateProjectionMatrix ) this.camera.updateProjectionMatrix();

    this.matrix = camera.matrixWorld;
    this.matrixAutoUpdate = false;

    this.sphereColor = _sphereColor || 0x01f6a5;

    this._selected = false;
    this._thumbnailVisible = typeof thumbnailVisible !== "undefined" ? thumbnailVisible : true;
    this._visible = typeof visible !== "undefined" ? visible : true;
    this.planes = planes;
    this.pointMap = pointMap;
    this.planePointsMap = planePointsMap;

    this.colorFrustum = colorFrustum;
    this.colorCone = colorCone;
    this.colorUp = colorUp;
    this.colorCross = colorCross;

    this.update();
  }

  remove(scene){
    scene.remove(this.cameraSphere);
    this.planes.forEach(plane => scene.remove(plane));
    scene.remove(this);
  }

  removeThumbnail(scene){
    this.planes.forEach(plane => scene.remove(plane));
    scene.remove(this);
  }

  render(scene){
    if(!this.visible) return;
    // let material = new THREE.SpriteMaterial();
    let sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
    sphereGeometry.computeBoundingBox();
    let material = new THREE.MeshBasicMaterial({
      depthTest: false,
      transparent: true,
      opacity: 1,
      color: this.sphereColor
    });
    
    this.cameraSphere = new THREE.Mesh(sphereGeometry, material);
    this.cameraSphere.position.copy(this.camera.position);
    var dirVector = this.camera.getWorldDirection(new THREE.Vector3());
    this.cameraSphere.position.add(dirVector.multiplyScalar(-0.5));
    this.cameraSphere.scale.set(0.5, 0.5, 0.5);
    scene.add(this.cameraSphere);

    let mouseover = (e) => {
      if(!this.selected){
        e.target.material.opacity = 0.6;
      }
      this.dispatchEvent({
        type: 'camera_helper_mouseover',
        cameraHelper: this,
      });
    };

    let mouseleave = (e) => {
      if(!this.selected){
        e.target.material.opacity = 1;
      }
      this.dispatchEvent({
        type: 'camera_helper_mouseleave',
        cameraHelper: this,
      });
    };

    let mouseclick = (e) => {
      this.dispatchEvent({
        type: 'camera_helper_clicked',
        cameraHelper: this,
      });
    };

    this.cameraSphere.addEventListener("mouseover", mouseover);
    this.cameraSphere.addEventListener("mouseleave", mouseleave);
    this.cameraSphere.addEventListener("mousedown", mouseclick);


    if(!this.thumbnailVisible) return;
    scene.add(this);
    this.planes.forEach(plane => scene.add(plane));
  }

  shootRayThroughPoint (pointFrom, pointTo, retry = 0) {
		retry += 1;
		return new Promise((resolve, reject) => {
			if (this.viewer.progressBar.progress < 1) {
				if (retry < 20) {
				setTimeout(() => resolve(this.shootRayThroughPoint(pointFrom, pointTo, retry)), 300 * retry);
				} else {
					resolve(null);
				}
			} else {
				let sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
				sphereGeometry.computeBoundingBox();
				let material = new THREE.MeshBasicMaterial({
					depthWrite: true,
					depthTest: true,
					transparent: true,
					opacity: 1,
					color: 0x000000
				});

				let cameraSphere = new THREE.Mesh(sphereGeometry, material);
				cameraSphere.position.copy(pointFrom);

				var startPoint = pointFrom;
				var endPoint = pointTo;

				var direction = new THREE.Vector3();
				direction.subVectors(endPoint, startPoint).normalize();
				var raycaster = new THREE.Raycaster(startPoint, direction);
				raycaster.params = {
					Mesh: {},
					Line: { threshold: 1 },
					LOD: {},
					Points: { threshold: 0.1 },
					Sprite: {}
				};

				var arrowhelper = new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000);
				this.viewer.scene.scene.add(arrowhelper);
				this.viewer.scene.scene.add(cameraSphere);

				var visiblePointClouds = this.viewer.scene.pointclouds.filter(pc => pc.visible);
				var intersections = raycaster.intersectObjects(visiblePointClouds, true);
				var intersection = (intersections.length) > 0 ? intersections[0] : null;


				setTimeout(() => {
					this.viewer.scene.scene.remove(arrowhelper);
					this.viewer.scene.scene.remove(cameraSphere);
				}, 3000);

				if (intersection && intersection.point) {
					resolve(intersection.point);
					// this.viewer.earthControls.dispatchEvent({type: 'pointcloud-clicked', position: intersection.point});
				} else resolve(null);
			}
		});
	}

  update(){
    
    var geometry = this.geometry;

    var pointMap = this.pointMap;

    var w = 1; var h = 1;

    // we need just camera projection matrix inverse
    // world matrix must be identity
    _camera.projectionMatrix.copy( this.camera.projectionMatrix );

    this.camera.updateMatrixWorld();
    // center / target

    setPoint( 'c', pointMap, geometry, _camera, 0, 0, -1 );
    setPoint( 't', pointMap, geometry, _camera, 0, 0, 1 );

    // near
    setPoint( 'n1', pointMap, geometry, _camera, -w, -h, -1 );
    setPoint( 'n2', pointMap, geometry, _camera, w, -h, -1 );
    setPoint( 'n3', pointMap, geometry, _camera, -w, h, -1 );
    setPoint( 'n4', pointMap, geometry, _camera, w, h, -1 );

    // far

    // setPoint( 'f1', pointMap, geometry, _camera, - w, - h, 1 );
    // setPoint( 'f2', pointMap, geometry, _camera, w, - h, 1 );
    // setPoint( 'f3', pointMap, geometry, _camera, - w, h, 1 );
    // setPoint( 'f4', pointMap, geometry, _camera, w, h, 1 );

    // up

    setPoint( 'u1', pointMap, geometry, _camera, w * 0.7, h * 1.1, -1 );
    setPoint( 'u2', pointMap, geometry, _camera, -w * 0.7, h * 1.1, -1 );
    setPoint( 'u3', pointMap, geometry, _camera, 0, h * 2, -1 );

    // cross

    // setPoint( 'cf1', pointMap, geometry, _camera, - w, 0, 1 );
    // setPoint( 'cf2', pointMap, geometry, _camera, w, 0, 1 );
    // setPoint( 'cf3', pointMap, geometry, _camera, 0, - h, 1 );
    // setPoint( 'cf4', pointMap, geometry, _camera, 0, h, 1 );

    setPoint( 'cn1', pointMap, geometry, _camera, -w, 0, -1 );
    setPoint( 'cn2', pointMap, geometry, _camera, w, 0, -1 );
    setPoint( 'cn3', pointMap, geometry, _camera, 0, -h, -1 );
    setPoint( 'cn4', pointMap, geometry, _camera, 0, h, -1 );

    geometry.attributes.position.needsUpdate = true;

    this.planes.forEach((plane, index) => {
      const planeGeometry = plane.geometry;
      const planePointMap = this.planePointsMap[index];

      plane.position.copy(this.camera.position);
      plane.rotation.copy(this.camera.rotation);
      plane.scale.y = -1;

      var ids = Object.keys(planePointMap).map(id => id);

      // TODO: this needs to be dynamic currently it is not possible to add another plane need to remember x, y, z of each pointMap id
      setPoint( ids[0], planePointMap, planeGeometry, _camera, -w, h, -1 );
      setPoint( ids[1], planePointMap, planeGeometry, _camera, w, h, -1 );
      setPoint( ids[2], planePointMap, planeGeometry, _camera, w, -h, -1 );
      setPoint( ids[3], planePointMap, planeGeometry, _camera, -w, -h, -1 );

      plane.geometry.attributes.position.needsUpdate = true;
    });
  }

  selectCamera () {
    if(this.cameraSphere){
      var dirVector = this.camera.getWorldDirection(new THREE.Vector3());
      this.cameraSphere.position.add(dirVector.multiplyScalar(-0.8));
      this.cameraSphere.scale.set(0.8, 0.8, 0.8);
      this.cameraSphere.material.opacity = 1;
    }
    setTimeout(() => {
      this.viewer.setCameraPosition(
        this.camera.position,
        this.camera.rotation,
        500
      );
    }, 500);
  }

  raycast (raycaster, intersects) {
    if(this.cameraSphere){
      let sphere = this.cameraSphere;
  
      sphere.raycast(raycaster, intersects);
  
      // recalculate distances because they are not necessarely correct
      // for scaled objects.
      // see https://github.com/mrdoob/three.js/issues/5827
      // TODO: remove this once the bug has been fixed
      for (let i = 0; i < intersects.length; i++) {
        let I = intersects[i];
        I.distance = raycaster.ray.origin.distanceTo(I.point);
      }
      intersects.sort(function (a, b) { return a.distance - b.distance; });
    }
  };
  
  showCamera (viewer) {
    this.render(viewer.scene.scene);
  }

  hideCamera (viewer) {
    this.remove(viewer.scene.scene);
  }

  showThumbnail (viewer) {
    this.render(viewer.scene.scene);
  }

  hideThumbnail (viewer) {
    this.removeThumbnail(viewer.scene.scene);
  }

  get selected (){
    return this._selected;
  }
  set selected (value) {
    this._selected = value;
    if(value){
      this.selectCamera();
    }
     
  }

  get visible (){
    return this._visible;
  }

  set visible (value) {
    if(this._visible === value) return;
    this._visible = value;
    if(this.viewer){
      if(value){
        this.showCamera(this.viewer);
      }else{
        this.hideCamera(this.viewer);
      }
    }
     
  }

  get thumbnailVisible () {
    return this._thumbnailVisible;
  }

  set thumbnailVisible (value) {
    if(this.thumbnailVisible === value) return;
    this._thumbnailVisible = value;
    if(this.viewer){
      if(value){
        this.showCamera(this.viewer);
      }else{
        this.hideThumbnail(this.viewer);
      }
    }
     
  }

}