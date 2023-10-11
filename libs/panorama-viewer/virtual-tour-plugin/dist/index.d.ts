import { ExtendedPosition, PanoData, PanoDataProvider, SphereCorrection, Point, Size, AbstractConfigurablePlugin, utils, Viewer, TypedEvent, Position } from '@photo-sphere-viewer/core';
import { MarkerConfig } from '@photo-sphere-viewer/markers-plugin';
import { MapHotspot } from '@photo-sphere-viewer/map-plugin';

/**
 * Definition of GPS coordinates (longitude, latitude, optional altitude)
 */
type GpsPosition = [number, number, number?];
/**
 * Style of the arrow in 3D mode
 */
type VirtualTourArrowStyle = {
    /**
     * @default '#aaaaaa'
     */
    color?: string;
    /**
     * @default '#aa5500'
     */
    hoverColor?: string;
    /**
     * @default '#000000'
     */
    outlineColor?: string;
    /**
     * @default [0.5,2]
     */
    scale?: [number, number];
};
/**
 * Style of the marker in markers mode
 */
type VirtualTourMarkerStyle = Omit<MarkerConfig, 'id' | 'position' | 'polygon' | 'polygonPixels' | 'polyline' | 'polylinePixels' | 'tooltip' | 'content' | 'listContent' | 'hideList' | 'visible' | 'data'>;
/**
 * Definition of a link between two nodes
 */
type VirtualTourLink = Partial<ExtendedPosition> & {
    /**
     * identifier of the target node
     */
    nodeId: string;
    /**
     * override the name of the node (tooltip)
     */
    name?: string;
    /**
     * define the position of the link (manual mode)
     */
    position?: ExtendedPosition;
    /**
     * override the GPS position of the node (GPS mode)
     */
    gps?: [number, number, number?];
    /**
     * override global marker style
     */
    markerStyle?: VirtualTourMarkerStyle;
    /**
     * override global arrow style
     */
    arrowStyle?: VirtualTourArrowStyle;
};
/**
 * Definition of a single node in the tour
 */
type VirtualTourNode = {
    id: string;
    panorama: any;
    /**
     * short name of the node (links tooltip, gallery)
     */
    name?: string;
    /**
     * caption visible in the navbar
     */
    caption?: string;
    /**
     * description visible in the side panel
     */
    description?: string;
    /**
     * data used for this panorama
     */
    panoData?: PanoData | PanoDataProvider;
    /**
     * sphere correction to apply to this panorama
     */
    sphereCorrection?: SphereCorrection;
    /**
     * links to other nodes
     */
    links?: VirtualTourLink[];
    /**
     * GPS position
     */
    gps?: GpsPosition;
    /**
     * thumbnail for the gallery
     */
    thumbnail?: string;
    /**
     * additional markers to use on this node
     */
    markers?: (MarkerConfig & {
        gps?: GpsPosition;
    })[];
    /**
     * configuration of the hotspot when using the MapPlugin
     */
    map?: Partial<Point> & Omit<MapHotspot, 'id' | 'yaw' | 'distance'>;
};
type VirtualTourPluginConfig = {
    /**
     * configure data mode
     * @default 'client'
     */
    dataMode?: 'client' | 'server';
    /**
     * configure positioning mode
     * @default 'manual'
     */
    positionMode?: 'manual' | 'gps';
    /**
     * configure rendering mode of links
     * @defaul '3d'
     */
    renderMode?: '3d' | 'markers';
    /**
     * initial nodes (client mode)
     */
    nodes?: VirtualTourNode[];
    /**
     * function to fetch a node (server mode)
     */
    getNode?: (nodeId: string) => VirtualTourNode | Promise<VirtualTourNode>;
    /**
     * id of the initial node, if not defined the first node will be used
     */
    startNodeId?: string;
    /**
     * preload linked panoramas
     */
    preload?: boolean | ((node: VirtualTourNode, link: VirtualTourLink) => boolean);
    /**
     * speed of rotation when clicking on a link, if 'false' the viewer won't rotate at all
     * @defaul '20rpm'
     */
    rotateSpeed?: false | string | number;
    /**
     * duration of the transition between nodes
     * @default 1500
     */
    transition?: boolean | number;
    /**
     * if the Compass plugin is enabled, displays the links on the compass
     * @default true
     */
    linksOnCompass?: boolean;
    /**
     * global marker style
     */
    markerStyle?: VirtualTourMarkerStyle;
    /**
     * global arrow style
     */
    arrowStyle?: VirtualTourArrowStyle;
    /**
     * (GPS & Markers mode) vertical offset applied to link markers, to compensate for viewer height
     * @default -0.1
     */
    markerPitchOffset?: number;
    /**
     * (3D mode) arrows vertical position
     * @default 'bottom'
     */
    arrowPosition?: 'top' | 'bottom';
    /**
     * special configuration when using the MapPlugin
     */
    map?: {
        /**
         * URL of the map
         */
        imageUrl: string;
        /**
         * size of the map in pixels
         */
        size?: Size;
        /**
         * bounds of the map in GPS coordinates (minX, minY, maxX, maxY)
         */
        extent?: [number, number, number, number];
    };
};

