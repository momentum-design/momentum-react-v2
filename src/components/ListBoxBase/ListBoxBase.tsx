/* eslint-disable @typescript-eslint/ban-types */
import React, { RefObject, ReactElement, forwardRef } from 'react';
import classnames from 'classnames';

import './ListBoxBase.style.scss';
import { Props } from './ListBoxBase.types';
import { DEFAULTS, STYLE } from './ListBoxBase.constants';
import ListBoxSection from '../ListBoxSection';
import ListBoxItem from '../ListBoxItem';
import { useListBox } from '@react-aria/listbox';
import { ListState } from '@react-stately/list';

import { Node } from '@react-types/shared';
import MenuListBox from '../MenuListBox';

export const ListBoxContext = React.createContext<ListState<unknown>>(null);
/**
 * @internal
 */
function ListBoxBase<T extends object>(props: Props<T>, ref: RefObject<HTMLUListElement>) {
  const { className } = props;

  const { state, ...otherProps } = props;

  const { listBoxProps } = useListBox(
    {
      autoFocus: props.autoFocus,
      ...otherProps,
    },
    state,
    ref
  );

  const renderItems = () => {
    return [...state.collection.getKeys()].map((key) => {
      const item = state.collection.getItem(key) as Node<T>;
      return item.hasChildNodes ? (
        <ListBoxSection key={item.key} section={item} header={item.rendered} />
      ) : (
        <ListBoxItem item={item} key={item.key} />
      );
    });
  };

  return (
    <ListBoxContext.Provider value={state}>
      <MenuListBox style={props.style} {...listBoxProps} ref={ref}>
        {renderItems()}
      </MenuListBox>
    </ListBoxContext.Provider>
  );
}

/**
 * TODO: Add description of component here.
 */

const _ListBoxBase = forwardRef(ListBoxBase);
_ListBoxBase.displayName = 'ListBoxBase';

export default _ListBoxBase as <T>(
  props: Props<T> & { ref?: RefObject<HTMLUListElement> }
) => ReactElement;
