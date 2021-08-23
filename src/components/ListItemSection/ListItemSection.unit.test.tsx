import ListItemSection from '.';
import { mount } from 'enzyme';
import React from 'react';

describe('ListItemSection', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ListItemSection>Test</ListItemSection>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItemSection className={className}>Test</ListItemSection>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItemSection id={id}>Test</ListItemSection>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(<ListItemSection style={style}>Test</ListItemSection>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with position', () => {
      expect.assertions(1);

      const position = 'end';

      container = mount(<ListItemSection position={position}>Test</ListItemSection>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItemSection className={className}>Test</ListItemSection>);

      const element = container.find(ListItemSection).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItemSection id={id}>Test</ListItemSection>);

      const element = container.find(ListItemSection).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      container = mount(<ListItemSection style={style}>Test</ListItemSection>);

      const element = container.find(ListItemSection).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided position when style is position', () => {
      expect.assertions(1);

      const position = 'end';

      container = mount(<ListItemSection position={position}>Test</ListItemSection>);

      const element = container.find(ListItemSection).getDOMNode();

      expect(element.getAttribute('data-position')).toBe(position);
    });
  });
});
