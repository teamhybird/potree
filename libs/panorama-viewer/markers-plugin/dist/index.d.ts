import { ExtendedPosition, Size, Position, Viewer, AbstractConfigurablePlugin, utils, TypedEvent } from '@photo-sphere-viewer/core';
import { Object3D } from 'three';

/**
 * Configuration of a marker
 */
type MarkerConfig = {
    /**
     * Path to the image representing the marker
     */
    image?: string;
    /**
     * Path to the image representing the marker
     */
    imageLayer?: string;
    /**
     * HTML content of the marker
     */
    html?: string;
    /**
     * Size of the square
     */
    square?: number;
    /**
     * Size of the rectangle
     */
    rect?: [number, number] | {
        width: number;
        height: number;
    };
    /**
     * Radius of the circle
     */
    circle?: number;
    /**
     * Radiuses of the ellipse
     */
    ellipse?: [number, number] | {
        rx: number;
        ry: number;
    };
    /**
     * Definition of the path
     */
    path?: string;
    /**
     * Array of points defining the polygon in spherical coordinates
     */
    polygon?: [number, number][] | [string, string][] | number[] | string[];
    /**
     * Array of points defining the polygon in pixel coordinates on the panorama image
     */
    polygonPixels?: [number, number][] | number[];
    /**
     * Array of points defining the polyline in spherical coordinates
     */
    polyline?: [number, number][] | [string, string][] | number[] | string[];
    /**
     * Array of points defining the polyline in pixel coordinates on the panorama image
     */
    polylinePixels?: [number, number][] | number[];
    /**
     * Unique identifier of the marker
     */
    id: string;
    /**
     * Position of the marker (required but for `polygon` and `polyline`)
     */
    position?: ExtendedPosition;
    /**
     * Size of the marker (required for `image` and `imageLayer`, recommended for `html`, ignored for others)
     */
    size?: Size;
    /**
     * Applies a perspective on the image to make it look like placed on the floor or on a wall (only for `imageLayer`)
     */
    orientation?: 'front' | 'horizontal' | 'vertical-left' | 'vertical-right';
    /**
     * Configures the scale of the marker depending on the zoom level and/or the horizontal offset (ignored for `polygon`, `polyline` and `imageLayer`)
     */
    scale?: [number, number] | {
        zoom?: [number, number];
        yaw?: [number, number];
    } | ((zoomLevel: number, position: Position) => number);
    /**
     * Opacity of the marker
     * @default 1
     */
    opacity?: number;
    /**
     * CSS class(es) added to the marker element (ignored for `imageLayer`)
     */
    className?: string;
    /**
     * CSS properties to set on the marker (background, border, etc.) (ignored for `imagerLayer`)
     */
    style?: Record<string, string>;
    /**
     * SVG properties to set on the marker (fill, stroke, etc.) (only for SVG markers)
     */
    svgStyle?: Record<string, string>;
    /**
     * Defines where the marker is placed toward its defined position
     * @default 'center center'
     */
    anchor?: string;
    /**
     * The zoom level which will be applied when calling `gotoMarker()` method or when clicking on the marker in the list
     * @default `current zoom level`
     */
    zoomLvl?: number;
    /**
     * Initial visibility of the marker
     * @default true
     */
    visible?: boolean;
    /**
     * Configuration of the marker tooltip
     * @default `{content: null, position: 'top center', className: null, trigger: 'hover'}`
     */
    tooltip?: string | {
        content: string;
        position?: string;
        className?: string;
        trigger?: 'hover' | 'click';
    };
    /**
     * HTML content that will be displayed on the side panel when the marker is clicked
     */
    content?: string;
    /**
     * The name that appears in the list of markers
     * @default `tooltip.content`
     */
    listContent?: string;
    /**
     * Hide the marker in the markers list
     * @default false
     */
    hideList?: boolean;
    /**
     * Any custom data you want to attach to the marker
     */
    data?: any;
};
type ParsedMarkerConfig = Omit<MarkerConfig, 'scale' | 'tooltip'> & {
    scale?: {
        zoom?: [number, number];
        yaw?: [number, number];
    } | ((zoomLevel: number, position: Position) => number);
    tooltip?: {
        content: string;
        position?: string;
        className?: string;
        trigger?: 'hover' | 'click';
    };
};
type MarkersPluginConfig = {
    /**
     * If a `click` event is triggered on the viewer additionally to the `select-marker` event
     * @default false
     */
    clickEventOnMarker?: boolean;
    /**
     * initial markers
     */
    markers?: MarkerConfig[];
    /**
     * Default animation speed for {@link MarkersPlugin#gotoMarker}
     * @default '8rpm'
     */
    gotoMarkerSpeed?: string | number;
};
type UpdatableMarkersPluginConfig = Omit<MarkersPluginConfig, 'markers'>;

