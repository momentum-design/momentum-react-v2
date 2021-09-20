import React from 'react';
import { SSRProvider } from '@react-aria/ssr';

import { mountAndWait } from '../../../test/utils';
import Icon from '../Icon';
import SearchInput, { SEARCH_INPUT_CONSTANTS as CONSTANTS } from '.';
import { act } from 'react-dom/test-utils';

const testTranslations = {
  empty: 'empty',
  nonempty: 'nonempty',
  filterAdded: 'filteradded',
  filterRemoved: 'filterremoved',
  text: 'text',
};

describe('<SearchInput />', () => {
  describe('snapshot', () => {
    const mountComponent = async (component) => {
      const container = await mountAndWait(<SSRProvider>{component}</SSRProvider>);
      return container;
    };

    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountComponent(<SearchInput aria-label=" search" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountComponent(
        <SearchInput aria-label=" search" className={className} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountComponent(<SearchInput aria-label=" search" id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountComponent(<SearchInput aria-label=" search" style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when searching', async () => {
      expect.assertions(1);

      const container = await mountComponent(<SearchInput aria-label=" search" searching={true} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when filters are set', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput
          aria-label=" search"
          value="From: someone"
          filters={[
            {
              term: 'from',
              value: 'Joe',
              translations: testTranslations,
            },
            {
              term: 'in',
              value: 'a space',
              translations: testTranslations,
            },
          ]}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<SearchInput aria-label=" search" />))
        .find(SearchInput)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (
        await mountAndWait(<SearchInput aria-label=" search" className={className} />)
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id-2';

      const element = (await mountAndWait(<SearchInput aria-label=" search" id={id} />))
        .find(SearchInput)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = (await mountAndWait(<SearchInput aria-label=" search" style={style} />))
        .find(SearchInput)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should pass the aria label to the input', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<SearchInput aria-label=" search" searching={true} />))
        .find('input')
        .getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(' search');
    });

    it('should pass the aria label to the input', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<SearchInput aria-label=" search" searching={true} />))
        .find('input')
        .getDOMNode();

      expect(element.getAttribute('aria-label')).toBe(' search');
    });
  });

  describe('actions', () => {
    it('clicking on another part of the component gives focus to the input', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<SearchInput aria-label=" search" />);

      const inputElement = wrapper.find('input');
      const icon = wrapper.find(Icon);

      const domNode = inputElement.getDOMNode() as HTMLInputElement;
      const focusSpy = jest.spyOn(domNode, 'focus');

      domNode.setSelectionRange(2, 2);

      await act(async () => {
        icon.simulate('click');
      });

      expect(focusSpy).toBeCalledWith();
    });
  });
});
