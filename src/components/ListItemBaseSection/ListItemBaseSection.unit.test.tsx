import ListItemBaseSection from '.';
import { mount } from 'enzyme';
import React from 'react';

describe('ListItemBaseSection', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ListItemBaseSection>Test</ListItemBaseSection>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItemBaseSection className={className}>Test</ListItemBaseSection>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItemBaseSection id={id}>Test</ListItemBaseSection>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(<ListItemBaseSection style={style}>Test</ListItemBaseSection>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with position', () => {
      expect.assertions(1);

      const position = 'end';

      container = mount(<ListItemBaseSection position={position}>Test</ListItemBaseSection>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'some title';

      container = mount(<ListItemBaseSection title={title}>Test</ListItemBaseSection>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ListItemBaseSection className={className}>Test</ListItemBaseSection>);

      const element = container.find(ListItemBaseSection).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ListItemBaseSection id={id}>Test</ListItemBaseSection>);

      const element = container.find(ListItemBaseSection).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      container = mount(<ListItemBaseSection style={style}>Test</ListItemBaseSection>);

      const element = container.find(ListItemBaseSection).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided position when style is position', () => {
      expect.assertions(1);

      const position = 'end';

      container = mount(<ListItemBaseSection position={position}>Test</ListItemBaseSection>);

      const element = container.find(ListItemBaseSection).getDOMNode();

      expect(element.getAttribute('data-position')).toBe(position);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'some title';

      container = mount(<ListItemBaseSection title={title}>Test</ListItemBaseSection>);

      const element = container.find(ListItemBaseSection).getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });
  });
});
