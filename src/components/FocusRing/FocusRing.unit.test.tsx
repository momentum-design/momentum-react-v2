import React from 'react';
import { mount } from 'enzyme';

import FocusRing from './';

describe('<FocusRing />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(
        <FocusRing>
          <button>Example</button>
        </FocusRing>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when disabled', () => {
      expect.assertions(1);

      const container = mount(
        <FocusRing disabled={true}>
          <button>Example</button>
        </FocusRing>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    // All attributes are nested behind `react-aria/focus`, so they are not accessible here.
    // Tests are done upstream by `react-aria`.
  });
});
