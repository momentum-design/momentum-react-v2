import classnames from 'classnames';
import React, { FC } from 'react';

import { STYLE } from './DividerDot.constants';
import { Props } from './DividerDot.types';
import './DividerDot.style.scss';

/**
 * The DividerDot component.
 */
const DividerDot: FC<Props> = (props: Props) => {
  const { className, id, style } = props;

  return <div className={classnames(className, STYLE.wrapper)} id={id} style={style} />;
};

export default DividerDot;
