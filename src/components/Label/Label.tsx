import React, { ReactElement } from 'react';

import './Label.style.scss';
import { Props } from './Label.types';

import classnames from 'classnames';

const Label = (props: React.PropsWithChildren<Props>): ReactElement => {
  const { label, className, htmlFor, id, children } = props;

  return (
    <label
      className={classnames('md-label', className)}
      htmlFor={htmlFor}
      id={id}
    >
      {label}
      {children}
    </label>
  );
};

/**
 * Label for inputs etc.
 */

export default Label;
