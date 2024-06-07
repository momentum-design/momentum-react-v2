import React from 'react';
import { SSRProvider } from '@react-aria/ssr';

import { mountAndWait } from '../../../test/utils';
import TextInput, { TEXT_INPUT_CONSTANTS as CONSTANTS } from './';
import { act } from 'react-dom/test-utils';
import { Message } from '../InputMessage/InputMessage.types';

describe('<TextInput/>', () => {
  describe('snapshot', () => {
    const mountComponent = async (component) => {
      const container = await mountAndWait(<SSRProvider>{component}</SSRProvider>);
      return container;
    };

    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountComponent(<TextInput aria-label="text-input" />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountComponent(
        <TextInput aria-label="text-input" className={className} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountComponent(<TextInput aria-label="text-input" id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountComponent(<TextInput aria-label="text-input" style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with error text', async () => {
      expect.assertions(1);

      const message: Message = { message: 'test', level: 'error' };

      const container = await mountComponent(
        <TextInput aria-label="text-input" messageArr={[message]} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with description', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <TextInput aria-label="text-input" description="some input" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with inputMaxLen', async () => {
      expect.assertions(1);

      const container = await mountComponent(<TextInput aria-label="text-input" inputMaxLen={4} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<TextInput aria-label="text-input" />))
        .find(TextInput)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (
        await mountAndWait(<TextInput aria-label="text-input" className={className} />)
      )
        .find(TextInput)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = (await mountAndWait(<TextInput aria-label="text-input" style={style} />))
        .find(TextInput)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided inputMaxLen when inputMaxLen is provided', async () => {
      expect.assertions(1);

      const inputMaxLen = 8;
      const inputClassName = 'fake-class-name';

      const element = (
        await mountAndWait(
          <TextInput
            aria-label="text-input"
            inputMaxLen={inputMaxLen}
            inputClassName={inputClassName}
          />
        )
      )
        .find(`.${inputClassName}`)
        .getDOMNode();

      expect(element.getAttribute('maxLength')).toBe(`${inputMaxLen}`);
    });
  });

  describe('actions', () => {
    it('clicking on another part of the component gives focus to the input', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(<TextInput aria-label="text-input" />);

      const inputElement = wrapper.find('input');
      const inputWrapper = wrapper.find(`.${CONSTANTS.STYLE.wrapper}`);

      const domNode = inputElement.getDOMNode() as HTMLInputElement;
      const focusSpy = jest.spyOn(domNode, 'focus');

      await act(async () => {
        inputWrapper.simulate('click');
      });

      expect(focusSpy).toBeCalledWith();
    });
  });
});
