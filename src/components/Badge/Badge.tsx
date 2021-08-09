import React, { FC } from 'react';

import './Badge.style.scss';
import { Props } from './Badge.types';
import { DEFAULTS, STYLE } from './Badge.constants';

const Badge: FC<Props> = (props: Props) => {
  return (
    <div className={STYLE.wrapper} data-size={props.size || DEFAULTS.SIZE}>
      {props.size == 'M' ? props.children : null}
    </div>
  );
};

Badge.displayName = 'Badge';

export default Badge;
