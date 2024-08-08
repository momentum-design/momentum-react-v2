import React from 'react';
import { mount } from 'enzyme';
import { Item } from '@react-stately/collections';

import Menu, { MENU_CONSTANTS as CONSTANTS } from './';
import { triggerPress } from '../../../test/utils';
import ListItemBase from '../ListItemBase';

describe('<Menu />', () => {
  const defaultProps = {
    children: [<Item key="one">One</Item>, <Item key="two">Two</Item>],
    'aria-label': 'Menu component',
  };

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Menu {...defaultProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<Menu {...defaultProps} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<Menu {...defaultProps} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Menu {...defaultProps} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with itemSize', () => {
      expect.assertions(1);

      const itemSize = 50;

      const container = mount(<Menu {...defaultProps} itemSize={itemSize} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with itemShape', () => {
      expect.assertions(1);

      const itemShape = 'isPilled';

      const container = mount(<Menu {...defaultProps} itemSize={50} itemShape={itemShape} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<Menu {...defaultProps} />)
        .find(Menu)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<Menu {...defaultProps} className={className} />)
        .find(Menu)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<Menu {...defaultProps} id={id} />)
        .find(Menu)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have role of group when isGroupRole is true', () => {
      expect.assertions(1);

      const element = mount(<Menu {...defaultProps} isGroupRole />)
        .find(Menu)
        .getDOMNode();

      expect(element.getAttribute('role')).toBe('group');
    });

    it('should have role of menu when isGroupRole is false', () => {
      expect.assertions(1);

      const element = mount(<Menu {...defaultProps} isGroupRole={false} />)
        .find(Menu)
        .getDOMNode();

      expect(element.getAttribute('role')).toBe('menu');
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<Menu {...defaultProps} style={style} />)
        .find(Menu)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-size when itemSize is provided', () => {
      expect.assertions(1);

      const itemSize = 50;

      const element = mount(<Menu {...defaultProps} itemSize={itemSize} />)
        .find(ListItemBase)
        .at(0)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${itemSize}`);
    });

    it('should have provided data-shape when itemShape is provided', () => {
      expect.assertions(1);

      const itemShape = 'isPilled';

      const element = mount(<Menu {...defaultProps} itemSize={50} itemShape={itemShape} />)
        .find(ListItemBase)
        .at(0)
        .getDOMNode();

      expect(element.getAttribute('data-shape')).toBe(itemShape);
    });
  });

  describe('actions', () => {
    it('should call onAction with the correct key when action clicked', () => {
      expect.assertions(1);

      const key = 'one';

      const onActionMock = jest.fn();

      const listItem = mount(<Menu onAction={onActionMock} {...defaultProps} />).find(
        `li[data-key="${key}"]`
      );

      triggerPress(listItem);

      expect(onActionMock).toHaveBeenCalledWith(key);
    });
  });
});
