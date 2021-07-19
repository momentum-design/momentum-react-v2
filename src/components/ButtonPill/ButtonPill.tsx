import React, { useRef, FC } from 'react';
import { useButton } from '@react-aria/button';
import { FocusRing } from '@react-aria/focus';

import { DEFAULTS, STYLE } from './ButtonPill.constants';
import { Props } from './ButtonPill.types';
import './ButtonPill.style.scss';

const ButtonPill: FC<Props> = (props: Props) => {
  const ref = useRef();
  const mutatedProps = {
    ...props,
    isDisabled: props.disabled,
  };

  delete mutatedProps.disabled;

  const { buttonProps } = useButton(mutatedProps, ref);
  const { children } = props;

  return (
    <FocusRing focusRingClass={STYLE.focusRing}>
      <button
        className={`${STYLE.wrapper}`}
        {...buttonProps}
        ref={ref}
        data-color={props.color || DEFAULTS.COLOR}
        data-ghost={props.ghost || DEFAULTS.GHOST}
        data-outline={props.outline || DEFAULTS.OUTLINE}
        data-size={props.size || DEFAULTS.SIZE}
        data-disabled={props.disabled || DEFAULTS.DISABLED}
      >
        <div>{children}</div>
      </button>
    </FocusRing>
  );
};

export default ButtonPill;
