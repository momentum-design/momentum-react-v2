import React from 'react';
import { mount } from 'enzyme';
import Badge from '.';

import { DEFAULTS, SIZES, STYLE } from './Badge.constants';

describe('Badge', () => {
  describe('snapshot', () => {
    let container;

    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<Badge>20</Badge>);

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

    it('should pass child prop', () => {
      expect.assertions(1);

      const child = '20';

      const element = mount(<Badge>{child}</Badge>)
        .find(Badge)
        .childAt(0)
        .getDOMNode();

      expect(element.innerHTML).toBe(child);
    });
  });
});
