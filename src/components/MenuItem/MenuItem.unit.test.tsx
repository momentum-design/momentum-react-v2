import React from 'react';
import { mount } from 'enzyme';
import { Item } from '@react-stately/collections';
import { renderHook } from '@testing-library/react-hooks';

import MenuItem from './';
import { useTreeState } from '@react-stately/tree';
import { triggerPress } from '../../../test/utils';
import * as menu from '../Menu/Menu';
import { ListItemBaseSize } from '../ListItemBase/ListItemBase.types';

describe('<MenuItem />', () => {
  const { result } = renderHook(() =>
    useTreeState({
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

  beforeEach(() => {
    jest.spyOn(menu, 'useMenuAppearanceContext').mockReturnValue({
      itemShape: 'rectangle',
      itemSize: 40 as ListItemBaseSize,
      isTickOnLeftSide: false,
    });
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const item = state.collection.getItem('$.0');
      jest
        .spyOn(menu, 'useMenuContext')
        .mockReturnValue({ onClose: jest.fn(), closeOnSelect: true });

      const wrapper = mount(<MenuItem state={state} key={item.key} item={item} />);

      expect(wrapper).toMatchSnapshot();
    });

    it('should match snapshot with tickOnLeftSide', () => {
      const item = state.collection.getItem('$.0');
      jest
        .spyOn(menu, 'useMenuContext')
        .mockReturnValue({ onClose: jest.fn(), closeOnSelect: true });

      jest.spyOn(menu, 'useMenuAppearanceContext').mockReturnValue({
        itemShape: 'rectangle',
        itemSize: 30 as ListItemBaseSize,
        isTickOnLeftSide: true,
      });

      const wrapper = mount(<MenuItem state={state} key={item.key} item={item} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should render the given item', () => {
      const item = state.collection.getItem('$.1');
      jest
        .spyOn(menu, 'useMenuContext')
        .mockReturnValue({ onClose: jest.fn(), closeOnSelect: true });

      const wrapper = mount(<MenuItem state={state} key={item.key} item={item} />);

      const element = wrapper.find('li div').getDOMNode();

      expect(element.innerHTML).toBe(item.rendered);
    });
  });

  it('should call onClose after clicking if closeOnSelect is true', () => {
    const item = state.collection.getItem('$.1');
    const onCloseMock = jest.fn();
    jest
      .spyOn(menu, 'useMenuContext')
      .mockReturnValue({ onClose: onCloseMock, closeOnSelect: true });

    const wrapper = mount(<MenuItem state={state} key={item.key} item={item} />);

    expect(onCloseMock).not.toHaveBeenCalled();

    const element = wrapper.find('li');
    triggerPress(element);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should not call onClose after clicking if closeOnSelect is false', () => {
    const item = state.collection.getItem('$.1');
    const onCloseMock = jest.fn();
    jest
      .spyOn(menu, 'useMenuContext')
      .mockReturnValue({ onClose: onCloseMock, closeOnSelect: false });

    const wrapper = mount(<MenuItem state={state} key={item.key} item={item} />);

    expect(onCloseMock).not.toHaveBeenCalled();

    const element = wrapper.find('li');
    triggerPress(element);

    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
