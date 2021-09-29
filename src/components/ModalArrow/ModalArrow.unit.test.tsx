import React from 'react';
import { mount } from 'enzyme';

import ModalArrow, { MODAL_ARROW_CONSTANTS as CONSTANTS } from './';

describe('<ModalArrow />', () => {
  let side;

  beforeEach(() => {
    side = CONSTANTS.SIDES.BOTTOM;
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ModalArrow side={side} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ModalArrow side={side} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ModalArrow side={side} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ModalArrow side={side} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const container = mount(<ModalArrow color={color} side={side} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ModalArrow side={side} />)
        .find(ModalArrow)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ModalArrow className={className} side={side} />)
        .find(ModalArrow)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ModalArrow id={id} side={side} />)
        .find(ModalArrow)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ModalArrow style={style} side={side} />)
        .find(ModalArrow)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-side on path when side is provided', () => {
      expect.assertions(1);

      const side = Object.values(CONSTANTS.SIDES).pop();

      const element = mount(<ModalArrow side={side} />)
        .find(ModalArrow)
        .getDOMNode();

      expect(element.getAttribute('data-side')).toBe(side);
    });

    it('should have provided data-color when color is provided', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const element = mount(<ModalArrow color={color} side={side} />)
        .find(ModalArrow)
        .getDOMNode()
        .getElementsByTagName('path')[1];

      expect(element.getAttribute('data-color')).toBe(color);
    });
  });
});
