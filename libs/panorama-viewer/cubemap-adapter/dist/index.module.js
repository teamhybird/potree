/*!
 * PhotoSphereViewer.CubemapAdapter 0.0.0
 * @copyright 2023 Damien "Mistic" Sorel
 * @licence MIT (https://opensource.org/licenses/MIT)
 */

// src/CubemapAdapter.ts
import { AbstractAdapter, CONSTANTS, PSVError as PSVError2, SYSTEM, utils } from "@photo-sphere-viewer/core";
import { BoxGeometry, Mesh, Texture } from "three";

// src/utils.ts
import { PSVError } from "@photo-sphere-viewer/core";
var CUBE_ARRAY = [0, 2, 4, 5, 3, 1];
var CUBE_HASHMAP = ["left", "right", "top", "bottom", "back", "front"];
function isCubemap(cubemap) {
  return cubemap && typeof cubemap === "object" && CUBE_HASHMAP.every((side) => side in cubemap);
}
function cleanCubemapArray(panorama) {
  const cleanPanorama = [];
  if (panorama.length !== 6) {
    throw new PSVError("A cubemap array must contain exactly 6 images.");
  }
  for (let i = 0; i < 6; i++) {
    cleanPanorama[i] = panorama[CUBE_ARRAY[i]];
  }
  return cleanPanorama;
}
function cleanCubemap(cubemap) {
  const cleanPanorama = [];
  if (!isCubemap(cubemap)) {
    throw new PSVError("A cubemap object must contain exactly left, front, right, back, top, bottom images.");
  }
  CUBE_HASHMAP.forEach((side, i) => {
    cleanPanorama[i] = cubemap[side];
  });
  return cleanPanorama;
}

// src/CubemapAdapter.ts
var getConfig = utils.getConfigParser({
  flipTopBottom: false,
  blur: false
});
var CubemapAdapter = class extends AbstractAdapter {
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
      utils.logWarn("fisheye effect with cubemap texture can generate distorsion");
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
        throw new PSVError2("Invalid cubemap panorama, are you using the right adapter?");
    }
    return { panorama, texture };
  }
  loadTexturesSeparate(paths) {
    const promises = [];
    const progress = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 6; i++) {
      promises.push(
        this.viewer.textureLoader.loadImage(paths[i], (p) => {
          progress[i] = p;
          this.viewer.loader.setProgress(utils.sum(progress) / 6);
        }).then((img) => this.createCubemapTexture(img))
      );
    }
    return Promise.all(promises);
  }
  createCubemapTexture(img) {
    if (img.width !== img.height) {
      utils.logWarn("Invalid cubemap image, the width should equal the height");
    }
    if (this.config.blur || img.width > SYSTEM.maxTextureWidth) {
      const ratio = Math.min(1, SYSTEM.maxCanvasWidth / img.width);
      const buffer = document.createElement("canvas");
      buffer.width = img.width * ratio;
      buffer.height = img.height * ratio;
      const ctx = buffer.getContext("2d");
      if (this.config.blur) {
        ctx.filter = "blur(1px)";
      }
      ctx.drawImage(img, 0, 0, buffer.width, buffer.height);
      return utils.createTexture(buffer);
    }
    return utils.createTexture(img);
  }
  async loadTexturesStripe(path, order = ["left", "front", "right", "back", "top", "bottom"]) {
    const img = await this.viewer.textureLoader.loadImage(path, (p) => this.viewer.loader.setProgress(p));
    if (img.width !== img.height * 6) {
      utils.logWarn("Invalid cubemap image, the width should be six times the height");
    }
    const ratio = Math.min(1, SYSTEM.maxCanvasWidth / img.height);
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
      textures[order[i]] = utils.createTexture(buffer);
    }
    return cleanCubemap(textures);
  }
  async loadTexturesNet(path) {
    const img = await this.viewer.textureLoader.loadImage(path, (p) => this.viewer.loader.setProgress(p));
    if (img.width / 4 !== img.height / 3) {
      utils.logWarn("Invalid cubemap image, the width should be 4/3rd of the height");
    }
    const ratio = Math.min(1, SYSTEM.maxCanvasWidth / (img.width / 4));
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
      textures[i] = utils.createTexture(buffer);
    }
    return textures;
  }
  createMesh(scale = 1) {
    const cubeSize = CONSTANTS.SPHERE_RADIUS * 2 * scale;
    const geometry = new BoxGeometry(cubeSize, cubeSize, cubeSize).scale(1, 1, -1);
    const materials = [];
    for (let i = 0; i < 6; i++) {
      materials.push(
        AbstractAdapter.createOverlayMaterial({
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
    return new Mesh(geometry, materials);
  }
  setTexture(mesh, textureData) {
    const { texture, panorama } = textureData;
    const isNet = panorama.type === "net";
    const flipTopBottom = isNet ? !this.config.flipTopBottom : this.config.flipTopBottom;
    for (let i = 0; i < 6; i++) {
      if (flipTopBottom && (i === 2 || i === 3)) {
        this.__setUniform(mesh, i, "rotation", Math.PI);
      }
      this.__setUniform(mesh, i, AbstractAdapter.OVERLAY_UNIFORMS.panorama, texture[i]);
    }
    this.setOverlay(mesh, null, 0);
  }
  setOverlay(mesh, textureData, opacity) {
    for (let i = 0; i < 6; i++) {
      this.__setUniform(mesh, i, AbstractAdapter.OVERLAY_UNIFORMS.overlayOpacity, opacity);
      if (!textureData) {
        this.__setUniform(mesh, i, AbstractAdapter.OVERLAY_UNIFORMS.overlay, new Texture());
      } else {
        this.__setUniform(mesh, i, AbstractAdapter.OVERLAY_UNIFORMS.overlay, textureData.texture[i]);
      }
    }
  }
  setTextureOpacity(mesh, opacity) {
    for (let i = 0; i < 6; i++) {
      this.__setUniform(mesh, i, AbstractAdapter.OVERLAY_UNIFORMS.globalOpacity, opacity);
      mesh.material[i].transparent = opacity < 1;
    }
  }
  disposeTexture(textureData) {
    textureData.texture?.forEach((texture) => texture.dispose());
  }
  __setUniform(mesh, index, uniform, value) {
    if (mesh.material[index].uniforms[uniform].value instanceof Texture) {
      mesh.material[index].uniforms[uniform].value.dispose();
    }
    mesh.material[index].uniforms[uniform].value = value;
  }
};
CubemapAdapter.id = "cubemap";
CubemapAdapter.supportsDownload = false;
CubemapAdapter.supportsOverlay = true;
export {
  CubemapAdapter
};
//# sourceMappingURL=index.module.js.map