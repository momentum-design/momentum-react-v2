/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// Tippy plugin to add hiding on Esc to Popover:
export const hideOnEscPlugin = {
  name: 'hideOnEsc',
  defaultValue: true,
  fn({ hide }: { hide: () => void }) {
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
