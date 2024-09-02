import React, { Children, forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import ButtonSimple from '../ButtonSimple';

import { DEFAULTS, STYLE } from './ButtonCircle.constants';
import { Props } from './ButtonCircle.types';
import './ButtonCircle.style.scss';

const ButtonCircle = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const {
    children,
    className,
    color,
    disabled,
    shallowDisabled,
    ghost,
    outline,
    inverted,
    size,
    ...otherProps
  } = props;

  if (ghost && inverted) {
    console.warn('MRV2: Momentum does not support a ghost inverted ButtonCircle.');
  }

  const multipleChildren = Children.count(children) > 1;

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className)}
      ref={providedRef}
      data-color={color || DEFAULTS.COLOR}
      data-ghost={ghost || DEFAULTS.GHOST}
      data-multiple-children={multipleChildren}
      data-outline={outline || DEFAULTS.OUTLINE}
      data-size={size || DEFAULTS.SIZE}
      data-inverted={inverted || DEFAULTS.INVERTED}
      data-disabled={disabled || DEFAULTS.DISABLED}
      data-shallow-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      aria-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      isDisabled={disabled}
      {...otherProps}
    >
      {children}
    </ButtonSimple>
  );
});

ButtonCircle.displayName = 'ButtonCircle';

export default ButtonCircle;
