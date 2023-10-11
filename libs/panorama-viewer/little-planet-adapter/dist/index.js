(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('@photo-sphere-viewer/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three', '@photo-sphere-viewer/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.PhotoSphereViewer = global.PhotoSphereViewer || {}, global.PhotoSphereViewer.LittlePlanetAdapter = {}), global.THREE, global.PhotoSphereViewer));
})(this, (function (exports, THREE, PhotoSphereViewer) {

/*!
 * PhotoSphereViewer.LittlePlanetAdapter 0.0.0
 * @copyright 2023 Damien "Mistic" Sorel
 * @licence MIT (https://opensource.org/licenses/MIT)
 */
"use strict";
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };

  // @photo-sphere-viewer/core
  var require_core = () => PhotoSphereViewer;

  // three
  var require_three = () => THREE;

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    LittlePlanetAdapter: () => LittlePlanetAdapter
  });
  var import_core2 = require_core();

  // src/LittlePlanetAdapter.ts
  var import_core = require_core();
  var import_three = require_three();
  var euler = new import_three.Euler();
  var LittlePlanetAdapter = class extends import_core.EquirectangularAdapter {
    constructor(viewer) {
      super(viewer, void 0);
      this.viewer.state.littlePlanet = true;
      this.viewer.addEventListener(import_core.events.SizeUpdatedEvent.type, this);
      this.viewer.addEventListener(import_core.events.ZoomUpdatedEvent.type, this);
      this.viewer.addEventListener(import_core.events.PositionUpdatedEvent.type, this);
    }
    supportsTransition() {
      return false;
    }
    supportsPreload() {
      return true;
    }
    /**
     * @internal
     */
    handleEvent(e) {
      if (e instanceof import_core.events.SizeUpdatedEvent) {
        this.__setResolution(e.size);
      } else if (e instanceof import_core.events.ZoomUpdatedEvent) {
        this.__setZoom();
      } else if (e instanceof import_core.events.PositionUpdatedEvent) {
        this.__setPosition(e.position);
      }
    }
    createMesh() {
      const geometry = new import_three.PlaneGeometry(20, 10).translate(0, 0, -1);
      const material = new import_three.ShaderMaterial({
        uniforms: {
          panorama: { value: new import_three.Texture() },
          resolution: { value: 2 },
          transform: { value: new import_three.Matrix4() },
          zoom: { value: 10 },
          opacity: { value: 1 }
        },
        vertexShader: `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4( position, 1.0 );
}`,
        fragmentShader: `
uniform sampler2D panorama;
uniform float resolution;
uniform mat4 transform;
uniform float zoom;
uniform float opacity;

varying vec2 vUv;

const float PI = 3.1415926535897932384626433832795;

void main() {
  vec2 position = -1.0 + 2.0 * vUv;
  position *= vec2( zoom * resolution, zoom * 0.5 );

  float x2y2 = position.x * position.x + position.y * position.y;
  vec3 sphere_pnt = vec3( 2. * position, x2y2 - 1. ) / ( x2y2 + 1. );
  sphere_pnt = vec3( transform * vec4( sphere_pnt, 1.0 ) );

  vec2 sampleUV = vec2(
    1.0 - (atan(sphere_pnt.y, sphere_pnt.x) / PI + 1.0) * 0.5,
    (asin(sphere_pnt.z) / PI + 0.5)
  );

  gl_FragColor = texture2D( panorama, sampleUV );
  gl_FragColor.a *= opacity;
}`
      });
      this.uniforms = material.uniforms;
      return new import_three.Mesh(geometry, material);
    }
    setTexture(mesh, textureData) {
      mesh.material.uniforms.panorama.value.dispose();
      mesh.material.uniforms.panorama.value = textureData.texture;
    }
    __setResolution(size) {
      this.uniforms.resolution.value = size.width / size.height;
    }
    __setZoom() {
      this.uniforms.zoom.value = Math.max(0.1, import_three.MathUtils.mapLinear(this.viewer.state.vFov, 90, 30, 50, 2));
    }
    __setPosition(position) {
      euler.set(Math.PI / 2 + position.pitch, 0, -Math.PI / 2 - position.yaw, "ZYX");
      this.uniforms.transform.value.makeRotationFromEuler(euler);
    }
  };
  LittlePlanetAdapter.id = "little-planet";
  LittlePlanetAdapter.supportsDownload = true;
  LittlePlanetAdapter.supportsOverlay = false;

  // src/index.ts
  import_core2.DEFAULTS.defaultPitch = -Math.PI / 2;
  __copyProps(__defProp(exports, "__esModule", { value: true }), src_exports);

}));//# sourceMappingURL=index.js.map