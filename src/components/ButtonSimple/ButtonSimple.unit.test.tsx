import React from 'react';
import { mount } from 'enzyme';

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

    /* ...additional snapshot tests... */
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

    /* ...additional attribute tests... */
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonSimple onPress={mockCallback} />).find(ButtonSimple);

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
