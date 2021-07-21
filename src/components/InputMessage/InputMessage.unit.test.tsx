import InputMessage from '.';
import {mount} from 'enzyme';
import React from 'react';

describe('InputMessage', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      const container = mount(<InputMessage message='some message' level='error' />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should render warning triangle for an error', () => {
      const component = mount(<InputMessage message='some message' level='error' />).childAt(0);
      expect(component.find('svg').length).toBe(1);
    });

    it('should render warning triangle for a warning', () => {
      const component = mount(<InputMessage message="some message" level="warning" />).childAt(0);
      expect(component.find('svg').length).toBe(1);
    });

    it('should not render an icon (right now anyway) for the success case', () => {
      const component = mount(<InputMessage message="some message" level="success" />).childAt(0);
      expect(component.find('svg').length).toBe(0);
    });

    it('should not render an icon for the no level case', () => {
      const component = mount(<InputMessage message="some message" level="none" />).childAt(0);
      expect(component.find('svg').length).toBe(0);
    });
  });
});
