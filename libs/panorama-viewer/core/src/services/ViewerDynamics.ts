import { MathUtils } from 'three';
import { Dynamic, MultiDynamic } from '../utils';
import type { Viewer } from '../Viewer';
import { PositionUpdatedEvent, ZoomUpdatedEvent } from '../events';
import { AbstractService } from './AbstractService';

export class ViewerDynamics extends AbstractService {
    readonly zoom = new Dynamic(
        (zoomLevel) => {
            this.viewer.state.vFov = this.viewer.dataHelper.zoomLevelToFov(zoomLevel);
            this.viewer.state.hFov = this.viewer.dataHelper.vFovToHFov(this.viewer.state.vFov);
            this.viewer.dispatchEvent(new ZoomUpdatedEvent(zoomLevel));
        },
        {
            defaultValue: this.viewer.config.defaultZoomLvl,
            min: 0,
            max: 100,
            wrap: false,
        }
    );

    readonly position = new MultiDynamic(
        (position) => {
            this.viewer.dataHelper.sphericalCoordsToVector3(position, this.viewer.state.direction);
            this.viewer.dispatchEvent(new PositionUpdatedEvent(position));
        },
        {
            yaw: new Dynamic(null, {
                defaultValue: this.config.defaultYaw,
                min: 0,
                max: 2 * Math.PI,
                wrap: true,
            }),
            pitch: new Dynamic(null, {
                defaultValue: this.config.defaultPitch,
                min: !this.viewer.state.littlePlanet ? -Math.PI / 2 : 0,
                max: !this.viewer.state.littlePlanet ? Math.PI / 2 : Math.PI * 2,
                wrap: this.viewer.state.littlePlanet,
            }),
        }
    );

    /**
     * @internal
     */
    constructor(viewer: Viewer) {
        super(viewer);
        this.updateSpeeds();
    }

    /**
     * @internal
     */
    updateSpeeds() {
        this.zoom.setSpeed(this.config.zoomSpeed * 50);
        this.position.setSpeed(MathUtils.degToRad(this.config.moveSpeed * 50));
    }

    /**
     * @internal
     */
    update(elapsed: number) {
        this.zoom.update(elapsed);
        this.position.update(elapsed);
    }
}
