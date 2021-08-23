import MenuListBox from '.';
import { mount } from 'enzyme';
import React from 'react';
import { STYLE } from './MenuListBox.constants';

describe('MenuListBox', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<MenuListBox>Test</MenuListBox>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<MenuListBox className={className}>Test</MenuListBox>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<MenuListBox id={id}>Test</MenuListBox>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(<MenuListBox style={style}>Test</MenuListBox>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      container = mount(<MenuListBox>Test</MenuListBox>);

      const element = container.find(MenuListBox).getDOMNode();

      expect(element.classList.contains(STYLE.wrapper));
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<MenuListBox className={className}>Test</MenuListBox>);

      const element = container.find(MenuListBox).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<MenuListBox id={id}>Test</MenuListBox>);

      const element = container.find(MenuListBox).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      container = mount(<MenuListBox style={style}>Test</MenuListBox>);

      const element = container.find(MenuListBox).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });
  });
});
