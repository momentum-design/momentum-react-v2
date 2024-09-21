import React from 'react';
import { mount } from 'enzyme';
import { Item } from '@react-stately/collections';
import { SelectionGroup } from '../Menu/Menu.utils';

import MenuSelectionGroup from './';
import { renderHook } from '@testing-library/react-hooks';
import { useTreeState } from '@react-stately/tree';
import MenuItem from '../MenuItem';

describe('<MenuSelectionGroup />', () => {
  const { result } = renderHook(() =>
    useTreeState({
      children: [
        <SelectionGroup title="x" selectionMode="single" key="$.0" aria-label="selection">
          <Item key="$.0.0" aria-label="0">
            Item 1
          </Item>
          <Item key="$.0.1" aria-label="1">
            Item 2
          </Item>
        </SelectionGroup>,
      ],
      selectedKeys: ['$.0.0'],
    })
  );

  const state = result.current;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const item = state.collection.getItem('$.0');
      const wrapper = mount(
        <MenuSelectionGroup
          state={state}
          key={item.key}
          item={item}
          className="some-classname"
          itemSize={32}
          tickPosition="none"
          classNameSelectedItem="selected-classname"
        />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should render the items inside the SelectionGroup', () => {
      const item = state.collection.getItem('$.0');
      const numberOfItems = [...item.childNodes].length;

      const wrapper = mount(<MenuSelectionGroup state={state} key={item.key} item={item} />);

      const element = wrapper.find('ListItemBase li div');
      expect(element.length).toEqual(numberOfItems);
    });

    it('should pass className to group ul element', () => {
      const item = state.collection.getItem('$.0');
      const wrapper = mount(
        <MenuSelectionGroup state={state} key={item.key} item={item} className="some-classname" />
      );

      const group = wrapper.find('ul').getDOMNode();

      expect(group.classList.contains('some-classname')).toBe(true);
    });

    it('should pass tickPosition to MenuItem', () => {
      const item = state.collection.getItem('$.0');
      const wrapper = mount(
        <MenuSelectionGroup state={state} key={item.key} item={item} tickPosition="left" />
      );

      const menuItem = wrapper.find(MenuItem).filter({ item: { key: '$.0.0' } });

      expect(menuItem.props()).toEqual({
        item: expect.any(Object),
        state: expect.any(Object),
        tickPosition: 'left',
        classNameSelectedItem: undefined,
        itemSize: undefined,
        onAction: undefined,
      });
    });

    it('should pass classNameSelectedItem to MenuItem', () => {
      const item = state.collection.getItem('$.0');
      const wrapper = mount(
        <MenuSelectionGroup
          state={state}
          key={item.key}
          item={item}
          classNameSelectedItem="i-am-selected"
        />
      );

      const menuItem = wrapper.find(MenuItem).filter({ item: { key: '$.0.0' } });

      expect(menuItem.props()).toEqual({
        item: expect.any(Object),
        state: expect.any(Object),
        tickPosition: undefined,
        classNameSelectedItem: 'i-am-selected',
        itemSize: undefined,
        onAction: undefined,
      });
    });

    it('should pass itemSize to MenuItem', () => {
      const item = state.collection.getItem('$.0');
      const wrapper = mount(
        <MenuSelectionGroup state={state} key={item.key} item={item} itemSize="auto" />
      );

      const menuItem = wrapper.find(MenuItem).filter({ item: { key: '$.0.0' } });

      expect(menuItem.props()).toEqual({
        item: expect.any(Object),
        state: expect.any(Object),
        tickPosition: undefined,
        classNameSelectedItem: undefined,
        itemSize: 'auto',
        onAction: undefined,
      });
    });
  });
});
