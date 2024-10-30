import ListBoxItem from '.';
import { mount } from 'enzyme';
import React from 'react';
import { useListState } from '@react-stately/list';
import { renderHook } from '@testing-library/react-hooks';
import { Item } from '@react-stately/collections';
import ListItemBase from '../ListItemBase';
import { ListBoxContext } from '../ListBoxBase/ListBoxBase';

jest.mock('@react-aria/listbox', () => {
  return {
    useOption: () => ({ optionProps: {} }),
  };
});

describe('ListBoxItem', () => {
  let wrapper: any;
  const { result } = renderHook(() =>
    useListState({
      children: [
        <Item key="$.0" aria-label="0">
          Item 1
        </Item>,
        <Item key="$.1" aria-label="1">
          Item 2
        </Item>,
      ],
    })
  );

  const state = result.current;
  
  const setup = (item: any) => {
    (wrapper) = mount(
      <ListBoxContext.Provider value={state}>
        <ListBoxItem key={item.key} item={item} />
      </ListBoxContext.Provider>
    );
  };

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const item = state.collection.getItem('$.0');

      setup(item);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should render the given item', () => {
      const item = state.collection.getItem('$.1');

      setup(item);

      const element = wrapper.find('li div').getDOMNode();

      const base = wrapper.find(ListItemBase);
      expect(base.props()).toEqual({
        isPadded: true,
        isDisabled: false,
        children: expect.any(Object),
      });
      expect(element.innerHTML).toBe(item.rendered);
    });
  });
});
