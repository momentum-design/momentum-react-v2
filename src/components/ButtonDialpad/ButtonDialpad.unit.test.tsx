import React from 'react';
import { mount } from 'enzyme';
import { ButtonDialpad } from '@momentum-ui/react';

import { DEFAULTS, SIZES, STYLE } from './ButtonDialpad.constants';

import ButtonSimple from '../ButtonSimple';

describe('<ButtonPill />', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ButtonDialpad>1</ButtonDialpad>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with primaryText', () => {
      expect.assertions(1);

      container = mount(<ButtonDialpad primaryText="1" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with secondaryText', () => {
      expect.assertions(1);

      container = mount(<ButtonDialpad secondaryText="ABC" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with primaryText and secondaryText', () => {
      expect.assertions(1);

      container = mount(<ButtonDialpad primaryText="1" secondaryText="ABC" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with primaryText and children', () => {
      expect.assertions(1);

      container = mount(<ButtonDialpad primaryText="1">2</ButtonDialpad>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with primaryText, secondaryText and children', () => {
      expect.assertions(1);

      container = mount(
        <ButtonDialpad primaryText="1" secondaryText="ABC">
          2
        </ButtonDialpad>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      container = mount(<ButtonDialpad size={size}>Example Text</ButtonDialpad>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      container = mount(<ButtonDialpad disabled={disabled}>Example Text</ButtonDialpad>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const container = mount(<ButtonDialpad title={title} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<ButtonDialpad />)
        .find(ButtonDialpad)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const element = mount(<ButtonDialpad disabled={disabled} />)
        .find(ButtonDialpad)
        .getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
    });

    it('should have custom class if provided', () => {
      const testClass = 'testClass';

      const wrapper = mount(<ButtonDialpad className={testClass} />);
      const element = wrapper.find(ButtonDialpad).getDOMNode();

      expect(element.classList.contains(testClass)).toBe(true);
    });

    it('should pass size prop', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const element = mount(<ButtonDialpad size={size} />)
        .find(ButtonDialpad)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should pass child prop', () => {
      expect.assertions(1);

      const child = '1';

      const element = mount(<ButtonDialpad>{child}</ButtonDialpad>)
        .find(ButtonDialpad)
        .getDOMNode();
      const target = element.getElementsByClassName(STYLE.primaryText)[0];

      expect(target.innerHTML).toBe(child);
    });

    it('should pass primaryText prop', () => {
      expect.assertions(1);

      const primaryText = '1';

      const element = mount(<ButtonDialpad primaryText={primaryText} />)
        .find(ButtonDialpad)
        .getDOMNode();
      const target = element.getElementsByClassName(STYLE.primaryText)[0];

      expect(target.innerHTML).toBe(primaryText);
    });

    it('should pass secondaryText prop', () => {
      expect.assertions(1);

      const secondaryText = 'ABC';

      const element = mount(<ButtonDialpad secondaryText={secondaryText} />)
        .find(ButtonDialpad)
        .getDOMNode();
      const target = element.getElementsByClassName(STYLE.secondaryText)[0];

      expect(target.innerHTML).toBe(secondaryText);
    });

    it('should override primaryText prop with child prop', () => {
      expect.assertions(2);

      const primaryText = '1';
      const child = '2';

      const element = mount(<ButtonDialpad primaryText={primaryText}>{child}</ButtonDialpad>)
        .find(ButtonDialpad)
        .getDOMNode();
      const target = element.getElementsByClassName(STYLE.primaryText)[0];

      expect(target.innerHTML).toBe(child);
      expect(target.innerHTML).not.toBe(primaryText);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const element = mount(<ButtonDialpad title={title} />)
        .find(ButtonDialpad)
        .getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });

    it('should render ButtonSimple', () => {
      expect.assertions(1);

      const container = mount(<ButtonDialpad />);

      expect(container.find(ButtonSimple).exists()).toBe(true);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonDialpad onPress={mockCallback} />).find(ButtonDialpad);

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
