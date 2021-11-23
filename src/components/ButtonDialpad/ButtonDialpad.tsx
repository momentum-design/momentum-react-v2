import React, { forwardRef, RefObject } from 'react';
import ButtonSimple from '../ButtonSimple';

import { DEFAULTS, STYLE } from './ButtonDialpad.constants';
import { Props } from './ButtonDialpad.types';
import './ButtonDialpad.style.scss';
import classnames from 'classnames';

const ButtonDialpad = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { className, disabled, size, ...otherProps } = props;

  const children = props.children || props.primaryText;

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className)}
      ref={providedRef}
      data-size={size || DEFAULTS.SIZE}
      data-disabled={disabled || DEFAULTS.DISABLED}
      isDisabled={disabled}
      {...otherProps}
    >
      <div className={STYLE.primaryText}>{children}</div>
      <div className={STYLE.secondaryText}>{props.secondaryText}</div>
    </ButtonSimple>
  );
});

ButtonDialpad.displayName = 'ButtonDialpad';

export default ButtonDialpad;
