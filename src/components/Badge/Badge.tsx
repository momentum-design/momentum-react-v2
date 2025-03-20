import React, { FC } from 'react';
import classnames from 'classnames';

import type { Props } from './Badge.types';
import { DEFAULTS } from './Badge.constants';
import { Badge as MdcBadge } from '@momentum-design/components/dist/react';

const Badge: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    type = DEFAULTS.TYPE,
    counter,
    maxCounter,
    iconName,
    overlay,
  } = props;

  return (
    <MdcBadge
      type={type}
      counter={counter}
      maxCounter={maxCounter}
      iconName={iconName}
      overlay={overlay}
      className={classnames(className)}
      id={id}
      style={style}
    />
  );
};

export default Badge;
