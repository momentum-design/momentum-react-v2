import React, { FC } from 'react';
import classnames from 'classnames';

import { Bullet as MdcBullet } from '@momentum-design/components/dist/react';
import type { Props } from './DividerDot.types';
import { DEFAULTS, STYLE } from './DividerDot.constants';
import './DividerDot.style.scss';

/**
 * The DividerDot component.
 */
const DividerDot: FC<Props> = (props: Props) => {
  const { className, id, style, size = DEFAULTS.SIZE } = props;

  return (
    <MdcBullet size={size} className={classnames(className, STYLE.wrapper)} id={id} style={style} />
  );
};

export default DividerDot;
