import classnames from 'classnames';
import React, { FC } from 'react';

import { STYLE } from './CardStatus.constants';

import type { Props } from './CardStatus.types';
import './CardStatus.style.scss';

/**
 * The CardStatus component.
 */
const CardStatus: FC<Props> = (props: Props) => {
  const { className, color, id, striped, style, ...otherProps } = props;

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      data-color={color}
      data-striped={striped}
      id={id}
      style={style}
      {...otherProps}
    />
  );
};

export default CardStatus;
