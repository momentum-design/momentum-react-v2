import React from 'react';
import { mount } from 'enzyme';
import { MenuItemLegacy, SubMenu } from '@momentum-ui/react-collaboration';

describe('tests for <SubMenu />', () => {
  it('should render a SubMenu', () => {
    const wrapper = mount(
      <SubMenu label="one">
        <MenuItemLegacy label="two" />
      </SubMenu>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('when handle customNodeProp', () => {
    const wrapper = mount(
      <SubMenu customNode={<div className="testNode">one</div>} isOpen>
        <MenuItemLegacy label="two" />
      </SubMenu>
    );

    expect(wrapper.find('.testNode').exists()).toEqual(true);
    expect(wrapper.find('.md-menu-item__content').exists()).toEqual(false);
  });

  it('when SubMenu is open it should display the subMenu', () => {
    const wrapper = mount(
      <SubMenu label="one" isOpen>
        <MenuItemLegacy label="two" />
      </SubMenu>
    );

    const props = wrapper.find('SubMenu').props();
    const menuItemProps = wrapper.find('.md-menu-item').first().props();
    const listItemProps = wrapper.find('ListItem').first().props();
    const eoProps = wrapper.find('EventOverlay').props();

    expect(menuItemProps['aria-expanded']).toEqual(true);
    expect(menuItemProps['aria-haspopup']).toEqual(true);
    expect(listItemProps.active).toEqual(true);

    expect(props.isOpen).toEqual(true);
    expect(eoProps.direction).toEqual('right-top');
    expect(eoProps.closeOnClick).toEqual(false);
    expect(wrapper.find('Icon').exists()).toEqual(true);
  });

  it('should display the selectedValue of the menu if selectedValue prop is set', () => {
    const wrapper = mount(
      <SubMenu selectedValue="SubMenu" label="one">
        <MenuItemLegacy label="two" />
      </SubMenu>
    );
    expect(wrapper.find('.md-menu-item__selected-value').at(0).text()).toEqual('SubMenu');
  });

  it('should display the contents in the content prop when provided', () => {
    const wrapper = mount(
      <SubMenu selectedValue="SubMenu" label="one" content={<div>test</div>}>
        <MenuItemLegacy label="two" />
      </SubMenu>
    );
    expect(wrapper.find('.md-menu-item__content').at(0).text()).toEqual('test');
    expect(wrapper.find('.md-menu-item__content').at(0).text()).toEqual('test');
  });

  it('when SubMenu is not open it should not display the subMenu', () => {
    const wrapper = mount(
      <SubMenu label="one">
        <MenuItemLegacy label="two" />
      </SubMenu>
    );

    const menuItemProps = wrapper.find('.md-menu-item').first().props();
    const listItemProps = wrapper.find('ListItem').first().props();
    const eo = wrapper.find('EventOverlay');

    expect(menuItemProps['aria-expanded']).toEqual(null);
    expect(menuItemProps['aria-haspopup']).toEqual(true);
    expect(listItemProps.active).toEqual(null);
    expect(eo.exists()).toEqual(false);
  });

  it('should display the selectedValue of the menu if selectedValue prop is set', () => {
    const wrapper = mount(
      <SubMenu selectedValue="SubMenu" label="one">
        <MenuItemLegacy label="two" />
      </SubMenu>
    );
    expect(wrapper.find('.md-menu-item__selected-value').at(0).text()).toEqual('SubMenu');
  });

  it('should display the contents in the content prop when provided', () => {
    const wrapper = mount(
      <SubMenu selectedValue="SubMenu" label="one" content={<div>test</div>}>
        <MenuItemLegacy label="two" />
      </SubMenu>
    );
    expect(wrapper.find('.md-menu-item__content').at(0).text()).toEqual('test');
    expect(wrapper.find('.md-menu-item__content').at(0).text()).toEqual('test');
  });

  it('should set ariaLabel of subMenu', () => {
    const wrapper = mount(
      <SubMenu label="one" isOpen>
        <MenuItemLegacy label="two" />
      </SubMenu>
    );
    expect(
      wrapper.find('.md-event-overlay__children').props().children.props['aria-label']
    ).toEqual('one');
  });
});
