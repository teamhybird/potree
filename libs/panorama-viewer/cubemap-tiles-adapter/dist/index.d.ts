import { AbstractAdapter, Viewer, TextureData } from '@photo-sphere-viewer/core';
import { Texture, Mesh, BoxGeometry, MeshBasicMaterial } from 'three';
import { CubemapPanorama, Cubemap, CubemapAdapterConfig } from '@photo-sphere-viewer/cubemap-adapter';

/**
 * Configuration of a tiled cubemap
 */
type CubemapTilesPanorama = {
    /**
     * low resolution panorama loaded before tiles
     */
    baseUrl?: CubemapPanorama;
    /**
     * size of a face in pixels
     */
    faceSize: number;
    /**
     * number of tiles on a side of a face
     */
    nbTiles: number;
    /**
     * function to build a tile url
     */
    tileUrl: (face: keyof Cubemap, col: number, row: number) => string | null;
};
type CubemapTileLevel = {
    /**
     * Lower and upper zoom levels (0-100)
     */
    zoomRange: [number, number];
    /**
     * size of a face in pixels
     */
    faceSize: number;
    /**
     * number of tiles on a side of a face
     */
    nbTiles: number;
};
/**
 * Configuration of a tiled cubemap with multiple tiles configurations
 */
type CubemapMultiTilesPanorama = {
    /**
     * low resolution panorama loaded before tiles
     */
    baseUrl?: string;
    /**
     * Configuration of tiles by zoom level
     */
    levels: CubemapTileLevel[];
    /**
     * function to build a tile url
     */
    tileUrl: (face: keyof Cubemap, col: number, row: number, level: number) => string | null;
};
type CubemapTilesAdapterConfig = CubemapAdapterConfig & {
    /**
     * shows a warning sign on tiles that cannot be loaded
     * @default true
     */
    showErrorTile?: boolean;
    /**
     * applies a blur effect to the low resolution panorama
     * @default true
     */
    baseBlur?: boolean;
};

type CubemapMesh = Mesh<BoxGeometry, MeshBasicMaterial[]>;
type CubemapTexture = TextureData<Texture[], CubemapTilesPanorama | CubemapMultiTilesPanorama>;
/**
 * Adapter for tiled cubemaps
 */
declare class CubemapTilesAdapter extends AbstractAdapter<CubemapTilesPanorama | CubemapMultiTilesPanorama, Texture[]> {
    static readonly id = "cubemap-tiles";
    static readonly supportsDownload = false;
    static readonly supportsOverlay = false;
    private readonly config;
    private readonly state;
    private adapter;
    private readonly queue;
    private readonly loader?;
    constructor(viewer: Viewer, config: CubemapTilesAdapterConfig);
    destroy(): void;
    supportsTransition(panorama: CubemapTilesPanorama): boolean;
    supportsPreload(panorama: CubemapTilesPanorama): boolean;
    loadTexture(panorama: CubemapTilesPanorama): Promise<CubemapTexture>;
    createMesh(scale?: number): CubemapMesh;
    /**
     * Applies the base texture and starts the loading of tiles
     */
    setTexture(mesh: CubemapMesh, textureData: CubemapTexture, transition: boolean): void;
    private __setTexture;
    setTextureOpacity(mesh: CubemapMesh, opacity: number): void;
    /**
     * @throws {@link PSVError} always
     */
    setOverlay(): void;
    disposeTexture(textureData: CubemapTexture): void;
    /**
     * Compute visible tiles and load them
     */
    private __refresh;
    /**
     * Loads tiles and change existing tiles priority
     */
    private __loadTiles;
    /**
     * Loads and draw a tile
     */
    private __loadTile;
    private __loadImage;
    /**
     * Applies a new texture to the faces
     */
    private __swapMaterial;
    /**
     * Clears loading queue, dispose all materials
     */
    private __cleanup;
}

export { CubemapMultiTilesPanorama, CubemapTileLevel, CubemapTilesAdapter, CubemapTilesAdapterConfig, CubemapTilesPanorama };
