import React, { ForwardedRef, forwardRef, useCallback } from 'react';
import Popover, { PopoverInstance } from '../Popover';
import { Props } from './Tooltip.types';
import { DEFAULTS, STYLE } from './Tooltip.constants';
import { BoundaryType, PlacementType } from '../Popover/Popover.types';
import { useId } from '@react-aria/utils';

import './Tooltip.style.scss';

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
      type,
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
    const id = useId();
    const isLabelTooltip = type === 'label';
    const isDescription = type === 'description';

    // Update aria props manually, because
    // "The `aria` attribute is reserved for future use in React."
    const setInstance = useCallback(
      (popoverInstance: PopoverInstance | undefined) => {
        popoverInstance?.setProps({
          // see https://atomiks.github.io/tippyjs/v6/all-props/#aria
          aria: {
            expanded: false,
            // we add `aria-labelledby` manually, see below
            content: isLabelTooltip || isDescription ? null : 'describedby',
          },
        });
        otherProps?.setInstance?.(popoverInstance);
      },
      [isLabelTooltip, otherProps?.setInstance]
    );

    const newTriggerComponent = isLabelTooltip
      ? React.cloneElement(triggerComponent, { 'aria-labelledby': id })
      : isDescription
      ? React.cloneElement(triggerComponent, { 'aria-describedby': id })
      : triggerComponent;

    // In label mode we must render tooltip content twice
    // First inside the popover, second in a hidden div for Screen Readers (SR)
    // because Tippy does not render the content until the user focus on the button, so the trigger
    // component does not have a label before tooltip appears
    // With SR the user can Read the page content without changing the focus so we need to provide a
    // always accessible label for the button.
    // We use aria-labelledby because the `children` might contains HTML elements
    const triggerLabel =
      isLabelTooltip || isDescription ? (
        <div className={STYLE.label} id={id}>
          {children}
        </div>
      ) : null;

    return (
      <>
        <Popover
          ref={ref}
          interactive={false}
          trigger="mouseenter focus"
          triggerComponent={newTriggerComponent}
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
          aria-hidden={!isLabelTooltip}
          {...otherProps}
          setInstance={setInstance}
        >
          {children}
        </Popover>
        {triggerLabel}
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
