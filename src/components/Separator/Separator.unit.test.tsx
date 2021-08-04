import Separator from '.';
import { mount } from 'enzyme';
import React from 'react';

describe('Separator', () => {
  describe('snapshot', () => {
    it('should match snapshot when text is used', () => {
      const container = mount(<Separator>hello</Separator>);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when another component is used', () => {
      const container = mount(
        <Separator>
          <div>
            <div>Some nested text</div>
          </div>
        </Separator>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
