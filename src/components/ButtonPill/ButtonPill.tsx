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
    onlyTriggersTooltip,
    ...otherProps
  } = props;

  if (ghost && inverted) {
    console.warn('MRV2: Momentum does not support a ghost inverted ButtonPill.');
  }

  if (onlyTriggersTooltip && (outline || inverted || color || disabled || shallowDisabled)) {
    console.warn(
      'MRV2: Momentum does not support a button that onlyTriggersTooltip and is outline, inverted, has color, or is disabled'
    );
  }

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className)}
      ref={providedRef}
      data-color={color || DEFAULTS.COLOR}
      data-disabled={disabled || DEFAULTS.DISABLED}
      data-shallow-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      aria-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      data-ghost={ghost || onlyTriggersTooltip || DEFAULTS.GHOST}
      data-grown={grown || DEFAULTS.GROWN}
      data-outline={outline || DEFAULTS.OUTLINE}
      data-size={size || DEFAULTS.SIZE}
      data-inverted={inverted || DEFAULTS.INVERTED}
      data-only-triggers-tooltip={onlyTriggersTooltip || DEFAULTS.ONLY_TRIGGERS_TOOLTIP}
      isDisabled={disabled}
      {...otherProps}
    />
  );
});

ButtonPill.displayName = 'ButtonPill';

export default ButtonPill;
