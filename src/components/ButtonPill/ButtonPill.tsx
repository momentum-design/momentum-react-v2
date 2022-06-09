import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import ButtonSimple from '../ButtonSimple';

import { DEFAULTS, STYLE } from './ButtonPill.constants';
import { Props } from './ButtonPill.types';
import './ButtonPill.style.scss';

const ButtonPill = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { className, color, disabled, ghost, grown, outline, size, solid, ...otherProps } = props;

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className)}
      ref={providedRef}
      data-color={color || DEFAULTS.COLOR}
      data-disabled={disabled || DEFAULTS.DISABLED}
      data-ghost={ghost || DEFAULTS.GHOST}
      data-grown={grown || DEFAULTS.GROWN}
      data-outline={outline || DEFAULTS.OUTLINE}
      data-size={size || DEFAULTS.SIZE}
      data-solid={solid || DEFAULTS.SOLID}
      isDisabled={disabled}
      {...otherProps}
    />
  );
});

ButtonPill.displayName = 'ButtonPill';

export default ButtonPill;