declare enum MarkerType {
    image = "image",
    imageLayer = "imageLayer",
    html = "html",
    polygon = "polygon",
    polygonPixels = "polygonPixels",
    polyline = "polyline",
    polylinePixels = "polylinePixels",
    square = "square",
    rect = "rect",
    circle = "circle",
    ellipse = "ellipse",
    path = "path"
}
declare class Marker {
    private readonly viewer;
    readonly type: MarkerType;
    private readonly element;
    /**
     * The final description of the marker. Either text content, image, url, SVG attributes, etc.
     */
    definition: any;
    visible: boolean;
    private loader?;
    config: ParsedMarkerConfig;
    get id(): string;
    get data(): any;
    get domElement(): HTMLElement | SVGElement;
    get threeElement(): Object3D;
    constructor(viewer: Viewer, config: MarkerConfig);
    /**
     * Checks if it is a 3D marker (imageLayer)
     */
    is3d(): boolean;
    /**
     * Checks if it is a normal marker (image or html)
     */
    isNormal(): boolean;
    /**
     * Checks if it is a polygon/polyline marker
     */
    isPoly(): boolean;
    /**
     * Checks if it is a polygon/polyline using pixel coordinates
     */
    isPolyPixels(): boolean;
    /**
     * Checks if it is a polygon/polyline using radian coordinates
     */
    isPolyAngles(): boolean;
    /**
     * Checks if it is a polygon marker
     */
    isPolygon(): boolean;
    /**
     * Checks if it is a polyline marker
     */
    isPolyline(): boolean;
    /**
     * Checks if it is an SVG marker
     */
    isSvg(): boolean;
    /**
     * Updates a normal marker
     */
    private __updateNormal;
    /**
     * Updates an SVG marker
     */
    private __updateSvg;
    /**
     * Updates a polygon marker
     */
    private __updatePoly;
    /**
     * Updates a 3D marker
     */
    private __update3d;
    private __createMesh;
    /**
     * Determines the type of a marker by the available properties
     * @throws {@link PSVError} when the marker's type cannot be found
     */
    static getType(config: MarkerConfig, allowNone?: boolean): MarkerType;
}

/**
 * Displays various markers on the viewer
 */
