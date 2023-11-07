/*!
 * PhotoSphereViewer.EquirectangularTilesAdapter 0.0.0
 * @copyright 2023 Damien "Mistic" Sorel
 * @licence MIT (https://opensource.org/licenses/MIT)
 */

// src/EquirectangularTilesAdapter.ts
import { AbstractAdapter, CONSTANTS, EquirectangularAdapter, events, PSVError as PSVError3, utils } from "@photo-sphere-viewer/core";
import { SPHERE_RADIUS } from "@photo-sphere-viewer/core/src/data/constants";
import {
  FrontSide,
  Frustum,
  ImageLoader,
  MathUtils as MathUtils2,
  Matrix4,
  Mesh,
  MeshBasicMaterial as MeshBasicMaterial2,
  SphereGeometry,
  Vector3
} from "three";

// ../shared/Queue.ts
var Task = class {
  constructor(id, priority, fn) {
    this.id = id;
    this.priority = priority;
    this.fn = fn;
    this.status = 1 /* PENDING */;
  }
  start() {
    this.status = 2 /* RUNNING */;
    return this.fn(this).then(
      () => {
        this.status = 4 /* DONE */;
      },
      () => {
        this.status = 5 /* ERROR */;
      }
    );
  }
  cancel() {
    this.status = 3 /* CANCELLED */;
  }
  isCancelled() {
    return this.status === 3 /* CANCELLED */;
  }
};
var Queue = class {
  constructor(concurency = 4) {
    this.concurency = concurency;
    this.runningTasks = {};
    this.tasks = {};
  }
  enqueue(task) {
    this.tasks[task.id] = task;
  }
  clear() {
    Object.values(this.tasks).forEach((task) => task.cancel());
    this.tasks = {};
    this.runningTasks = {};
  }
  setPriority(taskId, priority) {
    const task = this.tasks[taskId];
    if (task) {
      task.priority = priority;
      if (task.status === 0 /* DISABLED */) {
        task.status = 1 /* PENDING */;
      }
    }
  }
  disableAllTasks() {
    Object.values(this.tasks).forEach((task) => {
      task.status = 0 /* DISABLED */;
    });
  }
  start() {
    if (Object.keys(this.runningTasks).length >= this.concurency) {
      return;
    }
    const nextTask = Object.values(this.tasks).filter((task) => task.status === 1 /* PENDING */).sort((a, b) => b.priority - a.priority).pop();
    if (nextTask) {
      this.runningTasks[nextTask.id] = true;
      nextTask.start().then(() => {
        if (!nextTask.isCancelled()) {
          delete this.tasks[nextTask.id];
          delete this.runningTasks[nextTask.id];
          this.start();
        }
      });
      this.start();
    }
  }
};

// ../shared/tiles-utils.ts
import { PSVError } from "@photo-sphere-viewer/core";
import {
  CanvasTexture,
  LineSegments,
  MeshBasicMaterial,
  WireframeGeometry
} from "three";
function checkTilesLevels(levels) {
  let previous = 0;
  levels.forEach((level, i) => {
    if (!level.zoomRange || level.zoomRange.length !== 2) {
      throw new PSVError(`Tiles level ${i} is missing "zoomRange" property`);
    }
    if (level.zoomRange[0] >= level.zoomRange[1] || level.zoomRange[0] !== previous || i === 0 && level.zoomRange[0] !== 0 || i === levels.length - 1 && level.zoomRange[1] !== 100) {
      throw new PSVError(`Tiles levels' "zoomRange" are not orderer or are not covering the whole 0-100 range`);
    }
    previous = level.zoomRange[1];
  });
}
function getTileIndexByZoomLevel(levels, zoomLevel) {
  return levels.findIndex((level) => {
    return zoomLevel >= level.zoomRange[0] && zoomLevel <= level.zoomRange[1];
  });
}
function buildErrorMaterial() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#333";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${canvas.width / 5}px serif`;
  ctx.fillStyle = "#a22";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("\u26A0", canvas.width / 2, canvas.height / 2);
  const texture = new CanvasTexture(canvas);
  return new MeshBasicMaterial({ map: texture });
}
function createWireFrame(geometry) {
  const wireframe = new WireframeGeometry(geometry);
  const line = new LineSegments(wireframe);
  line.material.depthTest = false;
  line.material.opacity = 0.25;
  line.material.transparent = true;
  return line;
}
var DEBUG_COLORS = ["dodgerblue", "limegreen", "indianred"];
function buildDebugTexture(image, level, id) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = DEBUG_COLORS[level % DEBUG_COLORS.length];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "multiply";
  ctx.drawImage(image, 0, 0);
  const fontSize = image.width / 7;
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "white";
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "center";
  id.split("\n").forEach((id2, i) => {
    ctx.fillText(id2, image.width / 2, image.height / 2 + fontSize * (0.3 + i));
  });
  return canvas;
}

