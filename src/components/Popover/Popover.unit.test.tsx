import React from 'react';
import { mount } from 'enzyme';

import Popover, { POPOVER_CONSTANTS as CONSTANTS } from './';

describe('<Popover />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>} className={className}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>} id={id}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>} style={style}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const container = mount(
        <Popover triggerComponent={<button>Click Me!</button>} color={CONSTANTS.COLORS.TERTIARY}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      )
        .find(Popover)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(
        <Popover triggerComponent={<button>Click Me!</button>} className={className}>
          <p>Content</p>
        </Popover>
      )
        .find(Popover)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(
        <Popover triggerComponent={<button>Click Me!</button>} id={id}>
          <p>Content</p>
        </Popover>
      )
        .find(Popover)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(
        <Popover triggerComponent={<button>Click Me!</button>} style={style}>
          <p>Content</p>
        </Popover>
      )
        .find(Popover)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    /* ...additional attribute tests... */
  });

  describe('actions', () => {
    /* ...action tests... */
  });
});
