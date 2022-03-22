import { mount } from 'enzyme';
import React from 'react';

import AlertBanner, { ALERT_BANNER_CONSTANTS as CONSTANTS } from './';

const { COLORS, DEFAULTS, SIZES, STYLE } = CONSTANTS;

describe('<AlertBanner />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<AlertBanner />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<AlertBanner className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<AlertBanner id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<AlertBanner style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with buttons', () => {
      expect.assertions(1);

      const buttons = [<div key={0}>button 1</div>, <div key={1}>button 2</div>];

      const container = mount(<AlertBanner buttons={buttons} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isCentered', () => {
      expect.assertions(1);

      const isCentered = !DEFAULTS.IS_CENTERED;

      const container = mount(<AlertBanner isCentered={isCentered} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with children', () => {
      expect.assertions(1);

      const children = 'children';

      const container = mount(<AlertBanner>{children}</AlertBanner>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', () => {
      expect.assertions(1);

      const color = COLORS[Object.keys(COLORS)[Object.keys(COLORS).length - 1]];

      const container = mount(<AlertBanner color={color}>Example Text</AlertBanner>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isGrown', () => {
      expect.assertions(1);

      const isGrown = !DEFAULTS.IS_GROWN;

      const container = mount(<AlertBanner isGrown={isGrown} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isStatic', () => {
      expect.assertions(1);

      const isStatic = !DEFAULTS.IS_STATIC;

      const container = mount(<AlertBanner isStatic={isStatic} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with image', () => {
      expect.assertions(1);

      const image = <div>A</div>;

      const container = mount(<AlertBanner image={image} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with label', () => {
      expect.assertions(1);

      const label = 'Example Text';

      const container = mount(<AlertBanner label={label} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isPilled', () => {
      expect.assertions(1);

      const isPilled = !DEFAULTS.IS_PILLED;

      const container = mount(<AlertBanner isPilled={isPilled} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];

      const container = mount(<AlertBanner size={size}>Example Text</AlertBanner>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<AlertBanner />)
        .find(AlertBanner)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<AlertBanner className={className} />)
        .find(AlertBanner)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<AlertBanner id={id} />)
        .find(AlertBanner)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<AlertBanner style={style} />)
        .find(AlertBanner)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided centered when isCentered is provided', () => {
      expect.assertions(1);

      const isCentered = true;

      const element = mount(<AlertBanner isCentered={isCentered} />)
        .find(AlertBanner)
        .getDOMNode();

      expect(element.getAttribute('data-centered')).toBe(`${isCentered}`);
    });

    it('should have provided centered when isCentered is provided', () => {
      expect.assertions(1);

      const isStatic = true;

      const element = mount(<AlertBanner isStatic={isStatic} />)
        .find(AlertBanner)
        .getDOMNode();

      expect(element.getAttribute('data-static')).toBe(`${isStatic}`);
    });

    it('should have provided color when color is provided', () => {
      expect.assertions(1);

      const color = 'success';

      const element = mount(<AlertBanner color={color} />)
        .find(AlertBanner)
        .getDOMNode();

      expect(element.getAttribute('data-color')).toBe(color);
    });

    it('should have provided data-grow when isGrown is provided', () => {
      expect.assertions(1);

      const isGrown = true;

      const element = mount(<AlertBanner isGrown={isGrown} />)
        .find(AlertBanner)
        .getDOMNode();

      expect(element.getAttribute('data-grow')).toBe(`${isGrown}`);
    });

    it('should have provided data-pill when isPilled is provided', () => {
      expect.assertions(1);

      const isPilled = true;

      const element = mount(<AlertBanner isPilled={isPilled} />)
        .find(AlertBanner)
        .getDOMNode();

      expect(element.getAttribute('data-pill')).toBe(`${isPilled}`);
    });

    it('should have provided size when size is provided', () => {
      expect.assertions(1);

      const size = 'small';

      const element = mount(<AlertBanner size={size} />)
        .find(AlertBanner)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(size);
    });
  });
});
