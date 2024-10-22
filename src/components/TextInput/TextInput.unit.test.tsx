import React from 'react';
import { SSRProvider } from '@react-aria/ssr';

import { mountAndWait } from '../../../test/utils';
import TextInput, { TEXT_INPUT_CONSTANTS as CONSTANTS } from './';
import { act } from 'react-dom/test-utils';
import { Message } from '../InputMessage/InputMessage.types';
import InputMessage from '../InputMessage';

jest.mock('uuid', () => {
  return {
    v4: () => 'desc-test-ID',
  };
});

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

    it('should match snapshot with label', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountComponent(<TextInput label="Password" id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with clearAriaLabel', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountComponent(
        <TextInput label="Password" clearAriaLabel="Clear this input" id={id} />
      );

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

    it('should match snapshot with isDisabled', async () => {
      expect.assertions(1);

      const container = await mountComponent(<TextInput aria-label="text-input" isDisabled />);

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

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id-2';

      const element = (await mountAndWait(<TextInput aria-label="text-input" id={id} />)).find(
        TextInput
      );

      expect(element.props()).toMatchObject({ 'aria-label': 'text-input', id: 'example-id-2' });
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

    it('should have aria-describedby and id when message is provided', async () => {
      expect.assertions(2);

      const textInputComponent = (
        await mountAndWait(<TextInput aria-label="text-input" aria-describedby={'desc-test-ID'} />)
      ).find(TextInput);

      const inputMessageComponent = (
        await mountAndWait(<InputMessage className="error" level="error" id={'desc-test-ID'} />)
      ).find(InputMessage);

      expect(inputMessageComponent.props().id).toStrictEqual('desc-test-ID');
      expect(textInputComponent.props()).toMatchObject({
        'aria-label': 'text-input',
        'aria-describedby': 'desc-test-ID',
      });
    });

    it('should not have aria-labelledby when message is not provided', async () => {
      expect.assertions(1);

      const textInputComponent = (await mountAndWait(<TextInput aria-label="text-input" />)).find(
        TextInput
      );

      expect(textInputComponent.props()['aria-describedby']).toBe(undefined);
    });

    it('should not have the clear input button displayed when value is empty', async () => {
      const textInputComponent = (
        await mountAndWait(<TextInput aria-label="text-input" value="" />)
      ).find(TextInput);

      expect(textInputComponent.find('.clear-icon').exists()).toBe(false);
    });

    it.each(['hello world', '0', '123', ' '])(
      'should have the clear input button displayed when not disabled (value = "%s")',
      async (value) => {
        const textInputComponent = (
          await mountAndWait(<TextInput aria-label="text-input" value={value} />)
        ).find(TextInput);

        expect(textInputComponent.find('.clear-icon').exists()).toBe(true);
      }
    );

    it.each(['', 'hello world', '0', '123', ' '])(
      'should not have the clear input button displayed when isDisabled (value = "%s")',
      async (value) => {
        const textInputComponent = (
          await mountAndWait(<TextInput aria-label="text-input" value={value} isDisabled />)
        ).find(TextInput);

        expect(textInputComponent.find('.clear-icon').exists()).toBe(false);
      }
    );
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
