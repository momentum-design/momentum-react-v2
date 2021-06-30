import React from 'react';
import { shallow, mount } from 'enzyme';
import { MenuContent } from '@momentum-ui/react';


describe('tests for <MenuContent />', () => {
  it('should render a MenuContent', () => {
    const wrapper = mount(
      <MenuContent>test</MenuContent>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should apply className to MenuContent', () => {
    const wrapper = shallow(
      <MenuContent className="test">test</MenuContent>
    );
    expect(wrapper.find('.md-menu-content').hasClass('test')).toEqual(true);
  });

});
