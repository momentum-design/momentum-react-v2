import React from 'react';
import { mount } from 'enzyme';

import ButtonCircle, { BUTTON_CIRCLE_CONSTANTS as CONSTANTS } from './';

import ButtonSimple from '../ButtonSimple';

const { COLORS, DEFAULTS, SIZES, STYLE } = CONSTANTS;

describe('<ButtonCircle />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ButtonCircle />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with multiple children', () => {
      expect.assertions(1);

      const container = mount(
        <ButtonCircle>
          <div>X</div>
          <div>Y</div>
        </ButtonCircle>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ButtonCircle className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ButtonCircle id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ButtonCircle style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      const container = mount(<ButtonCircle color={color}>X</ButtonCircle>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const container = mount(<ButtonCircle size={size}>X</ButtonCircle>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const container = mount(<ButtonCircle disabled={disabled}>X</ButtonCircle>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      const container = mount(<ButtonCircle ghost={ghost}>X</ButtonCircle>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when a ghost and disabled', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;
      const disabled = !DEFAULTS.DISABLED;

      const container = mount(
        <ButtonCircle ghost={ghost} disabled={disabled}>
          X
        </ButtonCircle>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      const container = mount(<ButtonCircle outline={outline}>X</ButtonCircle>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const container = mount(<ButtonCircle title={title} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when color is outlined and solid is set', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;
      const solid = !DEFAULTS.SOLID;

      const container = mount(<ButtonCircle outline={outline} solid={solid} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ButtonCircle />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ButtonCircle className={className} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ButtonCircle id={id} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ButtonCircle style={style} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should pass disabled prop', () => {
      expect.assertions(1);

      const disabled = !DEFAULTS.DISABLED;

      const element = mount(<ButtonCircle disabled={disabled} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.getAttribute('data-disabled')).toBe(`${disabled}`);
    });

    it('should pass ghost prop', () => {
      expect.assertions(1);

      const ghost = !DEFAULTS.GHOST;

      const element = mount(<ButtonCircle ghost={ghost} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.getAttribute('data-ghost')).toBe(`${ghost}`);
    });

    it('should pass outline prop', () => {
      expect.assertions(1);

      const outline = !DEFAULTS.OUTLINE;

      const element = mount(<ButtonCircle outline={outline} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.getAttribute('data-outline')).toBe(`${outline}`);
    });

    it('should pass size prop', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const element = mount(<ButtonCircle size={size} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });

    it('should pass color prop', () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      const element = mount(<ButtonCircle color={color} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.getAttribute('data-color')).toBe(`${color}`);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const element = mount(<ButtonCircle title={title} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });

    it('should pass solid prop', () => {
      expect.assertions(1);

      const solid = !DEFAULTS.SOLID;

      const element = mount(<ButtonCircle solid={solid} />)
        .find(ButtonCircle)
        .getDOMNode();

      expect(element.getAttribute('data-solid')).toBe(`${solid}`);
    });

    it('should render ButtonSimple', () => {
      expect.assertions(1);

      const container = mount(<ButtonCircle />);

      expect(container.find(ButtonSimple).exists()).toBe(true);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<ButtonCircle onPress={mockCallback} />).find(ButtonCircle);

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
