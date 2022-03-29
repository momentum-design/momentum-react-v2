import React, { FC } from 'react';
import classnames from 'classnames';

import CardStatus from './CardStatus';

import { DEFAULTS, STYLE } from './Card.constants';
import type { Props } from './Card.types';
import './Card.style.scss';

/**
 * The Card component.
 */
const Card: FC<Props> = (props: Props) => {
  const {
    children,
    className,
    color = DEFAULTS.COLOR,
    height = DEFAULTS.HEIGHT,
    id,
    outline,
    rounding = DEFAULTS.ROUNDING,
    statusColor,
    statusStriped,
    style,
    ...otherProps
  } = props;

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      data-color={color}
      data-height={height}
      data-outline={outline}
      data-rounding={rounding}
      id={id}
      style={style}
      {...otherProps}
    >
      <CardStatus color={statusColor} striped={statusStriped} />
      {children}
    </div>
  );
};

export default Card;
