import { PopoverInstance } from '.';
import { STYLE } from './Popover.constants';

export const addBackdrop = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
