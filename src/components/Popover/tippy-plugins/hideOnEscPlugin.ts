import type { Instance as TippyInstance, Plugin } from 'tippy.js';

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
