import React from 'react';
import { shallow, mount } from 'enzyme';
import { Label } from '@momentum-ui/react-collaboration';

describe('tests for <Label />', () => {
  it('should match text SnapShot', () => {
    const container = mount(<Label htmlFor="test" label="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should have HTML for attribute', () => {
    const container = shallow(<Label htmlFor="test" label="testLabel" />);

    expect(container.find('label').props().htmlFor).toEqual('test');
  });

  it('should render label', () => {
    const container = shallow(<Label htmlFor="test" label="testLabel" />);

    expect(container.find('span').text()).toEqual('testLabel');
  });

  it('should apply dark theme class', () => {
    const container = shallow(<Label htmlFor="test" label="testLabel" theme="dark" />);

    expect(container.find('.md-label--dark').length).toEqual(1);
  });
});
