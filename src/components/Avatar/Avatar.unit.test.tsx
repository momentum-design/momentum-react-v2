import Avatar from '.';
import { mount } from 'enzyme';
import React from 'react';

describe('Avatar', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      /* ...snapshot test... */
      const wrapper = mount(<Avatar />);
      expect(wrapper).toBeTruthy();
    });
  });

  describe('attributes', () => {
    it('should have X value', () => {
      /* ...attribute tests... */
      const wrapper = mount(<Avatar />);
      expect(wrapper).toBeTruthy();
    });
  });
});