// src/utils.ts
import { PSVError as PSVError2 } from "@photo-sphere-viewer/core";
import { MathUtils } from "three";
function isMultiTiles(panorama) {
  return !!panorama.levels;
}
function computeTileConfig(tile, level, data) {
  return {
    ...tile,
    level,
    colSize: tile.width / tile.cols,
    rowSize: tile.width / 2 / tile.rows,
    facesByCol: data.SPHERE_SEGMENTS / tile.cols,
    facesByRow: data.SPHERE_HORIZONTAL_SEGMENTS / tile.rows
  };
}
function getTileConfig(panorama, zoomLevel, data) {
  let tile;
  let level;
  if (!isMultiTiles(panorama)) {
    level = 0;
    tile = {
      ...panorama,
      zoomRange: [0, 100]
    };
  } else {
    level = getTileIndexByZoomLevel(panorama.levels, zoomLevel);
    tile = panorama.levels[level];
  }
  return computeTileConfig(tile, level, data);
}
function getTileConfigByIndex(panorama, level, data) {
  if (!isMultiTiles(panorama) || !panorama.levels[level]) {
    return null;
  } else {
    return computeTileConfig(panorama.levels[level], level, data);
  }
}
function checkPanoramaConfig(panorama, data) {
  if (typeof panorama !== "object" || !panorama.tileUrl) {
    throw new PSVError2("Invalid panorama configuration, are you using the right adapter?");
  }
  if (isMultiTiles(panorama)) {
    panorama.levels.forEach((level) => checkTile(level, data));
    checkTilesLevels(panorama.levels);
  } else {
    checkTile(panorama, data);
  }
}
function checkTile(tile, data) {
  if (!tile.width || !tile.cols || !tile.rows) {
    throw new PSVError2("Invalid panorama configuration, are you using the right adapter?");
  }
  if (tile.cols > data.SPHERE_SEGMENTS) {
    throw new PSVError2(`Panorama cols must not be greater than ${data.SPHERE_SEGMENTS}.`);
  }
  if (tile.rows > data.SPHERE_HORIZONTAL_SEGMENTS) {
    throw new PSVError2(`Panorama rows must not be greater than ${data.SPHERE_HORIZONTAL_SEGMENTS}.`);
  }
  if (!MathUtils.isPowerOfTwo(tile.cols) || !MathUtils.isPowerOfTwo(tile.rows)) {
    throw new PSVError2("Panorama cols and rows must be powers of 2.");
  }
}

