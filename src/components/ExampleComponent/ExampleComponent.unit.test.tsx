import { mount } from 'enzyme';
import React from 'react';

import ExampleComponent from 'components/ExampleComponent';

describe('tests for <ExampleComponent />', () => {
  it('should match SnapShot', () => {
    const container = mount(<ExampleComponent param="test" />);

    expect(container).toMatchSnapshot();
  });
});
