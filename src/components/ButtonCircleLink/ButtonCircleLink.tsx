import React, { Children, FC } from 'react';
import classnames from 'classnames';
import { STYLE } from './ButtonCircleLink.constants';
import { DEFAULTS, STYLE as BUTTONCIRCLE_STYLE } from '../ButtonCircle/ButtonCircle.constants';
import { Props } from './ButtonCircleLink.types';
import './ButtonCircleLink.style.scss';
import Link from '../Link';

const ButtonCircleLink: FC<Props> = (props: Props) => {
  const {
    id,
    children,
    className,
    color,
    disabled,
    shallowDisabled,
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

  if (ghost && inverted) {
    console.warn('MRV2: Momentum does not support a ghost inverted ButtonCircle.');
  }

  const multipleChildren = Children.count(children) > 1;

  return (
    <Link
      id={id}
      href={href}
      target={target}
      onPress={onPress}
      disabled={disabled}
      inverted={inverted}
      tooltipType={tooltipType}
      hasExternalLinkIcon={false}
      tooltipContent={tooltipContent}
      data-color={color || DEFAULTS.COLOR}
      data-ghost={ghost || DEFAULTS.GHOST}
      data-multiple-children={multipleChildren}
      data-outline={outline || DEFAULTS.OUTLINE}
      data-size={size || DEFAULTS.SIZE}
      data-inverted={inverted || DEFAULTS.INVERTED}
      className={classnames(STYLE.wrapper, BUTTONCIRCLE_STYLE.wrapper, className)}
      data-disabled={disabled || DEFAULTS.DISABLED}
      data-shallow-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      aria-disabled={shallowDisabled || DEFAULTS.SHALLOW_DISABLED}
      {...otherProps}
    >
      {children}
    </Link>
  );
};

export default ButtonCircleLink;
