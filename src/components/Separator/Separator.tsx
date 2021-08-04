import React from 'react';
import classnames from 'classnames';

import './Separator.style.scss';
import { Props } from './Separator.types';
import { STYLE } from './Separator.constants';

const Separator: React.FC<Props> = (props: Props) => {
  const { className, children } = props;

  return (
    <div className={STYLE.wrapper}>
      <div className={classnames(className)}>{children}</div>
    </div>
  );
};

/**
 * Separator with text/other component in the middle
 */

export default Separator;
