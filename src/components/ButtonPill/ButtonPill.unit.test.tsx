import React from 'react';
import { mount } from 'enzyme';
import { ButtonPill } from '@momentum-ui/react';

import { COLORS, DEFAULTS, SIZES, STYLE } from './ButtonPill.constants';


describe('<ButtonPill />', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ButtonPill>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      container = mount(<ButtonPill color={color}>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = COLORS[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      container = mount(<ButtonPill size={size}>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      container = mount(<ButtonPill disabled={disabled}>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      container = mount(<ButtonPill ghost={ghost}>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost and disabled', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;
      const disabled = !DEFAULTS.DISABLED;

      container = mount(<ButtonPill ghost={ghost} disabled={disabled}>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      container = mount(<ButtonPill outline={outline}>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<ButtonPill />).find(ButtonPill).getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const element = mount(<ButtonPill disabled={disabled} />).find(ButtonPill).getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
    });

    it('should pass ghost prop', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      const element = mount(<ButtonPill ghost={ghost} />).find(ButtonPill).getDOMNode();

      expect(element.getAttribute('data-ghost')).toBe(`${ghost}`);
    });

    it('should pass outline prop', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      const element = mount(<ButtonPill outline={outline} />).find(ButtonPill).getDOMNode();

      expect(element.getAttribute('data-outline')).toBe(`${outline}`);
    });

    it('should pass size prop', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const element = mount(<ButtonPill size={size} />).find(ButtonPill).getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should pass color prop', () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      const element = mount(<ButtonPill color={color} />).find(ButtonPill).getDOMNode();

      expect(element.getAttribute('data-color')).toBe(`${color}`);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonPill onPress={mockCallback} />).find(ButtonPill);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});
