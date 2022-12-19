import type { Plugin } from 'tippy.js';
import { PopoverInstance } from '.';
import { STYLE } from './Popover.constants';

// Tippy plugin to add hiding on Esc to Popover:
export const hideOnEscPlugin: Plugin = {
  name: 'hideOnEsc',
  defaultValue: true,
  fn({ hide }) {
    // hide popover when Escape key is pressed
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        hide();
      }
    }

    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown);
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown);
      },
    };
  },
};

/**
 * Due to @react-aria's event abstraction layer, we add an invisible backdrop for all popovers
 * to not interfere with any components built with the hooks from @react-aria.
 *
 * This will make sure that popovers are closed on clickoutside and no longer
 * be stuck open in case the even target was a @react-aria button.
 */
export const addBackdropPlugin: Plugin = {
  name: 'addBackdropPlugin',
  fn(instance: PopoverInstance) {
    return {
      onMount() {
        if (!instance.props.trigger.includes('mouseenter')) {
          const backdrop = document.createElement('div');
          backdrop.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            instance.hide();
          });
          backdrop.classList.add(STYLE.backdrop);
          backdrop.setAttribute('aria-hidden', 'true');
          document.querySelector('[data-tippy-root]')?.parentNode?.append(backdrop);
        }
      },
      onHide() {
        document.querySelector(`.${STYLE.backdrop}`)?.remove();
      },
    };
  },
};
