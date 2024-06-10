import React, { ForwardedRef, forwardRef, useCallback, useEffect, useRef } from 'react';
import Popover, { PopoverInstance } from '../Popover';
import { Props } from './Toggletip.types';
import { DEFAULTS } from './Toggletip.constants';
import { BoundaryType, PlacementType } from '../Popover/Popover.types';

/**
 * Toggletip component
 *
 * Shows a non-interactable popover component with inside a live aria.
 *
 * @see [WCAG - Tooltip pattern]{@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/}
 *
 * Toggletip content must be rendered in a live aria because Screen reader can not pick up changes
 * on the active element. This is why the
 * - we can not use the aria-describedby and
 * - the "status" div have to be rendered upfront
 *
 * @see [Tooltips & Toggletips]{@link https://inclusive-components.design/tooltips-toggletips/}
 */
const Toggletip = forwardRef(
  (
    {
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
    const tippyRef = useRef<PopoverInstance>(null);
    const liveAriaRef = useRef<HTMLDivElement>(null);
    const triggerComponentRef = useRef<HTMLElement>(null);

    // Update aria props manually, because "The `aria` attribute is reserved for future use in React."
    // see https://atomiks.github.io/tippyjs/v6/all-props/#aria
    const setInstance = useCallback((popoverInstance: PopoverInstance | undefined) => {
      popoverInstance?.setProps?.({ aria: { expanded: false, content: null } });
      tippyRef.current = popoverInstance;
      otherProps?.setInstance?.(popoverInstance);
    }, []);

    // Hide popover on when the trigger component loose focus
    // User must re-open the toggletip otherwise SR will not announce the content when user
    // focus on the trigger component because of the live area
    const hidePopoverOnBlur = useCallback(() => {
      tippyRef.current?.hide();
    }, [tippyRef.current]);

    useEffect(() => {
      const triggerRef = triggerComponentRef.current;
      if (triggerRef) {
        triggerRef.addEventListener('blur', hidePopoverOnBlur);
        return () => triggerRef.removeEventListener('blur', hidePopoverOnBlur);
      }
    }, [triggerComponentRef.current]);

    return (
      <>
        <Popover
          ref={ref}
          appendTo={() => liveAriaRef.current}
          trigger="click"
          triggerComponent={React.cloneElement(triggerComponent, { ref: triggerComponentRef })}
          showArrow
          interactive={false}
          addBackdrop={false}
          role="generic"
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
        <div role="status" ref={liveAriaRef} />
      </>
    );
  }
);

Toggletip.displayName = 'Toggletip';

export default Toggletip;
