import { BufferGeometry, MathUtils, Mesh, ShaderMaterial, SphereGeometry, Texture } from 'three';
import { SPHERE_RADIUS } from '../data/constants';
import { SYSTEM } from '../data/system';
import { PanoData, PanoDataProvider, TextureData } from '../model';
import { PSVError } from '../PSVError';
import { createTexture, firstNonNull, getConfigParser, getXMPValue, logWarn } from '../utils';
import type { Viewer } from '../Viewer';
import { AbstractAdapter } from './AbstractAdapter';

/**
 * Configuration for {@link EquirectangularAdapter}
 */
export type EquirectangularAdapterConfig = {
    /**
     * number of faces of the sphere geometry, higher values may decrease performances
     * @default 64
     */
    resolution?: number;
    /**
     * used for equirectangular tiles adapter
     * @internal
     */
    blur?: boolean;
};

type EquirectangularMesh = Mesh<BufferGeometry, ShaderMaterial>;
type EquirectangularTexture = TextureData<Texture, string>;

const getConfig = getConfigParser<EquirectangularAdapterConfig>(
    {
        resolution: 64,
        blur: false,
    },
    {
        resolution: (resolution) => {
            if (!resolution || !MathUtils.isPowerOfTwo(resolution)) {
                throw new PSVError('EquirectangularAdapter resolution must be power of two');
            }
            return resolution;
        },
    }
);

/**
 * Adapter for equirectangular panoramas
 */
export class EquirectangularAdapter extends AbstractAdapter<string, Texture> {
    static override readonly id: string = 'equirectangular';
    static override readonly supportsDownload: boolean = true;
    static override readonly supportsOverlay: boolean = true;

    private readonly config: EquirectangularAdapterConfig;

    private readonly SPHERE_SEGMENTS: number;
    private readonly SPHERE_HORIZONTAL_SEGMENTS: number;

    constructor(viewer: Viewer, config?: EquirectangularAdapterConfig) {
        super(viewer);

        this.config = getConfig(config);

        this.SPHERE_SEGMENTS = this.config.resolution;
        this.SPHERE_HORIZONTAL_SEGMENTS = this.SPHERE_SEGMENTS / 2;
    }

    override supportsTransition() {
        return true;
    }

    override supportsPreload() {
        return true;
    }

    async loadTexture(
        panorama: string,
        newPanoData: PanoData | PanoDataProvider,
        useXmpPanoData = this.viewer.config.useXmpData
    ): Promise<EquirectangularTexture> {
        if (typeof panorama !== 'string') {
            return Promise.reject(new PSVError('Invalid panorama url, are you using the right adapter?'));
        }

        let img: HTMLImageElement;
        let xmpPanoData: PanoData;

        if (useXmpPanoData) {
            xmpPanoData = await this.loadXMP(panorama, (p) => this.viewer.loader.setProgress(p));
            img = await this.viewer.textureLoader.loadImage(panorama);
        } else {
            img = await this.viewer.textureLoader.loadImage(panorama, (p) => this.viewer.loader.setProgress(p));
        }

        if (typeof newPanoData === 'function') {
            newPanoData = newPanoData(img);
        }

        const panoData = {
            fullWidth: firstNonNull(newPanoData?.fullWidth, xmpPanoData?.fullWidth, img.width),
            fullHeight: firstNonNull(newPanoData?.fullHeight, xmpPanoData?.fullHeight, img.height),
            croppedWidth: firstNonNull(newPanoData?.croppedWidth, xmpPanoData?.croppedWidth, img.width),
            croppedHeight: firstNonNull(newPanoData?.croppedHeight, xmpPanoData?.croppedHeight, img.height),
            croppedX: firstNonNull(newPanoData?.croppedX, xmpPanoData?.croppedX, 0),
            croppedY: firstNonNull(newPanoData?.croppedY, xmpPanoData?.croppedY, 0),
            poseHeading: firstNonNull(newPanoData?.poseHeading, xmpPanoData?.poseHeading, 0),
            posePitch: firstNonNull(newPanoData?.posePitch, xmpPanoData?.posePitch, 0),
            poseRoll: firstNonNull(newPanoData?.poseRoll, xmpPanoData?.poseRoll, 0),
        };

        if (panoData.croppedWidth !== img.width || panoData.croppedHeight !== img.height) {
            logWarn(`Invalid panoData, croppedWidth and/or croppedHeight is not coherent with loaded image.
              panoData: ${panoData.croppedWidth}x${panoData.croppedHeight}, image: ${img.width}x${img.height}`);
        }
        if ((newPanoData || xmpPanoData) && panoData.fullWidth !== panoData.fullHeight * 2) {
            logWarn('Invalid panoData, fullWidth should be twice fullHeight');
        }

        const texture = this.createEquirectangularTexture(img, panoData);

        return { panorama, texture, panoData };
    }

