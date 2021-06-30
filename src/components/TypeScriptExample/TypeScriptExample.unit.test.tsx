import React from 'react';
import { mount } from 'enzyme';
import { TypeScriptExample } from '@momentum-ui/react';

describe('tests for <TypeScriptExample />', () => {
  it('should match SnapShot', () => {
    const container = mount(<TypeScriptExample param="test"/>);

    expect(container).toMatchSnapshot();
  });
});