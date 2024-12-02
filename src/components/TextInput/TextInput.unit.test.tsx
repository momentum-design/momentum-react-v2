import React from 'react';
import { SSRProvider } from '@react-aria/ssr';

import { mountAndWait } from '../../../test/utils';
import TextInput, { TEXT_INPUT_CONSTANTS as CONSTANTS } from './';
import { act } from 'react-dom/test-utils';
import { Message } from '../InputMessage/InputMessage.types';
import InputMessage from '../InputMessage';
import * as screenReaderAnnouncer from '../ScreenReaderAnnouncer';

jest.mock('uuid', () => {
  return {
    v4: () => 'desc-test-ID',
  };
});

describe('<TextInput/>', () => {
  let announceSpy;
  let container;

  beforeEach(() => {
    announceSpy = jest.spyOn(screenReaderAnnouncer.default, 'announce').mockReturnValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
    container.unmount();
  });

  describe('snapshot', () => {
    const mountComponent = async (component) => {
      container = await mountAndWait(<SSRProvider>{component}</SSRProvider>);
      return container;
    };

    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <TextInput clearAriaLabel="Clear this input" label="text-input" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountComponent(
        <TextInput clearAriaLabel="Clear this input" label="text-input" className={className} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountComponent(
        <TextInput clearAriaLabel="Clear this input" label="text-input" id={id} />
      );

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

      const container = await mountComponent(
        <TextInput clearAriaLabel="Clear this input" label="text-input" style={style} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with error text', async () => {
      expect.assertions(1);

      const message: Message = { message: 'test', level: 'error' };

      const container = await mountComponent(
        <TextInput clearAriaLabel="Clear this input" label="text-input" messageArr={[message]} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with description', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <TextInput clearAriaLabel="Clear this input" label="text-input" description="some input" />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with inputMaxLen', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <TextInput clearAriaLabel="Clear this input" label="text-input" inputMaxLen={4} />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with isDisabled', async () => {
      expect.assertions(1);

      const container = await mountComponent(
        <TextInput clearAriaLabel="Clear this input" label="text-input" isDisabled />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <TextInput clearAriaLabel="Clear this input" label="text-input" />
      );

      const element = container.find(TextInput).getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      container = await mountAndWait(
        <TextInput clearAriaLabel="Clear this input" label="text-input" className={className} />
      );

      const element = container.find(TextInput).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id-2';

      container = await mountAndWait(
        <TextInput clearAriaLabel="Clear this input" label="text-input" id={id} />
      );

      const element = container.find(TextInput);

      expect(element.props()).toMatchObject({ label: 'text-input', id: 'example-id-2' });
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      container = await mountAndWait(
        <TextInput clearAriaLabel="Clear this input" label="text-input" style={style} />
      );

      const element = container.find(TextInput).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided inputMaxLen when inputMaxLen is provided', async () => {
      expect.assertions(1);

      const inputMaxLen = 8;
      const inputClassName = 'fake-class-name';

      container = await mountAndWait(
        <TextInput
          clearAriaLabel="Clear this input"
          label="text-input"
          inputMaxLen={inputMaxLen}
          inputClassName={inputClassName}
        />
      );

      const element = container.find(`.${inputClassName}`).getDOMNode();

      expect(element.getAttribute('maxLength')).toBe(`${inputMaxLen}`);
    });

    it('should have aria-describedby and id when message is provided', async () => {
      expect.assertions(2);

      container = await mountAndWait(
        <TextInput
          clearAriaLabel="Clear this input"
          label="text-input"
          aria-describedby={'desc-test-ID'}
        />
      );

      const element = container.find(TextInput);

      const inputMessageComponent = (
        await mountAndWait(<InputMessage className="error" level="error" id={'desc-test-ID'} />)
      ).find(InputMessage);

      expect(inputMessageComponent.props().id).toStrictEqual('desc-test-ID');
      expect(element.props()).toMatchObject({
        label: 'text-input',
        'aria-describedby': 'desc-test-ID',
      });
    });

    it('should not have labelledby when message is not provided', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <TextInput clearAriaLabel="Clear this input" label="text-input" />
      );

      const element = container.find(TextInput);

      expect(element.props()['aria-describedby']).toBe(undefined);
    });

    it('should not have the clear input button displayed when value is empty', async () => {
      container = await mountAndWait(
        <TextInput clearAriaLabel="Clear this input" label="text-input" value="" />
      );

      const element = container.find(TextInput);

      expect(element.find('.clear-icon').exists()).toBe(false);
    });

    it.each(['hello world', '0', '123', ' '])(
      'should have the clear input button displayed when not disabled (value = "%s")',
      async (value) => {
        container = await mountAndWait(
          <TextInput clearAriaLabel="Clear this input" label="text-input" value={value} />
        );

        const element = container.find(TextInput);

        expect(element.find('.clear-icon').exists()).toBe(true);
      }
    );

    it.each(['', 'hello world', '0', '123', ' '])(
      'should not have the clear input button displayed when isDisabled (value = "%s")',
      async (value) => {
        container = await mountAndWait(
          <TextInput
            clearAriaLabel="Clear this input"
            label="text-input"
            value={value}
            isDisabled
          />
        );

        const element = container.find(TextInput);

        expect(element.find('.clear-icon').exists()).toBe(false);
      }
    );
  });

  describe('actions', () => {
    it('clicking on another part of the component gives focus to the input', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <TextInput clearAriaLabel="Clear this input" label="text-input" />
      );

      const inputElement = container.find('input');
      const inputWrapper = container.find(`.${CONSTANTS.STYLE.wrapper}`);

      const domNode = inputElement.getDOMNode() as HTMLInputElement;
      const focusSpy = jest.spyOn(domNode, 'focus');

      await act(async () => {
        inputWrapper.simulate('click');
      });

      expect(focusSpy).toBeCalledWith();
    });

    it('input messages get announced by SR', async () => {
      expect.assertions(1);

      const message1: Message = { message: 'test1', level: 'error' };
      const message2: Message = { message: 'test2', level: 'error' };

      container = await mountAndWait(
        <TextInput
          clearAriaLabel="Clear this input"
          label="text-input"
          messageArr={[message1, message2]}
        />
      );

      expect(announceSpy).toHaveBeenCalledWith({ body: 'test1,test2' }, 'test-ID');
    });
  });
});
