import React from 'react';
import { mount } from 'enzyme';
import { ButtonHyperlink } from '@momentum-ui/react-collaboration';

import { DEFAULTS, STYLE } from './ButtonHyperlink.constants';

describe('ButtonHyperlink', () => {
  describe('snapshot', () => {
    let container;

    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ButtonHyperlink>Hyperlink</ButtonHyperlink>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      container = mount(<ButtonHyperlink disabled={disabled}>Hyperlink</ButtonHyperlink>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when inverted', () => {
      expect.assertions(1);

      const inverted = !DEFAULTS.INVERTED;

      container = mount(<ButtonHyperlink inverted={inverted}>Hyperlink</ButtonHyperlink>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const container = mount(<ButtonHyperlink title={title} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<ButtonHyperlink />)
        .find(ButtonHyperlink)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have custom class if provided', () => {
      const testClass = 'testClass';

      const wrapper = mount(<ButtonHyperlink className={testClass} />);
      const element = wrapper.find(ButtonHyperlink).getDOMNode();

      expect(element.classList.contains(testClass)).toBe(true);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const element = mount(<ButtonHyperlink disabled={disabled} />)
        .find(ButtonHyperlink)
        .getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
    });

    it('should pass inverted prop', () => {
      expect.assertions(1);

      const inverted = !DEFAULTS.INVERTED;

      const element = mount(<ButtonHyperlink inverted={inverted} />)
        .find(ButtonHyperlink)
        .getDOMNode();

      expect(element.getAttribute('data-inverted')).toBe(`${inverted}`);
    });

    it('should pass child prop', () => {
      expect.assertions(1);

      const child = '1';

      const element = mount(<ButtonHyperlink>{child}</ButtonHyperlink>)
        .find(ButtonHyperlink)
        .getDOMNode();

      expect(element.innerHTML).toBe(child);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const element = mount(<ButtonHyperlink title={title} />)
        .find(ButtonHyperlink)
        .getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonHyperlink onPress={mockCallback} />).find(ButtonHyperlink);

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
  });
});
