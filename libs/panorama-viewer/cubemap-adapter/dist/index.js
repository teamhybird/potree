(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('@photo-sphere-viewer/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three', '@photo-sphere-viewer/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.PhotoSphereViewer = global.PhotoSphereViewer || {}, global.PhotoSphereViewer.CubemapAdapter = {}), global.THREE, global.PhotoSphereViewer));
})(this, (function (exports, THREE, PhotoSphereViewer) {

/*!
 * PhotoSphereViewer.CubemapAdapter 0.0.0
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
    CubemapAdapter: () => CubemapAdapter
  });

  // src/CubemapAdapter.ts
  var import_core2 = require_core();
  var import_three = require_three();

  // src/utils.ts
  var import_core = require_core();
  var CUBE_ARRAY = [0, 2, 4, 5, 3, 1];
  var CUBE_HASHMAP = ["left", "right", "top", "bottom", "back", "front"];
  function isCubemap(cubemap) {
    return cubemap && typeof cubemap === "object" && CUBE_HASHMAP.every((side) => side in cubemap);
  }
  function cleanCubemapArray(panorama) {
    const cleanPanorama = [];
    if (panorama.length !== 6) {
      throw new import_core.PSVError("A cubemap array must contain exactly 6 images.");
    }
    for (let i = 0; i < 6; i++) {
      cleanPanorama[i] = panorama[CUBE_ARRAY[i]];
    }
    return cleanPanorama;
  }
  function cleanCubemap(cubemap) {
    const cleanPanorama = [];
    if (!isCubemap(cubemap)) {
      throw new import_core.PSVError("A cubemap object must contain exactly left, front, right, back, top, bottom images.");
    }
    CUBE_HASHMAP.forEach((side, i) => {
      cleanPanorama[i] = cubemap[side];
    });
    return cleanPanorama;
  }

  // src/CubemapAdapter.ts
  var getConfig = import_core2.utils.getConfigParser({
    flipTopBottom: false,
    blur: false
  });
  var CubemapAdapter = class extends import_core2.AbstractAdapter {
    constructor(viewer, config) {
      super(viewer);
      this.config = getConfig(config);
    }
    supportsTransition() {
      return true;
    }
    supportsPreload() {
      return true;
    }
    async loadTexture(panorama) {
      if (this.viewer.config.fisheye) {
        import_core2.utils.logWarn("fisheye effect with cubemap texture can generate distorsion");
      }
      let cleanPanorama;
      if (Array.isArray(panorama) || isCubemap(panorama)) {
        cleanPanorama = {
          type: "separate",
          paths: panorama
        };
      } else {
        cleanPanorama = panorama;
      }
      let texture;
      switch (cleanPanorama.type) {
        case "separate": {
          let paths;
          if (Array.isArray(cleanPanorama.paths)) {
            paths = cleanCubemapArray(cleanPanorama.paths);
          } else {
            paths = cleanCubemap(cleanPanorama.paths);
          }
          texture = await this.loadTexturesSeparate(paths);
          break;
        }
        case "stripe":
          texture = await this.loadTexturesStripe(cleanPanorama.path, cleanPanorama.order);
          break;
        case "net":
          texture = await this.loadTexturesNet(cleanPanorama.path);
          break;
        default:
          throw new import_core2.PSVError("Invalid cubemap panorama, are you using the right adapter?");
      }
      return { panorama, texture };
    }
    loadTexturesSeparate(paths) {
      const promises = [];
      for (let i = 0; i < 6; i++) {
        promises.push(
          this.viewer.textureLoader.loadImage(paths[i]).then((img) => this.createCubemapTexture(img))
        );
      }
      return Promise.all(promises);
    }
    createCubemapTexture(img) {
      if (img.width !== img.height) {
        import_core2.utils.logWarn("Invalid cubemap image, the width should equal the height");
      }
      if (this.config.blur || img.width > import_core2.SYSTEM.maxTextureWidth) {
        const ratio = Math.min(1, import_core2.SYSTEM.maxCanvasWidth / img.width);
        const buffer = document.createElement("canvas");
        buffer.width = img.width * ratio;
        buffer.height = img.height * ratio;
        const ctx = buffer.getContext("2d");
        if (this.config.blur) {
          ctx.filter = "blur(1px)";
        }
        ctx.drawImage(img, 0, 0, buffer.width, buffer.height);
        return import_core2.utils.createTexture(buffer);
      }
      return import_core2.utils.createTexture(img);
    }
    async loadTexturesStripe(path, order = ["left", "front", "right", "back", "top", "bottom"]) {
      const img = await this.viewer.textureLoader.loadImage(path);
      if (img.width !== img.height * 6) {
        import_core2.utils.logWarn("Invalid cubemap image, the width should be six times the height");
      }
      const ratio = Math.min(1, import_core2.SYSTEM.maxCanvasWidth / img.height);
      const tileWidth = img.height * ratio;
      const textures = {};
      for (let i = 0; i < 6; i++) {
        const buffer = document.createElement("canvas");
        buffer.width = tileWidth;
        buffer.height = tileWidth;
        const ctx = buffer.getContext("2d");
        if (this.config.blur) {
          ctx.filter = "blur(1px)";
        }
        ctx.drawImage(
          img,
          img.height * i,
          0,
          img.height,
          img.height,
          0,
          0,
          tileWidth,
          tileWidth
        );
        textures[order[i]] = import_core2.utils.createTexture(buffer);
      }
      return cleanCubemap(textures);
    }
    async loadTexturesNet(path) {
      const img = await this.viewer.textureLoader.loadImage(path);
      if (img.width / 4 !== img.height / 3) {
        import_core2.utils.logWarn("Invalid cubemap image, the width should be 4/3rd of the height");
      }
      const ratio = Math.min(1, import_core2.SYSTEM.maxCanvasWidth / (img.width / 4));
      const tileWidth = img.width / 4 * ratio;
      const pts = [
        [0, 1 / 3],
        // left
        [1 / 2, 1 / 3],
        // right
        [1 / 4, 0],
        // top
        [1 / 4, 2 / 3],
        // bottom
        [3 / 4, 1 / 3],
        // back
        [1 / 4, 1 / 3]
        // front
      ];
      const textures = [];
      for (let i = 0; i < 6; i++) {
        const buffer = document.createElement("canvas");
        buffer.width = tileWidth;
        buffer.height = tileWidth;
        const ctx = buffer.getContext("2d");
        if (this.config.blur) {
          ctx.filter = "blur(1px)";
        }
        ctx.drawImage(
          img,
          img.width * pts[i][0],
          img.height * pts[i][1],
          img.width / 4,
          img.height / 3,
          0,
          0,
          tileWidth,
          tileWidth
        );
        textures[i] = import_core2.utils.createTexture(buffer);
      }
      return textures;
    }
    createMesh(scale = 1) {
      const cubeSize = import_core2.CONSTANTS.SPHERE_RADIUS * 2 * scale;
      const geometry = new import_three.BoxGeometry(cubeSize, cubeSize, cubeSize).scale(1, 1, -1);
      const materials = [];
      for (let i = 0; i < 6; i++) {
        materials.push(
          import_core2.AbstractAdapter.createOverlayMaterial({
            additionalUniforms: {
              rotation: { value: 0 }
            },
            overrideVertexShader: `
uniform float rotation;
varying vec2 vUv;
const float mid = 0.5;
void main() {
  if (rotation == 0.0) {
    vUv = uv;
  } else {
    vUv = vec2(
      cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
      cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
  }
  gl_Position = projectionMatrix *  modelViewMatrix * vec4( position, 1.0 );
}`
          })
        );
      }
      return new import_three.Mesh(geometry, materials);
    }
    setTexture(mesh, textureData) {
      const { texture, panorama } = textureData;
      const isNet = panorama.type === "net";
      const flipTopBottom = isNet ? !this.config.flipTopBottom : this.config.flipTopBottom;
      for (let i = 0; i < 6; i++) {
        if (flipTopBottom && (i === 2 || i === 3)) {
          this.__setUniform(mesh, i, "rotation", Math.PI);
        }
        this.__setUniform(mesh, i, import_core2.AbstractAdapter.OVERLAY_UNIFORMS.panorama, texture[i]);
      }
      this.setOverlay(mesh, null, 0);
    }
    setOverlay(mesh, textureData, opacity) {
      for (let i = 0; i < 6; i++) {
        this.__setUniform(mesh, i, import_core2.AbstractAdapter.OVERLAY_UNIFORMS.overlayOpacity, opacity);
        if (!textureData) {
          this.__setUniform(mesh, i, import_core2.AbstractAdapter.OVERLAY_UNIFORMS.overlay, new import_three.Texture());
        } else {
          this.__setUniform(mesh, i, import_core2.AbstractAdapter.OVERLAY_UNIFORMS.overlay, textureData.texture[i]);
        }
      }
    }
    setTextureOpacity(mesh, opacity) {
      for (let i = 0; i < 6; i++) {
        this.__setUniform(mesh, i, import_core2.AbstractAdapter.OVERLAY_UNIFORMS.globalOpacity, opacity);
        mesh.material[i].transparent = opacity < 1;
      }
    }
    disposeTexture(textureData) {
      textureData.texture?.forEach((texture) => texture.dispose());
    }
    __setUniform(mesh, index, uniform, value) {
      if (mesh.material[index].uniforms[uniform].value instanceof import_three.Texture) {
        mesh.material[index].uniforms[uniform].value.dispose();
      }
      mesh.material[index].uniforms[uniform].value = value;
    }
  };
  CubemapAdapter.id = "cubemap";
  CubemapAdapter.supportsDownload = false;
  CubemapAdapter.supportsOverlay = true;
  __copyProps(__defProp(exports, "__esModule", { value: true }), src_exports);

}));//# sourceMappingURL=index.js.map