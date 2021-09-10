import React from 'react';
import { SSRProvider } from '@react-aria/ssr';

import { mountAndWait } from '../../../test/utils';
import Icon from '../Icon';
import GlobalSearchInput, { GLOBAL_SEARCH_INPUT_CONSTANTS as CONSTANTS } from './';
import { act } from 'react-dom/test-utils';

describe('<GlobalSearchInput />', () => {
  describe('snapshot', () => {
    const mountComponent = async (component) => {
      const container = await mountAndWait(<SSRProvider>{component}</SSRProvider>);
      return container;
    };

    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountComponent(<GlobalSearchInput aria-label="global search" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountComponent(
        <GlobalSearchInput aria-label="global search" className={className} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountComponent(
        <GlobalSearchInput aria-label="global search" id={id} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountComponent(
        <GlobalSearchInput aria-label="global search" style={style} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when searching', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <GlobalSearchInput aria-label="global search" searching={true} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when numHighlighted is set', async () => {
      expect.assertions(1);

      const container = await mountComponent(
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
    it('left press should not change cursor position beyond masked area', async () => {
      expect.assertions(2);

      const inputElement = (
        await mountAndWait(
          <GlobalSearchInput aria-label="global search" value="abc" numHighlighted={2} id="thing" />
        )
      ).find('input');

      const preventDefault = jest.fn();

      const domNode = inputElement.getDOMNode() as HTMLInputElement;

      domNode.setSelectionRange(3, 3);

      await act(async () => {
        inputElement.simulate('keydown', { key: 'ArrowLeft', preventDefault });
      });

      expect(preventDefault).not.toHaveBeenCalled();

      domNode.setSelectionRange(2, 2);

      await act(async () => {
        inputElement.simulate('keydown', { key: 'ArrowLeft', preventDefault });
      });

      expect(preventDefault).toBeCalledTimes(1);
    });
  });

  it('pressing backspace should clear input if length less than highlighted text', async () => {
    expect.assertions(2);

    const onChange = jest.fn();

    const inputElement = (
      await mountAndWait(
        <GlobalSearchInput
          onChange={onChange}
          aria-label="global search"
          value="ab"
          numHighlighted={2}
          id="thing"
        />
      )
    ).find('input');

    const domNode = inputElement.getDOMNode() as HTMLInputElement;

    domNode.setSelectionRange(2, 2);

    await act(async () => {
      inputElement.simulate('keydown', { key: 'Backspace' });
    });

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('');
  });

  it('pressing backspace should not clear input if length not less than highlighted text', async () => {
    expect.assertions(1);

    const onChange = jest.fn();

    const inputElement = (
      await mountAndWait(
        <GlobalSearchInput
          onChange={onChange}
          aria-label="global search"
          value="abc"
          numHighlighted={2}
          id="thing"
        />
      )
    ).find('input');

    const domNode = inputElement.getDOMNode() as HTMLInputElement;

    domNode.setSelectionRange(2, 2);

    await act(async () => {
      inputElement.simulate('keydown', { key: 'Backspace' });
    });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('clicking on another part of the component gives focus to the input', async () => {
    expect.assertions(1);

    const wrapper = await mountAndWait(<GlobalSearchInput aria-label="global search" id="thing" />);

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
