import React from 'react';
import { mount } from 'enzyme';
import { simulateMouseEnter, simulateMouseLeave } from '../../../test/utils';

import ButtonSimple from './';

describe('<ButtonSimple />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ButtonSimple />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const children = 'example';

      const container = mount(<ButtonSimple>{children}</ButtonSimple>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ButtonSimple className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ButtonSimple id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ButtonSimple style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const container = mount(<ButtonSimple title={title} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with role', () => {
      expect.assertions(1);

      const role = 'tab';

      const container = mount(<ButtonSimple role={role} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with tabIndex', () => {
      expect.assertions(1);

      const tabIndex = -1;

      const container = mount(<ButtonSimple tabIndex={tabIndex} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with aria-disabled', () => {
      expect.assertions(1);

      const container = mount(<ButtonSimple aria-disabled={true} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ButtonSimple className={className} />)
        .find(ButtonSimple)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ButtonSimple id={id} />)
        .find(ButtonSimple)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ButtonSimple style={style} />)
        .find(ButtonSimple)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const element = mount(<ButtonSimple title={title} />)
        .find(ButtonSimple)
        .getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });

    it('should have the role when provided', () => {
      expect.assertions(1);

      const role = 'tab';

      const element = mount(<ButtonSimple role={role} />)
        .find(ButtonSimple)
        .getDOMNode();

      expect(element.getAttribute('role')).toBe(role);
    });

    it('should have the tabIndex when provided', () => {
      expect.assertions(1);

      const tabIndex = -1;

      const element = mount(<ButtonSimple tabIndex={tabIndex} />)
        .find(ButtonSimple)
        .getDOMNode();

      expect(element.getAttribute('tabIndex')).toBe(`${tabIndex}`);
    });

    it('should have aria-disabled when provided', () => {
      expect.assertions(1);

      const element = mount(<ButtonSimple aria-disabled={true} />)
        .find(ButtonSimple)
        .getDOMNode();

      expect(element.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('actions', () => {
    // TODO: add proper unit tests for the button, preferably with React Testing Library
    // note: the onPress() call in line 129 doesn't ensure that it actually works on the screen
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonSimple onPress={mockCallback} />).find(ButtonSimple);

      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        altKey: false,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
      });

      expect(mockCallback).toBeCalledTimes(1);
    });

    it('should handle hover start events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonSimple onHoverStart={mockCallback} />).find(ButtonSimple);

      simulateMouseEnter(component);

      expect(mockCallback).toBeCalledTimes(1);
    });

    it('should handle hover end events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonSimple onHoverEnd={mockCallback} />).find(ButtonSimple);

      simulateMouseEnter(component);
      simulateMouseLeave(component);

      expect(mockCallback).toBeCalledTimes(1);
    });

    it('should handle hover change events', () => {
      expect.assertions(2);

      const mockCallkback = jest.fn();

      const component = mount(<ButtonSimple onHoverChange={mockCallkback} />).find(ButtonSimple);

      simulateMouseEnter(component);

      expect(mockCallkback).toBeCalledWith(true);

      simulateMouseLeave(component);

      expect(mockCallkback).toBeCalledWith(false);
    });
  });
});
