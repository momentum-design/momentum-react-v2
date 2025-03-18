import React from 'react';
import { mount } from 'enzyme';
import { InputSearch } from '@momentum-ui/react-collaboration';

describe('tests for <InputSearch />', () => {
  it('should match normal SnapShot', () => {
    const container = mount(<InputSearch id="1" name="test" />);

    expect(container).toMatchSnapshot();
  });

  it('should match pill SnapShot', () => {
    const container = mount(<InputSearch id="1" name="test" shape="pill" />);

    expect(container).toMatchSnapshot();
  });

  it('should match loading SnapShot', () => {
    const container = mount(<InputSearch id="1" name="test" isLoading />);

    expect(container).toMatchSnapshot();
  });

  it('should pass isLoading prop', () => {
    const container = mount(<InputSearch id="1" name="test" isLoading />);

    expect(container.find('.md-loading-spinner-wrapper').exists()).toEqual(true);
  });

  it('should render Icon component', () => {
    const container = mount(<InputSearch id="1" name="test" shape="pill" />);
    expect(container.find('.md-icon').length).toEqual(1);
  });

  it('should render one Input', () => {
    const container = mount(<InputSearch id="1" name="test" />);

    expect(container.find('input').length).toEqual(1);
    expect(container.children().length).toEqual(1);
  });

  it('should pass disabled attribute', () => {
    const container = mount(<InputSearch id="test123" name="test" disabled />);

    expect(container.find('input').props().disabled).toEqual(true);
  });

  it('should pass readOnly attribute', () => {
    const container = mount(<InputSearch id="test123" name="test" readOnly />);

    expect(container.find('input').props().readOnly).toEqual(true);
  });

  it('should pass value attribute', () => {
    const handleChange = jest.fn();
    const container = mount(
      <InputSearch id="test123" name="test" value="testing" onChange={handleChange} />
    );

    expect(container.find('input').props().value).toEqual('testing');
  });
});
