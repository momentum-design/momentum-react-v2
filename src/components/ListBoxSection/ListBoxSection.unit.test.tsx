import { renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import React from 'react';

import { Item, Section } from '@react-stately/collections';
import { useListState } from '@react-stately/list';

import ListBoxSection from '.';

jest.mock('@react-aria/listbox', () => {
  return {
    useOption: () => ({ optionProps: {} }),
    useListBoxSection: () => ({ itemProps: {}, headingProps: {}, groupProps: {} }),
  };
});

describe('ListBoxSection', () => {
  const { result } = renderHook(() =>
    useListState({
      children: [
        <Section title="Section Title" key="$.0" aria-label="section">
          <Item key="$.0.0" aria-label="0">
            Item 1
          </Item>
          <Item key="$.0.1" aria-label="1">
            Item 2
          </Item>
        </Section>,
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
      useContextMock.mockReturnValue(state);

      const item = state.collection.getItem('$.0');
      const wrapper = mount(<ListBoxSection key={item.key} section={item} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should render the items inside the section', () => {
      useContextMock.mockReturnValue(state);

      const item = state.collection.getItem('$.0');
      const numberOfItems = [...item.childNodes].length;

      const wrapper = mount(<ListBoxSection key={item.key} section={item} />);

      const element = wrapper.find('ListItemBase li div');
      expect(element.length).toEqual(numberOfItems);
    });
  });
});
