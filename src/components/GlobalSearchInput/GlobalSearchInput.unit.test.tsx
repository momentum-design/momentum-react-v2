import React from 'react';
import { mount } from 'enzyme';
import { SSRProvider } from '@react-aria/ssr';

import { mountAndWait } from '../../../test/utils';
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

    it('should match snapshot when searching', () => {
      expect.assertions(1);

      const container = mountComponent(
        <GlobalSearchInput aria-label="global search" searching={true} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when numHighlighted is set', () => {
      expect.assertions(1);

      const container = mountComponent(
        <GlobalSearchInput aria-label="global search" value="From: someone" numHighlighted={5} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<GlobalSearchInput aria-label="global search" />))
        .find(GlobalSearchInput)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (
        await mountAndWait(<GlobalSearchInput aria-label="global search" className={className} />)
      )
        .find(GlobalSearchInput)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = (await mountAndWait(<GlobalSearchInput aria-label="global search" id={id} />))
        .find(GlobalSearchInput)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = (
        await mountAndWait(<GlobalSearchInput aria-label="global search" style={style} />)
      )
        .find(GlobalSearchInput)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should pass the aria label to the input', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(<GlobalSearchInput aria-label="global search" searching={true} />)
      )
        .find('input')
        .getDOMNode();

      expect(element.getAttribute('aria-label')).toBe('global search');
    });
  });

  describe('actions', () => {
    /* ...action tests... */
  });
});
