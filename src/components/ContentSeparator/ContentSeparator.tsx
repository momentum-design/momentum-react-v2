/* eslint-disable @typescript-eslint/ban-ts-comment */

import React from 'react';
import classnames from 'classnames';

import './ContentSeparator.style.scss';
import { Props } from './ContentSeparator.types';
import { STYLE } from './ContentSeparator.constants';
import { useSeparator } from '@react-aria/separator';
import { PartialNode } from '@react-stately/collections';

const ContentSeparator: React.FC<Props> = (props: Props) => {
  const { className, children, gradient } = props;

  const { separatorProps } = useSeparator({
    elementType: 'li',
  });

  return (
    <li
      {...separatorProps}
      className={classnames(className, STYLE.wrapper)}
      data-gradient={gradient}
    >
      {children}
    </li>
  );
};

// This allows the ContentSeparator to be used within Menu
// @ts-ignore
ContentSeparator.getCollectionNode = function* getCollectionNode<T>(
  props: Props
): Generator<PartialNode<T>> {
  yield {
    type: 'item',
    props: { ...props, _isSeparator: true },
  };
};

/**
 * ContentSeparator with text/other component in the middle
 */
export default ContentSeparator;
