import React, { ReactElement } from 'react';

import './InputHelper.style.scss';
import { Props } from './InputHelper.types';

import classnames from 'classnames';

const InputHelper = (props: Props): ReactElement => {
  const { message, className, id } = props;

  return (
    <div id={id} className={classnames('md-input-helper', className)}>
      {message}
    </div>
  );
};

/**
 * Help message for use under Inputs
 */

export default InputHelper;
