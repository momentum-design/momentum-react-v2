import React from 'react';
import { mount } from 'enzyme';
import { Item, Section } from '@react-stately/collections';

import MenuSection from './';
import { renderHook } from '@testing-library/react-hooks';
import { useTreeState } from '@react-stately/tree';

describe('<MenuSection />', () => {
  const { result } = renderHook(() =>
    useTreeState({
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

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const item = state.collection.getItem('$.0');
      const wrapper = mount(<MenuSection state={state} key={item.key} item={item} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should render the items inside the section', () => {
      const item = state.collection.getItem('$.0');
      const numberOfItems = [...item.childNodes].length;

      const wrapper = mount(<MenuSection state={state} key={item.key} item={item} />);

      const element = wrapper.find('ListItemBase li div');
      expect(element.length).toEqual(numberOfItems);
    });
  });
});
