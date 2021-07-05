import React from 'react';
import { shallow, mount } from 'enzyme';
import { SidebarHeader } from '@momentum-ui/react';

describe('<SidebarHeader />', () => {
  it('should render a SidebarHeader', () => {
    const wrapper = mount(<SidebarHeader navSectionTitle='Overview' />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should add customized class name if className prop is set', () => {
    const wrapper = shallow(<SidebarHeader className='testClassName'/>);

    expect(wrapper.find('.testClassName').exists()).toBeTruthy();
  });

  it('should render children if children prop is set', () => {
    const wrapper = shallow(
      <SidebarHeader>
        <div className='dummy-children'>Dummy Children</div>
      </SidebarHeader>
    );

    expect(wrapper.find('.dummy-children').exists()).toBeTruthy();
  });
});
