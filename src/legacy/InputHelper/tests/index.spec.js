import React from 'react';
import { shallow, mount } from 'enzyme';
import InputHelper from '..';

describe('tests for <InputHelper />', () => {
  it('should match text SnapShot', () => {
    const container = mount(<InputHelper message="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should render className if prop is passed', () => {
    const container = shallow(<InputHelper className="class-test" message="test" />);

    expect(container.find('.class-test').exists()).toEqual(true);
  });

  it('should render input help with correct class', () => {
    const container = shallow(<InputHelper message="test" />);

    expect(container.find('div').hasClass('md-input__help-text')).toEqual(true);
  });

  it('should render message', () => {
    const container = shallow(<InputHelper message="test" />);

    expect(container.find('div').text()).toEqual('test');
  });

  it('should pass otherProps to container', () => {
    const container = shallow(<InputHelper message="test" id="testid" />);

    expect(container.find('#testid').exists()).toEqual(true);
  });
});
