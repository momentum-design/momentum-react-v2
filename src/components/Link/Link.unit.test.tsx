import React from 'react';
import { mount } from 'enzyme';
import { DEFAULTS, STYLE } from './Link.constants';
import { LinkNext } from '@momentum-ui/react-collaboration';
jest.unmock('@react-aria/utils');
describe('Link', () => {
  describe('snapshot', () => {
    let container;

    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<LinkNext>LinkNext</LinkNext>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      container = mount(<LinkNext disabled={disabled}>LinkNext</LinkNext>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when inverted', () => {
      expect.assertions(1);

      const inverted = !DEFAULTS.INVERTED;

      container = mount(<LinkNext inverted={inverted}>Hyperlink</LinkNext>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const container = mount(<LinkNext title={title} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<LinkNext />)
        .find(LinkNext)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have custom class if provided', () => {
      const testClass = 'testClass';

      const wrapper = mount(<LinkNext className={testClass} />);
      const element = wrapper.find(LinkNext).getDOMNode();

      expect(element.classList.contains(testClass)).toBe(true);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const element = mount(<LinkNext disabled={disabled} />)
        .find(LinkNext)
        .getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
    });

    it('should pass inverted prop', () => {
      expect.assertions(1);

      const inverted = !DEFAULTS.INVERTED;

      const element = mount(<LinkNext inverted={inverted} />)
        .find(LinkNext)
        .getDOMNode();

      expect(element.getAttribute('data-inverted')).toBe(`${inverted}`);
    });

    it('should pass child prop', () => {
      expect.assertions(1);

      const child = '1';

      const element = mount(<LinkNext>{child}</LinkNext>)
        .find(LinkNext)
        .getDOMNode();

      expect(element.innerHTML).toBe(child);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const element = mount(<LinkNext title={title} />)
        .find(LinkNext)
        .getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);
      const mockCallback = jest.fn();
      const component = mount(<LinkNext onPress={mockCallback} />).find(LinkNext);
      component.props().onPress({
        type: 'press',
        pointerType: 'mouse',
        altKey: false,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
        continuePropagation: expect.any(Function),
      });

      expect(mockCallback).toBeCalledTimes(1);
    });
  });
});