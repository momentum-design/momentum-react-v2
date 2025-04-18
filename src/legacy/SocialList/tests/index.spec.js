import React from 'react';
import { shallow, mount } from 'enzyme';
import SocialList from '..';

describe('<SocialList />', () => {
  it('should render a SocialList', () => {
    const container = mount(<SocialList />);
    expect(container).toMatchSnapshot();
  });

  it('should render null if children prop is not set', () => {
    const container = shallow(<SocialList />);

    expect(container.instance().props.children).toEqual(null);
  });

  it('should render children if children prop is set', () => {
    const container = shallow(<SocialList>social list</SocialList>);

    expect(container.instance().props.children).toEqual('social list');
  });
});
