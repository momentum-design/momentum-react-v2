import React from 'react';
import { mount } from 'enzyme';

import ButtonCircleToggle, { BUTTON_CIRCLE_TOGGLE_CONSTANTS as CONSTANTS } from './';
import { triggerPress } from '../../../test/utils';

describe('<ButtonCircleToggle />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ButtonCircleToggle />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isSelected being true', () => {
      expect.assertions(1);

      const isSelected = true;

      const container = mount(<ButtonCircleToggle isSelected={isSelected} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isSelected being false', () => {
      expect.assertions(1);

      const isSelected = false;

      const container = mount(<ButtonCircleToggle isSelected={isSelected} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with ghost being true', () => {
      expect.assertions(1);

      const ghost = true;

      const container = mount(<ButtonCircleToggle ghost={ghost} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with ghost being false', () => {
      expect.assertions(1);

      const ghost = false;

      const container = mount(<ButtonCircleToggle ghost={ghost} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outline being true', () => {
      expect.assertions(1);

      const outline = true;

      const container = mount(<ButtonCircleToggle outline={outline} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outline being false', () => {
      expect.assertions(1);

      const outline = false;

      const container = mount(<ButtonCircleToggle outline={outline} />);

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with ariaStateKey being 'aria-expanded' and isSelected being true", () => {
      expect.assertions(1);

      const ariaStateKey = 'aria-expanded';
      const isSelected = true;

      const container = mount(
        <ButtonCircleToggle ariaStateKey={ariaStateKey} isSelected={isSelected} />
      );

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with ariaStateKey being 'aria-expanded' and isSelected being false", () => {
      expect.assertions(1);

      const ariaStateKey = 'aria-expanded';
      const isSelected = false;

      const container = mount(
        <ButtonCircleToggle ariaStateKey={ariaStateKey} isSelected={isSelected} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ButtonCircleToggle />)
        .find(ButtonCircleToggle)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided outline when outline is provided', () => {
      expect.assertions(1);

      const outline = true;

      const element = mount(<ButtonCircleToggle outline={outline} />)
        .find(ButtonCircleToggle)
        .getDOMNode();

      expect(element.getAttribute('data-outline')).toBe(`${outline}`);
    });

    it('should have provided ghost when ghost is provided', () => {
      expect.assertions(1);

      const ghost = true;

      const element = mount(<ButtonCircleToggle ghost={ghost} />)
        .find(ButtonCircleToggle)
        .getDOMNode();

      expect(element.getAttribute('data-ghost')).toBe(`${ghost}`);
    });

    it('should have provided isSelected when isSelected is provided', () => {
      expect.assertions(1);

      const isSelected = true;

      const element = mount(<ButtonCircleToggle isSelected={isSelected} />)
        .find(ButtonCircleToggle)
        .getDOMNode();

      expect(element.getAttribute('data-selected')).toBe(`${isSelected}`);
    });

    it.each([[false], [true]])(
      'should use default ariaStateKey when ariaStateKey is not provided (isSelected=%s)',
      (isSelected) => {
        expect.assertions(2);

        const element = mount(<ButtonCircleToggle isSelected={isSelected} />)
          .find(ButtonCircleToggle)
          .getDOMNode();

        expect(element.getAttribute('aria-pressed')).toBe(`${isSelected}`);
        expect(element.getAttribute('aria-expanded')).toBe(null);
      }
    );

    it.each([[false], [true]])(
      'should use provided ariaStateKey when ariaStateKey is provided (isSelected=%s)',
      (isSelected) => {
        expect.assertions(2);

        const ariaStateKey = 'aria-expanded';

        const element = mount(
          <ButtonCircleToggle ariaStateKey={ariaStateKey} isSelected={isSelected} />
        )
          .find(ButtonCircleToggle)
          .getDOMNode();

        expect(element.getAttribute('aria-pressed')).toBe(null);
        expect(element.getAttribute('aria-expanded')).toBe(`${isSelected}`);
      }
    );
  });

  describe('actions', () => {
    it('onChange callback is called correctly when provided', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const initialIsSelected = false;

      const component = mount(<ButtonCircleToggle onChange={mockCallback} />).find(
        ButtonCircleToggle
      );

      component.props().onChange(initialIsSelected);

      expect(mockCallback).toBeCalledTimes(1);
    });

    it('should handle mouse press events', () => {
      expect.assertions(4);

      const mockCallback = jest.fn();

      const component = mount(<ButtonCircleToggle onChange={mockCallback} />).find(
        ButtonCircleToggle
      );

      triggerPress(component);

      expect(mockCallback).toHaveBeenCalledWith(true);

      triggerPress(component);

      expect(mockCallback).toHaveBeenCalledWith(false);

      triggerPress(component);

      expect(mockCallback).toHaveBeenCalledWith(true);

      triggerPress(component);

      expect(mockCallback).toHaveBeenCalledWith(false);
    });

    it('should handle mouse press event when disabled', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonCircleToggle onChange={mockCallback} disabled />).find(
        ButtonCircleToggle
      );

      triggerPress(component);

      expect(mockCallback).toBeCalledTimes(0);
    });
  });
});
