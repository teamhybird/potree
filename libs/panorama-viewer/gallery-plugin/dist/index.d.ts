import { PanoramaOptions, Size, AbstractConfigurablePlugin, utils, Viewer, TypedEvent } from '@photo-sphere-viewer/core';

type GalleryItem = {
    /**
     * Unique identifier of the item
     */
    id: string | number;
    /**
     * Panorama of the item
     */
    panorama: any;
    /**
     * URL of the thumbnail
     */
    thumbnail?: string;
    /**
     * Text visible over the thumbnail
     */
    name?: string;
    /**
     * Any option supported by the `setPanorama()` method
     */
    options?: PanoramaOptions;
};
type GalleryPluginConfig = {
    items?: GalleryItem[];
    /**
     * Displays the gallery when loading the first panorama
     * @default false
     */
    visibleOnLoad?: boolean;
    /**
     * Hides the gallery when the user clicks on an item
     * @default true
     */
    hideOnClick?: boolean;
    /**
     *  Size of thumbnails
     * @default 200x100
     */
    thumbnailSize?: Size;
};
type UpdatableGalleryPluginConfig = Omit<GalleryPluginConfig, 'visibleOnLoad' | 'items'>;

/**
 * Adds a gallery of multiple panoramas
 */
declare class GalleryPlugin extends AbstractConfigurablePlugin<GalleryPluginConfig, GalleryPluginConfig, UpdatableGalleryPluginConfig, GalleryPluginEvents> {
    static readonly id = "gallery";
    static readonly configParser: utils.ConfigParser<GalleryPluginConfig, GalleryPluginConfig>;
    static readonly readonlyOptions: Array<keyof GalleryPluginConfig>;
    private readonly gallery;
    private items;
    private handler?;
    private currentId?;
    constructor(viewer: Viewer, config: GalleryPluginConfig);
    setOptions(options: Partial<UpdatableGalleryPluginConfig>): void;
    /**
     * Shows the gallery
     */
    show(): void;
    /**
     * Hides the carousem
     */
    hide(): void;
    /**
     * Hides or shows the gallery
     */
    toggle(): void;
    /**
     * Sets the list of items
     * @param items
     * @param [handler] function that will be called when an item is clicked instead of the default behavior
     * @throws {@link PSVError} if the configuration is invalid
     */
    setItems(items: GalleryItem[], handler?: (id: GalleryItem['id']) => void): void;
    private __updateButton;
}

/**
 * @event Triggered when the gallery shown
 */
declare class ShowGalleryEvent extends TypedEvent<GalleryPlugin> {
    static readonly type = "show-gallery";
    type: 'show-gallery';
    constructor();
}
/**
 * @event Triggered when the gallery hidden
 */
declare class HideGalleryEvent extends TypedEvent<GalleryPlugin> {
    static readonly type = "hide-gallery";
    type: 'hide-gallery';
    constructor();
}
type GalleryPluginEvents = ShowGalleryEvent | HideGalleryEvent;

type events_ShowGalleryEvent = ShowGalleryEvent;
declare const events_ShowGalleryEvent: typeof ShowGalleryEvent;
type events_HideGalleryEvent = HideGalleryEvent;
declare const events_HideGalleryEvent: typeof HideGalleryEvent;
type events_GalleryPluginEvents = GalleryPluginEvents;
declare namespace events {
  export {
    events_ShowGalleryEvent as ShowGalleryEvent,
    events_HideGalleryEvent as HideGalleryEvent,
    events_GalleryPluginEvents as GalleryPluginEvents,
  };
}

export { GalleryItem, GalleryPlugin, GalleryPluginConfig, UpdatableGalleryPluginConfig, events };