// src/EquirectangularTilesAdapter.ts
var NB_VERTICES_BY_FACE = 6;
var NB_VERTICES_BY_SMALL_FACE = 3;
var ATTR_UV = "uv";
var ATTR_ORIGINAL_UV = "originaluv";
var ATTR_POSITION = "position";
var ERROR_LEVEL = -1;
function tileId(tile) {
  return `${tile.col}x${tile.row}/${tile.config.level}`;
}
var getConfig = utils.getConfigParser(
  {
    resolution: 64,
    showErrorTile: true,
    baseBlur: true,
    blur: false,
    debug: false
  },
  {
    resolution: (resolution) => {
      if (!resolution || !MathUtils2.isPowerOfTwo(resolution)) {
        throw new PSVError3("EquirectangularTilesAdapter resolution must be power of two");
      }
      return resolution;
    }
  }
);
var frustum = new Frustum();
var projScreenMatrix = new Matrix4();
var vertexPosition = new Vector3();
var direction = new Vector3();
var directionVector = new Vector3();
var EquirectangularTilesAdapter = class extends AbstractAdapter {
  constructor(viewer, config) {
    super(viewer);
    this.state = {
      tileConfig: null,
      tiles: {},
      faces: {},
      geom: null,
      materials: [],
      errorMaterial: null,
      inTransition: false
    };
    this.queue = new Queue();
    this.config = getConfig(config);
    this.viewer.config.useXmpData = false;
    this.SPHERE_SEGMENTS = this.config.resolution;
    this.SPHERE_HORIZONTAL_SEGMENTS = this.SPHERE_SEGMENTS / 2;
    this.NB_VERTICES = 2 * this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE + (this.SPHERE_HORIZONTAL_SEGMENTS - 2) * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE;
    this.NB_GROUPS = this.SPHERE_SEGMENTS * this.SPHERE_HORIZONTAL_SEGMENTS;
    if (this.viewer.config.requestHeaders) {
      utils.logWarn(
        'EquirectangularTilesAdapter fallbacks to file loader because "requestHeaders" where provided. Consider removing "requestHeaders" if you experience performances issues.'
      );
    } else {
      this.loader = new ImageLoader();
      if (this.viewer.config.withCredentials) {
        this.loader.setWithCredentials(true);
      }
    }
    this.viewer.addEventListener(events.PositionUpdatedEvent.type, this);
    this.viewer.addEventListener(events.ZoomUpdatedEvent.type, this);
  }
  destroy() {
    this.viewer.addEventListener(events.PositionUpdatedEvent.type, this);
    this.viewer.addEventListener(events.ZoomUpdatedEvent.type, this);
    this.__cleanup();
    this.state.errorMaterial?.map?.dispose();
    this.state.errorMaterial?.dispose();
    delete this.state.geom;
    delete this.state.errorMaterial;
    super.destroy();
  }
  /**
   * @internal
   */
  handleEvent(e) {
    if (e instanceof events.PositionUpdatedEvent || e instanceof events.ZoomUpdatedEvent) {
      this.__refresh();
    }
  }
  supportsTransition(panorama) {
    return !!panorama.baseUrl;
  }
  supportsPreload(panorama) {
    return !!panorama.baseUrl;
  }
  loadTexture(panorama) {
    try {
      checkPanoramaConfig(panorama, this);
    } catch (e) {
      return Promise.reject(e);
    }
    const firstTile = getTileConfig(panorama, 0, this);
    const panoData = {
      fullWidth: firstTile.width,
      fullHeight: firstTile.width / 2,
      croppedWidth: firstTile.width,
      croppedHeight: firstTile.width / 2,
      croppedX: 0,
      croppedY: 0,
      poseHeading: 0,
      posePitch: 0,
      poseRoll: 0
    };
    if (panorama.baseUrl) {
      if (!this.adapter) {
        this.adapter = new EquirectangularAdapter(this.viewer, {
          blur: this.config.baseBlur
        });
      }
      return this.adapter.loadTexture(panorama.baseUrl, panorama.basePanoData).then((textureData) => ({
        panorama,
        texture: textureData.texture,
        panoData
      }));
    } else {
      return Promise.resolve({ panorama, panoData, texture: null });
    }
  }
  createMesh(scale = 1) {
    const geometry = new SphereGeometry(
      CONSTANTS.SPHERE_RADIUS * scale,
      this.SPHERE_SEGMENTS,
      this.SPHERE_HORIZONTAL_SEGMENTS,
      -Math.PI / 2
    ).scale(-0.5, 0.5, 0.5).toNonIndexed();
    geometry.clearGroups();
    let i = 0;
    let k = 0;
    for (; i < this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE; i += NB_VERTICES_BY_SMALL_FACE) {
      geometry.addGroup(i, NB_VERTICES_BY_SMALL_FACE, k++);
    }
    for (; i < this.NB_VERTICES - this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE; i += NB_VERTICES_BY_FACE) {
      geometry.addGroup(i, NB_VERTICES_BY_FACE, k++);
    }
    for (; i < this.NB_VERTICES; i += NB_VERTICES_BY_SMALL_FACE) {
      geometry.addGroup(i, NB_VERTICES_BY_SMALL_FACE, k++);
    }
    geometry.setAttribute(ATTR_ORIGINAL_UV, geometry.getAttribute(ATTR_UV).clone());
    return new Mesh(geometry, []);
  }
  /**
   * Applies the base texture and starts the loading of tiles
   */
  setTexture(mesh, textureData, transition) {
    const { texture } = textureData;
    if (transition) {
      this.state.inTransition = true;
      this.__setTexture(mesh, texture);
      return;
    }
    this.__cleanup();
    this.__setTexture(mesh, texture);
    this.state.materials = mesh.material;
    this.state.geom = mesh.geometry;
    this.state.geom.setAttribute(ATTR_UV, this.state.geom.getAttribute(ATTR_ORIGINAL_UV).clone());
    if (this.config.debug) {
      const wireframe = createWireFrame(this.state.geom);
      this.viewer.renderer.addObject(wireframe);
      this.viewer.renderer.setSphereCorrection(this.viewer.config.sphereCorrection, wireframe);
    }
    setTimeout(() => this.__refresh());
  }
  __setTexture(mesh, texture) {
    let material;
    if (texture) {
      material = new MeshBasicMaterial2({ map: texture, side: FrontSide });
    } else {
      material = new MeshBasicMaterial2({ opacity: 0, side: FrontSide, transparent: true });
    }
    for (let i = 0; i < this.NB_GROUPS; i++) {
      mesh.material.push(material);
    }
  }
  setTextureOpacity(mesh, opacity) {
    mesh.material[0].opacity = opacity;
    mesh.material[0].transparent = opacity < 1;
  }
  /**
   * @throws {@link PSVError} always
   */
  setOverlay() {
    throw new PSVError3("EquirectangularTilesAdapter does not support overlay");
  }
  disposeTexture(textureData) {
    textureData.texture?.dispose();
  }
  /**
   * Compute visible tiles and load them
   */
  __refresh() {
    if (!this.state.geom || this.state.inTransition) {
      return;
    }
    const camera = this.viewer.renderer.camera;
    camera.updateMatrixWorld();
    projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(projScreenMatrix);
    const panorama = this.viewer.config.panorama;
    const zoomLevel = this.viewer.getZoomLevel();
    const tileConfig = getTileConfig(panorama, zoomLevel, this);
    const verticesPosition = this.state.geom.getAttribute(ATTR_POSITION);
    const tilesToLoad = {};
    for (let i = 0; i < this.NB_VERTICES; i += 1) {
      vertexPosition.fromBufferAttribute(verticesPosition, i);
      this.viewer.renderer.meshContainer.updateMatrixWorld();
      vertexPosition.applyMatrix4(this.viewer.renderer.meshContainer.matrixWorld);
      if (frustum.containsPoint(vertexPosition)) {
        let segmentIndex;
        if (i < this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE) {
          segmentIndex = Math.floor(i / 3);
        } else if (i < this.NB_VERTICES - this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE) {
          segmentIndex = Math.floor((i / 3 - this.SPHERE_SEGMENTS) / 2) + this.SPHERE_SEGMENTS;
        } else {
          segmentIndex = Math.floor((i - this.NB_VERTICES - this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE) / 3) + this.SPHERE_HORIZONTAL_SEGMENTS * (this.SPHERE_SEGMENTS - 1);
        }
        const segmentRow = Math.floor(segmentIndex / this.SPHERE_SEGMENTS);
        const segmentCol = segmentIndex - segmentRow * this.SPHERE_SEGMENTS;
        let config = tileConfig;
        const highResConfig = isMultiTiles(panorama) ? getTileConfigByIndex(panorama, panorama.levels.length - 1, this) : null;
        while (config) {
          const row = Math.floor(segmentRow / config.facesByRow);
          const col = Math.floor(segmentCol / config.facesByCol);
          direction.addVectors(camera.position, camera.getWorldDirection(directionVector).multiplyScalar(SPHERE_RADIUS));
          let angle = vertexPosition.angleTo(direction);
          if (row === 0 || row === config.rows - 1) {
            angle *= 2;
          }
          const tile = {
            row,
            col,
            angle,
            config,
            url: null
          };
          const id = tileId(tile);
          if (tilesToLoad[id]) {
            tilesToLoad[id].angle = Math.min(tilesToLoad[id].angle, angle);
            break;
          } else {
            tile.url = panorama.tileUrl(col, row, config.level);
            if (tile.url) {
              tilesToLoad[id] = tile;
              if (highResConfig && highResConfig.level !== config.level) {
                const highResTile = {
                  row,
                  col,
                  angle: angle * 2,
                  config: highResConfig,
                  url: null
                };
                const highResId = tileId(highResTile);
                if (tilesToLoad[highResId]) {
                  tilesToLoad[highResId].angle = Math.min(tilesToLoad[highResId].angle * 2, angle * 2);
                } else {
                  highResTile.url = panorama.tileUrl(col, row, highResConfig.level);
                  if (highResTile.url) {
                    tilesToLoad[highResId] = highResTile;
                  }
                }
              }
              break;
            } else {
              config = getTileConfigByIndex(panorama, config.level - 1, this);
            }
          }
        }
      }
    }
    this.state.tileConfig = tileConfig;
    this.__loadTiles(Object.values(tilesToLoad));
  }
  /**
   * Loads tiles and change existing tiles priority
   */
  __loadTiles(tiles) {
    this.queue.disableAllTasks();
    tiles.forEach((tile) => {
      const id = tileId(tile);
      if (this.state.tiles[id]) {
        this.queue.setPriority(id, tile.angle);
      } else {
        this.state.tiles[id] = true;
        this.queue.enqueue(new Task(id, tile.angle, (task) => this.__loadTile(tile, task)));
      }
    });
    this.queue.start();
  }
  /**
   * Loads and draw a tile
   */
  __loadTile(tile, task) {
    return this.__loadImage(tile.url).then((image) => {
      if (!task.isCancelled()) {
        if (this.config.debug) {
          image = buildDebugTexture(image, tile.config.level, tileId(tile));
        }
        const material = new MeshBasicMaterial2({ map: utils.createTexture(image), side: FrontSide });
        this.__swapMaterial(tile, material, false);
        this.viewer.needsUpdate();
      }
    }).catch(() => {
      if (!task.isCancelled() && this.config.showErrorTile) {
        if (!this.state.errorMaterial) {
          this.state.errorMaterial = buildErrorMaterial();
        }
        this.__swapMaterial(tile, this.state.errorMaterial, true);
        this.viewer.needsUpdate();
      }
    });
  }
  __loadImage(url) {
    if (this.loader) {
      return new Promise((resolve, reject) => {
        this.loader.load(url, resolve, void 0, reject);
      });
    } else {
      return this.viewer.textureLoader.loadImage(url);
    }
  }
  /**
   * Applies a new texture to the faces
   */
  __swapMaterial(tile, material, isError) {
    const uvs = this.state.geom.getAttribute(ATTR_UV);
    for (let c = 0; c < tile.config.facesByCol; c++) {
      for (let r = 0; r < tile.config.facesByRow; r++) {
        const faceCol = tile.col * tile.config.facesByCol + c;
        const faceRow = tile.row * tile.config.facesByRow + r;
        const isFirstRow = faceRow === 0;
        const isLastRow = faceRow === this.SPHERE_HORIZONTAL_SEGMENTS - 1;
        let firstVertex;
        if (isFirstRow) {
          firstVertex = faceCol * NB_VERTICES_BY_SMALL_FACE;
        } else if (isLastRow) {
          firstVertex = this.NB_VERTICES - this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE + faceCol * NB_VERTICES_BY_SMALL_FACE;
        } else {
          firstVertex = this.SPHERE_SEGMENTS * NB_VERTICES_BY_SMALL_FACE + (faceRow - 1) * this.SPHERE_SEGMENTS * NB_VERTICES_BY_FACE + faceCol * NB_VERTICES_BY_FACE;
        }
        if (isError && this.state.faces[firstVertex] > ERROR_LEVEL) {
          continue;
        }
        if (this.state.faces[firstVertex] > tile.config.level) {
          continue;
        }
        this.state.faces[firstVertex] = isError ? ERROR_LEVEL : tile.config.level;
        const matIndex = this.state.geom.groups.find((g) => g.start === firstVertex).materialIndex;
        this.state.materials[matIndex] = material;
        const top = 1 - r / tile.config.facesByRow;
        const bottom = 1 - (r + 1) / tile.config.facesByRow;
        const left = c / tile.config.facesByCol;
        const right = (c + 1) / tile.config.facesByCol;
        if (isFirstRow) {
          uvs.setXY(firstVertex, (left + right) / 2, top);
          uvs.setXY(firstVertex + 1, left, bottom);
          uvs.setXY(firstVertex + 2, right, bottom);
        } else if (isLastRow) {
          uvs.setXY(firstVertex, right, top);
          uvs.setXY(firstVertex + 1, left, top);
          uvs.setXY(firstVertex + 2, (left + right) / 2, bottom);
        } else {
          uvs.setXY(firstVertex, right, top);
          uvs.setXY(firstVertex + 1, left, top);
          uvs.setXY(firstVertex + 2, right, bottom);
          uvs.setXY(firstVertex + 3, left, top);
          uvs.setXY(firstVertex + 4, left, bottom);
          uvs.setXY(firstVertex + 5, right, bottom);
        }
      }
    }
    uvs.needsUpdate = true;
  }
  /**
   * Clears loading queue, dispose all materials
   */
  __cleanup() {
    this.queue.clear();
    this.state.tiles = {};
    this.state.faces = {};
    this.state.inTransition = false;
    this.state.materials.forEach((mat) => {
      mat?.map?.dispose();
      mat?.dispose();
    });
    this.state.materials.length = 0;
  }
};
EquirectangularTilesAdapter.id = "equirectangular-tiles";
EquirectangularTilesAdapter.supportsDownload = false;
EquirectangularTilesAdapter.supportsOverlay = false;
export {
  EquirectangularTilesAdapter
};
//# sourceMappingURL=index.module.js.map