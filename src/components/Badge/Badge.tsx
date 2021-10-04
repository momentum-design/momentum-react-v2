import React, { FC } from 'react';

import './Badge.style.scss';
import { Props } from './Badge.types';
import { DEFAULTS, STYLE } from './Badge.constants';

import Icon from '../Icon/Icon';

const Badge: FC<Props> = (props: Props) => {
  return (
    <div className={STYLE.wrapper} data-size={props.size || DEFAULTS.SIZE}>
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
