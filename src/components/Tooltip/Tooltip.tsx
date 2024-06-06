import React, { ForwardedRef, forwardRef, useCallback } from 'react';
import Popover, { PopoverInstance } from '../Popover';
import { Props } from './Tooltip.types';
import { DEFAULTS } from './Tooltip.constants';

/**
 * Tooltip/Toggletip component
 *
 * Shows a non-interactable popover component with `tooltip` role, and update the aria label/description of the trigger component
 *
 * @see [WCAG - Tooltip pattern]{@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/}
 * @see [Tooltips & Toggletips]{@link https://inclusive-components.design/tooltips-toggletips/}
 */
const Tooltip = forwardRef(
  (
    {
      isDescription = DEFAULTS.IS_DESCRIPTION,
      isToggletip = DEFAULTS.IS_TOGGLETIP,
      triggerComponent,
      children,
      ...otherProps
    }: Props,
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

    const trigger = isToggletip ? 'click' : 'mouseenter focus';

    return (
      <Popover
        ref={ref}
        interactive={false}
        trigger={trigger}
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
