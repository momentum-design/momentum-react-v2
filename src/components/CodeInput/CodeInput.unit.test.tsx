import CodeInput from '.';
import { mount } from 'enzyme';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';

// TODO: swap for test util when available
const waitForAsync = (wrapper) =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      wrapper.update();

      return resolve();
    }, 0)
  );

describe('CodeInput', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      const container = mount(<CodeInput numDigits={6} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have correct number of boxes', () => {
      const component = mount(<CodeInput numDigits={6} />).childAt(0);
      expect(component.find('.md-code-input-container').length).toBe(1);
      expect(component.find('.md-code-input-character').length).toBe(6);
    });

    it('disabled code input should have input disabled', () => {
      const component = mount(<CodeInput numDigits={6} disabled />).childAt(0);
      expect(component.find('input').props().disabled).toBeTruthy();
    });

    it('when a message array is passing in messages should be displayed', async () => {
      let component;
      await act(async () => {
        component = mount(
          <CodeInput numDigits={6} messageArr={[{ message: 'test', type: 'error' }]} />
        );
      });
      await waitForAsync(component);
      const message = component.find('.md-input-message');
      expect(message.length).toBe(1);
      expect(message.props()['message-level']).toEqual('error');
    });

    it('should have custom class if provided', () => {
      const testClass = 'testClass';

      const wrapper = mount(<CodeInput numDigits={6} className={testClass} />);
      const element = wrapper.find(CodeInput).getDOMNode();

      expect(element.classList.contains(testClass)).toBe(true);
    });
  });

  describe('error on complete', () => {
    const ExampleContainer = () => {
      const [msgArr, setMsgArr] = useState([]);

      const onComplete = () => {
        setMsgArr([{ message: 'test', type: 'error' }]);
      };

      return <CodeInput onComplete={onComplete} numDigits={6} messageArr={msgArr} />;
    };

    it('displays a message when the message array changes', async () => {
      let component;

      await act(async () => {
        component = mount(<ExampleContainer />);
      });
      const message = component.find('.md-input-message');
      expect(message.length).toBe(0);

      let codeInput;
      await act(async () => {
        codeInput = component.find(CodeInput);
        codeInput.simulate('click');
        codeInput
          .find('input')
          .hostNodes()
          .simulate('change', { target: { value: '123456' } });
      });

      await waitForAsync(component);
      const message2 = component.find('.md-input-message');
      expect(message2.length).toEqual(1);
    });
  });

  describe('digit entry', () => {
    it('fires onChange when digits are entered', () => {
      const spy = jest.fn();
      const codeInput = mount(<CodeInput numDigits={3} onChange={spy} />);
      codeInput.simulate('click');

      const testInput = (value) => {
        codeInput.find('input').hostNodes().simulate('change', { target: { value } });
        expect(codeInput.find('input').props().value).toEqual(value);
        expect(spy).toBeCalledWith(value);
        spy.mockClear();
      };

      testInput('1');
      testInput('12');
      testInput('123');
      testInput('45');
      testInput('6');
    });

    it('fires onComplete when number of digits reached', () => {
      const spy = jest.fn();
      const codeInput = mount(<CodeInput numDigits={3} onComplete={spy} />);
      codeInput.simulate('click');

      const testInput = (value, expectOnComplete) => {
        codeInput.find('input').hostNodes().simulate('change', { target: { value } });
        expect(codeInput.find('input').props().value).toEqual(value);
        if (expectOnComplete) {
          expect(spy).toBeCalledWith(value);
        } else {
          expect(spy).not.toHaveBeenCalled();
        }
        spy.mockClear();
      };

      testInput('1', false);
      testInput('12', false);
      testInput('123', true);
      testInput('45', false);
      testInput('6', false);
      testInput('789', true);
    });
  });
});
