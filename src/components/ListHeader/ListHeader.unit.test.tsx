import React from 'react';
import { mount } from 'enzyme';

import ListHeader, { LIST_HEADER_CONSTANTS as CONSTANTS } from './';
import { OUTLINE_COLOR, OUTLINE_POSITION } from './ListHeader.constants';

describe('<ListHeader />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<ListHeader />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<ListHeader className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<ListHeader id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ListHeader style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outline', () => {
      expect.assertions(1);

      const outline = true;

      const container = mount(<ListHeader outline={outline} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outlinePosition', () => {
      expect.assertions(1);

      const outlinePosition = OUTLINE_POSITION.BOTTOM;

      const container = mount(<ListHeader outline outlinePosition={outlinePosition} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outlinePosition', () => {
      expect.assertions(1);

      const outlinePosition = OUTLINE_POSITION.BOTTOM;

      const container = mount(<ListHeader outline outlinePosition={outlinePosition} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with outlineColor', () => {
      expect.assertions(1);

      const outlineColor = OUTLINE_COLOR.SECONDARY;

      const container = mount(<ListHeader outline outlineColor={outlineColor} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with bold', () => {
      expect.assertions(1);

      const bold = true;

      const container = mount(<ListHeader outline bold={bold} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<ListHeader />)
        .find(ListHeader)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<ListHeader className={className} />)
        .find(ListHeader)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<ListHeader id={id} />)
        .find(ListHeader)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ListHeader style={style} />)
        .find(ListHeader)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-outline when outline is provided', () => {
      expect.assertions(1);

      const outline = true;

      const element = mount(<ListHeader outline={outline} />)
        .find(ListHeader)
        .getDOMNode();

      expect(element.getAttribute('data-outline')).toBe(`${outline}`);
    });

    it('should have provided data-outline-position when outlinePosition is provided', () => {
      expect.assertions(1);

      const outlinePosition = OUTLINE_POSITION.TOP;

      const element = mount(<ListHeader outlinePosition={outlinePosition} />)
        .find(ListHeader)
        .getDOMNode();

      expect(element.getAttribute('data-outline-position')).toBe(`${outlinePosition}`);
    });

    it('should have provided data-outline-color when outlineColor is provided', () => {
      expect.assertions(1);

      const outlineColor = OUTLINE_COLOR.SECONDARY;

      const element = mount(<ListHeader outlineColor={outlineColor} />)
        .find(ListHeader)
        .getDOMNode();

      expect(element.getAttribute('data-outline-color')).toBe(`${outlineColor}`);
    });

    it('should have provided data-bold when bold is provided', () => {
      expect.assertions(1);

      const bold = true;

      const element = mount(<ListHeader bold={bold} />)
        .find(ListHeader)
        .getDOMNode();

      expect(element.getAttribute('data-bold')).toBe(`${bold}`);
    });
  });
});
