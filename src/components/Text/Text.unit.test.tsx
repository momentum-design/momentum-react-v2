import React from 'react';
import { mount } from 'enzyme';
import Text from '.';

import { TYPES, STYLE } from './Text.constants';

describe('Text', () => {
  let container;
  it('should match snapshot', () => {
    expect.assertions(1);

    container = mount(<Text>Hello</Text>);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with type', () => {
    expect.assertions(1);

    const type = TYPES[Object.keys(TYPES)[Object.keys(TYPES).length - 1]];

    container = mount(<Text type={type}>Example Text</Text>);

    expect(container).toMatchSnapshot();
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<Text />)
        .find(Text)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should pass type prop', () => {
      expect.assertions(1);

      const type = TYPES[Object.keys(TYPES)[Object.keys(TYPES).length - 1]];

      const element = mount(<Text type={type} />)
        .find(Text)
        .getDOMNode();

      expect(element.getAttribute('data-type')).toBe(`${type}`);
    });
  });
});
