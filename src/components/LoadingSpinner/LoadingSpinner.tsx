import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './LoadingSpinner.constants';
import { Props } from './LoadingSpinner.types';
import './LoadingSpinner.style.scss';
import Icon from '../Icon';

// TODO: Update JSDOC for this component.
/**
 * The LoadingSpinner component.
 */
const LoadingSpinner: FC<Props> = (props: Props) => {
  const { className, id, style } = props;

  // TODO: Implementation goes here.
  return (
    <div className={classnames(className, STYLE.wrapper)} id={id} style={style}>
      <Icon scale={24} name="spinner-filled" weight="regular" fillColor="red" strokeColor="none" />
      <Icon scale={24} name="spinner" weight="regular" fillColor="red" strokeColor="none" />
    </div>
  );
};

export default LoadingSpinner;
