import { AbstractPlugin, Viewer, TypedEvent } from '@photo-sphere-viewer/core';

/**
 * Adds stereo view on mobile devices
 */
declare class StereoPlugin extends AbstractPlugin<StereoPluginEvents> {
    static readonly id = "stereo";
    private readonly state;
    private gyroscope;
    private markers;
    private compass;
    constructor(viewer: Viewer);
    /**
     * Checks if the stereo view is enabled
     */
    isEnabled(): boolean;
    /**
     * Enables the stereo view
     * @description
     *  - enables wake lock
     *  - enables full screen
     *  - starts gyroscope controle
     *  - hides markers, navbar and panel
     *  - instanciate the stereo effect
     */
    start(): Promise<void>;
    /**
     * Disables the stereo view
     */
    stop(): void;
    /**
     * Enables or disables the stereo view
     */
    toggle(): void;
    /**
     * Enables WakeLock
     */
    private __startWakelock;
    /**
     * Disables WakeLock
     */
    private __stopWakelock;
    /**
     * Tries to lock the device in landscape or display a message
     */
    private __lockOrientation;
    /**
     * Unlock the device orientation
     */
    private __unlockOrientation;
}

/**
 * Triggered when the stereo view is enabled/disabled
 */
declare class StereoUpdatedEvent extends TypedEvent<StereoPlugin> {
    readonly stereoEnabled: boolean;
    static readonly type = "stereo-updated";
    type: 'stereo-updated';
    constructor(stereoEnabled: boolean);
}
type StereoPluginEvents = StereoUpdatedEvent;

type events_StereoUpdatedEvent = StereoUpdatedEvent;
declare const events_StereoUpdatedEvent: typeof StereoUpdatedEvent;
type events_StereoPluginEvents = StereoPluginEvents;
declare namespace events {
  export {
    events_StereoUpdatedEvent as StereoUpdatedEvent,
    events_StereoPluginEvents as StereoPluginEvents,
  };
}

export { StereoPlugin, events };
