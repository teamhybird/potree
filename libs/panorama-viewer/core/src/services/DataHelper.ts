import { Euler, MathUtils, Vector3 } from 'three';
import { SPHERE_RADIUS, VIEWER_DATA } from '../data/constants';
import {
    ExtendedPosition,
    PanoData,
    PanoramaPosition,
    Point,
    Position,
    SphereCorrection,
    SphericalPosition,
} from '../model';
import { PSVError } from '../PSVError';
import { applyEulerInverse, parseAngle, parseSpeed } from '../utils';
import type { Viewer } from '../Viewer';
import { AbstractService } from './AbstractService';

const vector3 = new Vector3();
const EULER_ZERO = new Euler(0, 0, 0, 'ZXY');

/**
 * Collections of data converters for the viewer
 */
export class DataHelper extends AbstractService {
    /**
     * @internal
     */
    constructor(viewer: Viewer) {
        super(viewer);
    }

    /**
     * Converts vertical FOV to zoom level
     */
    fovToZoomLevel(fov: number): number {
        const temp = Math.round(((fov - this.config.minFov) / (this.config.maxFov - this.config.minFov)) * 100);
        return temp - 2 * (temp - 50);
    }

    /**
     * Converts zoom level to vertical FOV
     */
    zoomLevelToFov(level: number): number {
        return this.config.maxFov + (level / 100) * (this.config.minFov - this.config.maxFov);
    }

    /**
     * Converts vertical FOV to horizontal FOV
     */
    vFovToHFov(vFov: number): number {
        return MathUtils.radToDeg(2 * Math.atan(Math.tan(MathUtils.degToRad(vFov) / 2) * this.state.aspect));
    }

    /**
     * Converts a speed into a duration from current position to a new position
     */
    speedToDuration(value: string | number, angle: number): number {
        if (typeof value !== 'number') {
            // desired radial speed
            const speed = parseSpeed(value);
            // compute duration
            return (angle / Math.abs(speed)) * 1000;
        } else {
            return Math.abs(value);
        }
    }

    /**
     * Converts pixel texture coordinates to spherical radians coordinates
     * @throws {@link PSVError} when the current adapter does not support texture coordinates
     */
    textureCoordsToSphericalCoords(point: PanoramaPosition): Position {
        const panoData = this.state.panoData;
        if (!panoData) {
            throw new PSVError('Current adapter does not support texture coordinates.');
        }

        const relativeX = ((point.textureX + panoData.croppedX) / panoData.fullWidth) * Math.PI * 2;
        const relativeY = ((point.textureY + panoData.croppedY) / panoData.fullHeight) * Math.PI;

        const result: Position = {
            yaw: relativeX >= Math.PI ? relativeX - Math.PI : relativeX + Math.PI,
            pitch: Math.PI / 2 - relativeY,
        };

        // Apply panoData pose and sphereCorrection
        if (
            !EULER_ZERO.equals(this.viewer.renderer.panoramaPose) 
            || !EULER_ZERO.equals(this.viewer.renderer.sphereCorrection)
        ) {
            this.sphericalCoordsToVector3(result, vector3);
            vector3.applyEuler(this.viewer.renderer.panoramaPose);
            vector3.applyEuler(this.viewer.renderer.sphereCorrection);
            return this.vector3ToSphericalCoords(vector3);
        } else {
            return result;
        }
    }

    /**
     * Converts spherical radians coordinates to pixel texture coordinates
     * @throws {@link PSVError} when the current adapter does not support texture coordinates
     */
    sphericalCoordsToTextureCoords(position: Position): PanoramaPosition {
        const panoData = this.state.panoData;
        if (!panoData) {
            throw new PSVError('Current adapter does not support texture coordinates.');
        }

        // Apply panoData pose and sphereCorrection
        if (
            !EULER_ZERO.equals(this.viewer.renderer.panoramaPose) 
            || !EULER_ZERO.equals(this.viewer.renderer.sphereCorrection)
        ) {
            this.sphericalCoordsToVector3(position, vector3);
            applyEulerInverse(vector3, this.viewer.renderer.sphereCorrection);
            applyEulerInverse(vector3, this.viewer.renderer.panoramaPose);
            position = this.vector3ToSphericalCoords(vector3);
        }

        const relativeLong = (position.yaw / Math.PI / 2) * panoData.fullWidth;
        const relativeLat = (position.pitch / Math.PI) * panoData.fullHeight;

        return {
            textureX:
                Math.round(
                    position.yaw < Math.PI
                        ? relativeLong + panoData.fullWidth / 2
                        : relativeLong - panoData.fullWidth / 2
                ) - panoData.croppedX,
            textureY: Math.round(panoData.fullHeight / 2 - relativeLat) - panoData.croppedY,
        };
    }

