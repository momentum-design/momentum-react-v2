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

  // props should override buttonProps for aria-disabled because react-aria has it's own logic for aria-disabled.
  // so if we want to pass it in via props, we need to make sure it's not overridden.
  if (props['aria-disabled'] === true) {
    otherProps['aria-disabled'] = true;
  }

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
