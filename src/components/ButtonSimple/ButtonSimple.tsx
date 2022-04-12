import React, { forwardRef, RefObject, useRef } from 'react';
import classnames from 'classnames';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import FocusRing from '../FocusRing';

import { STYLE } from './ButtonSimple.constants';
import type { Props } from './ButtonSimple.types';

/**
 * A simple button component without overhead styling. This is used as an injectable button component for other sibling components.
 */
const ButtonSimple = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { children, className, isDisabled, id, style, title, useNativeKeyDown } = props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const { buttonProps } = useButton(props, ref);
  const { hoverProps } = useHover(props);

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
        // override of onKeyDown to ensure the standard html button behaviour (on enter => onClick) happens
        onKeyDown={useNativeKeyDown ? props.onKeyDown : buttonProps.onKeyDown}
      >
        {children}
      </button>
    </FocusRing>
  );
});

ButtonSimple.displayName = 'ButtonSimple';

export default ButtonSimple;
