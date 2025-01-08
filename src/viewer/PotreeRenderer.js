import * as THREE from '../../libs/three.js/build/three.module.js';

export class PotreeRenderer {
  constructor(viewer, params = {}) {
    this.viewer = viewer;
    this.renderer = viewer.renderer;
    this.pRenderer = viewer.pRenderer;
    this.mainViewer = params.mainViewer || viewer;

    {
      let dummyScene = new THREE.Scene();
      let geometry = new THREE.SphereGeometry(0.001, 2, 2);
      let mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
      mesh.position.set(36453, 35163, 764712);
      dummyScene.add(mesh);

      this.dummyMesh = mesh;
      this.dummyScene = dummyScene;
    }
  }

  clearTargets() {}

  clear() {
    let { mainViewer, renderer } = this;

    // render skybox
    if (mainViewer.background === 'skybox') {
      renderer.setClearColor(0xff0000, 1);
    } else if (mainViewer.background === 'gradient') {
      renderer.setClearColor(0x00ff00, 1);
    } else if (mainViewer.background === 'black') {
      renderer.setClearColor(0x000000, 1);
    } else if (mainViewer.background === 'white') {
      renderer.setClearColor(0xffffff, 1);
    } else {
      renderer.setClearColor(mainViewer.background, 1);
    }

    renderer.clear();
  }

  render(params) {
    let { viewer, mainViewer, renderer } = this;

    const camera = viewer.scene.getActiveCamera();

    viewer.dispatchEvent({ type: 'render.pass.begin', viewer: viewer, renderer: renderer });

    const renderAreaSize = renderer.getSize(new THREE.Vector2());
    const width = params.viewport ? params.viewport[2] : renderAreaSize.x;
    const height = params.viewport ? params.viewport[3] : renderAreaSize.y;

    // render skybox
    if (mainViewer.background === 'skybox') {
      mainViewer.skybox.camera.rotation.copy(mainViewer.scene.cameraP.rotation);
      mainViewer.skybox.camera.fov = mainViewer.scene.cameraP.fov;
      mainViewer.skybox.camera.aspect = mainViewer.scene.cameraP.aspect;

      mainViewer.skybox.parent.rotation.x = 0;
      mainViewer.skybox.parent.updateMatrixWorld();

      mainViewer.skybox.camera.updateProjectionMatrix();
      renderer.render(mainViewer.skybox.scene, mainViewer.skybox.camera);
    } else if (mainViewer.background === 'gradient') {
      renderer.render(mainViewer.scene.sceneBG, mainViewer.scene.cameraBG);
    }

    for (let pointcloud of mainViewer.scene.pointclouds) {
      const { material } = pointcloud;
      material.useEDL = false;
    }

    this.pRenderer.render(mainViewer.scene.scenePointCloud, camera, null, {
      clipSpheres: mainViewer.scene.volumes.filter((v) => v instanceof Potree.SphereVolume),
    });

    // render scene
    renderer.render(viewer.scene.scene, camera);

    viewer.dispatchEvent({ type: 'render.pass.before_scene', viewer: viewer, renderer: renderer });

    viewer.dispatchEvent({ type: 'render.pass.scene', viewer: viewer, renderer: renderer });

    if (viewer.clippingTool) {
      viewer.clippingTool.update();
      renderer.render(viewer.clippingTool.sceneMarker, viewer.scene.cameraScreenSpace); //viewer.scene.cameraScreenSpace);
      renderer.render(viewer.clippingTool.sceneVolume, camera);
    }

    viewer.controls && renderer.render(viewer.controls.sceneControls, camera);

    renderer.clearDepth();

    viewer.transformationTool && viewer.transformationTool.update();

    viewer.dispatchEvent({ type: 'render.pass.perspective_overlay', viewer: viewer, renderer: renderer });

    // renderer.render(viewer.controls.sceneControls, camera);
    // renderer.render(viewer.clippingTool.sceneVolume, camera);
    // renderer.render(viewer.transformationTool.scene, camera);

    // renderer.setViewport(width - viewer.navigationCube.width,
    // 							height - viewer.navigationCube.width,
    // 							viewer.navigationCube.width, viewer.navigationCube.width);
    // renderer.render(viewer.navigationCube, viewer.navigationCube.camera);
    // renderer.setViewport(0, 0, width, height);

    viewer.dispatchEvent({ type: 'render.pass.end', viewer: viewer, renderer: renderer });
  }
}
