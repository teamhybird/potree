/*!
 * PhotoSphereViewer.VirtualTourPlugin 0.0.0
 * @copyright 2023 Damien "Mistic" Sorel
 * @licence MIT (https://opensource.org/licenses/MIT)
 */
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/events.ts
var events_exports = {};
__export(events_exports, {
  NodeChangedEvent: () => NodeChangedEvent
});
import { TypedEvent } from "@photo-sphere-viewer/core";
var _NodeChangedEvent = class extends TypedEvent {
  constructor(node, data) {
    super(_NodeChangedEvent.type);
    this.node = node;
    this.data = data;
  }
};
var NodeChangedEvent = _NodeChangedEvent;
NodeChangedEvent.type = "node-changed";

// src/VirtualTourPlugin.ts
import { AbstractConfigurablePlugin, CONSTANTS, events, PSVError as PSVError4, utils as utils5 } from "@photo-sphere-viewer/core";
import {
  AmbientLight,
  BackSide,
  Group,
  MathUtils as MathUtils2,
  Mesh as Mesh2,
  MeshBasicMaterial as MeshBasicMaterial2,
  MeshLambertMaterial,
  PointLight
} from "three";

// src/constants.ts
import { ObjectLoader } from "three";

// src/arrow.svg
var arrow_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210" x="0px" y="0px"><path fill="currentColor" transform="translate(0 10)" d="M0 181l105 -181 105 181 -105 -61 -105 61zm105 -167l0 99 86 50 -86 -148z"/><!-- Created by Saifurrijal from the Noun Project --></svg>\n';