    /**
     * Loads the XMP data of an image
     */
    private async loadXMP(panorama: string, onProgress?: (p: number) => void): Promise<PanoData> {
        const blob = await this.viewer.textureLoader.loadFile(panorama, onProgress);
        const binary = await this.loadBlobAsString(blob);

        const a = binary.indexOf('<x:xmpmeta');
        const b = binary.indexOf('</x:xmpmeta>');
        const data = binary.substring(a, b);

        if (a !== -1 && b !== -1 && data.includes('GPano:')) {
            return {
                fullWidth: getXMPValue(data, 'FullPanoWidthPixels'),
                fullHeight: getXMPValue(data, 'FullPanoHeightPixels'),
                croppedWidth: getXMPValue(data, 'CroppedAreaImageWidthPixels'),
                croppedHeight: getXMPValue(data, 'CroppedAreaImageHeightPixels'),
                croppedX: getXMPValue(data, 'CroppedAreaLeftPixels'),
                croppedY: getXMPValue(data, 'CroppedAreaTopPixels'),
                poseHeading: getXMPValue(data, 'PoseHeadingDegrees'),
                posePitch: getXMPValue(data, 'PosePitchDegrees'),
                poseRoll: getXMPValue(data, 'PoseRollDegrees'),
            };
        }

        return null;
    }

    /**
     * Reads a Blob as a string
     */
    private loadBlobAsString(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsText(blob);
        });
    }

    /**
     * Creates the final texture from image and panorama data
     */
    private createEquirectangularTexture(img: HTMLImageElement, panoData: PanoData): Texture {
        // resize image / fill cropped parts with black
        if (this.config.blur
            || panoData.fullWidth > SYSTEM.maxTextureWidth
            || panoData.croppedWidth !== panoData.fullWidth
            || panoData.croppedHeight !== panoData.fullHeight
        ) {
            const ratio = Math.min(1, SYSTEM.maxCanvasWidth / panoData.fullWidth);

            const resizedPanoData = {
                fullWidth: panoData.fullWidth * ratio,
                fullHeight: panoData.fullHeight * ratio,
                croppedWidth: panoData.croppedWidth * ratio,
                croppedHeight: panoData.croppedHeight * ratio,
                croppedX: panoData.croppedX * ratio,
                croppedY: panoData.croppedY * ratio,
            };

            const buffer = document.createElement('canvas');
            buffer.width = resizedPanoData.fullWidth;
            buffer.height = resizedPanoData.fullHeight;

            const ctx = buffer.getContext('2d');

            if (this.config.blur) {
                ctx.filter = 'blur(1px)';
            }

            ctx.drawImage(
                img,
                resizedPanoData.croppedX,
                resizedPanoData.croppedY,
                resizedPanoData.croppedWidth,
                resizedPanoData.croppedHeight
            );

            return createTexture(buffer);
        }

        return createTexture(img);
    }

    createMesh(scale = 1): EquirectangularMesh {
        // The middle of the panorama is placed at yaw=0
        const geometry = new SphereGeometry(
            SPHERE_RADIUS * scale,
            this.SPHERE_SEGMENTS,
            this.SPHERE_HORIZONTAL_SEGMENTS,
            -Math.PI / 2
        ).scale(1, 1, 1) as SphereGeometry;

        const material = AbstractAdapter.createOverlayMaterial();

        return new Mesh(geometry, material);
    }

    setTexture(mesh: EquirectangularMesh, textureData: EquirectangularTexture) {
        this.__setUniform(mesh, AbstractAdapter.OVERLAY_UNIFORMS.panorama, textureData.texture);
        this.setOverlay(mesh, null, 1);
    }

    setOverlay(mesh: EquirectangularMesh, textureData: EquirectangularTexture, opacity: number) {
        this.__setUniform(mesh, AbstractAdapter.OVERLAY_UNIFORMS.overlayOpacity, opacity);
        if (!textureData) {
            this.__setUniform(mesh, AbstractAdapter.OVERLAY_UNIFORMS.overlay, new Texture());
        } else {
            this.__setUniform(mesh, AbstractAdapter.OVERLAY_UNIFORMS.overlay, textureData.texture);
        }
    }

    setTextureOpacity(mesh: EquirectangularMesh, opacity: number) {
        this.__setUniform(mesh, AbstractAdapter.OVERLAY_UNIFORMS.globalOpacity, opacity);
        mesh.material.transparent = opacity < 1;
    }

    disposeTexture(textureData: EquirectangularTexture) {
        textureData.texture?.dispose();
    }

    private __setUniform(mesh: EquirectangularMesh, uniform: string, value: any) {
        if (mesh.material.uniforms[uniform].value instanceof Texture) {
            mesh.material.uniforms[uniform].value.dispose();
        }
        mesh.material.uniforms[uniform].value = value;
    }
}
