import React from 'react';
import { shallow, mount } from 'enzyme';
import InputSection from '..';

describe('tests for <InputSection />', () => {
  it('should match text SnapShot', () => {
    const container = mount(<InputSection />);

    expect(container).toMatchSnapshot();
  });

  it('should render input section with position class', () => {
    const container = shallow(<InputSection />);

    expect(container.find('.md-input__before').exists()).toEqual(true);
  });

  it('should render input section with position prop', () => {
    const container = shallow(<InputSection position="after" />);

    expect(container.find('.md-input__after').exists()).toEqual(true);
  });

  it('should render className if prop is passed', () => {
    const container = shallow(<InputSection className="class-test" />);

    expect(container.find('.class-test').exists()).toEqual(true);
  });

  it('should render children', () => {
    const container = shallow(<InputSection>test</InputSection>);

    expect(container.find('.md-input__before').text()).toEqual('test');
  });

  it('should pass otherProps to container', () => {
    const container = shallow(<InputSection id="testid" />);

    expect(container.find('#testid').exists()).toEqual(true);
  });
});
