import type { Plugin } from 'tippy.js';
import { PopoverInstance } from '..';
import { Props } from '../Popover.types';

export interface PopperBlurPluginProps extends Props {
  isChildPopoverOpen?: boolean;
}

type CustomInstance = PopoverInstance & { props: PopperBlurPluginProps } & {
  hasRelatedTarget?: boolean;
};

export const hideOnBlurPlugin: Plugin = {
  name: 'isChildPopoverOpen',
  defaultValue: false,
  fn(instance: CustomInstance) {
    const focusOutHandler = (event) => {
      instance.hasRelatedTarget = !!event.relatedTarget;

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
      onDestroy() {
        instance.popper.removeEventListener('focusout', focusOutHandler);
      },
    };
  },
};
