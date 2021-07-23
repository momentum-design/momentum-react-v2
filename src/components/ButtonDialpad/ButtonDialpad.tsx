import React, { forwardRef, useRef, FC, RefObject } from 'react';
import { useButton } from '@react-aria/button';
import { FocusRing } from '@react-aria/focus';

import { DEFAULTS, STYLE } from './ButtonDialpad.constants';
import { Props } from './ButtonDialpad.types';
import './ButtonDialpad.style.scss';

const ButtonDialpad: FC<Props> = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const ref = providedRef || useRef();
  const mutatedProps = {
    ...props,
    isDisabled: props.disabled,
  };

  delete mutatedProps.disabled;

  const { buttonProps } = useButton(mutatedProps, ref);
  const children = props.children || props.primaryText;

  return (
    <FocusRing focusRingClass={STYLE.focusRing}>
      <button
        className={`${STYLE.wrapper}`}
        {...buttonProps}
        ref={ref}
        data-size={props.size || DEFAULTS.SIZE}
        data-disabled={props.disabled || DEFAULTS.DISABLED}
      >
        <div className={STYLE.primaryText}>{children}</div>
        <div className={STYLE.secondaryText}>{props.secondaryText}</div>
      </button>
    </FocusRing>
  );
});

ButtonDialpad.displayName = 'ButtonDialpad';

export default ButtonDialpad;
