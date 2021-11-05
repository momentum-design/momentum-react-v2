import React from 'react';
import classnames from 'classnames';

import './ContentSeparator.style.scss';
import { Props } from './ContentSeparator.types';
import { STYLE } from './ContentSeparator.constants';
import { useSeparator } from '@react-aria/separator';

const ContentSeparator: React.FC<Props> = (props: Props) => {
  const { className, children } = props;

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  return (
    <li {...separatorProps} className={classnames(className, STYLE.wrapper)}>
      {children}
    </li>
  );
};

/**
 * ContentSeparator with text/other component in the middle
 */

export default ContentSeparator;
