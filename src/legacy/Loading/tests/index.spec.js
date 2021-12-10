import React from 'react';
import { shallow, mount } from 'enzyme';
import { Loading } from '@momentum-ui/react-collaboration';

describe('tests for <Loading />', () => {
  it('should render a Loading', () => {
    const wrapper = mount(<Loading />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render 3 span children', () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper.find('span').length).toEqual(3);
  });
});
