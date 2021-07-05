import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from '@momentum-ui/react';

import { CLASSES, THEME_CLASS_PREFIX } from './ThemeProvider.constants';

describe('<ThemeProvider />', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      container = mount(<ThemeProvider theme="test" />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its main class', () => {
      expect.assertions(1);

      const component = mount(<ThemeProvider />).childAt(0);

      expect(component.hasClass(CLASSES.root)).toBe(true);
    });

    it('should have an abstracted theme class', () => {
      expect.assertions(1);

      const theme = 'test';

      const component = mount(<ThemeProvider theme={theme} />).childAt(0);

      expect(component.hasClass(`${THEME_CLASS_PREFIX}-${theme}`)).toBe(true);
    });

    it('should mount children to the component nodes', () => {
      expect.assertions(1);

      const children = [
        <div key="0" />,
        <div key="1" />,
        <div key="2" />,
      ];

      const component = mount(<ThemeProvider>{children}</ThemeProvider>).childAt(0);

      expect(component.children().length).toBe(children.length);
    });
  });
});
