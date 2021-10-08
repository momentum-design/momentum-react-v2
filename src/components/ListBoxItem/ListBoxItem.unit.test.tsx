import ListBoxItem from '.';
import { mount } from 'enzyme';
import React from 'react';
import { useListState } from '@react-stately/list';
import { renderHook } from '@testing-library/react-hooks';
import { Item } from '@react-stately/collections';

jest.mock('@react-aria/listbox', () => {
  return {
    useOption: () => ({ optionProps: {} }),
  };
});

describe('ListBoxItem', () => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let useContextMock: jest.Mock<any, any>;

  beforeEach(() => {
    useContextMock = React.useContext = jest.fn();
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      useContextMock.mockReturnValue({ state, shouldWrapItems: true });
      const item = state.collection.getItem('$.0');

      const wrapper = mount(<ListBoxItem key={item.key} item={item} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should render the given item', () => {
      useContextMock.mockReturnValue({ state, shouldWrapItems: true });
      const item = state.collection.getItem('$.1');

      const wrapper = mount(<ListBoxItem key={item.key} item={item} />);

      const element = wrapper.find('li div').getDOMNode();

      expect(element.innerHTML).toBe(item.rendered);
    });
  });
});
