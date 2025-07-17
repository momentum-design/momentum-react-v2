import React from 'react';
import { mount } from 'enzyme';
import SelectableContext from '../../SelectableContext';
import { Icon, ListItemSection, MenuItemLegacy } from '@momentum-ui/react-collaboration';
import Toggle from '../../../components/Toggle';
beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe('tests for <MenuItemLegacy />', () => {
  const context = {
    parentKeyDown: jest.fn(),
    parentKeyUp: jest.fn(),
    parentOnSelect: jest.fn(),
  };

  it('should render a MenuItem', () => {
    const wrapper = mount(<MenuItemLegacy label="one" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleClick function of context when ListItem is clicked', () => {
    const onClick = jest.fn();

    const wrapper = mount(
      <SelectableContext.Provider value={context}>
        <MenuItemLegacy onClick={onClick} label="one" />
      </SelectableContext.Provider>
    );

    const listItem = wrapper.find('ListItem').first();
    listItem.simulate('click');
    expect(onClick).toHaveBeenCalled();
    expect(context.parentOnSelect.mock.calls.length).toBe(1);
  });

  it('should pass value to onClick handler', () => {
    const onClick = jest.fn();

    const wrapper = mount(
      <SelectableContext.Provider value={context}>
        <MenuItemLegacy onClick={onClick} label="one" value="test" />
      </SelectableContext.Provider>
    );

    const listItem = wrapper.find('ListItem').first();
    listItem.simulate('click');
    expect(context.parentOnSelect.mock.calls.length).toBe(1);
    expect(onClick.mock.calls[0][1].value).toBe('test');
  });

  it('should not call e.preventDefault if target is not md-list-item', () => {
    const onClick = jest.fn();

    const wrapper = mount(
      <SelectableContext.Provider value={context}>
        <MenuItemLegacy onClick={onClick} label="one" value="test">
          <ListItemSection position="left">
            <Icon name="edit_20" />
          </ListItemSection>
          <ListItemSection position="center">Dark mode</ListItemSection>
          <ListItemSection position="right">
            <Toggle aria-label="toggle" />
          </ListItemSection>
        </MenuItemLegacy>
      </SelectableContext.Provider>
    );

    const toggle = wrapper.find(Toggle);

    const mockEvent = {
      preventDefault: jest.fn(),
      keyCode: 32,
      target: toggle.getDOMNode(),
    };

    const listItem = wrapper.find(Toggle);
    listItem.simulate('keydown', mockEvent);
    expect(onClick).not.toBeCalled();
    expect(context.parentKeyDown).not.toBeCalled();
    expect(mockEvent.preventDefault).not.toBeCalled();
  });

  it('should call handleKeyDown function of context when keyDown is fired on ListItem', () => {
    const onKeyDown = jest.fn();

    const wrapper = mount(
      <SelectableContext.Provider value={context}>
        <MenuItemLegacy onKeyDown={onKeyDown} label="one" value="test" />
      </SelectableContext.Provider>
    );

    const listItem = wrapper.find('ListItem').first();
    listItem.simulate('keydown');
    expect(context.parentKeyDown.mock.calls.length).toBe(1);
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should call handleKeyUp function of context when keyUp is fired on ListItem', () => {
    const onKeyUp = jest.fn();

    const wrapper = mount(
      <SelectableContext.Provider value={context}>
        <MenuItemLegacy onKeyUp={onKeyUp} label="one" value="test" />
      </SelectableContext.Provider>
    );

    const listItem = wrapper.find('ListItem').first();
    listItem.simulate('keyup');
    expect(context.parentKeyUp.mock.calls.length).toBe(1);
    expect(onKeyUp).toHaveBeenCalled();
  });

  it('should apply class for isHeader prop', () => {
    const container = mount(<MenuItemLegacy isHeader />);

    expect(container.find('.md-menu-item__header').exists()).toEqual(true);
  });

  describe('tests for title Prop', () => {
    it('should not have title by default', () => {
      const container = mount(<MenuItemLegacy />);

      expect(container.find('.md-list-item').props().title).toEqual(undefined);
    });

    it('should handle title prop', () => {
      const container = mount(<MenuItemLegacy title="testTitle" />);

      expect(container.find('.md-list-item').props().title).toEqual('testTitle');
    });
  });
});