declare class MarkersPlugin extends AbstractConfigurablePlugin<MarkersPluginConfig, MarkersPluginConfig, UpdatableMarkersPluginConfig, MarkersPluginEvents> {
    static readonly id = "markers";
    static readonly configParser: utils.ConfigParser<MarkersPluginConfig, MarkersPluginConfig>;
    static readonly readonlyOptions: Array<keyof MarkersPluginConfig>;
    private readonly markers;
    private readonly state;
    private readonly container;
    private readonly svgContainer;
    constructor(viewer: Viewer, config: MarkersPluginConfig);
    /**
     * Toggles all markers
     */
    toggleAllMarkers(): void;
    /**
     * Shows all markers
     */
    showAllMarkers(): void;
    /**
     * Hides all markers
     */
    hideAllMarkers(): void;
    /**
     * Toggles the visibility of all tooltips
     */
    toggleAllTooltips(): void;
    /**
     *  Displays all tooltips
     */
    showAllTooltips(): void;
    /**
     * Hides all tooltips
     */
    hideAllTooltips(): void;
    /**
     * Returns the total number of markers
     */
    getNbMarkers(): number;
    /**
     * Returns all the markers
     */
    getMarkers(): Marker[];
    /**
     * Adds a new marker to viewer
     * @throws {@link PSVError} when the marker's id is missing or already exists
     */
    addMarker(config: MarkerConfig, render?: boolean): void;
    /**
     * Returns the internal marker object for a marker id
     * @throws {@link PSVError} when the marker cannot be found
     */
    getMarker(markerId: string | MarkerConfig): Marker;
    /**
     * Returns the last marker selected by the user
     */
    getCurrentMarker(): Marker;
    /**
     * Updates the existing marker with the same id
     * @description Every property can be changed but you can't change its type (Eg: `image` to `html`)
     */
    updateMarker(config: MarkerConfig, render?: boolean): void;
    /**
     * Removes a marker from the viewer
     */
    removeMarker(markerId: string | MarkerConfig, render?: boolean): void;
    /**
     * Removes multiple markers
     */
    removeMarkers(markerIds: string[], render?: boolean): void;
    /**
     * Replaces all markers
     */
    setMarkers(markers: MarkerConfig[], render?: boolean): void;
    /**
     * Removes all markers
     */
    clearMarkers(render?: boolean): void;
    /**
     * Rotate the view to face the marker
     */
    gotoMarker(markerId: string | MarkerConfig, speed?: string | number): Promise<void>;
    /**
     * Hides a marker
     */
    hideMarker(markerId: string | MarkerConfig): void;
    /**
     * Shows a marker
     */
    showMarker(markerId: string | MarkerConfig): void;
    /**
     * Forces the display of the tooltip of a marker
     */
    showMarkerTooltip(markerId: string | MarkerConfig): void;
    /**
     * Hides the tooltip of a marker
     */
    hideMarkerTooltip(markerId: string | MarkerConfig): void;
    /**
     * Toggles a marker visibility
     */
    toggleMarker(markerId: string | MarkerConfig, visible?: boolean): void;
    /**
     * Opens the panel with the content of the marker
     */
    showMarkerPanel(markerId: string | MarkerConfig): void;
    /**
     * Closes the panel if currently showing the content of a marker
     */
    hideMarkerPanel(): void;
    /**
     * Toggles the visibility of the list of markers
     */
    toggleMarkersList(): void;
    /**
     * Opens side panel with the list of markers
     */
    showMarkersList(): void;
    /**
     * Closes side panel if it contains the list of markers
     */
    hideMarkersList(): void;
    /**
     * Updates the visibility and the position of all markers
     */
    renderMarkers(): void;
    /**
     * Determines if a point marker is visible<br>
     * It tests if the point is in the general direction of the camera, then check if it's in the viewport
     */
    private __isMarkerVisible;
    /**
     * Computes the real size of a marker
     * @description This is done by removing all it's transformations (if any) and making it visible
     * before querying its bounding rect
     */
    private __updateMarkerSize;
    /**
     * Computes viewer coordinates of a marker
     */
    private __getMarkerPosition;
    /**
     * Computes viewer coordinates of each point of a polygon/polyline<br>
     * It handles points behind the camera by creating intermediary points suitable for the projector
     */
    private __getPolyPositions;
    /**
     * Given one point in the same direction of the camera and one point behind the camera,
     * computes an intermediary point on the great circle delimiting the half sphere visible by the camera.
     * The point is shifted by .01 rad because the projector cannot handle points exactly on this circle.
     * @todo : does not work with fisheye view (must not use the great circle)
     * @link http://math.stackexchange.com/a/1730410/327208
     */
    private __getPolyIntermediaryPoint;
    /**
     * Returns the marker associated to an event target
     */
    private __getTargetMarker;
    /**
     * Checks if an event target is in the tooltip
     */
    private __targetOnTooltip;
    /**
     * Handles mouse enter events, show the tooltip for non polygon markers
     */
    private __onMouseEnter;
    /**
     * Handles mouse leave events, hide the tooltip
     */
    private __onMouseLeave;
    /**
     * Handles mouse move events, refreshUi the tooltip for polygon markers
     */
    private __onMouseMove;
    /**
     * Handles mouse click events, select the marker and open the panel if necessary
     */
    private __onClick;
    private __afterChangerMarkers;
    /**
     * Updates the visiblity of the panel and the buttons
     */
    private __refreshUi;
    /**
     * Adds or remove the objects observer if there are 3D markers
     */
    private __checkObjectsObserver;
}

/**
 * Base class for events dispatched by {@link MarkersPlugin}
 */
declare abstract class MarkersPluginEvent extends TypedEvent<MarkersPlugin> {
}
/**
 * @event Triggered when the visibility of a marker changes
 */
declare class MarkerVisibilityEvent extends MarkersPluginEvent {
    readonly marker: Marker;
    readonly visible: boolean;
    static readonly type = "marker-visibility";
    type: 'marker-visibility';
    constructor(marker: Marker, visible: boolean);
}
/**
 * @event Triggered when the animation to a marker is done
 */
declare class GotoMarkerDoneEvent extends MarkersPluginEvent {
    readonly marker: Marker;
    static readonly type = "goto-marker-done";
    type: 'goto-marker-done';
    constructor(marker: Marker);
}
/**
 * @event Triggered when the user puts the cursor away from a marker
 */
declare class LeaveMarkerEvent extends MarkersPluginEvent {
    readonly marker: Marker;
    static readonly type = "leave-marker";
    type: 'leave-marker';
    constructor(marker: Marker);
}
/**
 * @event Triggered when the user puts the cursor hover a marker
 */
declare class EnterMarkerEvent extends MarkersPluginEvent {
    readonly marker: Marker;
    static readonly type = "enter-marker";
    type: 'enter-marker';
    constructor(marker: Marker);
}
/**
 * @event Triggered when the user clicks on a marker
 */
declare class SelectMarkerEvent extends MarkersPluginEvent {
    readonly marker: Marker;
    readonly doubleClick: boolean;
    readonly rightClick: boolean;
    static readonly type = "select-marker";
    type: 'select-marker';
    constructor(marker: Marker, doubleClick: boolean, rightClick: boolean);
}
/**
 * @event Triggered when a marker is selected from the side panel
 */
