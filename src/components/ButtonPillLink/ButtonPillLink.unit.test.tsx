import React from 'react';
import { mount } from 'enzyme';

import ButtonPillLink, { BUTTON_PILL_LINK_CONSTANTS as CONSTANTS } from './';
import { COLORS, DEFAULTS, SIZES } from '../ButtonPill/ButtonPill.constants';
import { triggerPress } from '../../../test/utils';

const href = 'https://www.webex.com';

describe('<ButtonPillLink />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ButtonPillLink href={href} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ButtonPillLink href={href} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ButtonPillLink href={href} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ButtonPillLink href={href} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      const container = mount(
        <ButtonPillLink href={href} color={color}>
          X
        </ButtonPillLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const container = mount(
        <ButtonPillLink href={href} size={size}>
          X
        </ButtonPillLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const container = mount(
        <ButtonPillLink href={href} disabled={disabled}>
          Example Text
        </ButtonPillLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when shallow disabled', () => {
      expect.assertions(1);

      const shallowDisabled = !DEFAULTS.SHALLOW_DISABLED;

      const container = mount(
        <ButtonPillLink href={href} shallowDisabled={shallowDisabled}>
          Example Text
        </ButtonPillLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      const container = mount(
        <ButtonPillLink href={href} ghost={ghost}>
          Example Text
        </ButtonPillLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost and disabled', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;
      const disabled = !DEFAULTS.DISABLED;

      const container = mount(
        <ButtonPillLink href={href} ghost={ghost} disabled={disabled}>
          Example Text
        </ButtonPillLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      const container = mount(
        <ButtonPillLink href={href} outline={outline}>
          Example Text
        </ButtonPillLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when width is grown', () => {
      expect.assertions(1);

      const grown = !DEFAULTS.GROWN;

      const container = mount(
        <ButtonPillLink href={href} grown={grown}>
          Example Text
        </ButtonPillLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined and inverted is set', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;
      const inverted = !DEFAULTS.INVERTED;

      const container = mount(
        <ButtonPillLink href={href} outline={outline} inverted={inverted}>
          Example Text
        </ButtonPillLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const container = mount(<ButtonPillLink href={href} title={title} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ButtonPillLink href={href} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ButtonPillLink href={href} className={className} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ButtonPillLink href={href} id={id} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ButtonPillLink href={href} style={style} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const element = mount(<ButtonPillLink href={href} disabled={disabled} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
    });

    it('should pass shallow disabled prop', () => {
      expect.assertions(2);

      const shallowDisabled = !DEFAULTS.SHALLOW_DISABLED;

      const element = mount(<ButtonPillLink href={href} shallowDisabled={shallowDisabled} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.getAttribute('data-shallow-disabled')).toBe(`${shallowDisabled}`);
      expect(element.getAttribute('aria-disabled')).toBe('true');
    });

    it('should pass ghost prop', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      const element = mount(<ButtonPillLink href={href} ghost={ghost} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.getAttribute('data-ghost')).toBe(`${ghost}`);
    });

    it('should pass outline prop', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      const element = mount(<ButtonPillLink href={href} outline={outline} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.getAttribute('data-outline')).toBe(`${outline}`);
    });

    it('should pass size prop', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const element = mount(<ButtonPillLink href={href} size={size} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const element = mount(<ButtonPillLink href={href} title={title} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });

    it('should pass inverted prop', () => {
      expect.assertions(1);

      const inverted = !DEFAULTS.INVERTED;

      const element = mount(<ButtonPillLink href={href} inverted={inverted} />)
        .find(ButtonPillLink)
        .getDOMNode();

      expect(element.getAttribute('data-inverted')).toBe(`${inverted}`);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(2);

      const mockCallback = jest.fn();

      const component = mount(<ButtonPillLink href={href} onPress={mockCallback} />).find(
        ButtonPillLink
      );

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

      triggerPress(component);

      expect(mockCallback).toBeCalledTimes(2);
    });

    it('should handle mouse press events if shallow disabled', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(
        <ButtonPillLink href={href} shallowDisabled onPress={mockCallback} />
      ).find(ButtonPillLink);

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
