import { AbstractAdapter, Viewer, TextureData } from '@photo-sphere-viewer/core';
import { VideoTexture, Mesh, BufferGeometry, Material, BoxGeometry, ShaderMaterial } from 'three';

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
 * Configuration of a cubemap video
 */
type CubemapVideoPanorama = AbstractVideoPanorama;
type CubemapVideoAdapterConfig = AbstractVideoAdapterConfig & {
    /**
     * if the video is an equiangular cubemap (EAC)
     * @default true
     */
    equiangular?: boolean;
};

type CubemapMesh = Mesh<BoxGeometry, ShaderMaterial>;
type CubemapTexture = TextureData<VideoTexture, CubemapVideoPanorama>;
/**
 * Adapter for cubemap videos
 */
declare class CubemapVideoAdapter extends AbstractVideoAdapter<CubemapVideoPanorama> {
    static readonly id = "cubemap-video";
    protected readonly config: CubemapVideoAdapterConfig;
    constructor(viewer: Viewer, config: CubemapVideoAdapterConfig);
    createMesh(scale?: number): CubemapMesh;
    setTexture(mesh: CubemapMesh, textureData: CubemapTexture): void;
}

export { CubemapVideoAdapter, CubemapVideoAdapterConfig, CubemapVideoPanorama };
