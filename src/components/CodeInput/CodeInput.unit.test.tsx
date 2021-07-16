import CodeInput from '.';
import {mount} from 'enzyme';
import React from 'react';

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
  });

  describe('digit entry', () => {
    it('fires codeComplete when number of digits reached', () => {
      const spy = jest.fn();
      const codeInput = mount(<CodeInput numDigits={3} onComplete={spy} />);
      codeInput.simulate('click');
      codeInput.find('input').hostNodes().simulate('change', { target: { value: '123' } });
      const input = codeInput.find('input');
      expect(input.props().value).toEqual('123');
      expect(spy).toBeCalledWith('123');
    });
  });
});
