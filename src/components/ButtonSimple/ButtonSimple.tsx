import React, { forwardRef, PointerEventHandler, RefObject, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import FocusRing from '../FocusRing';

import { STYLE } from './ButtonSimple.constants';
import type { Props } from './ButtonSimple.types';
import './ButtonSimple.style.scss';

/**
 * A simple button component without overhead styling.
 * This is used as an injectable button component for other sibling components.
 * @internal use only. Should not be consumed from any external parties.
 */

const ButtonSimple = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { children, className, isDisabled, id, style, title, useNativeKeyDown } = props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const { buttonProps } = useButton(props, ref);
  const { hoverProps } = useHover(props);

  /**
   * React aria's pointerDown handler is interfering with how overlays capture
   * events like `clickOutside` (Our popover implementation which uses tippy underneath).
   * The main cause is the fact that they preventDefault the event for any event that is not
   * draggable. They also stop propagation which could cause other bugs in the future.
   *
   * Original implementation of the onPointerDown form @react-aria/interactions
   * can be found here node_modules/@react-aria/interactions/src/usePress.ts
   */
  const onPointerDown: PointerEventHandler<HTMLButtonElement> = useCallback((event) => {
    if (event?.button !== 0 || !event?.currentTarget.contains(event?.target as HTMLElement)) return;
  }, []);

  return (
    <FocusRing disabled={isDisabled}>
      <button
        className={classnames(className, STYLE.wrapper)}
        id={id}
        ref={ref}
        style={style}
        title={title}
        {...buttonProps}
        {...hoverProps}
        // override of onKeyDown to ensure the standard html button behavior (on enter => onClick) happens
        onKeyDown={useNativeKeyDown ? props.onKeyDown : buttonProps.onKeyDown}
        onPointerDown={onPointerDown}
      >
        {typeof children === 'string' ? <span>{children}</span> : children}
      </button>
    </FocusRing>
  );
});

ButtonSimple.displayName = 'ButtonSimple';

export default ButtonSimple;
