import React from 'react';
import { mount } from 'enzyme';
import InputMessage from '..';

describe('tests for <InputMessage />', () => {
  it('should match text SnapShot', () => {
    const container = mount(<InputMessage message={'test'} />);

    expect(container).toMatchSnapshot();
  });

  it('should match render message with rendered text', () => {
    const container = mount(<InputMessage message={'test'} />);

    expect(container.find('.md-input__message').text()).toEqual('test');
  });
});
