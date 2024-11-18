import React from 'react';
import { mount } from 'enzyme';
import ThemeProvider from './ThemeProvider';

import {
  DEFAULTS,
  STYLE,
  THEME_CLASS_PREFIX,
  THEME_CLASS_PREFIX_STABLE,
  THEMES,
} from './ThemeProvider.constants';

describe('<ThemeProvider />', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const themeName = THEMES[Object.keys(THEMES)[0]];

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
    it('web component should have typography class set', () => {
      expect.assertions(1);

      const element = mount(<ThemeProvider />)
        .find(ThemeProvider)
        .getDOMNode();

      expect(element.classList.contains(STYLE.typography)).toBe(true);
    });

    it('div in web component should have its wrapper and globals class', () => {
      expect.assertions(2);

      const divInElement = mount(<ThemeProvider />)
        .find(ThemeProvider)
        .find('div')
        .getDOMNode();

      expect(divInElement.classList.contains(STYLE.wrapper)).toBe(true);
      expect(divInElement.classList.contains(STYLE.globals)).toBe(true);
    });

    it('web component should have an abstracted theme class', () => {
      expect.assertions(1);

      const themeName = THEMES[Object.keys(THEMES)[0]];

      const wrapper = mount(<ThemeProvider theme={themeName} />);
      const element = wrapper
        .find(ThemeProvider)
        .getDOMNode();

      expect(element.classList.contains(`${THEME_CLASS_PREFIX}-${themeName}`)).toBe(true);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const divInElement = mount(<ThemeProvider style={style} />)
        .find(ThemeProvider)
        .find('div')
        .getDOMNode();

      expect(divInElement.getAttribute('style')).toBe(styleString);
    });

    it('should pass child props', () => {
      expect.assertions(1);

      const children = [<div key="0" />, <div key="1" />, <div key="2" />];


      const divInElement = mount(<ThemeProvider>{children}</ThemeProvider>)
        .find(ThemeProvider)
        .find('div.md-theme-provider-wrapper')
        .getDOMNode();

      expect(divInElement.childNodes.length).toBe(children.length);
    });
  });
});
