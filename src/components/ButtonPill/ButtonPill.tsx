import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import ButtonSimple from '../ButtonSimple';

import { DEFAULTS, STYLE } from './ButtonPill.constants';
import { Props } from './ButtonPill.types';
import './ButtonPill.style.scss';

const ButtonPill = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const {
    className,
    color,
    disabled,
    shallowDisabled,
    ghost,
    grown,
    outline,
    size,
    inverted,
    ...otherProps
  } = props;

  if (ghost && inverted) {
    console.warn('MRV2: Momentum does not support a ghost inverted ButtonPill.');
  }

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className)}
      ref={providedRef}
      data-color={color || DEFAULTS.COLOR}
      data-disabled={disabled || DEFAULTS.DISABLED}
      data-shallow-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      aria-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      data-ghost={ghost || DEFAULTS.GHOST}
      data-grown={grown || DEFAULTS.GROWN}
      data-outline={outline || DEFAULTS.OUTLINE}
      data-size={size || DEFAULTS.SIZE}
      data-inverted={inverted || DEFAULTS.INVERTED}
      isDisabled={disabled}
      {...otherProps}
    />
  );
});

ButtonPill.displayName = 'ButtonPill';

export default ButtonPill;