/**
 * Creates virtual tours by linking multiple panoramas
 */
declare class VirtualTourPlugin extends AbstractConfigurablePlugin<VirtualTourPluginConfig, VirtualTourPluginConfig, never, VirtualTourEvents> {
    static readonly id = "virtual-tour";
    static readonly configParser: utils.ConfigParser<VirtualTourPluginConfig, VirtualTourPluginConfig>;
    static readonly readonlyOptions: string[];
    private readonly state;
    private datasource;
    private arrowsGroup;
    private map?;
    private markers?;
    private compass?;
    private gallery?;
    get is3D(): boolean;
    get isServerSide(): boolean;
    get isGps(): boolean;
    constructor(viewer: Viewer, config: VirtualTourPluginConfig);
    /**
     * Sets the nodes (client mode only)
     * @throws {@link PSVError} if not in client mode
     */
    setNodes(nodes: VirtualTourNode[], startNodeId?: string): void;
    /**
     * Changes the current node
     * @returns {Promise<boolean>} resolves false if the loading was aborted by another call
     */
    setCurrentNode(nodeId: string, fromLink?: VirtualTourLink): Promise<boolean>;
    /**
     * Adds the links for the node
     */
    private __renderLinks;
    /**
     * Computes the marker position for a link
     */
    private __getLinkPosition;
    private __onEnterObject;
    private __onHoverObject;
    private __onLeaveObject;
    /**
     * Updates to position of the group of arrows
     */
    private __positionArrows;
    /**
     * Manage the preload of the linked panoramas
     */
    private __preload;
    /**
     * Changes the markers to the ones defined on the node
     */
    private __addNodeMarkers;
    /**
     * Gets the position of a node on the map, if applicable
     */
    private __getNodeMapPosition;
    /**
     * Gets a gps position on the map
     */
    private __getGpsMapPosition;
}

/**
 * @event Triggered when the current node changes
 */
declare class NodeChangedEvent extends TypedEvent<VirtualTourPlugin> {
    readonly node: VirtualTourNode;
    readonly data: {
        fromNode: VirtualTourNode;
        fromLink: VirtualTourLink;
        fromLinkPosition: Position;
    };
    static readonly type = "node-changed";
    type: 'node-changed';
    constructor(node: VirtualTourNode, data: {
        fromNode: VirtualTourNode;
        fromLink: VirtualTourLink;
        fromLinkPosition: Position;
    });
}
type VirtualTourEvents = NodeChangedEvent;

type events_NodeChangedEvent = NodeChangedEvent;
declare const events_NodeChangedEvent: typeof NodeChangedEvent;
type events_VirtualTourEvents = VirtualTourEvents;
declare namespace events {
  export {
    events_NodeChangedEvent as NodeChangedEvent,
    events_VirtualTourEvents as VirtualTourEvents,
  };
}

export { GpsPosition, VirtualTourArrowStyle, VirtualTourLink, VirtualTourMarkerStyle, VirtualTourNode, VirtualTourPlugin, VirtualTourPluginConfig, events };
