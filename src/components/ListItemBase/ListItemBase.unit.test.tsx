import ListItemBase from '.';
import { mount } from 'enzyme';
import React from 'react';
import { STYLE } from './ListItemBase.constants';

describe('ListItemBase', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ListItemBase>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItemBase className={className}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItemBase id={id}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(<ListItemBase style={style}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isDisabled', () => {
      expect.assertions(1);

      const isDisabled = true;

      container = mount(<ListItemBase isDisabled={isDisabled}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = 40;

      container = mount(<ListItemBase size={size}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with shape', () => {
      expect.assertions(1);

      const shape = 'isPilled';

      container = mount(<ListItemBase shape={shape}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with role', () => {
      expect.assertions(1);

      const role = 'role';

      container = mount(<ListItemBase role={role}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isSelected', () => {
      expect.assertions(1);

      const isSelected = true;

      container = mount(<ListItemBase isSelected={isSelected}>Test</ListItemBase>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      container = mount(<ListItemBase>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.classList.contains(STYLE.wrapper));
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItemBase className={className}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItemBase id={id}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      container = mount(<ListItemBase style={style}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-disabled when isDisabled is provided', () => {
      expect.assertions(1);

      const isDisabled = true;

      container = mount(<ListItemBase isDisabled={isDisabled}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe('true');
    });

    it('should have provided data-size when size is provided', () => {
      expect.assertions(1);

      const size = 32;

      container = mount(<ListItemBase size={size}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(size.toString());
    });

    it('should have provided data-shape when shape is provided', () => {
      expect.assertions(1);

      const shape = 'isPilled';

      container = mount(<ListItemBase shape={shape}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('data-shape')).toBe(shape);
    });

    it('should have provided role when role is provided', () => {
      expect.assertions(1);

      const role = 'role';

      container = mount(<ListItemBase role={role}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.getAttribute('role')).toBe(role);
    });

    it('should have provided active class when isSelected is provided', () => {
      expect.assertions(1);

      const isSelected = true;

      container = mount(<ListItemBase isSelected={isSelected}>Test</ListItemBase>);

      const element = container.find(ListItemBase).getDOMNode();

      expect(element.classList.contains('active')).toBe(true);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ListItemBase onPress={mockCallback} />).find(ListItemBase);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
