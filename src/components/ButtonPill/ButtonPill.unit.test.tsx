import React from 'react';
import { mount } from 'enzyme';

import ButtonPill, { BUTTON_PILL_CONSTANTS as CONSTANTS } from './';
import ButtonSimple from '../ButtonSimple';

const { COLORS, DEFAULTS, SIZES, STYLE } = CONSTANTS;

describe('<ButtonPill />', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ButtonPill>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      container = mount(<ButtonPill className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      container = mount(<ButtonPill id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = mount(<ButtonPill style={style} />);

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

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      container = mount(<ButtonPill size={size}>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      container = mount(<ButtonPill disabled={disabled}>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when shallow disabled', () => {
      expect.assertions(1);

      const shallowDisabled = !DEFAULTS.SHALLOW_DISABLED;

      container = mount(<ButtonPill shallowDisabled={shallowDisabled}>Example Text</ButtonPill>);

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

      container = mount(
        <ButtonPill ghost={ghost} disabled={disabled}>
          Example Text
        </ButtonPill>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      container = mount(<ButtonPill outline={outline}>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when width is grown', () => {
      expect.assertions(1);

      const grown = !DEFAULTS.GROWN;

      container = mount(<ButtonPill grown={grown}>Example Text</ButtonPill>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined and inverted is set', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;
      const inverted = !DEFAULTS.INVERTED;

      container = mount(
        <ButtonPill outline={outline} inverted={inverted}>
          Example Text
        </ButtonPill>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const container = mount(<ButtonPill title={title} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ButtonPill />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ButtonPill className={className} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ButtonPill id={id} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ButtonPill style={style} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const element = mount(<ButtonPill disabled={disabled} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
    });

    it('should pass shallow disabled prop', () => {
      expect.assertions(2);

      const shallowDisabled = !DEFAULTS.SHALLOW_DISABLED;

      const element = mount(<ButtonPill shallowDisabled={shallowDisabled} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.getAttribute('data-shallow-disabled')).toBe(`${shallowDisabled}`);
      expect(element.getAttribute('aria-disabled')).toBe('true');
    });

    it('should pass ghost prop', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      const element = mount(<ButtonPill ghost={ghost} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.getAttribute('data-ghost')).toBe(`${ghost}`);
    });

    it('should pass outline prop', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      const element = mount(<ButtonPill outline={outline} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.getAttribute('data-outline')).toBe(`${outline}`);
    });

    it('should pass grown prop', () => {
      expect.assertions(1);

      const grown = !DEFAULTS.GROWN;

      const element = mount(<ButtonPill grown={grown} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.getAttribute('data-grown')).toBe(`${grown}`);
    });

    it('should pass inverted prop', () => {
      expect.assertions(1);

      const inverted = !DEFAULTS.INVERTED;

      const element = mount(<ButtonPill inverted={inverted} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.getAttribute('data-inverted')).toBe(`${inverted}`);
    });

    it('should pass size prop', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const element = mount(<ButtonPill size={size} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should pass color prop', () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      const element = mount(<ButtonPill color={color} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.getAttribute('data-color')).toBe(`${color}`);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const element = mount(<ButtonPill title={title} />)
        .find(ButtonPill)
        .getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });

    it('should render ButtonSimple', () => {
      expect.assertions(1);

      container = mount(<ButtonPill>Example Text</ButtonPill>);

      expect(container.find(ButtonSimple).exists()).toBe(true);
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
        altKey: false,
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        target: component.getDOMNode(),
      });

      expect(mockCallback).toBeCalledTimes(1);
    });

    it('should handle mouse press events even if shallow disabled', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonPill shallowDisabled onPress={mockCallback} />).find(
        ButtonPill
      );

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
