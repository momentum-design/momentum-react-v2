import React from 'react';
import classnames from 'classnames';

import './ContentSeparator.style.scss';
import { Props } from './ContentSeparator.types';
import { STYLE } from './ContentSeparator.constants';

const ContentSeparator: React.FC<Props> = (props: Props) => {
  const { className, children } = props;

  return (
    <div className={STYLE.wrapper}>
      <div className={classnames(className)}>{children}</div>
    </div>
  );
};

/**
 * ContentSeparator with text/other component in the middle
 */

export default ContentSeparator;
