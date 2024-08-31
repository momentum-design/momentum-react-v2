import type { Plugin } from 'tippy.js';
import { PopoverInstance } from '..';
import { Props } from '../Popover.types';

interface PopoverProps {
  hideOnPopperBlur?: boolean;
  isChildPopoverOpen?: boolean;
}

type ExtendedProps = Props & PopoverProps;

export const hideOnPopperBlurPlugin: Plugin = {
  name: 'hideOnPopperBlur',
  defaultValue: true,
  fn(instance: PopoverInstance & { props: ExtendedProps }) {
    return {
      onCreate() {
        instance.popper.addEventListener('focusout', (event) => {
          if (
            instance.props.hideOnPopperBlur &&
            !instance.props.isChildPopoverOpen &&
            !instance.popper.contains(event.relatedTarget as Element) &&
            event.relatedTarget
          ) {
            instance.hide();
          }
        });
      },
    };
  },
};
