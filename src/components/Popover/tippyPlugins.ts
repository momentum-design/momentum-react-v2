import type { Plugin } from 'tippy.js';

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
