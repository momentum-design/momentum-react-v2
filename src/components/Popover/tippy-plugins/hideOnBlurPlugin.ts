import type { Plugin } from 'tippy.js';
import { PopoverInstance } from '..';
import { Props } from '../Popover.types';

export interface PopperBlurPluginProps extends Props {
  isChildPopoverOpen?: boolean;
}

export const hideOnBlurPlugin: Plugin = {
  name: 'isChildPopoverOpen',
  defaultValue: false,
  fn(instance: PopoverInstance & { props: PopperBlurPluginProps }) {
    const focusOutHandler = (event) => {
      // if it doesn't have a related target (ie: Esc, or click, should focus back on trigger)
      instance.shouldFocusTrigger = !event.relatedTarget;

      if (
        !instance.props.isChildPopoverOpen &&
        !instance.popper.contains(event.relatedTarget as Element)
      ) {
        instance.hide();
      }
    };
    return {
      onCreate() {
        instance.popper.addEventListener('focusout', focusOutHandler);
      },
      onDestroy() {
        instance.popper.removeEventListener('focusout', focusOutHandler);
      },
    };
  },
};
