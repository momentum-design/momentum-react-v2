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
      expect(component.find('.code-input-container').length).toBe(1);
      expect(component.find('.code-input-character').length).toBe(6);
    });
  });
});
