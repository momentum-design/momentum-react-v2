import React, { RefObject, forwardRef, useRef } from 'react';
import classnames from 'classnames';
import ButtonCircle from '../ButtonCircle';
import { useToggleState } from '@react-stately/toggle';

import { DEFAULTS, STYLE } from './ButtonCircleToggle.constants';
import { DEFAULTS as BUTTON_CIRCLE_DEFAULTS } from '../ButtonCircle/ButtonCircle.constants';
import { Size as ButtonCircleSize } from '../ButtonCircle/ButtonCircle.types';
import { Props } from './ButtonCircleToggle.types';
import './ButtonCircleToggle.style.scss';
import { chain } from 'react-aria';

const ButtonCircleToggle = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const {
    children,
    className,
    ghost = DEFAULTS.GHOST,
    outline = DEFAULTS.OUTLINE,
    disabled = DEFAULTS.DISABLED,
    size = BUTTON_CIRCLE_DEFAULTS.SIZE,
    onPress,
    ...otherProps
  } = props;

  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const state = useToggleState(props);

  if (ghost === false && outline === false) {
    console.warn(
      'ButtonCircleToggle is only designed for outline or ghost circle buttons. Outline and ghost properties cannot be false at the same time.'
    );
  }

  return (
    <ButtonCircle
      className={classnames(STYLE.wrapper, className)}
      outline={outline}
      ghost={ghost}
      disabled={disabled}
      size={size as ButtonCircleSize}
      data-selected={state.isSelected || DEFAULTS.SELECTED}
      onPress={chain(state.toggle, onPress)}
      aria-pressed={state.isSelected}
      {...otherProps}
      ref={ref}
    >
      {children}
    </ButtonCircle>
  );
});

ButtonCircleToggle.displayName = 'ButtonSimpleToggle';

export default ButtonCircleToggle;
