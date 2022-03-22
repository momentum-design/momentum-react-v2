import classnames from 'classnames';
import React from 'react';

import { useSeparator } from '@react-aria/separator';

import { STYLE } from './ContentSeparator.constants';
import { Props } from './ContentSeparator.types';
import './ContentSeparator.style.scss';

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
