(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('@photo-sphere-viewer/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'three', '@photo-sphere-viewer/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.PhotoSphereViewer = global.PhotoSphereViewer || {}, global.PhotoSphereViewer.MarkersPlugin = {}), global.THREE, global.PhotoSphereViewer));
})(this, (function (exports, THREE, PhotoSphereViewer) {

/*!
 * PhotoSphereViewer.MarkersPlugin 0.0.0
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
    MarkersPlugin: () => MarkersPlugin,
    events: () => events_exports
  });
  var import_core8 = require_core();

  // src/events.ts
  var events_exports = {};
  __export(events_exports, {
    EnterMarkerEvent: () => EnterMarkerEvent,
    GotoMarkerDoneEvent: () => GotoMarkerDoneEvent,
    HideMarkersEvent: () => HideMarkersEvent,
    LeaveMarkerEvent: () => LeaveMarkerEvent,
    MarkerVisibilityEvent: () => MarkerVisibilityEvent,
    MarkersPluginEvent: () => MarkersPluginEvent,
    RenderMarkersListEvent: () => RenderMarkersListEvent,
    SelectMarkerEvent: () => SelectMarkerEvent,
    SelectMarkerListEvent: () => SelectMarkerListEvent,
    SetMarkersEvent: () => SetMarkersEvent,
    ShowMarkersEvent: () => ShowMarkersEvent,
    UnselectMarkerEvent: () => UnselectMarkerEvent
  });
  var import_core = require_core();
  var MarkersPluginEvent = class extends import_core.TypedEvent {
  };
  var _MarkerVisibilityEvent = class extends MarkersPluginEvent {
    constructor(marker, visible) {
      super(_MarkerVisibilityEvent.type);
      this.marker = marker;
      this.visible = visible;
    }
  };
  var MarkerVisibilityEvent = _MarkerVisibilityEvent;
  MarkerVisibilityEvent.type = "marker-visibility";
  var _GotoMarkerDoneEvent = class extends MarkersPluginEvent {
    constructor(marker) {
      super(_GotoMarkerDoneEvent.type);
      this.marker = marker;
    }
  };
  var GotoMarkerDoneEvent = _GotoMarkerDoneEvent;
  GotoMarkerDoneEvent.type = "goto-marker-done";
  var _LeaveMarkerEvent = class extends MarkersPluginEvent {
    constructor(marker) {
      super(_LeaveMarkerEvent.type);
      this.marker = marker;
    }
  };
  var LeaveMarkerEvent = _LeaveMarkerEvent;
  LeaveMarkerEvent.type = "leave-marker";
  var _EnterMarkerEvent = class extends MarkersPluginEvent {
    constructor(marker) {
      super(_EnterMarkerEvent.type);
      this.marker = marker;
    }
  };
  var EnterMarkerEvent = _EnterMarkerEvent;
  EnterMarkerEvent.type = "enter-marker";
  var _SelectMarkerEvent = class extends MarkersPluginEvent {
    constructor(marker, doubleClick, rightClick) {
      super(_SelectMarkerEvent.type);
      this.marker = marker;
      this.doubleClick = doubleClick;
      this.rightClick = rightClick;
    }
  };
  var SelectMarkerEvent = _SelectMarkerEvent;
  SelectMarkerEvent.type = "select-marker";
  var _SelectMarkerListEvent = class extends MarkersPluginEvent {
    constructor(marker) {
      super(_SelectMarkerListEvent.type);
      this.marker = marker;
    }
  };
  var SelectMarkerListEvent = _SelectMarkerListEvent;
  SelectMarkerListEvent.type = "select-marker-list";
  var _UnselectMarkerEvent = class extends MarkersPluginEvent {
    constructor(marker) {
      super(_UnselectMarkerEvent.type);
      this.marker = marker;
    }
  };
  var UnselectMarkerEvent = _UnselectMarkerEvent;
  UnselectMarkerEvent.type = "unselect-marker";
  var _HideMarkersEvent = class extends MarkersPluginEvent {
    constructor() {
      super(_HideMarkersEvent.type);
    }
  };
  var HideMarkersEvent = _HideMarkersEvent;
  HideMarkersEvent.type = "hide-markers";
  var _SetMarkersEvent = class extends MarkersPluginEvent {
    constructor(markers) {
      super(_SetMarkersEvent.type);
      this.markers = markers;
    }
  };
  var SetMarkersEvent = _SetMarkersEvent;
  SetMarkersEvent.type = "set-markers";
  var _ShowMarkersEvent = class extends MarkersPluginEvent {
    constructor() {
      super(_ShowMarkersEvent.type);
    }
  };
  var ShowMarkersEvent = _ShowMarkersEvent;
  ShowMarkersEvent.type = "show-markers";
  var _RenderMarkersListEvent = class extends MarkersPluginEvent {
    constructor(markers) {
      super(_RenderMarkersListEvent.type);
      this.markers = markers;
    }
  };
  var RenderMarkersListEvent = _RenderMarkersListEvent;
  RenderMarkersListEvent.type = "render-markers-list";

  // src/MarkersButton.ts
  var import_core2 = require_core();

  // src/icons/pin.svg
  var pin_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="10 9 81 81"><path fill="currentColor" d="M50.5 90S22.9 51.9 22.9 36.6 35.2 9 50.5 9s27.6 12.4 27.6 27.6S50.5 90 50.5 90zm0-66.3c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11z"/><!--Created by Rohith M S from the Noun Project--></svg>\n';

  // src/MarkersButton.ts
  var MarkersButton = class extends import_core2.AbstractButton {
    constructor(navbar) {
      super(navbar, {
        className: "psv-markers-button",
        icon: pin_default,
        hoverScale: true,
        collapsable: true,
        tabbable: true
      });
      this.plugin = this.viewer.getPlugin("markers");
      if (this.plugin) {
        this.plugin.addEventListener(ShowMarkersEvent.type, this);
        this.plugin.addEventListener(HideMarkersEvent.type, this);
        this.toggleActive(true);
      }
    }
    destroy() {
      if (this.plugin) {
        this.plugin.removeEventListener(ShowMarkersEvent.type, this);
        this.plugin.removeEventListener(HideMarkersEvent.type, this);
      }
      super.destroy();
    }
    isSupported() {
      return !!this.plugin;
    }
    handleEvent(e) {
      if (e instanceof ShowMarkersEvent) {
        this.toggleActive(true);
      } else if (e instanceof HideMarkersEvent) {
        this.toggleActive(false);
      }
    }
    onClick() {
      this.plugin.toggleAllMarkers();
    }
  };
  MarkersButton.id = "markers";

  // src/MarkersListButton.ts
  var import_core4 = require_core();

  // src/constants.ts
  var import_core3 = require_core();

  // src/icons/pin-list.svg
  var pin_list_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="9 9 81 81"><path fill="currentColor" d="M37.5 90S9.9 51.9 9.9 36.6 22.2 9 37.5 9s27.6 12.4 27.6 27.6S37.5 90 37.5 90zm0-66.3c-6.1 0-11 4.9-11 11s4.9 11 11 11 11-4.9 11-11-4.9-11-11-11zM86.7 55H70c-1.8 0-3.3-1.5-3.3-3.3s1.5-3.3 3.3-3.3h16.7c1.8 0 3.3 1.5 3.3 3.3S88.5 55 86.7 55zm0-25h-15a3.3 3.3 0 0 1-3.3-3.3c0-1.8 1.5-3.3 3.3-3.3h15c1.8 0 3.3 1.5 3.3 3.3 0 1.8-1.5 3.3-3.3 3.3zM56.5 73h30c1.8 0 3.3 1.5 3.3 3.3 0 1.8-1.5 3.3-3.3 3.3h-30a3.3 3.3 0 0 1-3.3-3.3 3.2 3.2 0 0 1 3.3-3.3z"/><!--Created by Rohith M S from the Noun Project--></svg>\n';

  // src/constants.ts
  var SVG_NS = "http://www.w3.org/2000/svg";
  var MARKER_DATA = "psvMarker";
  var MARKER_DATA_KEY = import_core3.utils.dasherize(MARKER_DATA);
  var ID_PANEL_MARKER = "marker";
  var ID_PANEL_MARKERS_LIST = "markersList";
  var MARKERS_LIST_TEMPLATE = (markers, title) => `
<div class="psv-panel-menu psv-panel-menu--stripped">
 <h1 class="psv-panel-menu-title">${pin_list_default} ${title}</h1>
 <ul class="psv-panel-menu-list">
   ${markers.map((marker) => `
   <li data-${MARKER_DATA_KEY}="${marker.id}" class="psv-panel-menu-item" tabindex="0">
     ${marker.type === "image" ? `<span class="psv-panel-menu-item-icon"><img src="${marker.definition}"/></span>` : ""}
     <span class="psv-panel-menu-item-label">${marker.getListContent()}</span>
   </li>
   `).join("")}
 </ul>
</div>
`;

  // src/MarkersListButton.ts
  var MarkersListButton = class extends import_core4.AbstractButton {
    constructor(navbar) {
      super(navbar, {
        className: " psv-markers-list-button",
        icon: pin_list_default,
        hoverScale: true,
        collapsable: true,
        tabbable: true
      });
      this.plugin = this.viewer.getPlugin("markers");
      if (this.plugin) {
        this.viewer.addEventListener(import_core4.events.ShowPanelEvent.type, this);
        this.viewer.addEventListener(import_core4.events.HidePanelEvent.type, this);
      }
    }
    destroy() {
      this.viewer.removeEventListener(import_core4.events.ShowPanelEvent.type, this);
      this.viewer.removeEventListener(import_core4.events.HidePanelEvent.type, this);
      super.destroy();
    }
    isSupported() {
      return !!this.plugin;
    }
    handleEvent(e) {
      if (e instanceof import_core4.events.ShowPanelEvent) {
        this.toggleActive(e.panelId === ID_PANEL_MARKERS_LIST);
      } else if (e instanceof import_core4.events.HidePanelEvent) {
        this.toggleActive(false);
      }
    }
    onClick() {
      this.plugin.toggleMarkersList();
    }
  };
  MarkersListButton.id = "markersList";

  // src/MarkersPlugin.ts
  var import_core7 = require_core();
  var import_three2 = require_three();

  // src/Marker.ts
  var import_core6 = require_core();
  var import_three = require_three();

  // src/utils.ts
  var import_core5 = require_core();
  function greatArcIntermediaryPoint(p1, p2, f) {
    const [\u03BB1, \u03C61] = p1;
    const [\u03BB2, \u03C62] = p2;
    const r = import_core5.utils.greatArcDistance(p1, p2);
    const a = Math.sin((1 - f) * r) / Math.sin(r);
    const b = Math.sin(f * r) / Math.sin(r);
    const x = a * Math.cos(\u03C61) * Math.cos(\u03BB1) + b * Math.cos(\u03C62) * Math.cos(\u03BB2);
    const y = a * Math.cos(\u03C61) * Math.sin(\u03BB1) + b * Math.cos(\u03C62) * Math.sin(\u03BB2);
    const z = a * Math.sin(\u03C61) + b * Math.sin(\u03C62);
    return [Math.atan2(y, x), Math.atan2(z, Math.sqrt(x * x + y * y))];
  }
  function getPolygonCoherentPoints(points) {
    const workPoints = [points[0]];
    let k = 0;
    for (let i = 1; i < points.length; i++) {
      const d = points[i - 1][0] - points[i][0];
      if (d > Math.PI) {
        k += 1;
      } else if (d < -Math.PI) {
        k -= 1;
      }
      workPoints.push([points[i][0] + k * 2 * Math.PI, points[i][1]]);
    }
    return workPoints;
  }
  function getPolygonCenter(polygon) {
    const points = getPolygonCoherentPoints(polygon);
    const sum = points.reduce((intermediary, point) => [intermediary[0] + point[0], intermediary[1] + point[1]]);
    return [import_core5.utils.parseAngle(sum[0] / polygon.length), sum[1] / polygon.length];
  }
  function getPolylineCenter(polyline) {
    const points = getPolygonCoherentPoints(polyline);
    let length = 0;
    const lengths = [];
    for (let i = 0; i < points.length - 1; i++) {
      const l = import_core5.utils.greatArcDistance(points[i], points[i + 1]) * import_core5.CONSTANTS.SPHERE_RADIUS;
      lengths.push(l);
      length += l;
    }
    let consumed = 0;
    for (let j = 0; j < points.length - 1; j++) {
      if (consumed + lengths[j] > length / 2) {
        const r = (length / 2 - consumed) / lengths[j];
        return greatArcIntermediaryPoint(points[j], points[j + 1], r);
      }
      consumed += lengths[j];
    }
    return points[Math.round(points.length / 2)];
  }

  // src/Marker.ts
  var MarkerType = /* @__PURE__ */ ((MarkerType2) => {
    MarkerType2["image"] = "image";
    MarkerType2["imageLayer"] = "imageLayer";
    MarkerType2["html"] = "html";
    MarkerType2["polygon"] = "polygon";
    MarkerType2["polygonPixels"] = "polygonPixels";
    MarkerType2["polyline"] = "polyline";
    MarkerType2["polylinePixels"] = "polylinePixels";
    MarkerType2["square"] = "square";
    MarkerType2["rect"] = "rect";
    MarkerType2["circle"] = "circle";
    MarkerType2["ellipse"] = "ellipse";
    MarkerType2["path"] = "path";
    return MarkerType2;
  })(MarkerType || {});
  var Marker = class {
    constructor(viewer, config) {
      this.viewer = viewer;
      this.visible = true;
      /** @internal */
      this.state = {
        dynamicSize: false,
        anchor: null,
        visible: false,
        staticTooltip: false,
        position: null,
        position2D: null,
        positions3D: null,
        size: null
      };
      if (!config.id) {
        throw new import_core6.PSVError("missing marker id");
      }
      this.type = Marker.getType(config);
      if (this.isNormal()) {
        this.element = document.createElement("div");
      } else if (this.isPolygon()) {
        this.element = document.createElementNS(SVG_NS, "polygon");
      } else if (this.isPolyline()) {
        this.element = document.createElementNS(SVG_NS, "polyline");
      } else if (this.isSvg()) {
        const svgType = this.type === "square" /* square */ ? "rect" : this.type;
        this.element = document.createElementNS(SVG_NS, svgType);
      } else if (this.is3d()) {
        this.element = this.__createMesh();
        this.loader = new import_three.TextureLoader();
        if (this.viewer.config.withCredentials) {
          this.loader.setWithCredentials(true);
        }
      }
      if (!this.is3d()) {
        this.element.id = `psv-marker-${config.id}`;
        this.element[MARKER_DATA] = this;
      }
      this.update(config);
    }
    get id() {
      return this.config.id;
    }
    get data() {
      return this.config.data;
    }
    get domElement() {
      return !this.is3d() ? this.element : null;
    }
    get threeElement() {
      return this.is3d() ? this.element : null;
    }
    /**
     * @internal
     */
    destroy() {
      this.hideTooltip();
      if (this.is3d()) {
        delete this.threeElement.children[0].userData[MARKER_DATA];
      } else {
        delete this.element[MARKER_DATA];
      }
    }
    /**
     * Checks if it is a 3D marker (imageLayer)
     */
    is3d() {
      return this.type === "imageLayer" /* imageLayer */;
    }
    /**
     * Checks if it is a normal marker (image or html)
     */
    isNormal() {
      return this.type === "image" /* image */ || this.type === "html" /* html */;
    }
    /**
     * Checks if it is a polygon/polyline marker
     */
    isPoly() {
      return this.isPolygon() || this.isPolyline();
    }
    /**
     * Checks if it is a polygon/polyline using pixel coordinates
     */
    isPolyPixels() {
      return this.type === "polygonPixels" /* polygonPixels */ || this.type === "polylinePixels" /* polylinePixels */;
    }
    /**
     * Checks if it is a polygon/polyline using radian coordinates
     */
    isPolyAngles() {
      return this.type === "polygon" /* polygon */ || this.type === "polyline" /* polyline */;
    }
    /**
     * Checks if it is a polygon marker
     */
    isPolygon() {
      return this.type === "polygon" /* polygon */ || this.type === "polygonPixels" /* polygonPixels */;
    }
    /**
     * Checks if it is a polyline marker
     */
    isPolyline() {
      return this.type === "polyline" /* polyline */ || this.type === "polylinePixels" /* polylinePixels */;
    }
    /**
     * Checks if it is an SVG marker
     */
    isSvg() {
      return this.type === "square" /* square */ || this.type === "rect" /* rect */ || this.type === "circle" /* circle */ || this.type === "ellipse" /* ellipse */ || this.type === "path" /* path */;
    }
    /**
     * Computes marker scale
     * @internal
     */
    getScale(zoomLevel, position) {
      if (!this.config.scale) {
        return 1;
      }
      if (typeof this.config.scale === "function") {
        return this.config.scale(zoomLevel, position);
      }
      let scale = 1;
      if (Array.isArray(this.config.scale.zoom)) {
        const [min, max] = this.config.scale.zoom;
        scale *= min + (max - min) * import_core6.CONSTANTS.EASINGS.inQuad(zoomLevel / 100);
      }
      if (Array.isArray(this.config.scale.yaw)) {
        const [min, max] = this.config.scale.yaw;
        const halfFov = import_three.MathUtils.degToRad(this.viewer.state.hFov) / 2;
        const arc = Math.abs(import_core6.utils.getShortestArc(this.state.position.yaw, position.yaw));
        scale *= max + (min - max) * import_core6.CONSTANTS.EASINGS.outQuad(Math.max(0, (halfFov - arc) / halfFov));
      }
      return scale;
    }
    /**
     * Returns the markers list content for the marker, it can be either :
     * - the `listContent`
     * - the `tooltip`
     * - the `html`
     * - the `id`
     * @internal
     */
    getListContent() {
      if (this.config.listContent) {
        return this.config.listContent;
      } else if (this.config.tooltip?.content) {
        return this.config.tooltip.content;
      } else if (this.config.html) {
        return this.config.html;
      } else {
        return this.id;
      }
    }
    /**
     * Display the tooltip of this marker
     * @internal
     */
    showTooltip(clientX, clientY) {
      if (this.state.visible && this.config.tooltip?.content && this.state.position2D) {
        const config = {
          ...this.config.tooltip,
          data: this,
          top: 0,
          left: 0
        };
        if (this.isPoly()) {
          if (clientX || clientY) {
            const viewerPos = import_core6.utils.getPosition(this.viewer.container);
            config.top = clientY - viewerPos.y;
            config.left = clientX - viewerPos.x;
            config.box = {
              // separate the tooltip from the cursor
              width: 20,
              height: 20
            };
          } else {
            config.top = this.state.position2D.y;
            config.left = this.state.position2D.x;
          }
        } else {
          config.top = this.state.position2D.y + this.state.size.height / 2;
          config.left = this.state.position2D.x + this.state.size.width / 2;
          config.box = {
            width: this.state.size.width,
            height: this.state.size.height
          };
        }
        if (this.tooltip) {
          this.tooltip.move(config);
        } else {
          this.tooltip = this.viewer.createTooltip(config);
        }
      }
    }
    /**
     * Recompute the position of the tooltip
     * @internal
     */
    refreshTooltip() {
      if (this.tooltip) {
        this.showTooltip();
      }
    }
    /**
     * Hides the tooltip of this marker
     * @internal
     */
    hideTooltip() {
      if (this.tooltip) {
        this.tooltip.hide();
        this.tooltip = null;
      }
    }
    /**
     * Updates the marker with new properties
     * @throws {@link PSVError} if the configuration is invalid
     * @internal
     */
    update(config) {
      const newType = Marker.getType(config, true);
      if (newType !== void 0 && newType !== this.type) {
        throw new import_core6.PSVError("cannot change marker type");
      }
      if (import_core6.utils.isExtendedPosition(config)) {
        import_core6.utils.logWarn('Use the "position" property to configure the position of a marker');
        config.position = this.viewer.dataHelper.cleanPosition(config);
      }
      if ("width" in config && "height" in config) {
        import_core6.utils.logWarn('Use the "size" property to configure the size of a marker');
        config.size = { width: config["width"], height: config["height"] };
      }
      this.config = import_core6.utils.deepmerge(this.config, config);
      if (typeof this.config.tooltip === "string") {
        this.config.tooltip = { content: this.config.tooltip };
      }
      if (this.config.tooltip && !this.config.tooltip.trigger) {
        this.config.tooltip.trigger = "hover";
      }
      if (this.config.scale && Array.isArray(this.config.scale)) {
        this.config.scale = { zoom: this.config.scale };
      }
      this.visible = this.config.visible !== false;
      this.state.anchor = import_core6.utils.parsePoint(this.config.anchor);
      if (!this.is3d()) {
        const element = this.domElement;
        if (this.isNormal()) {
          element.setAttribute("class", "psv-marker psv-marker--normal");
        } else {
          element.setAttribute("class", "psv-marker psv-marker--svg");
        }
        if (this.config.className) {
          import_core6.utils.addClasses(element, this.config.className);
        }
        if (this.config.tooltip) {
          element.classList.add("psv-marker--has-tooltip");
        }
        if (this.config.content) {
          element.classList.add("psv-marler--has-content");
        }
        element.style.opacity = `${this.config.opacity ?? 1}`;
        if (this.config.style) {
          Object.assign(element.style, this.config.style);
        }
      }
      if (this.isNormal()) {
        this.__updateNormal();
      } else if (this.isPoly()) {
        this.__updatePoly();
      } else if (this.isSvg()) {
        this.__updateSvg();
      } else if (this.is3d()) {
        this.__update3d();
      }
    }
    /**
     * Updates a normal marker
     */
    __updateNormal() {
      const element = this.domElement;
      if (!import_core6.utils.isExtendedPosition(this.config.position)) {
        throw new import_core6.PSVError("missing marker position");
      }
      if (this.config.image && !this.config.size) {
        throw new import_core6.PSVError("missing marker size");
      }
      if (this.config.size) {
        this.state.dynamicSize = false;
        this.state.size = this.config.size;
        element.style.width = this.config.size.width + "px";
        element.style.height = this.config.size.height + "px";
      } else {
        this.state.dynamicSize = true;
      }
      if (this.config.image) {
        this.definition = this.config.image;
        element.style.backgroundImage = `url(${this.config.image})`;
      } else if (this.config.html) {
        this.definition = this.config.html;
        element.innerHTML = this.config.html;
      }
      element.style.transformOrigin = `${this.state.anchor.x * 100}% ${this.state.anchor.y * 100}%`;
      this.state.position = this.viewer.dataHelper.cleanPosition(this.config.position);
      this.state.positions3D = [this.viewer.dataHelper.sphericalCoordsToVector3(this.state.position)];
    }
    /**
     * Updates an SVG marker
     */
    __updateSvg() {
      const element = this.domElement;
      if (!import_core6.utils.isExtendedPosition(this.config.position)) {
        throw new import_core6.PSVError("missing marker position");
      }
      this.state.dynamicSize = true;
      switch (this.type) {
        case "square" /* square */:
          this.definition = {
            x: 0,
            y: 0,
            width: this.config.square,
            height: this.config.square
          };
          break;
        case "rect" /* rect */:
          if (Array.isArray(this.config.rect)) {
            this.definition = {
              x: 0,
              y: 0,
              width: this.config.rect[0],
              height: this.config.rect[1]
            };
          } else {
            this.definition = {
              x: 0,
              y: 0,
              width: this.config.rect.width,
              height: this.config.rect.height
            };
          }
          break;
        case "circle" /* circle */:
          this.definition = {
            cx: this.config.circle,
            cy: this.config.circle,
            r: this.config.circle
          };
          break;
        case "ellipse" /* ellipse */:
          if (Array.isArray(this.config.ellipse)) {
            this.definition = {
              cx: this.config.ellipse[0],
              cy: this.config.ellipse[1],
              rx: this.config.ellipse[0],
              ry: this.config.ellipse[1]
            };
          } else {
            this.definition = {
              cx: this.config.ellipse.rx,
              cy: this.config.ellipse.ry,
              rx: this.config.ellipse.rx,
              ry: this.config.ellipse.ry
            };
          }
          break;
        case "path" /* path */:
          this.definition = {
            d: this.config.path
          };
          break;
      }
      Object.entries(this.definition).forEach(([prop, value]) => {
        element.setAttributeNS(null, prop, value);
      });
      if (this.config.svgStyle) {
        Object.entries(this.config.svgStyle).forEach(([prop, value]) => {
          element.setAttributeNS(null, import_core6.utils.dasherize(prop), value);
        });
      } else {
        element.setAttributeNS(null, "fill", "rgba(0,0,0,0.5)");
      }
      this.state.position = this.viewer.dataHelper.cleanPosition(this.config.position);
      this.state.positions3D = [this.viewer.dataHelper.sphericalCoordsToVector3(this.state.position)];
    }
    /**
     * Updates a polygon marker
     */
    __updatePoly() {
      const element = this.domElement;
      this.state.dynamicSize = true;
      if (this.config.svgStyle) {
        Object.entries(this.config.svgStyle).forEach(([prop, value]) => {
          element.setAttributeNS(null, import_core6.utils.dasherize(prop), value);
        });
        if (this.isPolyline() && !this.config.svgStyle.fill) {
          element.setAttributeNS(null, "fill", "none");
        }
      } else if (this.isPolygon()) {
        element.setAttributeNS(null, "fill", "rgba(0,0,0,0.5)");
      } else if (this.isPolyline()) {
        element.setAttributeNS(null, "fill", "none");
        element.setAttributeNS(null, "stroke", "rgb(0,0,0)");
      }
      const actualPoly = this.config[this.type];
      if (!Array.isArray(actualPoly[0])) {
        for (let i = 0; i < actualPoly.length; i++) {
          actualPoly.splice(i, 2, [actualPoly[i], actualPoly[i + 1]]);
        }
      }
      if (this.isPolyPixels()) {
        this.definition = actualPoly.map((coord) => {
          const sphericalCoords = this.viewer.dataHelper.textureCoordsToSphericalCoords({
            textureX: coord[0],
            textureY: coord[1]
          });
          return [sphericalCoords.yaw, sphericalCoords.pitch];
        });
      } else {
        this.definition = actualPoly.map((coord) => {
          return [import_core6.utils.parseAngle(coord[0]), import_core6.utils.parseAngle(coord[1], true)];
        });
      }
      const centroid = this.isPolygon() ? getPolygonCenter(this.definition) : getPolylineCenter(this.definition);
      this.state.position = {
        yaw: centroid[0],
        pitch: centroid[1]
      };
      this.state.positions3D = this.definition.map((coord) => {
        return this.viewer.dataHelper.sphericalCoordsToVector3({ yaw: coord[0], pitch: coord[1] });
      });
    }
    /**
     * Updates a 3D marker
     */
    __update3d() {
      const element = this.threeElement;
      if (!import_core6.utils.isExtendedPosition(this.config.position)) {
        throw new import_core6.PSVError("missing marker position");
      }
      if (!this.config.size) {
        throw new import_core6.PSVError("missing marker size");
      }
      this.state.dynamicSize = false;
      this.state.size = this.config.size;
      this.state.position = this.viewer.dataHelper.cleanPosition(this.config.position);
      this.state.positions3D = [this.viewer.dataHelper.sphericalCoordsToVector3(this.state.position)];
      switch (this.type) {
        case "imageLayer" /* imageLayer */:
          if (this.definition !== this.config.imageLayer) {
            if (this.viewer.config.requestHeaders) {
              this.loader.setRequestHeader(this.viewer.config.requestHeaders(this.config.imageLayer));
            }
            element.children[0].material.map = this.loader.load(
              this.config.imageLayer,
              (texture) => {
                texture.anisotropy = 4;
                this.viewer.needsUpdate();
              }
            );
            this.definition = this.config.imageLayer;
          }
          element.children[0].position.set(this.state.anchor.x - 0.5, this.state.anchor.y - 0.5, 0);
          element.children[0].material.opacity = this.config.opacity ?? 1;
          element.position.copy(this.state.positions3D[0]);
          switch (this.config.orientation) {
            case "horizontal":
              element.lookAt(0, element.position.y, 0);
              element.rotateX(this.state.position.pitch < 0 ? -Math.PI / 2 : Math.PI / 2);
              break;
            case "vertical-left":
              element.lookAt(0, 0, 0);
              element.rotateY(-Math.PI * 0.4);
              break;
            case "vertical-right":
              element.lookAt(0, 0, 0);
              element.rotateY(Math.PI * 0.4);
              break;
            default:
              element.lookAt(0, 0, 0);
              break;
          }
          element.scale.set(this.config.size.width / 100, this.config.size.height / 100, 1);
          break;
      }
    }
    __createMesh() {
      const material = new import_three.MeshBasicMaterial({
        transparent: true,
        opacity: 1,
        depthTest: false
      });
      const geometry = new import_three.PlaneGeometry(1, 1);
      const mesh = new import_three.Mesh(geometry, material);
      mesh.userData = { [MARKER_DATA]: this };
      const element = new import_three.Group().add(mesh);
      Object.defineProperty(element, "visible", {
        enumerable: true,
        get: function() {
          return this.children[0].userData[MARKER_DATA].visible;
        },
        set: function(visible) {
          this.children[0].userData[MARKER_DATA].visible = visible;
        }
      });
      return element;
    }
    /**
     * Determines the type of a marker by the available properties
     * @throws {@link PSVError} when the marker's type cannot be found
     */
    static getType(config, allowNone = false) {
      const found = [];
      Object.keys(MarkerType).forEach((type) => {
        if (config[type]) {
          found.push(type);
        }
      });
      if (found.length === 0 && !allowNone) {
        throw new import_core6.PSVError(`missing marker content, either ${Object.keys(MarkerType).join(", ")}`);
      } else if (found.length > 1) {
        throw new import_core6.PSVError(`multiple marker content, either ${Object.keys(MarkerType).join(", ")}`);
      }
      return found[0];
    }
  };

  // src/MarkersPlugin.ts
  var getConfig = import_core7.utils.getConfigParser({
    clickEventOnMarker: false,
    gotoMarkerSpeed: "8rpm",
    markers: null
  });
  var MarkersPlugin = class extends import_core7.AbstractConfigurablePlugin {
    constructor(viewer, config) {
      super(viewer, config);
      this.markers = {};
      this.state = {
        visible: true,
        showAllTooltips: false,
        currentMarker: null,
        hoveringMarker: null
      };
      this.container = document.createElement("div");
      this.container.className = "psv-markers";
      this.container.style.cursor = this.viewer.config.mousemove ? "move" : "default";
      this.svgContainer = document.createElementNS(SVG_NS, "svg");
      this.svgContainer.setAttribute("class", "psv-markers-svg-container");
      this.container.appendChild(this.svgContainer);
      this.container.addEventListener("mouseenter", this, true);
      this.container.addEventListener("mouseleave", this, true);
      this.container.addEventListener("mousemove", this, true);
      this.container.addEventListener("contextmenu", this);
    }
    /**
     * @internal
     */
    init() {
      super.init();
      this.viewer.container.appendChild(this.container);
      this.viewer.addEventListener(import_core7.events.ClickEvent.type, this);
      this.viewer.addEventListener(import_core7.events.DoubleClickEvent.type, this);
      this.viewer.addEventListener(import_core7.events.RenderEvent.type, this);
      this.viewer.addEventListener(import_core7.events.ConfigChangedEvent.type, this);
      this.viewer.addEventListener(import_core7.events.ObjectEnterEvent.type, this);
      this.viewer.addEventListener(import_core7.events.ObjectHoverEvent.type, this);
      this.viewer.addEventListener(import_core7.events.ObjectLeaveEvent.type, this);
      this.viewer.addEventListener(import_core7.events.ReadyEvent.type, this, { once: true });
    }
    /**
     * @internal
     */
    destroy() {
      this.clearMarkers(false);
      this.viewer.unobserveObjects(MARKER_DATA);
      this.viewer.removeEventListener(import_core7.events.ClickEvent.type, this);
      this.viewer.removeEventListener(import_core7.events.DoubleClickEvent.type, this);
      this.viewer.removeEventListener(import_core7.events.RenderEvent.type, this);
      this.viewer.removeEventListener(import_core7.events.ConfigChangedEvent.type, this);
      this.viewer.removeEventListener(import_core7.events.ObjectEnterEvent.type, this);
      this.viewer.removeEventListener(import_core7.events.ObjectHoverEvent.type, this);
      this.viewer.removeEventListener(import_core7.events.ObjectLeaveEvent.type, this);
      this.viewer.removeEventListener(import_core7.events.ReadyEvent.type, this);
      this.viewer.container.removeChild(this.container);
      super.destroy();
    }
    /**
     * @internal
     */
    handleEvent(e) {
      switch (e.type) {
        case import_core7.events.ReadyEvent.type:
          if (this.config.markers) {
            this.setMarkers(this.config.markers);
            delete this.config.markers;
          }
          break;
        case import_core7.events.RenderEvent.type:
          this.renderMarkers();
          break;
        case import_core7.events.ClickEvent.type:
          this.__onClick(e, false);
          break;
        case import_core7.events.DoubleClickEvent.type:
          this.__onClick(e, true);
          break;
        case import_core7.events.ConfigChangedEvent.type:
          this.container.style.cursor = this.viewer.config.mousemove ? "move" : "default";
          break;
        case import_core7.events.ObjectEnterEvent.type:
        case import_core7.events.ObjectLeaveEvent.type:
        case import_core7.events.ObjectHoverEvent.type:
          if (e.userDataKey === MARKER_DATA) {
            const event = e.originalEvent;
            const marker = e.object.userData[MARKER_DATA];
            switch (e.type) {
              case import_core7.events.ObjectEnterEvent.type:
                this.__onMouseEnter(event, marker);
                break;
              case import_core7.events.ObjectLeaveEvent.type:
                this.__onMouseLeave(event, marker);
                break;
              case import_core7.events.ObjectHoverEvent.type:
                this.__onMouseMove(event, marker);
                break;
            }
          }
          break;
        case "mouseenter":
          this.__onMouseEnter(e, this.__getTargetMarker(e.target));
          break;
        case "mouseleave":
          this.__onMouseLeave(e, this.__getTargetMarker(e.target));
          break;
        case "mousemove":
          this.__onMouseMove(e, this.__getTargetMarker(e.target));
          break;
        case "contextmenu":
          e.preventDefault();
          break;
      }
    }
    /**
     * Toggles all markers
     */
    toggleAllMarkers() {
      if (this.state.visible) {
        this.hideAllMarkers();
      } else {
        this.showAllMarkers();
      }
    }
    /**
     * Shows all markers
     */
    showAllMarkers() {
      this.state.visible = true;
      this.renderMarkers();
      this.dispatchEvent(new ShowMarkersEvent());
    }
    /**
     * Hides all markers
     */
    hideAllMarkers() {
      this.state.visible = false;
      this.renderMarkers();
      this.dispatchEvent(new HideMarkersEvent());
    }
    /**
     * Toggles the visibility of all tooltips
     */
    toggleAllTooltips() {
      if (this.state.showAllTooltips) {
        this.hideAllTooltips();
      } else {
        this.showAllTooltips();
      }
    }
    /**
     *  Displays all tooltips
     */
    showAllTooltips() {
      this.state.showAllTooltips = true;
      Object.values(this.markers).forEach((marker) => {
        marker.state.staticTooltip = true;
        marker.showTooltip();
      });
    }
    /**
     * Hides all tooltips
     */
    hideAllTooltips() {
      this.state.showAllTooltips = false;
      Object.values(this.markers).forEach((marker) => {
        marker.state.staticTooltip = false;
        marker.hideTooltip();
      });
    }
    /**
     * Returns the total number of markers
     */
    getNbMarkers() {
      return Object.keys(this.markers).length;
    }
    /**
     * Returns all the markers
     */
    getMarkers() {
      return Object.values(this.markers);
    }
    /**
     * Adds a new marker to viewer
     * @throws {@link PSVError} when the marker's id is missing or already exists
     */
    addMarker(config, render = true) {
      if (this.markers[config.id]) {
        throw new import_core7.PSVError(`marker "${config.id}" already exists`);
      }
      const marker = new Marker(this.viewer, config);
      if (marker.isNormal()) {
        this.container.appendChild(marker.domElement);
      } else if (marker.isPoly() || marker.isSvg()) {
        this.svgContainer.appendChild(marker.domElement);
      } else if (marker.is3d()) {
        this.viewer.renderer.addObject(marker.threeElement);
      } else {
        throw new import_core7.PSVError("invalid state");
      }
      this.markers[marker.id] = marker;
      if (render) {
        this.__afterChangerMarkers();
      }
    }
    /**
     * Returns the internal marker object for a marker id
     * @throws {@link PSVError} when the marker cannot be found
     */
    getMarker(markerId) {
      const id = typeof markerId === "object" ? markerId.id : markerId;
      if (!this.markers[id]) {
        throw new import_core7.PSVError(`cannot find marker "${id}"`);
      }
      return this.markers[id];
    }
    /**
     * Returns the last marker selected by the user
     */
    getCurrentMarker() {
      return this.state.currentMarker;
    }
    /**
     * Updates the existing marker with the same id
     * @description Every property can be changed but you can't change its type (Eg: `image` to `html`)
     */
    updateMarker(config, render = true) {
      const marker = this.getMarker(config.id);
      marker.update(config);
      if (render) {
        this.__afterChangerMarkers();
      }
    }
    /**
     * Removes a marker from the viewer
     */
    removeMarker(markerId, render = true) {
      const marker = this.getMarker(markerId);
      if (marker.isNormal()) {
        this.container.removeChild(marker.domElement);
      } else if (marker.isPoly() || marker.isSvg()) {
        this.svgContainer.removeChild(marker.domElement);
      } else if (marker.is3d()) {
        this.viewer.renderer.removeObject(marker.threeElement);
      }
      if (this.state.hoveringMarker === marker) {
        this.state.hoveringMarker = null;
      }
      if (this.state.currentMarker === marker) {
        this.state.currentMarker = null;
      }
      marker.destroy();
      delete this.markers[marker.id];
      if (render) {
        this.__afterChangerMarkers();
      }
    }
    /**
     * Removes multiple markers
     */
    removeMarkers(markerIds, render = true) {
      markerIds.forEach((markerId) => this.removeMarker(markerId, false));
      if (render) {
        this.__afterChangerMarkers();
      }
    }
    /**
     * Replaces all markers
     */
    setMarkers(markers, render = true) {
      this.clearMarkers(false);
      markers?.forEach((marker) => {
        this.addMarker(marker, false);
      });
      if (render) {
        this.__afterChangerMarkers();
      }
    }
    /**
     * Removes all markers
     */
    clearMarkers(render = true) {
      Object.keys(this.markers).forEach((markerId) => {
        this.removeMarker(markerId, false);
      });
      if (render) {
        this.__afterChangerMarkers();
      }
    }
    /**
     * Rotate the view to face the marker
     */
    gotoMarker(markerId, speed = this.config.gotoMarkerSpeed) {
      const marker = this.getMarker(markerId);
      if (!speed) {
        this.viewer.rotate(marker.state.position);
        if (!import_core7.utils.isNil(marker.config.zoomLvl)) {
          this.viewer.zoom(marker.config.zoomLvl);
        }
        this.dispatchEvent(new GotoMarkerDoneEvent(marker));
        return Promise.resolve();
      } else {
        return this.viewer.animate({
          ...marker.state.position,
          zoom: marker.config.zoomLvl,
          speed
        }).then(() => {
          this.dispatchEvent(new GotoMarkerDoneEvent(marker));
        });
      }
    }
    /**
     * Hides a marker
     */
    hideMarker(markerId) {
      this.toggleMarker(markerId, false);
    }
    /**
     * Shows a marker
     */
    showMarker(markerId) {
      this.toggleMarker(markerId, true);
    }
    /**
     * Forces the display of the tooltip of a marker
     */
    showMarkerTooltip(markerId) {
      const marker = this.getMarker(markerId);
      marker.state.staticTooltip = true;
      marker.showTooltip();
    }
    /**
     * Hides the tooltip of a marker
     */
    hideMarkerTooltip(markerId) {
      const marker = this.getMarker(markerId);
      marker.state.staticTooltip = false;
      marker.hideTooltip();
    }
    /**
     * Toggles a marker visibility
     */
    toggleMarker(markerId, visible) {
      const marker = this.getMarker(markerId);
      marker.visible = visible === null ? !marker.visible : visible;
      this.viewer.needsUpdate();
    }
    /**
     * Opens the panel with the content of the marker
     */
    showMarkerPanel(markerId) {
      const marker = this.getMarker(markerId);
      if (marker?.config?.content) {
        this.viewer.panel.show({
          id: ID_PANEL_MARKER,
          content: marker.config.content
        });
      } else {
        this.hideMarkerPanel();
      }
    }
    /**
     * Closes the panel if currently showing the content of a marker
     */
    hideMarkerPanel() {
      this.viewer.panel.hide(ID_PANEL_MARKER);
    }
    /**
     * Toggles the visibility of the list of markers
     */
    toggleMarkersList() {
      if (this.viewer.panel.isVisible(ID_PANEL_MARKERS_LIST)) {
        this.hideMarkersList();
      } else {
        this.showMarkersList();
      }
    }
    /**
     * Opens side panel with the list of markers
     */
    showMarkersList() {
      let markers = [];
      Object.values(this.markers).forEach((marker) => {
        if (marker.visible && !marker.config.hideList) {
          markers.push(marker);
        }
      });
      const e = new RenderMarkersListEvent(markers);
      this.dispatchEvent(e);
      markers = e.markers;
      this.viewer.panel.show({
        id: ID_PANEL_MARKERS_LIST,
        content: MARKERS_LIST_TEMPLATE(markers, this.viewer.config.lang[MarkersButton.id]),
        noMargin: true,
        clickHandler: (target) => {
          const li = import_core7.utils.getClosest(target, "li");
          const markerId = li ? li.dataset[MARKER_DATA] : void 0;
          if (markerId) {
            const marker = this.getMarker(markerId);
            this.dispatchEvent(new SelectMarkerListEvent(marker));
            this.gotoMarker(marker.id);
            this.hideMarkersList();
          }
        }
      });
    }
    /**
     * Closes side panel if it contains the list of markers
     */
    hideMarkersList() {
      this.viewer.panel.hide(ID_PANEL_MARKERS_LIST);
    }
    /**
     * Updates the visibility and the position of all markers
     */
    renderMarkers() {
      const zoomLevel = this.viewer.getZoomLevel();
      const viewerPosition = this.viewer.getPosition();
      Object.values(this.markers).forEach((marker) => {
        let isVisible = this.state.visible && marker.visible;
        let visibilityChanged = false;
        let position = null;
        if (isVisible && marker.is3d()) {
          position = this.__getMarkerPosition(marker);
          isVisible = this.__isMarkerVisible(marker, position);
        } else if (isVisible && marker.isPoly()) {
          const positions = this.__getPolyPositions(marker);
          isVisible = positions.length > (marker.isPolygon() ? 2 : 1);
          if (isVisible) {
            position = this.__getMarkerPosition(marker);
            const points = positions.map((pos) => pos.x - position.x + "," + (pos.y - position.y)).join(" ");
            marker.domElement.setAttributeNS(null, "points", points);
            marker.domElement.setAttributeNS(null, "transform", `translate(${position.x} ${position.y})`);
          }
        } else if (isVisible) {
          if (marker.state.dynamicSize) {
            this.__updateMarkerSize(marker);
          }
          position = this.__getMarkerPosition(marker);
          isVisible = this.__isMarkerVisible(marker, position);
          if (isVisible) {
            const scale = marker.getScale(zoomLevel, viewerPosition);
            if (marker.isSvg()) {
              const x = position.x + marker.state.size.width * marker.state.anchor.x * (1 - scale);
              const y = position.y + marker.state.size.height * marker.state.anchor.y * (1 - scale);
              marker.domElement.setAttributeNS(
                null,
                "transform",
                `translate(${x}, ${y}) scale(${scale}, ${scale})`
              );
            } else {
              marker.domElement.style.transform = `translate3D(${position.x}px, ${position.y}px, 0px) scale(${scale}, ${scale})`;
            }
          }
        }
        visibilityChanged = marker.state.visible !== isVisible;
        marker.state.visible = isVisible;
        marker.state.position2D = isVisible ? position : null;
        if (!marker.is3d()) {
          import_core7.utils.toggleClass(marker.domElement, "psv-marker--visible", isVisible);
        }
        if (!isVisible) {
          marker.hideTooltip();
        } else if (marker.state.staticTooltip) {
          marker.showTooltip();
        } else if (marker.config.tooltip?.trigger === "click" || marker === this.state.hoveringMarker && !marker.isPoly()) {
          marker.refreshTooltip();
        } else if (marker !== this.state.hoveringMarker) {
          marker.hideTooltip();
        }
        if (visibilityChanged) {
          this.dispatchEvent(new MarkerVisibilityEvent(marker, isVisible));
        }
      });
    }
    /**
     * Determines if a point marker is visible<br>
     * It tests if the point is in the general direction of the camera, then check if it's in the viewport
     */
    __isMarkerVisible(marker, position) {
      return marker.state.positions3D[0].dot(this.viewer.state.direction) > 0 && position.x + marker.state.size.width >= 0 && position.x - marker.state.size.width <= this.viewer.state.size.width && position.y + marker.state.size.height >= 0 && position.y - marker.state.size.height <= this.viewer.state.size.height;
    }
    /**
     * Computes the real size of a marker
     * @description This is done by removing all it's transformations (if any) and making it visible
     * before querying its bounding rect
     */
    __updateMarkerSize(marker) {
      const element = marker.domElement;
      element.classList.add("psv-marker--transparent");
      let transform;
      if (marker.isSvg()) {
        transform = element.getAttributeNS(null, "transform");
        element.removeAttributeNS(null, "transform");
      } else {
        transform = element.style.transform;
        element.style.transform = "";
      }
      const rect = element.getBoundingClientRect();
      marker.state.size = {
        width: rect.width,
        height: rect.height
      };
      element.classList.remove("psv-marker--transparent");
      if (transform) {
        if (marker.isSvg()) {
          element.setAttributeNS(null, "transform", transform);
        } else {
          element.style.transform = transform;
        }
      }
      marker.state.dynamicSize = false;
    }
    /**
     * Computes viewer coordinates of a marker
     */
    __getMarkerPosition(marker) {
      if (marker.isPoly()) {
        return this.viewer.dataHelper.sphericalCoordsToViewerCoords(marker.state.position);
      } else {
        const position = this.viewer.dataHelper.vector3ToViewerCoords(marker.state.positions3D[0]);
        position.x -= marker.state.size.width * marker.state.anchor.x;
        position.y -= marker.state.size.height * marker.state.anchor.y;
        return position;
      }
    }
    /**
     * Computes viewer coordinates of each point of a polygon/polyline<br>
     * It handles points behind the camera by creating intermediary points suitable for the projector
     */
    __getPolyPositions(marker) {
      const nbVectors = marker.state.positions3D.length;
      const positions3D = marker.state.positions3D.map((vector) => {
        return {
          vector,
          visible: vector.dot(this.viewer.state.direction) > 0
        };
      });
      const toBeComputed = [];
      positions3D.forEach((pos, i) => {
        if (!pos.visible) {
          const neighbours = [
            i === 0 ? positions3D[nbVectors - 1] : positions3D[i - 1],
            i === nbVectors - 1 ? positions3D[0] : positions3D[i + 1]
          ];
          neighbours.forEach((neighbour) => {
            if (neighbour.visible) {
              toBeComputed.push({
                visible: neighbour.vector,
                invisible: pos.vector,
                index: i
              });
            }
          });
        }
      });
      toBeComputed.reverse().forEach((pair) => {
        positions3D.splice(pair.index, 0, {
          vector: this.__getPolyIntermediaryPoint(pair.visible, pair.invisible),
          visible: true
        });
      });
      return positions3D.filter((pos) => pos.visible).map((pos) => this.viewer.dataHelper.vector3ToViewerCoords(pos.vector));
    }
    /**
     * Given one point in the same direction of the camera and one point behind the camera,
     * computes an intermediary point on the great circle delimiting the half sphere visible by the camera.
     * The point is shifted by .01 rad because the projector cannot handle points exactly on this circle.
     * @todo : does not work with fisheye view (must not use the great circle)
     * @link http://math.stackexchange.com/a/1730410/327208
     */
    __getPolyIntermediaryPoint(P1, P2) {
      const C = this.viewer.state.direction.clone().normalize();
      const N = new import_three2.Vector3().crossVectors(P1, P2).normalize();
      const V = new import_three2.Vector3().crossVectors(N, P1).normalize();
      const X = P1.clone().multiplyScalar(-C.dot(V));
      const Y = V.clone().multiplyScalar(C.dot(P1));
      const H = new import_three2.Vector3().addVectors(X, Y).normalize();
      const a = new import_three2.Vector3().crossVectors(H, C);
      return H.applyAxisAngle(a, 0.01).multiplyScalar(import_core7.CONSTANTS.SPHERE_RADIUS);
    }
    /**
     * Returns the marker associated to an event target
     */
    __getTargetMarker(target, closest = false) {
      const target2 = closest ? import_core7.utils.getClosest(target, ".psv-marker") : target;
      return target2 ? target2[MARKER_DATA] : void 0;
    }
    /**
     * Checks if an event target is in the tooltip
     */
    __targetOnTooltip(target, tooltip) {
      return target && tooltip ? import_core7.utils.hasParent(target, tooltip.container) : false;
    }
    /**
     * Handles mouse enter events, show the tooltip for non polygon markers
     */
    __onMouseEnter(e, marker) {
      if (marker && !marker.isPoly()) {
        this.state.hoveringMarker = marker;
        this.dispatchEvent(new EnterMarkerEvent(marker));
        if (!marker.state.staticTooltip && marker.config.tooltip?.trigger === "hover") {
          marker.showTooltip(e.clientX, e.clientY);
        }
      }
    }
    /**
     * Handles mouse leave events, hide the tooltip
     */
    __onMouseLeave(e, marker) {
      if (marker && !(marker.isPoly() && this.__targetOnTooltip(e.relatedTarget, marker.tooltip))) {
        this.dispatchEvent(new LeaveMarkerEvent(marker));
        this.state.hoveringMarker = null;
        if (!marker.state.staticTooltip && marker.config.tooltip?.trigger === "hover") {
          marker.hideTooltip();
        }
      }
    }
    /**
     * Handles mouse move events, refreshUi the tooltip for polygon markers
     */
    __onMouseMove(e, targetMarker) {
      let marker;
      if (targetMarker?.isPoly()) {
        marker = targetMarker;
      } else if (this.state.hoveringMarker && this.__targetOnTooltip(e.target, this.state.hoveringMarker.tooltip)) {
        marker = this.state.hoveringMarker;
      }
      if (marker) {
        if (!this.state.hoveringMarker) {
          this.dispatchEvent(new EnterMarkerEvent(marker));
          this.state.hoveringMarker = marker;
        }
        if (!marker.state.staticTooltip) {
          marker.showTooltip(e.clientX, e.clientY);
        }
      } else if (this.state.hoveringMarker?.isPoly()) {
        this.dispatchEvent(new LeaveMarkerEvent(this.state.hoveringMarker));
        if (!this.state.hoveringMarker.state.staticTooltip) {
          this.state.hoveringMarker.hideTooltip();
        }
        this.state.hoveringMarker = null;
      }
    }
    /**
     * Handles mouse click events, select the marker and open the panel if necessary
     */
    __onClick(e, dblclick) {
      let marker = e.data.objects.find((o) => o.userData[MARKER_DATA])?.userData[MARKER_DATA];
      if (!marker) {
        marker = this.__getTargetMarker(e.data.target, true);
      }
      if (this.state.currentMarker && this.state.currentMarker !== marker) {
        this.dispatchEvent(new UnselectMarkerEvent(this.state.currentMarker));
        this.viewer.panel.hide(ID_PANEL_MARKER);
        if (!this.state.showAllTooltips && this.state.currentMarker.config.tooltip?.trigger === "click") {
          this.hideMarkerTooltip(this.state.currentMarker.id);
        }
        this.state.currentMarker = null;
      }
      if (marker) {
        this.state.currentMarker = marker;
        this.dispatchEvent(new SelectMarkerEvent(marker, dblclick, e.data.rightclick));
        if (this.config.clickEventOnMarker) {
          e.data.marker = marker;
        } else {
          e.stopImmediatePropagation();
        }
        if (this.markers[marker.id]) {
          if (marker.config.tooltip?.trigger === "click") {
            if (marker.tooltip) {
              this.hideMarkerTooltip(marker);
            } else {
              this.showMarkerTooltip(marker);
            }
          } else {
            this.showMarkerPanel(marker.id);
          }
        }
      }
    }
    __afterChangerMarkers() {
      this.__refreshUi();
      this.__checkObjectsObserver();
      this.viewer.needsUpdate();
      this.dispatchEvent(new SetMarkersEvent(this.getMarkers()));
    }
    /**
     * Updates the visiblity of the panel and the buttons
     */
    __refreshUi() {
      const nbMarkers = Object.values(this.markers).filter((m) => !m.config.hideList).length;
      if (nbMarkers === 0) {
        if (this.viewer.panel.isVisible(ID_PANEL_MARKERS_LIST) || this.viewer.panel.isVisible(ID_PANEL_MARKER)) {
          this.viewer.panel.hide();
        }
      } else {
        if (this.viewer.panel.isVisible(ID_PANEL_MARKERS_LIST)) {
          this.showMarkersList();
        } else if (this.viewer.panel.isVisible(ID_PANEL_MARKER)) {
          this.state.currentMarker ? this.showMarkerPanel(this.state.currentMarker.id) : this.viewer.panel.hide();
        }
      }
      this.viewer.navbar.getButton(MarkersButton.id, false)?.toggle(nbMarkers > 0);
      this.viewer.navbar.getButton(MarkersListButton.id, false)?.toggle(nbMarkers > 0);
    }
    /**
     * Adds or remove the objects observer if there are 3D markers
     */
    __checkObjectsObserver() {
      const has3d = Object.values(this.markers).some((marker) => marker.is3d());
      if (has3d) {
        this.viewer.observeObjects(MARKER_DATA);
      } else {
        this.viewer.unobserveObjects(MARKER_DATA);
      }
    }
  };
  MarkersPlugin.id = "markers";
  MarkersPlugin.configParser = getConfig;
  MarkersPlugin.readonlyOptions = ["markers"];

  // src/index.ts
  import_core8.DEFAULTS.lang[MarkersButton.id] = "Markers";
  import_core8.DEFAULTS.lang[MarkersListButton.id] = "Markers list";
  (0, import_core8.registerButton)(MarkersButton, "caption:left");
  (0, import_core8.registerButton)(MarkersListButton, "caption:left");
  __copyProps(__defProp(exports, "__esModule", { value: true }), src_exports);

}));//# sourceMappingURL=index.js.map