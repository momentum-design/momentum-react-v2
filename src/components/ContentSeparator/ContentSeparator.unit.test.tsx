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
});
