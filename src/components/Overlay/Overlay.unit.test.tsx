import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';

import Overlay, { OVERLAY_CONSTANTS as CONSTANTS } from './';

describe('<Overlay />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Overlay />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<Overlay className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<Overlay id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Overlay style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const container = mount(<Overlay color={color} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with fullscreen', () => {
      expect.assertions(1);

      const container = mount(<Overlay fullscreen />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<Overlay />)
        .find(Overlay)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<Overlay className={className} />)
        .find(Overlay)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<Overlay id={id} />)
        .find(Overlay)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<Overlay style={style} />)
        .find(Overlay)
        .getDOMNode();

      expect(element.getAttribute('style').includes(styleString)).toBe(true);
    });

    it('should have provided data-color when color is provided', () => {
      expect.assertions(1);

      const color = Object.values(CONSTANTS.COLORS).pop();

      const element = mount(<Overlay color={color} />)
        .find(Overlay)
        .getDOMNode();

      expect(element.getAttribute('data-color')).toBe(color);
    });

    it('should have provided data-fullscreen when fullscreen is provided', () => {
      expect.assertions(1);

      const fullscreen = true;

      const element = mount(<Overlay fullscreen={fullscreen} />)
        .find(Overlay)
        .getDOMNode();

      expect(element.getAttribute('data-fullscreen')).toBe(`${fullscreen}`);
    });
  });
});
