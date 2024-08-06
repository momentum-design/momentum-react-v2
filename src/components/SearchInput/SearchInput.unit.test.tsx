import React from 'react';
import { SSRProvider } from '@react-aria/ssr';

import { mountAndWait } from '../../../test/utils';
import Icon from '../Icon';
import SearchInput, { SEARCH_INPUT_CONSTANTS as CONSTANTS } from '.';
import { act } from 'react-dom/test-utils';
import ButtonSimple from '../ButtonSimple';

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

      const container = await mountComponent(
        <SearchInput aria-label="search" clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountComponent(
        <SearchInput aria-label="search" className={className} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountComponent(
        <SearchInput aria-label="search" id={id} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with a label', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput label="search" aria-label="search" clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountComponent(
        <SearchInput aria-label="search" style={style} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when searching', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput aria-label="search" searching={true} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with height', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput aria-label="search" height={28} clearButtonAriaLabel="Clear" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when filters are set', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <SearchInput
          aria-label="search"
          value="From: someone"
          clearButtonAriaLabel="Clear"
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

      const element = (
        await mountAndWait(<SearchInput aria-label="search" clearButtonAriaLabel="Clear" />)
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (
        await mountAndWait(
          <SearchInput aria-label="search" className={className} clearButtonAriaLabel="Clear" />
        )
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id-2';

      const element = (
        await mountAndWait(<SearchInput aria-label="search" id={id} clearButtonAriaLabel="Clear" />)
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = (
        await mountAndWait(
          <SearchInput aria-label="search" style={style} clearButtonAriaLabel="Clear" />
        )
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided height when height is provided', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(
          <SearchInput aria-label="search" height={28} clearButtonAriaLabel="Clear" />
        )
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.getAttribute('data-height')).toBe('28');
    });

    it('should have default height when height is not provided', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(<SearchInput aria-label="search" clearButtonAriaLabel="Clear" />)
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.getAttribute('data-height')).toBe('32');
    });

    it('should pass the aria label to the input', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(
          <SearchInput aria-label="search" searching={true} clearButtonAriaLabel="Clear" />
        )
      )
        .find('input')
        .getDOMNode();

      expect(element.getAttribute('aria-label')).toBe('search');
    });
    it('should have the aria controls attribute when provided', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(
          <SearchInput ariaControls="list-element" searching={true} clearButtonAriaLabel="Clear" />
        )
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.getAttribute('aria-controls')).toBe('list-element');
    });
    it('should have the aria expanded attribute when provided', async () => {
      expect.assertions(1);

      const element = (
        await mountAndWait(
          <SearchInput ariaExpanded={false} searching={true} clearButtonAriaLabel="Clear" />
        )
      )
        .find(SearchInput)
        .getDOMNode();

      expect(element.getAttribute('aria-expanded')).toBe(false);
    });

    it('should pass label to the label', async () => {
      expect.assertions(2);

      const wrapper = await mountAndWait(
        <SearchInput aria-label="search" label="a label" clearButtonAriaLabel="Clear" />
      );
      const label = wrapper.find('label');
      const realInputId = wrapper.find('input').getDOMNode().getAttribute('id');

      expect((label.getDOMNode() as HTMLLabelElement).htmlFor).toBe(realInputId);
      expect(label.text()).toBe('a label');
    });

    it('should forward a ref if provided', async () => {
      const ref = React.createRef<HTMLInputElement>();

      await mountAndWait(
        <SearchInput ref={ref} aria-label="search" value="test" clearButtonAriaLabel="Clear" />
      );

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current.value).toEqual('test');
    });

    it('should work with autofocus', async () => {
      // eslint-disable-next-line jsx-a11y/no-autofocus
      await mountAndWait(
        <SearchInput autoFocus aria-label="search" value="test" clearButtonAriaLabel="Clear" />
      );
    });

    it('should not render ButtonSimple if there is no value', async () => {
      const container = await mountAndWait(
        <SearchInput
          aria-label="search"
          value=""
          isDisabled={false}
          clearButtonAriaLabel="clear search"
        />
      );

      expect(container.find(ButtonSimple).exists()).toBe(false);
    });

    it('should not render ButtonSimple if isDisabled is false', async () => {
      const container = await mountAndWait(
        <SearchInput
          aria-label="search"
          value="test"
          isDisabled={true}
          clearButtonAriaLabel="clear search"
        />
      );

      expect(container.find(ButtonSimple).exists()).toBe(false);
    });

    it('should render ButtonSimple if there is a value and isDisabled is false', async () => {
      const container = await mountAndWait(
        <SearchInput
          aria-label="search"
          value="test"
          isDisabled={false}
          clearButtonAriaLabel="clear search"
        />
      );

      expect(container.find(ButtonSimple).exists()).toBe(true);

      expect(container.find(ButtonSimple).props()).toMatchObject({
        className: 'md-search-input-clear',
        'aria-label': 'clear search',
        excludeFromTabOrder: false,
        preventFocusOnPress: true,
        onPress: expect.any(Function),
        onPressStart: expect.any(Function),
        useNativeKeyDown: true,
      });
    });
  });

  describe('actions', () => {
    it('clicking on another part of the component gives focus to the input', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(
        <SearchInput aria-label="search" clearButtonAriaLabel="Clear" />
      );

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
