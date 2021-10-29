import * as THREE from "../../libs/three.js/build/three.module.js";
import { EventDispatcher } from "../EventDispatcher";

export class CameraHelperTool extends THREE.EventDispatcher {
	constructor (viewer) {
		super();

		this.viewer = viewer;
		this.renderer = viewer.renderer;
    
		this.scene = new THREE.Scene();
		this.scene.name = 'scene_camera_helper';
		this.light = new THREE.PointLight(0xffffff, 1.0);
		this.scene.add(this.light);

		this.viewer.inputHandler.registerInteractiveScene(this.scene);

		this.onRemove = e => { e.camera.remove(this.scene); };
		this.onAdd = e => {
      e.camera.render(this.scene);
    };

		for(let cameraHelper of viewer.scene.cameraHelpers){
      if(cameraHelper){
        this.onAdd({cameraHelper});
      }
		}

		viewer.addEventListener("update", this.update.bind(this));
		viewer.addEventListener("render.pass.perspective_overlay", this.render.bind(this));
		viewer.addEventListener("scene_changed", this.onSceneChange.bind(this));

		viewer.scene.addEventListener('camera_helper_added', this.onAdd);
		viewer.scene.addEventListener('camera_helper_removed', this.onRemove);
	}

  onSceneChange(e){
		if(e.oldScene){
			e.oldScene.removeEventListener('camera_helper_added', this.onAdd);
			e.oldScene.removeEventListener('camera_helper_removed', this.onRemove);
		}

		e.scene.addEventListener('camera_helper_added', this.onAdd);
		e.scene.addEventListener('camera_helper_removed', this.onRemove);
	}

  update(){
		let camera = this.viewer.scene.getActiveCamera();
		// let domElement = this.renderer.domElement;
		let cameraHelpers = this.viewer.scene.cameraHelpers;

		// let renderAreaSize = this.viewer.renderer.getSize(new THREE.Vector2());
		// let clientWidth = renderAreaSize.width;
		// let clientHeight = renderAreaSize.height;

		this.light.position.copy(camera.position);

		for (let cameraHelper of cameraHelpers) {
      cameraHelper.update();
    }
  }

  render(params){
		const renderer = this.viewer.renderer;

		const oldTarget = renderer.getRenderTarget();
		
		if(params.renderTarget){
			renderer.setRenderTarget(params.renderTarget);
		}
		renderer.render(this.scene, this.viewer.scene.getActiveCamera());
		renderer.setRenderTarget(oldTarget);
	}
}