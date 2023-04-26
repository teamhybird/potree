import { AbstractAdapter, Viewer, TextureData } from '@photo-sphere-viewer/core';
import { Texture, Mesh, BoxGeometry, ShaderMaterial } from 'three';

type CubemapFaces = 'left' | 'front' | 'right' | 'back' | 'top' | 'bottom';
/**
 * Object defining a cubemap as separated files
 */
type Cubemap = {
    [K in CubemapFaces]: string;
};
/**
 * Object defining a cubemap as separated files
 * @description images order is : left, front, right, back, top, bottom
 */
type CubemapArray = string[6];
/**
 * Object defining a cubemap as separated files
 */
type CubemapSeparate = {
    type: 'separate';
    paths: Cubemap | CubemapArray;
};
/**
 * Object defining a cubemap as a single stripe file
 */
type CubemapStripe = {
    type: 'stripe';
    path: string;
    /**
     * Order of the faces in the file
     * @default 'left, front, right, back, top, bottom'
     */
    order?: CubemapFaces[];
};
/**
 * Object defining a cubemap as a single net file (cross arrangement)
 */
type CubemapNet = {
    type: 'net';
    path: string;
};
/**
 * Configuration of a cubemap
 */
type CubemapPanorama = Cubemap | CubemapArray | CubemapSeparate | CubemapStripe | CubemapNet;
type CubemapAdapterConfig = {
    /**
     * set to true if the top and bottom faces are not correctly oriented
     * @default false
     */
    flipTopBottom?: boolean;
};

type CubemapMesh = Mesh<BoxGeometry, ShaderMaterial[]>;
type CubemapTexture = TextureData<Texture[], CubemapPanorama>;
/**
 * Adapter for cubemaps
 */
declare class CubemapAdapter extends AbstractAdapter<CubemapPanorama, Texture[]> {
    static readonly id = "cubemap";
    static readonly supportsDownload = false;
    static readonly supportsOverlay = true;
    private readonly config;
    constructor(viewer: Viewer, config: CubemapAdapterConfig);
    supportsTransition(): boolean;
    supportsPreload(): boolean;
    loadTexture(panorama: CubemapPanorama): Promise<CubemapTexture>;
    private loadTexturesSeparate;
    private createCubemapTexture;
    private loadTexturesStripe;
    private loadTexturesNet;
    createMesh(scale?: number): CubemapMesh;
    setTexture(mesh: CubemapMesh, textureData: CubemapTexture): void;
    setOverlay(mesh: CubemapMesh, textureData: CubemapTexture, opacity: number): void;
    setTextureOpacity(mesh: CubemapMesh, opacity: number): void;
    disposeTexture(textureData: CubemapTexture): void;
    private __setUniform;
}

export { Cubemap, CubemapAdapter, CubemapAdapterConfig, CubemapArray, CubemapFaces, CubemapNet, CubemapPanorama, CubemapSeparate, CubemapStripe };
