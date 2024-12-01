import React, { RefObject, forwardRef, useRef } from 'react';
import classnames from 'classnames';

import { STYLE } from './ButtonPillLink.constants';
import { Props } from './ButtonPillLink.types';
import './ButtonPillLink.style.scss';
import { DEFAULTS } from '../ButtonPill/ButtonPill.constants';
import Link from '../Link';

const ButtonPillLink = forwardRef((props: Props, providedRef: RefObject<HTMLAnchorElement>) => {
  const {
    id,
    children,
    className,
    color,
    disabled,
    shallowDisabled,
    grown,
    ghost,
    outline,
    inverted,
    size,
    href,
    target,
    tooltipContent,
    tooltipType,
    onPress,
    ...otherProps
  } = props;

  const buttonPillRef = useRef();
  const ref = providedRef || buttonPillRef;

  if (ghost && inverted) {
    console.warn('MRV2: Momentum does not support a ghost inverted ButtonPillLink.');
  }

  return (
    <Link
      id={id}
      ref={ref}
      href={href}
      target={target}
      onPress={onPress}
      disabled={disabled}
      inverted={inverted}
      tooltipType={tooltipType}
      hasExternalLinkIcon={false}
      tooltipContent={tooltipContent}
      data-color={color || DEFAULTS.COLOR}
      data-disabled={disabled || DEFAULTS.DISABLED}
      data-shallow-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      aria-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      data-ghost={ghost || DEFAULTS.GHOST}
      data-grown={grown || DEFAULTS.GROWN}
      data-outline={outline || DEFAULTS.OUTLINE}
      data-size={size || DEFAULTS.SIZE}
      data-inverted={inverted || DEFAULTS.INVERTED}
      className={classnames(STYLE.wrapper, className)}
      {...otherProps}
    >
      {children}
    </Link>
  );
});

ButtonPillLink.displayName = 'ButtonPillLink';

export default ButtonPillLink;
