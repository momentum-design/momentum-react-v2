import React, { RefObject, forwardRef, useRef } from 'react';
import classnames from 'classnames';
import ButtonCircle from '../ButtonCircle';
import { useToggleState } from '@react-stately/toggle';
import { useToggleButton } from '@react-aria/button';

import { DEFAULTS, STYLE } from './ButtonCircleToggle.constants';
import { DEFAULTS as BUTTON_CIRCLE_DEFAULTS } from '../ButtonCircle/ButtonCircle.constants';
import { Size as ButtonCircleSize } from '../ButtonCircle/ButtonCircle.types';
import { Props } from './ButtonCircleToggle.types';
import './ButtonCircleToggle.style.scss';
import { AriaBaseButtonProps } from '@react-types/button';

const ButtonCircleToggle = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const {
    children,
    className,
    ghost = DEFAULTS.GHOST,
    outline = DEFAULTS.OUTLINE,
    disabled = DEFAULTS.DISABLED,
    size = BUTTON_CIRCLE_DEFAULTS.SIZE,
  } = props;

  const internalRef = useRef();
  const ref = providedRef || internalRef;

  const state = useToggleState(props);
  const { buttonProps } = useToggleButton(props, state, ref);

  // useToggleButton hook from react-aria has wrong aria button types, so we fix it manually.
  const filteredProps = {
    ...buttonProps,
    color: undefined,
    'aria-expanded': buttonProps['aria-expanded'] as AriaBaseButtonProps['aria-expanded'],
    'aria-haspopup': buttonProps['aria-haspopup'] as AriaBaseButtonProps['aria-haspopup'],
    'aria-pressed': buttonProps['aria-pressed'] as AriaBaseButtonProps['aria-pressed'],
  };

  // We delete the disabled prop coming from useToggleButton,
  // so that we use the disabled value passed in props.
  delete filteredProps.disabled;

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
      {...filteredProps}
    >
      {children}
    </ButtonCircle>
  );
});

ButtonCircleToggle.displayName = 'ButtonSimpleToggle';

export default ButtonCircleToggle;
