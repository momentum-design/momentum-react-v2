import React, { RefObject, forwardRef, useRef } from 'react';
import classnames from 'classnames';
import ButtonPill from '../ButtonPill';
import { useToggleState } from '@react-stately/toggle';

import { DEFAULTS, STYLE } from './ButtonPillToggle.constants';
import { DEFAULTS as BUTTON_PILL_DEFAULTS } from '../ButtonPill/ButtonPill.constants';
import { Props } from './ButtonPillToggle.types';
import './ButtonPillToggle.style.scss';
import { chain } from '@react-aria/utils';

const ButtonPillToggle = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const {
    children,
    className,
    ghost = DEFAULTS.GHOST,
    outline = DEFAULTS.OUTLINE,
    disabled = DEFAULTS.DISABLED,
    size = BUTTON_PILL_DEFAULTS.SIZE,
    onPress,
    ...otherProps
  } = props;

  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const state = useToggleState(props);

  if (ghost === false) {
    console.warn('MRV2: Momentum does not support non-ghost ButtonPillToggle.');
  }

  return (
    <ButtonPill
      className={classnames(STYLE.wrapper, className)}
      outline={outline}
      ghost={ghost}
      disabled={disabled}
      size={size}
      data-selected={state.isSelected || DEFAULTS.SELECTED}
      onPress={chain(state.toggle, onPress)}
      aria-pressed={state.isSelected}
      {...otherProps}
      ref={ref}
    >
      {children}
    </ButtonPill>
  );
});

ButtonPillToggle.displayName = 'ButtonPillToggle';

export default ButtonPillToggle;
