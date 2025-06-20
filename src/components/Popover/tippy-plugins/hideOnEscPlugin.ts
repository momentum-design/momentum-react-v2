/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Instance as TippyInstance, Plugin } from 'tippy.js';

import { dispatchEvent, EventType } from '../Popover.events';

type SetupPluginOptions = {
  hideKeys: string[];
  stopEventPropagation: boolean;
  hideListenerTarget?: 'this' | 'window';
};

const openedTippyInstances: TippyInstance[] = [];

const options: SetupPluginOptions = {
  hideKeys: ['Escape'],
  stopEventPropagation: false,
  hideListenerTarget: 'window',
};

/**
 * Change plugin settings
 * @param options
 */
export const setupHideOnPlugin = ({
  hideKeys,
  stopEventPropagation,
  hideListenerTarget,
}: SetupPluginOptions): void => {
  options.hideKeys = hideKeys.slice();
  options.stopEventPropagation = stopEventPropagation;
  options.hideListenerTarget = hideListenerTarget;
};

// hide the last opened popover when Escape key is pressed
function onKeyDown(event: KeyboardEvent) {
  if (options.hideKeys.includes(event.key) && openedTippyInstances.length !== 0) {
    if (options.stopEventPropagation) {
      event.stopImmediatePropagation();
    }
    const lastIdx = openedTippyInstances.length - 1;
    openedTippyInstances[lastIdx].hide();
  }
}

/**
 * Register tippy instance when it appear
 * Instances registered only once
 *
 * @param instance Tippy instance
 */
const addInstance = (instance: TippyInstance) => {
  if (openedTippyInstances.indexOf(instance) >= 0) {
    return;
  }

  if (openedTippyInstances.length === 0) {
    if (options.hideListenerTarget === 'this') {
      instance.reference.addEventListener('keydown', onKeyDown);
      instance.popper.addEventListener('keydown', onKeyDown);
    } else {
      window.addEventListener('keydown', onKeyDown);
    }
  }

  openedTippyInstances.push(instance);

  // Send custom event that tippy instance is shown on screen. This event is listened for in instances of OverlayAlert to prevent it from closing unintentionally.
  dispatchEvent(EventType.TIPPY_INSTANCE_ADDED, instance);
};

/**
 * Unregister Tippy instances after it disappear
 * @param instance
 */
const removeInstance = (instance: TippyInstance) => {
  openedTippyInstances.splice(openedTippyInstances.indexOf(instance), 1);

  if (openedTippyInstances.length === 0) {
    if (options.hideListenerTarget === 'this') {
      instance.reference.removeEventListener('keydown', onKeyDown);
      instance.popper.removeEventListener('keydown', onKeyDown);
    } else {
      window.removeEventListener('keydown', onKeyDown);
    }
  }
  // Send custom event that tippy instance is no longer shown on screen. This event is listened for in instances of OverlayAlert to allow it to close once there are no tippy instances
  // still shown on screen that were opened after the render of the OverlayAlert.
  dispatchEvent(EventType.TIPPY_INSTANCE_REMOVED, instance);
};

/**
 * Tippy plugin to add hiding on Esc to Popover
 */
export const hideOnEscPlugin: Plugin = {
  name: 'hideOnEsc',
  defaultValue: true,
  fn(tippyInstance) {
    return {
      onShow() {
        addInstance(tippyInstance);
      },
      onHide() {
        removeInstance(tippyInstance);
      },
    };
  },
};
