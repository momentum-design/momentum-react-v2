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
      if (
        !instance.props.isChildPopoverOpen &&
        event.relatedTarget &&
        !instance.popper.contains(event.relatedTarget as Element)
      ) {
        instance.hide();
      }
    };
    return {
      onCreate() {
        instance.popper.addEventListener('focusout', focusOutHandler);
      },
      onHidden() {
        instance.popper.removeEventListener('focusout', focusOutHandler);
      },
    };
  },
};
