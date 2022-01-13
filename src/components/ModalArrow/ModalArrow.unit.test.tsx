import React from 'react';
import { mount } from 'enzyme';

import ModalArrow, { MODAL_ARROW_CONSTANTS as CONSTANTS } from './';

describe('<ModalArrow />', () => {
  let placement;

  beforeEach(() => {
    placement = CONSTANTS.PLACEMENTS.BOTTOM;
  });

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ModalArrow placement={placement} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ModalArrow placement={placement} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ModalArrow placement={placement} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ModalArrow placement={placement} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const container = mount(<ModalArrow color={color} placement={placement} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its svg class', () => {
      expect.assertions(1);

      const element = mount(<ModalArrow placement={placement} />)
        .find(ModalArrow)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.svg)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ModalArrow className={className} placement={placement} />)
        .find(ModalArrow)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ModalArrow id={id} placement={placement} />)
        .find(ModalArrow)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ModalArrow style={style} placement={placement} />)
        .find(ModalArrow)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-placement on path when placement is provided', () => {
      expect.assertions(1);

      const placement = Object.values(CONSTANTS.PLACEMENTS).pop();

      const element = mount(<ModalArrow placement={placement} />)
        .find(ModalArrow)
        .getDOMNode();

      expect(element.getAttribute('data-placement')).toBe(placement);
    });

    it('should have provided data-color when color is provided', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const element = mount(<ModalArrow color={color} placement={placement} />)
        .find(ModalArrow)
        .getDOMNode()
        .getElementsByTagName('path')[1];

      expect(element.getAttribute('data-color')).toBe(color);
    });
  });
});
