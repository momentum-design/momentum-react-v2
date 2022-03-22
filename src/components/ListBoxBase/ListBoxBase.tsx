/* eslint-disable @typescript-eslint/ban-types */

import React, { RefObject, ReactElement, forwardRef } from 'react';

import { useListBox } from '@react-aria/listbox';
import { ListState } from '@react-stately/list';
import { Node } from '@react-types/shared';

import ListBoxItem from 'components/ListBoxItem';
import ListBoxSection from 'components/ListBoxSection';
import MenuListBackground from 'components/MenuListBackground';

import { Props } from './ListBoxBase.types';

export const ListBoxContext = React.createContext<ListState<unknown>>(null);

const ListBoxBase = <T extends object>(props: Props<T>, ref: RefObject<HTMLUListElement>) => {
  const { state, className, id, style } = props;

  const mutatedProps = {
    ...props,
  };

  delete mutatedProps.id;

  const { listBoxProps } = useListBox(
    {
      autoFocus: props.autoFocus,
      ...mutatedProps,
      id,
    },
    state,
    ref
  );

  const renderItems = () => {
    return Array.from(state.collection.getKeys()).map((key) => {
      const item = state.collection.getItem(key) as Node<T>;
      if (item.type === 'section') {
        return <ListBoxSection key={item.key} section={item} />;
      } else if (item.type === 'item' && !item.parentKey) {
        return <ListBoxItem item={item} key={item.key} />;
      }
    });
  };

  return (
    <ListBoxContext.Provider value={state}>
      <MenuListBackground
        {...listBoxProps}
        color={'primary'}
        ref={ref}
        style={style}
        className={className}
      >
        {renderItems()}
      </MenuListBackground>
    </ListBoxContext.Provider>
  );
};

/**
 * ListBox component that displays a list of options
 * and allows a user to select one or more of them.
 *
 * @internal Used internally only, should not be exported as part of the library.
 */

const _ListBoxBase = forwardRef(ListBoxBase);
_ListBoxBase.displayName = 'ListBoxBase';

export default _ListBoxBase as <T>(
  props: Props<T> & { ref?: RefObject<HTMLUListElement> }
) => ReactElement;
