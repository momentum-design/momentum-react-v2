import React, { forwardRef, FC, RefObject, useRef } from 'react';
import classnames from 'classnames';
import { useButton } from '@react-aria/button';
import { useHover } from '@react-aria/interactions';
import FocusRing from '../FocusRing';

import { Props } from './ButtonSimple.types';

/**
 * A simple button component without overhead styling. This is used as an injectable button component for other sibling components.
 */
const ButtonSimple = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { children, className, isDisabled, id, style, title } = props;
  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const { buttonProps } = useButton(props, ref);
  const { hoverProps } = useHover(props);

  return (
    <FocusRing disabled={isDisabled}>
      <button
        className={classnames(className)}
        id={id}
        ref={ref}
        style={style}
        title={title}
        {...buttonProps}
        {...hoverProps}
      >
        {children}
      </button>
    </FocusRing>
  );
});

ButtonSimple.displayName = 'ButtonSimple';

export default ButtonSimple;