declare class SelectMarkerListEvent extends MarkersPluginEvent {
    readonly marker: Marker;
    static readonly type = "select-marker-list";
    type: 'select-marker-list';
    constructor(marker: Marker);
}
/**
 * @event Triggered when a marker was selected and the user clicks elsewhere
 */
declare class UnselectMarkerEvent extends MarkersPluginEvent {
    readonly marker: Marker;
    static readonly type = "unselect-marker";
    type: 'unselect-marker';
    constructor(marker: Marker);
}
/**
 * @event Triggered when the markers are hidden
 */
declare class HideMarkersEvent extends MarkersPluginEvent {
    static readonly type = "hide-markers";
    type: 'hide-markers';
    constructor();
}
/**
 * @event Triggered when the markers change
 */
declare class SetMarkersEvent extends MarkersPluginEvent {
    readonly markers: Marker[];
    static readonly type = "set-markers";
    type: 'set-markers';
    constructor(markers: Marker[]);
}
/**
 * @event Triggered when the markers are shown
 */
declare class ShowMarkersEvent extends MarkersPluginEvent {
    static readonly type = "show-markers";
    type: 'show-markers';
    constructor();
}
/**
 * @event Used to alter the list of markers displayed in the side-panel
 */
declare class RenderMarkersListEvent extends MarkersPluginEvent {
    /** the list of markers to display, can be modified */
    markers: Marker[];
    static readonly type = "render-markers-list";
    type: 'render-markers-list';
    constructor(
    /** the list of markers to display, can be modified */
    markers: Marker[]);
}
type MarkersPluginEvents = MarkerVisibilityEvent | GotoMarkerDoneEvent | LeaveMarkerEvent | EnterMarkerEvent | SelectMarkerEvent | SelectMarkerListEvent | UnselectMarkerEvent | HideMarkersEvent | SetMarkersEvent | ShowMarkersEvent | RenderMarkersListEvent;

type events_MarkersPluginEvent = MarkersPluginEvent;
declare const events_MarkersPluginEvent: typeof MarkersPluginEvent;
type events_MarkerVisibilityEvent = MarkerVisibilityEvent;
declare const events_MarkerVisibilityEvent: typeof MarkerVisibilityEvent;
type events_GotoMarkerDoneEvent = GotoMarkerDoneEvent;
declare const events_GotoMarkerDoneEvent: typeof GotoMarkerDoneEvent;
type events_LeaveMarkerEvent = LeaveMarkerEvent;
declare const events_LeaveMarkerEvent: typeof LeaveMarkerEvent;
type events_EnterMarkerEvent = EnterMarkerEvent;
declare const events_EnterMarkerEvent: typeof EnterMarkerEvent;
type events_SelectMarkerEvent = SelectMarkerEvent;
declare const events_SelectMarkerEvent: typeof SelectMarkerEvent;
type events_SelectMarkerListEvent = SelectMarkerListEvent;
declare const events_SelectMarkerListEvent: typeof SelectMarkerListEvent;
type events_UnselectMarkerEvent = UnselectMarkerEvent;
declare const events_UnselectMarkerEvent: typeof UnselectMarkerEvent;
type events_HideMarkersEvent = HideMarkersEvent;
declare const events_HideMarkersEvent: typeof HideMarkersEvent;
type events_SetMarkersEvent = SetMarkersEvent;
declare const events_SetMarkersEvent: typeof SetMarkersEvent;
type events_ShowMarkersEvent = ShowMarkersEvent;
declare const events_ShowMarkersEvent: typeof ShowMarkersEvent;
type events_RenderMarkersListEvent = RenderMarkersListEvent;
declare const events_RenderMarkersListEvent: typeof RenderMarkersListEvent;
type events_MarkersPluginEvents = MarkersPluginEvents;
declare namespace events {
  export {
    events_MarkersPluginEvent as MarkersPluginEvent,
    events_MarkerVisibilityEvent as MarkerVisibilityEvent,
    events_GotoMarkerDoneEvent as GotoMarkerDoneEvent,
    events_LeaveMarkerEvent as LeaveMarkerEvent,
    events_EnterMarkerEvent as EnterMarkerEvent,
    events_SelectMarkerEvent as SelectMarkerEvent,
    events_SelectMarkerListEvent as SelectMarkerListEvent,
    events_UnselectMarkerEvent as UnselectMarkerEvent,
    events_HideMarkersEvent as HideMarkersEvent,
    events_SetMarkersEvent as SetMarkersEvent,
    events_ShowMarkersEvent as ShowMarkersEvent,
    events_RenderMarkersListEvent as RenderMarkersListEvent,
    events_MarkersPluginEvents as MarkersPluginEvents,
  };
}

export { Marker, MarkerConfig, MarkerType, MarkersPlugin, MarkersPluginConfig, ParsedMarkerConfig, UpdatableMarkersPluginConfig, events };
