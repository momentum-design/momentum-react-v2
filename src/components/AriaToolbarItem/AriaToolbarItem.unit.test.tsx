import React from 'react';
import { mount } from 'enzyme';

import AriaToolbarItem from './';
import ButtonPill from '../ButtonPill';
import { AriaToolbarContext } from '../AriaToolbar/AriaToolbar.utils';

const TestComponent = (props) => {
  return <AriaToolbarItem itemIndex={0} {...props} children={<ButtonPill>Test</ButtonPill>} />;
};

const mountWithContext = (component) =>
  mount(component, {
    wrappingComponent: AriaToolbarContext.Provider,
    wrappingComponentProps: {
      value: {
        currentFocus: 0,
        setCurrentFocus: jest.fn(),
        buttonRefs: { current: [{ focus: jest.fn() }] },
        orientation: 'horizontal',
        onTabPress: jest.fn(),
        ariaToolbarItemsSize: 1,
      },
    },
  });

describe('<AriaToolbarItem />', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mountWithContext(<TestComponent />);

      expect(container).toMatchSnapshot();
    });
  });

  // keyboard interaction is tested in AriaToolbar.unit.test.tsx
});
