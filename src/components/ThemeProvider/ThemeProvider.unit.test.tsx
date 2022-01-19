import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from '@momentum-ui/react-collaboration';

import { STYLE, THEME_CLASS_PREFIX, THEME_NAMES } from './ThemeProvider.constants';

describe('<ThemeProvider />', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const themeName = THEME_NAMES[Object.keys(THEME_NAMES)[0]];

      container = mount(<ThemeProvider theme={themeName} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<ThemeProvider style={style} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const element = mount(<ThemeProvider />)
        .find(ThemeProvider)
        .getDOMNode();

      expect(element.classList.contains(STYLE.wrapper)).toBe(true);
    });

    it('should have its globals class', () => {
      expect.assertions(1);

      const element = mount(<ThemeProvider />)
        .find(ThemeProvider)
        .getDOMNode();

      expect(element.classList.contains(STYLE.globals)).toBe(true);
    });

    it('should have an abstracted theme class', () => {
      expect.assertions(1);

      const themeName = THEME_NAMES[Object.keys(THEME_NAMES)[0]];

      const element = mount(<ThemeProvider theme={themeName} />)
        .find(ThemeProvider)
        .getDOMNode();

      expect(element.classList.contains(`${THEME_CLASS_PREFIX}-${themeName}`)).toBe(true);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<ThemeProvider style={style} />)
        .find(ThemeProvider)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should pass child props', () => {
      expect.assertions(1);

      const children = [<div key="0" />, <div key="1" />, <div key="2" />];

      const component = mount(<ThemeProvider>{children}</ThemeProvider>)
        .find(ThemeProvider)
        .getDOMNode();

      expect(component.childNodes.length).toBe(children.length);
    });
  });
});
