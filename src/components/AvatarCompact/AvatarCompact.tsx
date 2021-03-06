import React, { FC } from 'react';
import classnames from 'classnames';

import './AvatarCompact.style.scss';
import { Props } from './AvatarCompact.types';
import { STYLE, K_THRESHOLD } from './AvatarCompact.constants';

const AvatarCompact: FC<Props> = (props: Props) => {
  const { className, count } = props;

  const getFormattedNumber = () => {
    if (count < K_THRESHOLD) {
      return `+${count}`;
    } else {
      const ret = count / K_THRESHOLD;
      return `+${ret.toFixed(count % K_THRESHOLD < 100 ? 0 : 1)}K`;
    }
  };

  return <div className={classnames(className, STYLE.wrapper)}>{getFormattedNumber()}</div>;
};

/**
 * Avatar component used to represent multiple people
 */

export default AvatarCompact;
