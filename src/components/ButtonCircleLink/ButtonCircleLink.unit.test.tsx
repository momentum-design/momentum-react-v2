import React from 'react';
import { mount } from 'enzyme';

import ButtonCircleLink, { BUTTON_CIRCLE_LINK_CONSTANTS as CONSTANTS } from './';
import { COLORS, DEFAULTS, SIZES } from '../ButtonCircle/ButtonCircle.constants';
import { triggerPress } from '../../../test/utils';

const href = 'https://www.webex.com';

describe('<ButtonCircleLink />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ButtonCircleLink href={href} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ButtonCircleLink href={href} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ButtonCircleLink href={href} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ButtonCircleLink href={href} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      const container = mount(
        <ButtonCircleLink href={href} color={color}>
          X
        </ButtonCircleLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const container = mount(
        <ButtonCircleLink href={href} size={size}>
          X
        </ButtonCircleLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const container = mount(
        <ButtonCircleLink href={href} disabled={disabled}>
          X
        </ButtonCircleLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      const container = mount(
        <ButtonCircleLink href={href} ghost={ghost}>
          X
        </ButtonCircleLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost and disabled', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;
      const disabled = !DEFAULTS.DISABLED;

      const container = mount(
        <ButtonCircleLink href={href} ghost={ghost} disabled={disabled}>
          X
        </ButtonCircleLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      const container = mount(
        <ButtonCircleLink href={href} outline={outline}>
          X
        </ButtonCircleLink>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const container = mount(<ButtonCircleLink href={href} title={title} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined and inverted is set', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;
      const inverted = !DEFAULTS.INVERTED;

      const container = mount(
        <ButtonCircleLink href={href} outline={outline} inverted={inverted} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ButtonCircleLink href={href} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ButtonCircleLink href={href} className={className} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ButtonCircleLink href={href} id={id} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ButtonCircleLink href={href} style={style} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const element = mount(<ButtonCircleLink href={href} disabled={disabled} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
    });

    it('should pass shallow disabled prop', () => {
      expect.assertions(2);

      const shallowDisabled = !DEFAULTS.SHALLOW_DISABLED;

      const element = mount(<ButtonCircleLink href={href} shallowDisabled={shallowDisabled} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.getAttribute('data-shallow-disabled')).toBe(`${shallowDisabled}`);
      expect(element.getAttribute('aria-disabled')).toBe('true');
    });

    it('should pass ghost prop', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      const element = mount(<ButtonCircleLink href={href} ghost={ghost} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.getAttribute('data-ghost')).toBe(`${ghost}`);
    });

    it('should pass outline prop', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      const element = mount(<ButtonCircleLink href={href} outline={outline} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.getAttribute('data-outline')).toBe(`${outline}`);
    });

    it('should pass size prop', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const element = mount(<ButtonCircleLink href={href} size={size} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const element = mount(<ButtonCircleLink href={href} title={title} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });

    it('should pass inverted prop', () => {
      expect.assertions(1);

      const inverted = !DEFAULTS.INVERTED;

      const element = mount(<ButtonCircleLink href={href} inverted={inverted} />)
        .find(ButtonCircleLink)
        .getDOMNode();

      expect(element.getAttribute('data-inverted')).toBe(`${inverted}`);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(2);

      const mockCallback = jest.fn();

      const component = mount(<ButtonCircleLink href={href} onPress={mockCallback} />).find(
        ButtonCircleLink
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
        <ButtonCircleLink href={href} shallowDisabled onPress={mockCallback} />
      ).find(ButtonCircleLink);

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
