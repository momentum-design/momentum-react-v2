import React from 'react';
import { mount } from 'enzyme';

import AlertBadge, { ALERT_BADGE_CONSTANTS as CONSTANTS } from './';

import ButtonSimple from '../ButtonSimple';

const { COLORS } = CONSTANTS;

describe('<AlertBadge />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<AlertBadge />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<AlertBadge className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<AlertBadge id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<AlertBadge style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      const container = mount(<AlertBadge color={color}>Example Text</AlertBadge>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with image', () => {
      expect.assertions(1);

      const image = <div>A</div>;

      const container = mount(<AlertBadge image={image} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with label', () => {
      expect.assertions(1);

      const label = <div>Example Text</div>;

      const container = mount(<AlertBadge label={label} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with image and label', () => {
      expect.assertions(1);

      const image = <div>A</div>;
      const label = <div>Example Label</div>;

      const container = mount(<AlertBadge image={image} label={label} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children, image and label', () => {
      expect.assertions(1);

      const children = <div>Example Children</div>;
      const image = <div>A</div>;
      const label = <div>Example Label</div>;

      const container = mount(
        <AlertBadge image={image} label={label}>
          {children}
        </AlertBadge>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const container = mount(<AlertBadge title={title} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<AlertBadge />)
        .find(AlertBadge)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<AlertBadge className={className} />)
        .find(AlertBadge)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<AlertBadge id={id} />)
        .find(AlertBadge)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<AlertBadge style={style} />)
        .find(AlertBadge)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided color when color is provided', () => {
      expect.assertions(1);

      const color = 'success';

      const element = mount(<AlertBadge color={color} />)
        .find(AlertBadge)
        .getDOMNode();

      expect(element.getAttribute('data-color')).toBe(color);
    });

    it('should have provided title when title is provided', () => {
      expect.assertions(1);

      const title = 'Example Text';

      const element = mount(<AlertBadge title={title} />)
        .find(AlertBadge)
        .getDOMNode();

      expect(element.getAttribute('title')).toBe(title);
    });

    it('should render ButtonSimple', () => {
      expect.assertions(1);

      const container = mount(<AlertBadge />);

      expect(container.find(ButtonSimple).exists()).toBe(true);
    });
  });

  describe('actions', () => {
    it('should handle mouse press events', () => {
      expect.assertions(1);

      const mockCallback = jest.fn();

      const component = mount(<AlertBadge onPress={mockCallback} />).find(AlertBadge);

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
