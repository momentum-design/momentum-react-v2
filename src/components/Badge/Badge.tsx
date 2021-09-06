import React, { FC } from 'react';
import classnames from 'classnames';

import './Badge.style.scss';
import { Props } from './Badge.types';
import { DEFAULTS, STYLE } from './Badge.constants';

import Icon from '../Icon/Icon';

const Badge: FC<Props> = (props: Props) => {
  const { className, id, size, style } = props;
  return (
    <div
      className={classnames(STYLE.wrapper, className)}
      id={id}
      style={style}
      data-size={size || DEFAULTS.SIZE}
    >
      {props.size == 18 ? (
        props.children
      ) : props.size == 12 ? (
        <Icon name="unread" weight="bold" scale={12} fillColor={'var(--badge-background)'} />
      ) : null}
    </div>
  );
};

export default Badge;
