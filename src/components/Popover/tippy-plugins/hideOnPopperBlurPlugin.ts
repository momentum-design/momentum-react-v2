import type { Plugin } from 'tippy.js';
import { PopoverInstance } from '..';
import { Props } from '../Popover.types';

export interface PopperBlurPluginProps extends Props {
  hideOnPopperBlur?: boolean;
  isChildPopoverOpen?: boolean;
}

export const hideOnPopperBlurPlugin: Plugin = {
  name: 'hideOnPopperBlur',
  defaultValue: true,
  fn(instance: PopoverInstance & { props: PopperBlurPluginProps }) {
    return {
      onCreate() {
        instance.popper.addEventListener('focusout', (event) => {
          if (
            instance.props.hideOnPopperBlur &&
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
