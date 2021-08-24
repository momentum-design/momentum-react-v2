import React from 'react';
import { mount } from 'enzyme';

import MenuListBackground, { MENU_LIST_BACKGROUND_CONSTANTS as CONSTANTS } from './';

describe('<MenuListBackground />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<MenuListBackground />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<MenuListBackground className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<MenuListBackground id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<MenuListBackground style={style} />);

      expect(container).toMatchSnapshot();
    });

    /* ...additional snapshot tests... */
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<MenuListBackground />)
        .find(MenuListBackground)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<MenuListBackground className={className} />)
        .find(MenuListBackground)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<MenuListBackground id={id} />)
        .find(MenuListBackground)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<MenuListBackground style={style} />)
        .find(MenuListBackground)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    /* ...additional attribute tests... */
  });
});
