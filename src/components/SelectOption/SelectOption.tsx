import React, { FC, ReactElement } from 'react';
import classnames from 'classnames';

import './SelectOption.style.scss';
import { Props } from './SelectOption.types';
import { DEFAULTS, STYLE } from './SelectOption.constants';
import { Item, PartialNode } from '@react-stately/collections';
import ListItem from '../ListItem';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectOption = (props: Props): ReactElement => {
  return null;
};

SelectOption.getCollectionNode = function* getCollectionNode<T>(
  props: Props
): Generator<PartialNode<T>> {
  const { children } = props;

  const textValue =
    props.textValue || (typeof children === 'string' ? children : '') || props['aria-label'] || '';
  yield {
    type: 'item',
    props: props,
    rendered: children,
    // eslint-disable-next-line react/display-name
    wrapper: (element) => <ListItem>{element}</ListItem>,
    textValue,
    'aria-label': props['aria-label'],
    hasChildNodes: false,
  };
};
/**
 * TODO: Add description of component here.
 */

export default SelectOption;
