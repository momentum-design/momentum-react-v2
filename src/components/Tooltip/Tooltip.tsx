import React, { ForwardedRef, forwardRef, useCallback } from 'react';
import Popover, { PopoverInstance } from '../Popover';
import { Props } from './Tooltip.types';
import { DEFAULTS } from './Tooltip.constants';

const Tooltip = forwardRef(
  (
    { isDescription = DEFAULTS.IS_DESCRIPTION, triggerComponent, children, ...otherProps }: Props,
    ref: ForwardedRef<HTMLElement>
  ) => {
    // Update aria props manually, because
    // "The `aria` attribute is reserved for future use in React."
    const updateInstance = useCallback(
      (popoverInstance: PopoverInstance | undefined) => {
        popoverInstance?.setProps({
          // see https://atomiks.github.io/tippyjs/v6/all-props/#aria
          aria: {
            expanded: false,
            content: isDescription ? 'describedby' : 'labelledby',
          },
        });
      },
      [isDescription]
    );

    return (
      <Popover
        ref={ref}
        interactive={false}
        trigger="mouseenter focus"
        triggerComponent={triggerComponent}
        showArrow
        addBackdrop={false}
        setInstance={updateInstance}
        role="tooltip"
        {...otherProps}
      >
        {children}
      </Popover>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
