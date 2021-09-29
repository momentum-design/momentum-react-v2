import React from 'react';
import { mount } from 'enzyme';
import { Item } from '@react-stately/collections';
import { renderHook } from '@testing-library/react-hooks';

import MenuItem from './';
import { useTreeState } from '@react-stately/tree';
import { triggerPress } from '../../../test/utils';

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

  describe('snapshot', () => {
    it('should match snapshot', () => {
      const item = state.collection.getItem('$.0');
      useContextMock.mockReturnValue({ onClose: jest.fn(), closeOnSelect: true });

      const wrapper = mount(<MenuItem state={state} key={item.key} item={item} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let useContextMock: jest.Mock<any, any>;

  beforeEach(() => {
    useContextMock = React.useContext = jest.fn();
  });

  describe('attributes', () => {
    it('should render the given item', () => {
      const item = state.collection.getItem('$.1');
      useContextMock.mockReturnValue({ onClose: jest.fn(), closeOnSelect: true });

      const wrapper = mount(<MenuItem state={state} key={item.key} item={item} />);

      const element = wrapper.find('li div').getDOMNode();

      expect(element.innerHTML).toBe(item.rendered);
    });
  });

  it('should call onClose after clicking if closeOnSelect is true', () => {
    const item = state.collection.getItem('$.1');
    const onCloseMock = jest.fn();
    useContextMock.mockReturnValue({ onClose: onCloseMock, closeOnSelect: true });

    const wrapper = mount(<MenuItem state={state} key={item.key} item={item} />);

    expect(onCloseMock).not.toHaveBeenCalled();

    const element = wrapper.find('li');
    triggerPress(element);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should not call onClose after clicking if closeOnSelect is false', () => {
    const item = state.collection.getItem('$.1');
    const onCloseMock = jest.fn();
    useContextMock.mockReturnValue({ onClose: onCloseMock, closeOnSelect: false });

    const wrapper = mount(<MenuItem state={state} key={item.key} item={item} />);

    expect(onCloseMock).not.toHaveBeenCalled();

    const element = wrapper.find('li');
    triggerPress(element);

    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
