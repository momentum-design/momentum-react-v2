import { mount } from 'enzyme';
import React from 'react';

import { TYPES, STYLE } from './Text.constants';
import { FontStyle } from './Text.types';

import Text from '.';

describe('Text', () => {
  let container;
  it('should match snapshot', () => {
    expect.assertions(1);

    container = mount(<Text>Hello</Text>);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with className', () => {
    expect.assertions(1);

    const className = 'example-class';

    container = mount(<Text className={className} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with id', () => {
    expect.assertions(1);

    const id = 'example-id';

    container = mount(<Text id={id} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with style', () => {
    expect.assertions(1);

    const style = { color: 'red' };

    container = mount(<Text style={style} />);

    expect(container).toMatchSnapshot();
  });

  it(`should match snapshot with type`, async () => {
    expect.assertions(1);

    const texts = Object.values(TYPES).map((type, index) => {
      return (
        <Text key={index} type={type as FontStyle}>
          Example Text
        </Text>
      );
    });
    container = await mount(<div>{texts}</div>);

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

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<Text id={id} />)
        .find(Text)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<Text style={style} />)
        .find(Text)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
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
