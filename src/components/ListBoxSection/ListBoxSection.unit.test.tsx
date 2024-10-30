import ListBoxSection from '.';
import { mount } from 'enzyme';
import React from 'react';
import { Item, Section } from '@react-stately/collections';
import { useListState } from '@react-stately/list';
import { renderHook } from '@testing-library/react-hooks';
import { ListBoxContext } from '../ListBoxBase/ListBoxBase';

jest.mock('@react-aria/listbox', () => {
  return {
    useOption: () => ({ optionProps: {} }),
    useListBoxSection: () => ({ itemProps: {}, headingProps: {}, groupProps: {} }),
  };
});

describe('ListBoxSection', () => {
  let wrapper: any;
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

  const setup = (item: any) => {
    (wrapper) = mount(
      <ListBoxContext.Provider value={state}>
        <ListBoxSection key={item.key} section={item} />
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
    it('should render the items inside the section', () => {
      const item = state.collection.getItem('$.0');
      const numberOfItems = [...item.childNodes].length;
      setup(item);

      const element = wrapper.find('ListItemBase li div');
      expect(element.length).toEqual(numberOfItems);
    });
  });
});
