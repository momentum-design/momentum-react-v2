import React from 'react';
import { mount } from 'enzyme';
import Badge from '.';

import { SIZES, STYLE } from './Badge.constants';

describe('Badge', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);
      container = mount(<Badge>10</Badge>);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size 12', () => {
      expect.assertions(1);
      const size = 12;
      container = mount(<Badge data-size={size} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with size 18', () => {
      expect.assertions(1);
      const size = 18;
      container = mount(<Badge data-size={size}>10</Badge>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<Badge />)
        .find(Badge)
        .getDOMNode();
      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should pass size prop', () => {
      expect.assertions(1);

      const size = SIZES[Object.keys(SIZES)[Object.keys(SIZES).length - 1]];
      const element = mount(<Badge size={size} />)
        .find(Badge)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${size}`);
    });
  });
});
