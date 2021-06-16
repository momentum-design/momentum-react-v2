import React from 'react';
import { mount } from 'enzyme';
import { TypeScriptExample } from '..';

describe('tests for <TypeScriptExample />', () => {
  it('should match SnapShot', () => {
    const container = mount(<TypeScriptExample/>);

    expect(container).toMatchSnapshot();
  });
});
