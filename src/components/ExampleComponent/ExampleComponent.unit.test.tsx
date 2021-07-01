import React from 'react';
import { mount } from 'enzyme';
import { ExampleComponent } from '@momentum-ui/react';

describe('tests for <ExampleComponent />', () => {
  it('should match SnapShot', () => {
    const container = mount(<ExampleComponent param="test"/>);

    expect(container).toMatchSnapshot();
  });
});