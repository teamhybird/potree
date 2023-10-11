(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('@photo-sphere-viewer/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three', '@photo-sphere-viewer/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.PhotoSphereViewer = global.PhotoSphereViewer || {}, global.PhotoSphereViewer.Shared = {}), global.THREE, global.PhotoSphereViewer));
})(this, (function (exports, THREE, PhotoSphereViewer) {

/*!
 * PhotoSphereViewer.Shared 0.0.0
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

  // index.ts
  var shared_exports = {};
  __export(shared_exports, {
    AbstractVideoAdapter: () => AbstractVideoAdapter,
    Queue: () => Queue,
    Task: () => Task,
    buildDebugTexture: () => buildDebugTexture,
    buildErrorMaterial: () => buildErrorMaterial,
    checkTilesLevels: () => checkTilesLevels,
    createWireFrame: () => createWireFrame,
    debugCurve: () => debugCurve,
    getTileIndexByZoomLevel: () => getTileIndexByZoomLevel
  });

  // AbstractVideoAdapter.ts
  var import_core = require_core();
  var import_three = require_three();
  var AbstractVideoAdapter = class extends import_core.AbstractAdapter {
    constructor(viewer) {
      super(viewer);
      this.viewer.addEventListener(import_core.events.BeforeRenderEvent.type, this);
    }
    destroy() {
      this.viewer.removeEventListener(import_core.events.BeforeRenderEvent.type, this);
      this.__removeVideo();
      super.destroy();
    }
    /**
     * @internal
     */
    handleEvent(e) {
      if (e instanceof import_core.events.BeforeRenderEvent) {
        this.viewer.needsUpdate();
      }
    }
    supportsPreload() {
      return false;
    }
    supportsTransition() {
      return false;
    }
    loadTexture(panorama) {
      if (typeof panorama !== "object" || !panorama.source) {
        return Promise.reject(new import_core.PSVError("Invalid panorama configuration, are you using the right adapter?"));
      }
      if (!this.viewer.getPlugin("video")) {
        return Promise.reject(new import_core.PSVError("Video adapters require VideoPlugin to be loaded too."));
      }
      const video = this.__createVideo(panorama.source);
      return this.__videoLoadPromise(video).then(() => {
        const texture = new import_three.VideoTexture(video);
        return { panorama, texture };
      });
    }
    switchVideo(texture) {
      let currentTime;
      let duration;
      let paused = !this.config.autoplay;
      let muted = this.config.muted;
      let volume = 1;
      if (this.video) {
        ({ currentTime, duration, paused, muted, volume } = this.video);
      }
      this.__removeVideo();
      this.video = texture.image;
      if (this.video.duration === duration) {
        this.video.currentTime = currentTime;
      }
      this.video.muted = muted;
      this.video.volume = volume;
      if (!paused) {
        this.video.play();
      }
    }
    setTextureOpacity(mesh, opacity) {
      mesh.material.opacity = opacity;
      mesh.material.transparent = opacity < 1;
    }
    setOverlay() {
      throw new import_core.PSVError("VideoAdapter does not support overlay");
    }
    disposeTexture(textureData) {
      if (textureData.texture) {
        const video = textureData.texture.image;
        video.pause();
        this.viewer.container.removeChild(video);
      }
      textureData.texture?.dispose();
    }
    __removeVideo() {
      if (this.video) {
        this.video.pause();
        this.viewer.container.removeChild(this.video);
        delete this.video;
      }
    }
    __createVideo(src) {
      const video = document.createElement("video");
      video.crossOrigin = this.viewer.config.withCredentials ? "use-credentials" : "anonymous";
      video.loop = true;
      video.playsInline = true;
      video.style.display = "none";
      video.muted = this.config.muted;
      video.src = src;
      video.preload = "metadata";
      this.viewer.container.appendChild(video);
      return video;
    }
    __videoLoadPromise(video) {
      return new Promise((resolve, reject) => {
        const onLoaded = () => {
          if (this.video && video.duration === this.video.duration) {
            resolve(this.__videoBufferPromise(video, this.video.currentTime));
          } else {
            resolve();
          }
          video.removeEventListener("loadedmetadata", onLoaded);
        };
        const onError = (err) => {
          reject(err);
          video.removeEventListener("error", onError);
        };
        video.addEventListener("loadedmetadata", onLoaded);
        video.addEventListener("error", onError);
      });
    }
    __videoBufferPromise(video, currentTime) {
      return new Promise((resolve) => {
        function onBuffer() {
          const buffer = video.buffered;
          for (let i = 0, l = buffer.length; i < l; i++) {
            if (buffer.start(i) <= video.currentTime && buffer.end(i) >= video.currentTime) {
              video.pause();
              video.removeEventListener("buffer", onBuffer);
              video.removeEventListener("progress", onBuffer);
              resolve();
              break;
            }
          }
        }
        video.currentTime = Math.min(currentTime + 2e3, video.duration);
        video.muted = true;
        video.addEventListener("buffer", onBuffer);
        video.addEventListener("progress", onBuffer);
        video.play();
      });
    }
  };
  AbstractVideoAdapter.supportsDownload = false;
  AbstractVideoAdapter.supportsOverlay = false;

  // autorotate-utils.ts
  var debugMarkers = [];
  function debugCurve(markers, curve, stepSize) {
    debugMarkers.forEach((marker) => {
      try {
        markers.removeMarker(marker);
      } catch (e) {
      }
    });
    markers.addMarker({
      id: "autorotate-path",
      polyline: curve,
      svgStyle: {
        stroke: "white",
        strokeWidth: "2px"
      }
    });
    debugMarkers = ["autorotate-path"];
    curve.forEach((pos, i) => {
      markers.addMarker({
        id: "autorotate-path-" + i,
        circle: 5,
        position: {
          yaw: pos[0],
          pitch: pos[1]
        },
        svgStyle: {
          fill: i % stepSize === 0 ? "red" : "black"
        }
      });
      debugMarkers.push("autorotate-path-" + i);
    });
  }

  // Queue.ts
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

  // tiles-utils.ts
  var import_core2 = require_core();
  var import_three2 = require_three();
  function checkTilesLevels(levels) {
    let previous = 0;
    levels.forEach((level, i) => {
      if (!level.zoomRange || level.zoomRange.length !== 2) {
        throw new import_core2.PSVError(`Tiles level ${i} is missing "zoomRange" property`);
      }
      if (level.zoomRange[0] >= level.zoomRange[1] || level.zoomRange[0] !== previous || i === 0 && level.zoomRange[0] !== 0 || i === levels.length - 1 && level.zoomRange[1] !== 100) {
        throw new import_core2.PSVError(`Tiles levels' "zoomRange" are not orderer or are not covering the whole 0-100 range`);
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
    const texture = new import_three2.CanvasTexture(canvas);
    return new import_three2.MeshBasicMaterial({ map: texture });
  }
  function createWireFrame(geometry) {
    const wireframe = new import_three2.WireframeGeometry(geometry);
    const line = new import_three2.LineSegments(wireframe);
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
  __copyProps(__defProp(exports, "__esModule", { value: true }), shared_exports);

}));//# sourceMappingURL=index.js.map