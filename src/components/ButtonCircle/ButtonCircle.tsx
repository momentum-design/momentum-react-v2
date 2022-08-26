import React, { Children, forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import ButtonSimple from '../ButtonSimple';
import { useToggleState } from '@react-stately/toggle';
import { useToggleButton } from 'react-aria';

import { DEFAULTS, STYLE } from './ButtonCircle.constants';
import { Props } from './ButtonCircle.types';
import './ButtonCircle.style.scss';

const ButtonCircle = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { children, className, color, disabled, ghost, outline, size, ...otherProps } = props;

  const multipleChildren = Children.count(children) > 1;
  const state = useToggleState({ ...props, isDisabled: disabled });
  const { buttonProps } = useToggleButton({ ...props, isDisabled: disabled }, state, providedRef);

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className)}
      ref={providedRef}
      data-color={color || DEFAULTS.COLOR}
      data-ghost={ghost || DEFAULTS.GHOST}
      data-multiple-children={multipleChildren}
      data-outline={outline || DEFAULTS.OUTLINE}
      data-size={size || DEFAULTS.SIZE}
      data-disabled={disabled || DEFAULTS.DISABLED}
      data-selected={state.isSelected || DEFAULTS.SELECTED}
      isDisabled={disabled}
      {...otherProps}
      {...buttonProps}
    >
      {children}
    </ButtonSimple>
  );
});

ButtonCircle.displayName = 'ButtonCircle';

export default ButtonCircle;
