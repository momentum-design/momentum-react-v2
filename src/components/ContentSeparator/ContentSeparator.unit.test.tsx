import ContentSeparator from '.';
import { mount } from 'enzyme';
import React from 'react';

describe('ContentSeparator', () => {
  describe('snapshot', () => {
    it('should match snapshot when text is used', () => {
      const container = mount(<ContentSeparator>hello</ContentSeparator>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when another component is used', () => {
      const container = mount(
        <ContentSeparator>
          <div>
            <div>Some nested text</div>
          </div>
        </ContentSeparator>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('props', () => {
    it('should render with default props', () => {
      const container = mount(<ContentSeparator>hello</ContentSeparator>);

      expect(container.find('li').prop('className')).toEqual('md-content-separator-wrapper');
      expect(container.find('li').prop('data-gradient')).toBeUndefined();
    });

    it('should render with correct props', () => {
      const container = mount(
        <ContentSeparator className="custom-class" gradient>
          <div>
            <div>Some nested text</div>
          </div>
        </ContentSeparator>
      );

      expect(container.find('li').prop('className')).toEqual(
        'custom-class md-content-separator-wrapper'
      );
      expect(container.find('li').prop('data-gradient')).toEqual(true);
    });
  });
});
