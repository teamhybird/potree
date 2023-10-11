import type { Navbar } from '@photo-sphere-viewer/core';
import { AbstractButton, events } from '@photo-sphere-viewer/core';
import { ID_PANEL_MARKERS_LIST } from './constants';
import type { MarkersPlugin } from './MarkersPlugin';
import pinList from './icons/pin-list.svg';

export class MarkersListButton extends AbstractButton {
    static override readonly id = 'markersList';

    private readonly plugin: MarkersPlugin;

    constructor(navbar: Navbar) {
        super(navbar, {
            className: ' psv-markers-list-button',
            icon: pinList,
            hoverScale: true,
            collapsable: true,
            tabbable: true,
        });

        this.plugin = this.viewer.getPlugin('markers');

        if (this.plugin) {
            this.viewer.addEventListener(events.ShowPanelEvent.type, this);
            this.viewer.addEventListener(events.HidePanelEvent.type, this);
        }
    }

    override destroy() {
        this.viewer.removeEventListener(events.ShowPanelEvent.type, this);
        this.viewer.removeEventListener(events.HidePanelEvent.type, this);

        super.destroy();
    }

    override isSupported() {
        return !!this.plugin;
    }

    handleEvent(e: Event) {
        if (e instanceof events.ShowPanelEvent) {
            this.toggleActive(e.panelId === ID_PANEL_MARKERS_LIST);
        } else if (e instanceof events.HidePanelEvent) {
            this.toggleActive(false);
        }
    }

    onClick() {
        this.plugin.toggleMarkersList();
    }
}
