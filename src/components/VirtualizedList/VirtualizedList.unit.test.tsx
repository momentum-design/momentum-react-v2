import React from 'react';
import { mount } from 'enzyme';
import { render, waitFor } from '@testing-library/react';

import VirtualizedList from './VirtualizedList';

describe('<VirtualizedList />', () => {
  const defaultProps = {
    setListData: jest.fn(),
    count: 3,
    estimateSize: jest.fn(),
    children: [<div key="0" />, <div key="1" />, <div key="2" />],
  };

  describe('attributes', () => {
    it('web component should have typography class set', () => {
      expect.assertions(1);

      const element = mount(<VirtualizedList className="virtual-list-test" {...defaultProps} />)
        .find(VirtualizedList)
        .getDOMNode();

      expect(element.classList.contains('virtual-list-test')).toBe(true);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const divInElement = mount(<VirtualizedList style={style} {...defaultProps} />)
        .find(VirtualizedList)
        .getDOMNode();

      expect(divInElement.getAttribute('style')).toBe(styleString);
    });
  });
});
