import React, { forwardRef, RefObject, useRef } from 'react';
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
  const { children, className, isDisabled, id, style, title, useNativeKeyDown, role, tabIndex } =
    props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const { buttonProps } = useButton(props, ref);
  const { hoverProps } = useHover(props);

  const otherProps = tabIndex
    ? { ...buttonProps, ...hoverProps, role, tabIndex }
    : { ...buttonProps, ...hoverProps, role };

  return (
    <FocusRing disabled={isDisabled}>
      <button
        className={classnames(className, STYLE.wrapper)}
        id={id}
        ref={ref}
        style={style}
        title={title}
        {...otherProps}
        // override of onKeyDown to ensure the standard html button behavior (on enter => onClick) happens
        onKeyDown={useNativeKeyDown ? props.onKeyDown : buttonProps.onKeyDown}
      >
        {typeof children === 'string' ? <span>{children}</span> : children}
      </button>
    </FocusRing>
  );
});

ButtonSimple.displayName = 'ButtonSimple';

export default ButtonSimple;
