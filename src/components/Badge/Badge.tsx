import classnames from 'classnames';
import React, { FC } from 'react';

import './Badge.style.scss';
import Icon from 'components/Icon/Icon';

import { DEFAULTS, STYLE } from './Badge.constants';
import { Props } from './Badge.types';

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
        <Icon
          name="unread"
          weight="bold"
          scale={12}
          fillColor={'var(--badge-background)'}
          strokeColor="none"
        />
      ) : null}
    </div>
  );
};

export default Badge;
