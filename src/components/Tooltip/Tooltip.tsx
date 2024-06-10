import React, { ForwardedRef, forwardRef, useCallback } from 'react';
import Popover, { PopoverInstance } from '../Popover';
import { Props } from './Tooltip.types';
import { DEFAULTS } from './Tooltip.constants';
import { BoundaryType, PlacementType } from '../Popover/Popover.types';

/**
 * Tooltip component
 *
 * Shows a non-interactable popover component with `tooltip` role, and update the aria label/description of the trigger component
 *
 * @see [WCAG - Tooltip pattern]{@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/}
 */
const Tooltip = forwardRef(
  (
    {
      isDescription = DEFAULTS.IS_DESCRIPTION,
      boundary = DEFAULTS.BOUNDARY as BoundaryType,
      color = DEFAULTS.COLOR,
      offsetDistance = DEFAULTS.OFFSET_DISTANCE,
      offsetSkidding = DEFAULTS.OFFSET_SKIDDING,
      placement = DEFAULTS.PLACEMENT as PlacementType,
      strategy = DEFAULTS.STRATEGY,
      variant = DEFAULTS.VARIANT,
      triggerComponent,
      children,
      ...otherProps
    }: Props,
    ref: ForwardedRef<HTMLElement>
  ) => {
    // Update aria props manually, because
    // "The `aria` attribute is reserved for future use in React."
    const setInstance = useCallback(
      (popoverInstance: PopoverInstance | undefined) => {
        popoverInstance?.setProps({
          // see https://atomiks.github.io/tippyjs/v6/all-props/#aria
          aria: {
            expanded: false,
            content: isDescription ? 'describedby' : 'labelledby',
          },
        });
        otherProps?.setInstance?.(popoverInstance);
      },
      [isDescription, otherProps?.setInstance]
    );

    return (
      <Popover
        ref={ref}
        interactive={false}
        trigger="mouseenter focus"
        triggerComponent={triggerComponent}
        showArrow
        addBackdrop={false}
        role="tooltip"
        boundary={boundary}
        color={color}
        offsetDistance={offsetDistance}
        offsetSkidding={offsetSkidding}
        placement={placement}
        strategy={strategy}
        variant={variant}
        {...otherProps}
        setInstance={setInstance}
      >
        {children}
      </Popover>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
