import type { Instance as TippyInstance, Plugin } from 'tippy.js';

import { dispatchEvent, EventType } from '../Popover.events';

const openedTippyInstances: TippyInstance[] = [];

// hide the last opened popover when Escape key is pressed
function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && openedTippyInstances.length !== 0) {
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
    window.addEventListener('keydown', onKeyDown);
  }

  openedTippyInstances.push(instance);

  // Send custom event that tippy instance is shown on screen. This event is listened for in instances of OverlayAlert to prevent it from closing unintentionally.
  //
  // We do this in the next event cycle because, if we don't, and the first element focused in an OverlayAlert is the trigger of a tooltip, then the event is
  // dispatched before the OverlayAlert is mounted. (Use setTimeout without delay to execute code in the
  // next event cycle, see https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#delay)
  setTimeout(() => dispatchEvent(EventType.TIPPY_INSTANCE_ADDED, instance));
};

/**
 * Unregister Tippy instances after it disappear
 * @param instance
 */
const removeInstance = (instance: TippyInstance) => {
  openedTippyInstances.splice(openedTippyInstances.indexOf(instance), 1);

  if (openedTippyInstances.length === 0) {
    window.removeEventListener('keydown', onKeyDown);
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
