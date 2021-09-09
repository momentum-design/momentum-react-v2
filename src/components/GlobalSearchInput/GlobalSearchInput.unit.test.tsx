import React from 'react';
import { mount } from 'enzyme';
import { SSRProvider } from '@react-aria/ssr';

import GlobalSearchInput, { GLOBAL_SEARCH_INPUT_CONSTANTS as CONSTANTS } from './';

describe('<GlobalSearchInput />', () => {
  describe('snapshot', () => {
    const mountComponent = (component) => {
      const container = mount(<SSRProvider>{component}</SSRProvider>);
      return container;
    };

    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mountComponent(<GlobalSearchInput aria-label="global search" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mountComponent(
        <GlobalSearchInput aria-label="global search" className={className} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mountComponent(<GlobalSearchInput aria-label="global search" id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mountComponent(
        <GlobalSearchInput aria-label="global search" style={style} />
      );

      expect(container).toMatchSnapshot();
    });

    /* ...additional snapshot tests... */
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<GlobalSearchInput aria-label="global search" />)
        .find(GlobalSearchInput)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<GlobalSearchInput aria-label="global search" className={className} />)
        .find(GlobalSearchInput)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<GlobalSearchInput aria-label="global search" id={id} />)
        .find(GlobalSearchInput)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<GlobalSearchInput aria-label="global search" style={style} />)
        .find(GlobalSearchInput)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    /* ...additional attribute tests... */
  });

  describe('actions', () => {
    /* ...action tests... */
  });
});
