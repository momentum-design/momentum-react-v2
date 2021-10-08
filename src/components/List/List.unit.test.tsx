import React from 'react';
import { mount } from 'enzyme';

import List, { LIST_CONSTANTS as CONSTANTS } from './';
import { Item } from '@react-stately/collections';

describe('<List />', () => {
  const commonProps = {
    'aria-label': 'test',
  };
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(
        <List {...commonProps}>
          <Item key="1">Item 1</Item>
          <Item key="2">Item 2</Item>
        </List>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(
        <List className={className} {...commonProps}>
          <Item key="1">Item 1</Item>
          <Item key="2">Item 2</Item>
        </List>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(
        <List id={id} {...commonProps}>
          <Item key="1">Item 1</Item>
          <Item key="2">Item 2</Item>
        </List>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(
        <List style={style} {...commonProps}>
          <Item key="1">Item 1</Item>
          <Item key="2">Item 2</Item>
        </List>
      );

      expect(container).toMatchSnapshot();
    });

    /* ...additional snapshot tests... */
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(
        <List {...commonProps}>
          <Item key="1">Item 1</Item>
          <Item key="2">Item 2</Item>
        </List>
      )
        .find(List)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(
        <List className={className} {...commonProps}>
          <Item key="1">Item 1</Item>
          <Item key="2">Item 2</Item>
        </List>
      )
        .find(List)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(
        <List id={id} {...commonProps}>
          <Item key="1">Item 1</Item>
          <Item key="2">Item 2</Item>
        </List>
      )
        .find(List)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(
        <List style={style} {...commonProps}>
          <Item key="1">Item 1</Item>
          <Item key="2">Item 2</Item>
        </List>
      )
        .find(List)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    /* ...additional attribute tests... */
  });

  describe('actions', () => {
    /* ...action tests... */
  });
});
