import type { Plugin } from 'tippy.js';
import { PopoverInstance } from '..';
import { Props } from '../Popover.types';

export interface PopperBlurPluginProps extends Props {
  hideOnBlur?: boolean;
  isChildPopoverOpen?: boolean;
}

export const hideOnBlurPlugin: Plugin = {
  name: 'hideOnBlur',
  defaultValue: false,
  fn(instance: PopoverInstance & { props: PopperBlurPluginProps }) {
    return {
      onCreate() {
        instance.popper.addEventListener('focusout', (event) => {
          if (
            instance.props.hideOnBlur &&
            !instance.props.isChildPopoverOpen &&
            event.relatedTarget &&
            !instance.popper.contains(event.relatedTarget as Element)
          ) {
            instance.hide();
          }
        });
      },
    };
  },
};
