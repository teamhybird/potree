import * as THREE from "../../libs/three.js/build/three.module.js";
import { Utils } from "../utils.js";
import { Shape } from "./Shape.js";

export class ShapeTool extends THREE.EventDispatcher {
	constructor (viewer) {
		super();

		this.viewer = viewer;
		this.renderer = viewer.renderer;

		this.addEventListener('start_inserting_shape', e => {
			this.viewer.dispatchEvent({
				type: 'cancel_insertions'
			});
		});

		this.scene = new THREE.Scene();
		this.scene.name = 'scene_shape';

		this.viewer.inputHandler.registerInteractiveScene(this.scene);

		this.onRemove = e => {
			this.scene.remove(e.shape);
		};

		this.onAdd = e => {
			this.scene.add(e.shape);
		};

		for(let shape of viewer.scene.shapes){
			this.onAdd({shape: shape});
		}

		this.viewer.inputHandler.addEventListener('delete', e => {
			let shapes = e.selection.filter(e => (e instanceof Shape));
			shapes.forEach(e => this.viewer.scene.removeShape(e));
		});

		viewer.addEventListener("update", this.update.bind(this));
		viewer.addEventListener("render.pass.scene", e => this.render(e));
		viewer.addEventListener("scene_changed", this.onSceneChange.bind(this));

		viewer.scene.addEventListener('shape_added', this.onAdd);
		viewer.scene.addEventListener('shape_removed', this.onRemove);
	}

	onSceneChange(e){
		if(e.oldScene){
			e.oldScene.removeEventListeners('shape_added', this.onAdd);
			e.oldScene.removeEventListeners('shape_removed', this.onRemove);
		}

		e.scene.addEventListener('shape_added', this.onAdd);
		e.scene.addEventListener('shape_removed', this.onRemove);
	}

	startInsertion (args = {}) {
		let shape = new Shape(args);
		shape.name = args.name || 'Shape';

		this.dispatchEvent({
			type: 'start_inserting_shape',
			shape: shape
		});

		this.viewer.scene.addShape(shape);
		this.scene.add(shape);

		let cancel = {
			callback: null
		};

		let drag = e => {
			const camera = this.viewer.scene.getActiveCamera();
			let I = Utils.getMousePointCloudIntersection(
				e.drag.end, 
				camera, 
				this.viewer, 
				this.viewer.scene.pointclouds);

			if (I) {
				shape.position.copy(I.location);
			
				// let wp = shape.getWorldPosition().applyMatrix4(camera.matrixWorldInverse);
				// // let pp = new THREE.Vector4(wp.x, wp.y, wp.z).applyMatrix4(camera.projectionMatrix);
				// let w = Math.abs((wp.z / 5));
				// shape.setShapeScale(new THREE.Vector3(w, w, w));
			}
		};

		let drop = e => {
			shape.removeEventListener('drag', drag);
			shape.removeEventListener('drop', drop);

			cancel.callback();
		};

		cancel.callback = e => {
      this.dispatchEvent({
        type: 'finish_inserting_shape',
        shape: shape
      });
			shape.removeEventListener('drag', drag);
			shape.removeEventListener('drop', drop);
			this.viewer.removeEventListener('cancel_insertions', cancel.callback);
		};

		shape.addEventListener('drag', drag);
		shape.addEventListener('drop', drop);
		this.viewer.addEventListener('cancel_insertions', cancel.callback);

		this.viewer.inputHandler.startDragging(shape);

		return shape;
	}

	update(){
		if (!this.viewer.scene) {
			return;
		}
		
		let camera = this.viewer.scene.getActiveCamera();
		let renderAreaSize = this.viewer.renderer.getSize(new THREE.Vector2());
		let clientWidth = renderAreaSize.width;
		let clientHeight = renderAreaSize.height;

		let shapes = this.viewer.scene.shapes;
		for (let shape of shapes) {
			let label = shape.label;
			
			{

				let distance = label.position.distanceTo(camera.position);
				let pr = Utils.projectedRadius(1, camera, distance, clientWidth, clientHeight);

				let scale = (70 / pr);
				label.scale.set(scale, scale, scale);
			}

			let text = Utils.addCommas(shape.getShape().toFixed(3)) + '\u00B3';
			label.setText(text);
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

};