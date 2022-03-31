import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './LoadingSpinner.constants';
import { Props } from './LoadingSpinner.types';
import './LoadingSpinner.style.scss';
import Icon from '../Icon';

const LoadingSpinner: FC<Props> = (props: Props) => {
  const { className, id, style } = props;

  return (
    <div className={classnames(className, STYLE.wrapper)} id={id} style={style}>
      <Icon scale={24} name="spinner" weight="regular" />
      <Icon scale={24} className={STYLE.arch} name="spinner-partial" weight="regular" />
    </div>
  );
};

export default LoadingSpinner;