// src/models/arrow.json
var arrow_default2 = {
  metadata: {
    version: 4.5,
    type: "BufferGeometry",
    generator: "BufferGeometry.toJSON"
  },
  uuid: "8B1A6E5B-A7CC-4471-9CA0-BD64D80ABB79",
  type: "BufferGeometry",
  data: {
    attributes: {
      position: {
        itemSize: 3,
        type: "Float32Array",
        array: [-25, -15, -2.5, 0, 0, -2.5, 0, -5, -2.5, 0, -5, -2.5, 0, 0, -2.5, 25, -15, -2.5, 0, -5, -2.5, 25, -15, -2.5, 25, -20, -2.5, 0, -5, -2.5, -25, -20, -2.5, -25, -15, -2.5, 25, -15, 2.5, 25, -20, 2.5, 25, -15, -2.5, 25, -15, -2.5, 25, -20, 2.5, 25, -20, -2.5, 25, -20, 2.5, 0, -5, 2.5, 25, -20, -2.5, 25, -20, -2.5, 0, -5, 2.5, 0, -5, -2.5, 0, -5, 2.5, -25, -20, 2.5, 0, -5, -2.5, 0, -5, -2.5, -25, -20, 2.5, -25, -20, -2.5, -25, -20, 2.5, -25, -15, 2.5, -25, -20, -2.5, -25, -20, -2.5, -25, -15, 2.5, -25, -15, -2.5, -25, -15, 2.5, 0, 0, 2.5, -25, -15, -2.5, -25, -15, -2.5, 0, 0, 2.5, 0, 0, -2.5, 0, 0, 2.5, 25, -15, 2.5, 0, 0, -2.5, 0, 0, -2.5, 25, -15, 2.5, 25, -15, -2.5, 25, -20, 2.5, 25, -15, 2.5, 0, -5, 2.5, 0, -5, 2.5, 25, -15, 2.5, 0, 0, 2.5, 0, -5, 2.5, 0, 0, 2.5, -25, -15, 2.5, -25, -15, 2.5, -25, -20, 2.5, 0, -5, 2.5],
        normalized: false
      },
      normal: {
        itemSize: 3,
        type: "Float32Array",
        array: [0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -0.514495, -0.857492, 0, -0.514495, -0.857492, 0, -0.514495, -0.857492, 0, -0.514495, -0.857492, 0, -0.514495, -0.857492, 0, -0.514495, -0.857492, 0, 0.514495, -0.857492, 0, 0.514495, -0.857492, 0, 0.514495, -0.857492, 0, 0.514495, -0.857492, 0, 0.514495, -0.857492, 0, 0.514495, -0.857492, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -0.514495, 0.857492, 0, -0.514495, 0.857492, 0, -0.514495, 0.857492, 0, -0.514495, 0.857492, 0, -0.514495, 0.857492, 0, -0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        normalized: false
      }
    },
    boundingSphere: {
      center: [0, -10, 0],
      radius: 27.041634
    }
  }
};

// src/models/arrow_outline.json
var arrow_outline_default = {
  metadata: {
    version: 4.5,
    type: "BufferGeometry",
    generator: "BufferGeometry.toJSON"
  },
  uuid: "B12A1453-6E56-40AC-840B-BA7DF5DB9E2A",
  type: "BufferGeometry",
  data: {
    attributes: {
      position: {
        itemSize: 3,
        type: "Float32Array",
        array: [-26, -21.766189, -3.5, -26, -14.433809, -3.5, 0, -6.16619, -3.5, 0, -6.16619, -3.5, -26, -14.433809, -3.5, 0, 1.16619, -3.5, 0, -6.16619, -3.5, 0, 1.16619, -3.5, 26, -14.43381, -3.5, 26, -14.43381, -3.5, 26, -21.766191, -3.5, 0, -6.16619, -3.5, -26, -14.433809, 3.5, 0, 1.16619, 3.5, -26, -14.433809, -3.5, -26, -14.433809, -3.5, 0, 1.16619, 3.5, 0, 1.16619, -3.5, 0, 1.16619, 3.5, 26, -14.43381, 3.5, 0, 1.16619, -3.5, 0, 1.16619, -3.5, 26, -14.43381, 3.5, 26, -14.43381, -3.5, 26, -14.43381, 3.5, 26, -21.766191, 3.5, 26, -14.43381, -3.5, 26, -14.43381, -3.5, 26, -21.766191, 3.5, 26, -21.766191, -3.5, 26, -21.766191, 3.5, 0, -6.16619, 3.5, 26, -21.766191, -3.5, 26, -21.766191, -3.5, 0, -6.16619, 3.5, 0, -6.16619, -3.5, 0, -6.16619, 3.5, -26, -21.766189, 3.5, 0, -6.16619, -3.5, 0, -6.16619, -3.5, -26, -21.766189, 3.5, -26, -21.766189, -3.5, -26, -21.766189, 3.5, -26, -14.433809, 3.5, -26, -21.766189, -3.5, -26, -21.766189, -3.5, -26, -14.433809, 3.5, -26, -14.433809, -3.5, -26, -21.766189, 3.5, 0, -6.16619, 3.5, -26, -14.433809, 3.5, -26, -14.433809, 3.5, 0, -6.16619, 3.5, 0, 1.16619, 3.5, 0, 1.16619, 3.5, 0, -6.16619, 3.5, 26, -14.43381, 3.5, 26, -14.43381, 3.5, 0, -6.16619, 3.5, 26, -21.766191, 3.5],
        normalized: false
      },
      normal: {
        itemSize: 3,
        type: "Float32Array",
        array: [0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, -0.514495, 0.857492, 0, -0.514495, 0.857492, 0, -0.514495, 0.857492, 0, -0.514495, 0.857492, 0, -0.514495, 0.857492, 0, -0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 0.514495, 0.857492, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -0.514495, -0.857492, 0, -0.514495, -0.857492, 0, -0.514495, -0.857492, 0, -0.514495, -0.857492, 0, -0.514495, -0.857492, 0, -0.514495, -0.857492, 0, 0.514495, -0.857492, 0, 0.514495, -0.857492, 0, 0.514495, -0.857492, 0, 0.514495, -0.857492, 0, 0.514495, -0.857492, 0, 0.514495, -0.857492, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        normalized: false
      }
    },
    boundingSphere: {
      center: [0, -10.3, 0],
      radius: 28.630814
    }
  }
};

// src/constants.ts
var LINK_DATA = "tourLink";
var LINK_ID = "__tour-link__";
var DEFAULT_MARKER = {
  html: arrow_default,
  size: { width: 80, height: 80 },
  scale: [0.5, 2],
  anchor: "top center",
  className: "psv-virtual-tour__marker",
  style: {
    color: "rgba(0, 208, 255, 0.8)"
  }
};
var DEFAULT_ARROW = {
  color: "#aaaaaa",
  hoverColor: "#aa5500",
  outlineColor: "#000000",
  scale: [0.5, 2]
};
var { ARROW_GEOM, ARROW_OUTLINE_GEOM } = (() => {
  const loader = new ObjectLoader();
  const geometries = loader.parseGeometries([arrow_default2, arrow_outline_default]);
  const arrow = geometries[arrow_default2.uuid];
  const arrowOutline = geometries[arrow_outline_default.uuid];
  const scale = 0.015;
  const rot = Math.PI / 2;
  arrow.scale(scale, scale, scale);
  arrow.rotateX(rot);
  arrowOutline.scale(scale, scale, scale);
  arrowOutline.rotateX(rot);
  return { ARROW_GEOM: arrow, ARROW_OUTLINE_GEOM: arrowOutline };
})();

// src/datasources/ClientSideDatasource.ts
import { PSVError as PSVError2, utils as utils2 } from "@photo-sphere-viewer/core";

// src/datasources/AbstractDataSource.ts
import { PSVError, utils } from "@photo-sphere-viewer/core";
var AbstractDatasource = class {
  constructor(plugin, viewer) {
    this.plugin = plugin;
    this.viewer = viewer;
    this.nodes = {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy() {
  }
  /**
   * Checks the configuration of a node
   */
  checkNode(node) {
    if (!node.id) {
      throw new PSVError("No id given for node");
    }
    if (!node.panorama) {
      throw new PSVError(`No panorama provided for node ${node.id}`);
    }
    if ("position" in node) {
      utils.logWarn('Use the "gps" property to configure the GPS position of a virtual node');
      node.gps = node["position"];
    }
    if (this.plugin.isGps && !(node.gps?.length >= 2)) {
      throw new PSVError(`No GPS position provided for node ${node.id}`);
    }
    if (!this.plugin.isGps && node.markers?.some((marker) => marker.gps && !marker.position)) {
      throw new PSVError(`Cannot use GPS positioning for markers in manual mode`);
    }
  }
  /**
   * Checks the configuration of a link
   */
  checkLink(node, link) {
    if (!link.nodeId) {
      throw new PSVError(`Link of node ${node.id} has no target id`);
    }
    if (Array.isArray(link.position)) {
      utils.logWarn('Use the "gps" property to configure the GPS position of a virtual link');
      link.gps = link.position;
      delete link.position;
    }
    if (utils.isExtendedPosition(link)) {
      utils.logWarn('Use the "position" property to configure the position of a virtual link');
      link.position = this.viewer.dataHelper.cleanPosition(link);
    }
    if (!this.plugin.isGps && !utils.isExtendedPosition(link.position)) {
      throw new PSVError(`No position provided for link ${link.nodeId} of node ${node.id}`);
    }
    if (this.plugin.isGps && !link.gps) {
      throw new PSVError(`No GPS position provided for link ${link.nodeId} of node ${node.id}`);
    }
  }
};

// src/datasources/ClientSideDatasource.ts
var ClientSideDatasource = class extends AbstractDatasource {
  loadNode(nodeId) {
    if (this.nodes[nodeId]) {
      return Promise.resolve(this.nodes[nodeId]);
    } else {
      return Promise.reject(new PSVError2(`Node ${nodeId} not found`));
    }
  }
  setNodes(rawNodes) {
    if (!rawNodes?.length) {
      throw new PSVError2("No nodes provided");
    }
    const nodes = {};
    const linkedNodes = {};
    rawNodes.forEach((node) => {
      this.checkNode(node);
      if (nodes[node.id]) {
        throw new PSVError2(`Duplicate node ${node.id}`);
      }
      if (!node.links) {
        utils2.logWarn(`Node ${node.id} has no links`);
        node.links = [];
      }
      nodes[node.id] = node;
    });
    rawNodes.forEach((node) => {
      node.links.forEach((link) => {
        if (!nodes[link.nodeId]) {
          throw new PSVError2(`Target node ${link.nodeId} of node ${node.id} does not exists`);
        }
        link.gps = link.gps || nodes[link.nodeId].gps;
        link.name = link.name || nodes[link.nodeId].name;
        this.checkLink(node, link);
        linkedNodes[link.nodeId] = true;
      });
    });
    rawNodes.forEach((node) => {
      if (!linkedNodes[node.id]) {
        utils2.logWarn(`Node ${node.id} is never linked to`);
      }
    });
    this.nodes = nodes;
  }
};

// src/datasources/ServerSideDatasource.ts
import { PSVError as PSVError3, utils as utils3 } from "@photo-sphere-viewer/core";
var ServerSideDatasource = class extends AbstractDatasource {
  constructor(plugin, viewer) {
    super(plugin, viewer);
    if (!plugin.config.getNode) {
      throw new PSVError3("Missing getNode() option.");
    }
    this.nodeResolver = plugin.config.getNode;
  }
  loadNode(nodeId) {
    if (this.nodes[nodeId]) {
      return Promise.resolve(this.nodes[nodeId]);
    } else {
      return Promise.resolve(this.nodeResolver(nodeId)).then((node) => {
        this.checkNode(node);
        if (!node.links) {
          utils3.logWarn(`Node ${node.id} has no links`);
          node.links = [];
        }
        node.links.forEach((link) => {
          if (this.nodes[link.nodeId]) {
            link.gps = link.gps || this.nodes[link.nodeId].gps;
            link.name = link.name || this.nodes[link.nodeId].name;
          }
          this.checkLink(node, link);
        });
        this.nodes[nodeId] = node;
        return node;
      });
    }
  }
};

// src/utils.ts
import { utils as utils4 } from "@photo-sphere-viewer/core";
import { MathUtils } from "three";
function setMeshColor(mesh, color) {
  mesh.material.color.set(color);
}
function distance(p1, p2) {
  return utils4.greatArcDistance(p1, p2) * 6371e3;
}
function bearing(p1, p2) {
  const [long1, lat1] = p1;
  const [long2, lat2] = p2;
  const y = Math.sin(long2 - long1) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(long2 - long1);
  return Math.atan2(y, x);
}
function gpsToSpherical(gps1, gps2) {
  const p1 = [MathUtils.degToRad(gps1[0]), MathUtils.degToRad(gps1[1])];
  const p2 = [MathUtils.degToRad(gps2[0]), MathUtils.degToRad(gps2[1])];
  const h1 = gps1[2] ?? 0;
  const h2 = gps2[2] ?? 0;
  let pitch = 0;
  if (h1 !== h2) {
    pitch = Math.atan((h2 - h1) / distance(p1, p2));
  }
  const yaw = bearing(p1, p2);
  return { yaw, pitch };
}

// src/VirtualTourPlugin.ts
var getConfig = utils5.getConfigParser(
  {
    dataMode: "client",
    positionMode: "manual",
    renderMode: "3d",
    nodes: null,
    getNode: null,
    startNodeId: null,
    preload: false,
    rotateSpeed: "20rpm",
    transition: CONSTANTS.DEFAULT_TRANSITION,
    linksOnCompass: true,
    markerStyle: DEFAULT_MARKER,
    arrowStyle: DEFAULT_ARROW,
    markerPitchOffset: -0.1,
    arrowPosition: "bottom",
    map: null
  },
  {
    dataMode(dataMode) {
      if (dataMode !== "client" && dataMode !== "server") {
        throw new PSVError4("VirtualTourPlugin: invalid dataMode");
      }
      return dataMode;
    },
    positionMode(positionMode) {
      if (positionMode !== "gps" && positionMode !== "manual") {
        throw new PSVError4("VirtualTourPlugin: invalid positionMode");
      }
      return positionMode;
    },
    renderMode(renderMode) {
      if (renderMode !== "3d" && renderMode !== "markers") {
        throw new PSVError4("VirtualTourPlugin: invalid renderMode");
      }
      return renderMode;
    },
    markerStyle(markerStyle, { defValue }) {
      return { ...defValue, ...markerStyle };
    },
    arrowStyle(arrowStyle, { defValue }) {
      return { ...defValue, ...arrowStyle };
    },
    map(map, { rawConfig }) {
      if (map) {
        if (rawConfig.dataMode === "server") {
          utils5.logWarn("VirtualTourPlugin: The map cannot be used in server side mode");
          return null;
        }
        if (!map.imageUrl) {
          utils5.logWarn('VirtualTourPlugin: configuring the map requires at least "imageUrl"');
          return null;
        }
      }
      return map;
    }
  }
);
var VirtualTourPlugin = class extends AbstractConfigurablePlugin {
  constructor(viewer, config) {
    super(viewer, config);
    this.state = {
      currentNode: null,
      currentTooltip: null,
      loadingNode: null,
      preload: {}
    };
    if (this.is3D) {
      this.arrowsGroup = new Group();
      const localLight = new PointLight(16777215, 1, 0);
      localLight.position.set(0, this.config.arrowPosition === "bottom" ? 2 : -2, 0);
      this.arrowsGroup.add(localLight);
    }
  }
  get is3D() {
    return this.config.renderMode === "3d";
  }
  get isServerSide() {
    return this.config.dataMode === "server";
  }
  get isGps() {
    return this.config.positionMode === "gps";
  }
  /**
   * @internal
   */
  init() {
    super.init();
    this.markers = this.viewer.getPlugin("markers");
    this.compass = this.viewer.getPlugin("compass");
    this.gallery = this.viewer.getPlugin("gallery");
    if (!this.is3D && !this.markers) {
      throw new PSVError4("VirtualTour plugin requires the Markers plugin in markers mode.");
    }
    if (this.markers?.config.markers) {
      utils5.logWarn(
        "No default markers can be configured on Markers plugin when using VirtualTour plugin. Consider defining `markers` on each tour node."
      );
      delete this.markers.config.markers;
    }
    if (this.config.map) {
      this.map = this.viewer.getPlugin("map");
      if (!this.map) {
        utils5.logWarn("The map is configured on the VirtualTourPlugin but the MapPlugin is not loaded.");
      }
    }
    this.datasource = this.isServerSide ? new ServerSideDatasource(this, this.viewer) : new ClientSideDatasource(this, this.viewer);
    if (this.is3D) {
      this.viewer.observeObjects(LINK_DATA);
      this.viewer.addEventListener(events.PositionUpdatedEvent.type, this);
      this.viewer.addEventListener(events.ZoomUpdatedEvent.type, this);
      this.viewer.addEventListener(events.ClickEvent.type, this);
      this.viewer.addEventListener(events.ObjectEnterEvent.type, this);
      this.viewer.addEventListener(events.ObjectHoverEvent.type, this);
      this.viewer.addEventListener(events.ObjectLeaveEvent.type, this);
      this.viewer.addEventListener(events.ReadyEvent.type, this, { once: true });
    } else {
      this.markers.addEventListener("select-marker", this);
    }
    if (this.map) {
      this.map.addEventListener("select-hotspot", this);
      this.map.setImage(this.config.map.imageUrl);
    }
    if (this.isServerSide) {
      if (this.config.startNodeId) {
        this.setCurrentNode(this.config.startNodeId);
      }
    } else if (this.config.nodes) {
      this.setNodes(this.config.nodes, this.config.startNodeId);
      delete this.config.nodes;
    }
  }
  /**
   * @internal
   */
  destroy() {
    if (this.markers) {
      this.markers.removeEventListener("select-marker", this);
    }
    if (this.arrowsGroup) {
      this.viewer.renderer.removeObject(this.arrowsGroup);
    }
    this.map?.removeEventListener("select-hotspot", this);
    this.viewer.removeEventListener(events.PositionUpdatedEvent.type, this);
    this.viewer.removeEventListener(events.ZoomUpdatedEvent.type, this);
    this.viewer.removeEventListener(events.ClickEvent.type, this);
    this.viewer.removeEventListener(events.ObjectEnterEvent.type, this);
    this.viewer.removeEventListener(events.ObjectHoverEvent.type, this);
    this.viewer.removeEventListener(events.ObjectLeaveEvent.type, this);
    this.viewer.removeEventListener(events.ReadyEvent.type, this);
    this.viewer.unobserveObjects(LINK_DATA);
    this.datasource.destroy();
    delete this.datasource;
    delete this.markers;
    delete this.compass;
    delete this.gallery;
    delete this.arrowsGroup;
    super.destroy();
  }
  /**
   * @internal
   */
  handleEvent(e) {
    if (e instanceof events.ReadyEvent) {
      this.__positionArrows();
      this.viewer.renderer.addObject(this.arrowsGroup);
      const ambientLight = new AmbientLight(16777215, 1);
      this.viewer.renderer.addObject(ambientLight);
      this.viewer.needsUpdate();
    } else if (e instanceof events.PositionUpdatedEvent || e instanceof events.ZoomUpdatedEvent) {
      this.__positionArrows();
    } else if (e instanceof events.ClickEvent) {
      const link = e.data.objects.find((o) => o.userData[LINK_DATA])?.userData[LINK_DATA];
      if (link) {
        this.setCurrentNode(link.nodeId, link);
      }
    } else if (e.type === "select-marker") {
      const link = e.marker.data?.[LINK_DATA];
      if (link) {
        this.setCurrentNode(link.nodeId, link);
      }
    } else if (e instanceof events.ObjectEnterEvent) {
      if (e.userDataKey === LINK_DATA) {
        this.__onEnterObject(e.object, e.viewerPoint);
      }
    } else if (e instanceof events.ObjectLeaveEvent) {
      if (e.userDataKey === LINK_DATA) {
        this.__onLeaveObject(e.object);
      }
    } else if (e instanceof events.ObjectHoverEvent) {
      if (e.userDataKey === LINK_DATA) {
        this.__onHoverObject(e.viewerPoint);
      }
    } else if (e.type === "select-hotspot") {
      const id = e.hotspotId;
      if (id.startsWith(LINK_ID)) {
        this.setCurrentNode(id.substring(LINK_ID.length));
      }
    }
  }
  /**
   * Sets the nodes (client mode only)
   * @throws {@link PSVError} if not in client mode
   */
  setNodes(nodes, startNodeId) {
    if (this.isServerSide) {
      throw new PSVError4("Cannot set nodes in server side mode");
    }
    this.datasource.setNodes(nodes);
    if (!startNodeId) {
      startNodeId = nodes[0].id;
    } else if (!this.datasource.nodes[startNodeId]) {
      startNodeId = nodes[0].id;
      utils5.logWarn(`startNodeId not found is provided nodes, resetted to ${startNodeId}`);
    }
    this.setCurrentNode(startNodeId);
    if (this.gallery) {
      this.gallery.setItems(
        nodes.map((node) => ({
          id: node.id,
          panorama: node.panorama,
          name: node.name,
          thumbnail: node.thumbnail,
          options: {
            caption: node.caption,
            panoData: node.panoData,
            sphereCorrection: node.sphereCorrection,
            description: node.description
          }
        })),
        (id) => {
          this.setCurrentNode(id);
        }
      );
    }
    if (this.map) {
      this.map.setHotspots([
        ...nodes.map((node) => {
          return {
            ...node.map || {},
            ...this.__getNodeMapPosition(node),
            id: LINK_ID + node.id,
            tooltip: node.name
          };
        })
      ]);
    }
  }
  /**
   * Changes the current node
   * @returns {Promise<boolean>} resolves false if the loading was aborted by another call
   */
  setCurrentNode(nodeId, fromLink) {
    if (nodeId === this.state.currentNode?.id) {
      return Promise.resolve(true);
    }
    this.viewer.hideError();
    this.state.loadingNode = nodeId;
    const fromNode = this.state.currentNode;
    const fromLinkPosition = fromNode && fromLink ? this.__getLinkPosition(fromNode, fromLink) : null;
    return Promise.all([
      // if this node is already preloading, wait for it
      Promise.resolve(this.state.preload[nodeId]).then(() => {
        if (this.state.loadingNode !== nodeId) {
          throw utils5.getAbortError();
        }
        return this.datasource.loadNode(nodeId);
      }),
      Promise.resolve(fromLinkPosition ? this.config.rotateSpeed : false).then((speed) => {
        if (speed) {
          return this.viewer.animate({ ...fromLinkPosition, speed });
        }
      }).then(() => {
        this.viewer.loader.show();
      })
    ]).then(([node]) => {
      if (this.state.loadingNode !== nodeId) {
        throw utils5.getAbortError();
      }
      this.state.currentNode = node;
      if (this.state.currentTooltip) {
        this.state.currentTooltip.hide();
        this.state.currentTooltip = null;
      }
      if (this.is3D) {
        this.arrowsGroup.remove(...this.arrowsGroup.children.filter((o) => o.isMesh));
      }
      this.gallery?.hide();
      this.markers?.clearMarkers();
      this.compass?.clearHotspots();
      if (this.map) {
        this.map.minimize();
        const center = this.__getNodeMapPosition(node);
        if (typeof this.config.transition === "number") {
          setTimeout(() => this.map.setCenter(center), this.config.transition / 2);
        } else {
          this.map.setCenter(center);
        }
      }
      return this.viewer.setPanorama(node.panorama, {
        transition: this.config.transition,
        caption: node.caption,
        description: node.description,
        panoData: node.panoData,
        sphereCorrection: node.sphereCorrection
      }).then((completed) => {
        if (!completed) {
          throw utils5.getAbortError();
        }
      });
    }).then(() => {
      if (this.state.loadingNode !== nodeId) {
        throw utils5.getAbortError();
      }
      const node = this.state.currentNode;
      if (node.markers) {
        this.__addNodeMarkers(node);
      }
      this.__renderLinks(node);
      this.__preload(node);
      this.dispatchEvent(
        new NodeChangedEvent(node, {
          fromNode,
          fromLink,
          fromLinkPosition
        })
      );
      this.state.loadingNode = null;
      return true;
    }).catch((err) => {
      if (utils5.isAbortError(err)) {
        return false;
      }
      this.viewer.showError(this.viewer.config.lang.loadError);
      this.viewer.loader.hide();
      this.viewer.navbar.setCaption("");
      this.state.loadingNode = null;
      throw err;
    });
  }
  /**
   * Adds the links for the node
   */
  __renderLinks(node) {
    const positions = [];
    node.links.forEach((link) => {
      const position = this.__getLinkPosition(node, link);
      positions.push(position);
      if (this.is3D) {
        const mesh = new Mesh2(ARROW_GEOM, new MeshLambertMaterial());
        mesh.userData = { [LINK_DATA]: link };
        mesh.rotation.order = "YXZ";
        mesh.rotateY(-position.yaw);
        this.viewer.dataHelper.sphericalCoordsToVector3({ yaw: position.yaw, pitch: 0 }, mesh.position).multiplyScalar(1 / CONSTANTS.SPHERE_RADIUS);
        const outlineMesh = new Mesh2(ARROW_OUTLINE_GEOM, new MeshBasicMaterial2({ side: BackSide }));
        outlineMesh.position.copy(mesh.position);
        outlineMesh.rotation.copy(mesh.rotation);
        setMeshColor(mesh, link.arrowStyle?.color || this.config.arrowStyle.color);
        setMeshColor(outlineMesh, link.arrowStyle?.outlineColor || this.config.arrowStyle.outlineColor);
        this.arrowsGroup.add(mesh);
        this.arrowsGroup.add(outlineMesh);
      } else {
        if (this.isGps) {
          position.pitch += this.config.markerPitchOffset;
        }
        this.markers.addMarker(
          {
            ...this.config.markerStyle,
            ...link.markerStyle,
            position,
            id: LINK_ID + link.nodeId,
            tooltip: link.name,
            visible: true,
            hideList: true,
            data: { [LINK_DATA]: link }
          },
          false
        );
      }
    });
    if (this.is3D) {
      this.__positionArrows();
    } else {
      this.markers.renderMarkers();
    }
    if (this.config.linksOnCompass && this.compass) {
      this.compass.setHotspots(positions);
    }
  }
  /**
   * Computes the marker position for a link
   */
  __getLinkPosition(node, link) {
    if (this.isGps) {
      return gpsToSpherical(node.gps, link.gps);
    } else {
      return this.viewer.dataHelper.cleanPosition(link.position);
    }
  }
  __onEnterObject(mesh, viewerPoint) {
    const link = mesh.userData[LINK_DATA];
    setMeshColor(mesh, link.arrowStyle?.hoverColor || this.config.arrowStyle.hoverColor);
    if (link.name) {
      this.state.currentTooltip = this.viewer.createTooltip({
        left: viewerPoint.x,
        top: viewerPoint.y,
        content: link.name
      });
    }
    this.viewer.needsUpdate();
  }
  __onHoverObject(viewerPoint) {
    if (this.state.currentTooltip) {
      this.state.currentTooltip.move({
        left: viewerPoint.x,
        top: viewerPoint.y
      });
    }
  }
  __onLeaveObject(mesh) {
    const link = mesh.userData[LINK_DATA];
    setMeshColor(mesh, link.arrowStyle?.color || this.config.arrowStyle.color);
    if (this.state.currentTooltip) {
      this.state.currentTooltip.hide();
      this.state.currentTooltip = null;
    }
    this.viewer.needsUpdate();
  }
  /**
   * Updates to position of the group of arrows
   */
  __positionArrows() {
    this.arrowsGroup.position.copy(this.viewer.state.direction).multiplyScalar(0.5);
    const s = this.config.arrowStyle.scale;
    const f = s[1] + (s[0] - s[1]) * (this.viewer.getZoomLevel() / 100);
    const y = 2.5 - this.viewer.getZoomLevel() / 100 * 1.5;
    this.arrowsGroup.position.y += this.config.arrowPosition === "bottom" ? -y : y;
    this.arrowsGroup.scale.set(f, f, f);
  }
  /**
   * Manage the preload of the linked panoramas
   */
  __preload(node) {
    if (!this.config.preload) {
      return;
    }
    this.state.preload[node.id] = true;
    this.state.currentNode.links.filter((link) => !this.state.preload[link.nodeId]).filter((link) => {
      if (typeof this.config.preload === "function") {
        return this.config.preload(this.state.currentNode, link);
      } else {
        return true;
      }
    }).forEach((link) => {
      this.state.preload[link.nodeId] = this.datasource.loadNode(link.nodeId).then((linkNode) => {
        return this.viewer.textureLoader.preloadPanorama(linkNode.panorama);
      }).then(() => {
        this.state.preload[link.nodeId] = true;
      }).catch(() => {
        delete this.state.preload[link.nodeId];
      });
    });
  }
  /**
   * Changes the markers to the ones defined on the node
   */
  __addNodeMarkers(node) {
    if (this.markers) {
      this.markers.setMarkers(
        node.markers.map((marker) => {
          if (marker.gps && this.isGps) {
            marker.position = gpsToSpherical(node.gps, marker.gps);
            if (marker.data?.["map"] && this.map) {
              Object.assign(marker.data["map"], this.__getGpsMapPosition(marker.gps));
            }
          }
          return marker;
        })
      );
    } else {
      utils5.logWarn(`Node ${node.id} markers ignored because the plugin is not loaded.`);
    }
  }
  /**
   * Gets the position of a node on the map, if applicable
   */
  __getNodeMapPosition(node) {
    const fromGps = this.__getGpsMapPosition(node.gps);
    if (fromGps) {
      return fromGps;
    } else if (node.map) {
      return { x: node.map.x, y: node.map.y };
    } else {
      return null;
    }
  }
  /**
   * Gets a gps position on the map
   */
  __getGpsMapPosition(gps) {
    const map = this.config.map;
    if (this.isGps && map.extent && map.size) {
      return {
        x: MathUtils2.mapLinear(gps[0], map.extent[0], map.extent[2], 0, map.size.width),
        y: MathUtils2.mapLinear(gps[1], map.extent[1], map.extent[3], 0, map.size.height)
      };
    } else {
      return null;
    }
  }
};
VirtualTourPlugin.id = "virtual-tour";
VirtualTourPlugin.configParser = getConfig;
VirtualTourPlugin.readonlyOptions = Object.keys(getConfig.defaults);
export {
  VirtualTourPlugin,
  events_exports as events
};
//# sourceMappingURL=index.module.js.map