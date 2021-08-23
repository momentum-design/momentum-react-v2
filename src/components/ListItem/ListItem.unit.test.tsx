import ListItem from '.';
import { mount } from 'enzyme';
import React from 'react';
import { STYLE } from './ListItem.constants';

describe('ListItem', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ListItem>Test</ListItem>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItem className={className}>Test</ListItem>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItem id={id}>Test</ListItem>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(<ListItem style={style}>Test</ListItem>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isDisabled', () => {
      expect.assertions(1);

      const isDisabled = true;

      container = mount(<ListItem isDisabled={isDisabled}>Test</ListItem>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = 40;

      container = mount(<ListItem size={size}>Test</ListItem>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with shape', () => {
      expect.assertions(1);

      const shape = 'rounded';

      container = mount(<ListItem shape={shape}>Test</ListItem>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with role', () => {
      expect.assertions(1);

      const role = 'role';

      container = mount(<ListItem role={role}>Test</ListItem>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      container = mount(<ListItem>Test</ListItem>);

      const element = container.find(ListItem).getDOMNode();

      expect(element.classList.contains(STYLE.wrapper));
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItem className={className}>Test</ListItem>);

      const element = container.find(ListItem).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItem id={id}>Test</ListItem>);

      const element = container.find(ListItem).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      container = mount(<ListItem style={style}>Test</ListItem>);

      const element = container.find(ListItem).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided isDisabled when isDisabled is provided', () => {
      expect.assertions(1);

      const isDisabled = true;

      container = mount(<ListItem isDisabled={isDisabled}>Test</ListItem>);

      const element = container.find(ListItem).getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe('true');
    });

    it('should have provided size when size is provided', () => {
      expect.assertions(1);

      const size = 32;

      container = mount(<ListItem size={size}>Test</ListItem>);

      const element = container.find(ListItem).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(size.toString());
    });

    it('should have provided shape when shape is provided', () => {
      expect.assertions(1);

      const shape = 'rounded';

      container = mount(<ListItem shape={shape}>Test</ListItem>);

      const element = container.find(ListItem).getDOMNode();

      expect(element.getAttribute('data-shape')).toBe(shape);
    });

    it('should have provided role when role is provided', () => {
      expect.assertions(1);

      const role = 'role';

      container = mount(<ListItem role={role}>Test</ListItem>);

      const element = container.find(ListItem).getDOMNode();

      expect(element.getAttribute('role')).toBe(role);
    });
  });
});
