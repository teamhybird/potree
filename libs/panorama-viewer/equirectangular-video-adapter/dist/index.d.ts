import { AbstractAdapter, Viewer, TextureData, EquirectangularAdapterConfig } from '@photo-sphere-viewer/core';
import { VideoTexture, Mesh, BufferGeometry, Material, SphereGeometry, MeshBasicMaterial } from 'three';

type AbstractVideoPanorama = {
    source: string;
};
type AbstractVideoAdapterConfig = {
    /**
     * automatically start the video
     * @default false
     */
    autoplay?: boolean;
    /**
     * initially mute the video
     * @default false
     */
    muted?: boolean;
};
type AbstractVideoMesh = Mesh<BufferGeometry, Material>;
type AbstractVideoTexture = TextureData<VideoTexture>;
/**
 * Base video adapters class
 */
declare abstract class AbstractVideoAdapter<TPanorama extends AbstractVideoPanorama> extends AbstractAdapter<TPanorama, VideoTexture> {
    static readonly supportsDownload = false;
    static readonly supportsOverlay = false;
    protected abstract readonly config: AbstractVideoAdapterConfig;
    private video;
    constructor(viewer: Viewer);
    destroy(): void;
    supportsPreload(): boolean;
    supportsTransition(): boolean;
    loadTexture(panorama: AbstractVideoPanorama): Promise<AbstractVideoTexture>;
    protected switchVideo(texture: VideoTexture): void;
    setTextureOpacity(mesh: AbstractVideoMesh, opacity: number): void;
    setOverlay(): void;
    disposeTexture(textureData: AbstractVideoTexture): void;
    private __removeVideo;
    private __createVideo;
    private __videoLoadPromise;
    private __videoBufferPromise;
}

/**
 * Configuration of an equirectangular video
 */
type EquirectangularVideoPanorama = AbstractVideoPanorama;
type EquirectangularVideoAdapterConfig = EquirectangularAdapterConfig & AbstractVideoAdapterConfig;

type EquirectangularMesh = Mesh<SphereGeometry, MeshBasicMaterial>;
type EquirectangularTexture = TextureData<VideoTexture, EquirectangularVideoPanorama>;
/**
 * Adapter for equirectangular videos
 */
declare class EquirectangularVideoAdapter extends AbstractVideoAdapter<EquirectangularVideoPanorama> {
    static readonly id = "equirectangular-video";
    protected readonly config: EquirectangularVideoAdapterConfig;
    private readonly SPHERE_SEGMENTS;
    private readonly SPHERE_HORIZONTAL_SEGMENTS;
    constructor(viewer: Viewer, config: EquirectangularVideoAdapterConfig);
    loadTexture(panorama: EquirectangularVideoPanorama): Promise<EquirectangularTexture>;
    createMesh(scale?: number): EquirectangularMesh;
    setTexture(mesh: EquirectangularMesh, textureData: EquirectangularTexture): void;
}

export { EquirectangularVideoAdapter, EquirectangularVideoAdapterConfig, EquirectangularVideoPanorama };
