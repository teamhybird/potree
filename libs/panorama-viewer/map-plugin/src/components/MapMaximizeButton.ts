import maximize from '../icons/maximize.svg';
import minimize from '../icons/minimize.svg';
import { AbstractMapButton, ButtonPosition } from './AbstractMapButton';
import type { MapComponent } from './MapComponent';

const ROTATION: Record<string, number> = {
    'bottom-left': 0,
    'bottom-right': -90,
    'top-right': 180,
    'top-left': 90,
};

export class MapMaximizeButton extends AbstractMapButton {
    constructor(map: MapComponent) {
        super(map, ButtonPosition.DIAGONAL);

        this.container.addEventListener('click', (e) => {
            map.toggleMaximized();
            e.stopPropagation();
        });
    }

    override update() {
        this.container.innerHTML = this.map.maximized ? minimize : maximize;
        this.container.querySelector('svg').style.transform = `rotate3d(0, 0, 1, ${ROTATION[this.map.config.position.join('-')]}deg)`;
        this.container.title = this.map.maximized
            ? this.viewer.config.lang['mapMinimize']
            : this.viewer.config.lang['mapMaximize'];
    }
}
