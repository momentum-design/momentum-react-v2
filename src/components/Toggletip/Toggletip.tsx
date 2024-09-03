import React, { ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import Popover, { PopoverInstance } from '../Popover';
import { Props } from './Toggletip.types';
import { DEFAULTS, STYLE } from './Toggletip.constants';
import { BoundaryType, PlacementType } from '../Popover/Popover.types';
import classNames from 'classnames';
import { v4 as uuidV4 } from 'uuid';
import ScreenReaderAnnouncer from '../ScreenReaderAnnouncer';
/**
 * Toggletip component
 *
 * @see [WCAG - Tooltip pattern]{@link https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/}
 *
 * Toggletip content rendered in a interactive Popover.
 *
 * Consumer of the component need to take care of the label of the triggerComponent
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
      className,
      ...otherProps
    }: Props,
    ref: ForwardedRef<HTMLElement>
  ) => {
    const tippyRef = useRef<PopoverInstance>(null);
    const triggerComponentRef = useRef<HTMLElement>(null);
    const [announcerId] = useState<string>(uuidV4);
    const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

    // SR should announce the content of the toggletip everytime it displays tooltip content
    const handleShow = () => {
      setIsTooltipOpen(true);
    };

    const handleHide = () => {
      setIsTooltipOpen(false);
    };

    useEffect(() => {
      if (isTooltipOpen) {
        ScreenReaderAnnouncer.announce({ body: children }, announcerId);
      }
    }, [isTooltipOpen, children]);

    // Update aria props manually, because "The `aria` attribute is reserved for future use in React."
    // see https://atomiks.github.io/tippyjs/v6/all-props/#aria
    const setInstance = useCallback((popoverInstance: PopoverInstance | undefined) => {
      popoverInstance?.setProps?.({ aria: { expanded: 'auto', content: null } });
      tippyRef.current = popoverInstance;
      otherProps?.setInstance?.(popoverInstance);
    }, []);

    // Hide popover on when the trigger component loose focus
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

    /**
     * Toggletip's popover is interactive to make the content selectable and VoiceOver reads the whole content.
     */
    return (
      <>
        <Popover
          ref={ref}
          className={classNames(STYLE.wrapper, className)}
          trigger="click"
          triggerComponent={React.cloneElement(triggerComponent, { ref: triggerComponentRef })}
          showArrow
          interactive={true}
          addBackdrop={true}
          role="dialog"
          boundary={boundary}
          color={color}
          offsetDistance={offsetDistance}
          offsetSkidding={offsetSkidding}
          placement={placement}
          strategy={strategy}
          variant={variant}
          {...otherProps}
          onShow={handleShow}
          onHide={handleHide}
          setInstance={setInstance}
        >
          {children}
        </Popover>
        <ScreenReaderAnnouncer identity={announcerId} />
      </>
    );
  }
);

Toggletip.displayName = 'Toggletip';

export default Toggletip;