    /**
     * Converts spherical radians coordinates to a Vector3
     */
    sphericalCoordsToVector3(position: Position, vector?: Vector3): Vector3 {
        if (!vector) {
            vector = new Vector3();
        }
        vector.x = SPHERE_RADIUS * -Math.cos(position.pitch) * Math.sin(position.yaw);
        vector.y = SPHERE_RADIUS * Math.sin(position.pitch);
        vector.z = SPHERE_RADIUS * Math.cos(position.pitch) * Math.cos(position.yaw);
        return vector;
    }

    /**
     * Converts a Vector3 to spherical radians coordinates
     */
    vector3ToSphericalCoords(vector: Vector3): Position {
        const phi = Math.acos(vector.y / Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z));
        const theta = Math.atan2(vector.x, vector.z);

        return {
            yaw: theta < 0 ? -theta : Math.PI * 2 - theta,
            pitch: Math.PI / 2 - phi,
        };
    }

    /**
     * Converts position on the viewer to a THREE.Vector3
     */
    viewerCoordsToVector3(viewerPoint: Point): Vector3 {
        const sphereIntersect = this.viewer.renderer
            .getIntersections(viewerPoint)
            .filter((i) => i.object.userData[VIEWER_DATA]);

        if (sphereIntersect.length) {
            return sphereIntersect[0].point;
        } else {
            return null;
        }
    }

    /**
     * Converts position on the viewer to spherical radians coordinates
     */
    viewerCoordsToSphericalCoords(viewerPoint: Point): Position {
        const vector = this.viewerCoordsToVector3(viewerPoint);
        return vector ? this.vector3ToSphericalCoords(vector) : null;
    }

    /**
     * Converts a Vector3 to position on the viewer
     */
    vector3ToViewerCoords(vector: Vector3): Point {
        const vectorClone = vector.clone();
        vectorClone.project(this.viewer.renderer.camera);

        return {
            x: Math.round(((vectorClone.x + 1) / 2) * this.state.size.width),
            y: Math.round(((1 - vectorClone.y) / 2) * this.state.size.height),
        };
    }

    /**
     * Converts spherical radians coordinates to position on the viewer
     */
    sphericalCoordsToViewerCoords(position: Position): Point {
        this.sphericalCoordsToVector3(position, vector3);
        return this.vector3ToViewerCoords(vector3);
    }

    /**
     * Converts pixel position to angles if present and ensure boundaries
     */
    cleanPosition(position: ExtendedPosition): Position {
        if (
            (position as PanoramaPosition).textureX !== undefined 
            && (position as PanoramaPosition).textureY !== undefined
        ) {
            return this.textureCoordsToSphericalCoords(position as PanoramaPosition);
        }
        return {
            yaw: parseAngle((position as SphericalPosition).yaw),
            pitch: parseAngle((position as SphericalPosition).pitch, !this.state.littlePlanet),
        };
    }

    /**
     * Ensure a SphereCorrection object is valid
     */
    cleanSphereCorrection(sphereCorrection: SphereCorrection): SphereCorrection {
        return {
            pan: parseAngle(sphereCorrection?.pan || 0),
            tilt: parseAngle(sphereCorrection?.tilt || 0, true),
            roll: parseAngle(sphereCorrection?.roll || 0, true, false),
        };
    }

    /**
     * Parse the pose angles of the pano data
     */
    cleanPanoramaPose(panoData: PanoData): SphereCorrection {
        return {
            pan: MathUtils.degToRad(panoData?.poseHeading || 0),
            tilt: MathUtils.degToRad(panoData?.posePitch || 0),
            roll: MathUtils.degToRad(panoData?.poseRoll || 0),
        };
    }
}
