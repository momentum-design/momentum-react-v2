import React, { FC } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './LoadingSpinner.constants';
import { Props } from './LoadingSpinner.types';
import './LoadingSpinner.style.scss';
import Icon from '../Icon';

const LoadingSpinner: FC<Props> = (props: Props) => {
  const { className, id, style, scale = DEFAULTS.SCALE, ...rest } = props;

  return (
    <div className={classnames(className, STYLE.wrapper)} id={id} style={style} {...rest}>
      <Icon scale={scale} name="spinner" weight="regular" />
      <Icon scale={scale} className={STYLE.arch} name="spinner-partial" weight="regular" />
    </div>
  );
};

export default LoadingSpinner;
