import React from 'react';
import { mount } from 'enzyme';
import { renderHook } from '@testing-library/react-hooks';
import { Item, Section } from '@react-stately/collections';

import Menu, { MENU_CONSTANTS as CONSTANTS, SelectionGroup } from './';
import { triggerPress } from '../../../test/utils';
import ListItemBase from '../ListItemBase';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuSelectionGroup from '../MenuSelectionGroup';
import { MenuAppearanceContextValue } from './Menu.types';
import { MenuAppearanceContext, useMenuAppearanceContext } from './Menu';

describe('useMenuAppearanceContext', () => {
  const fakeMenuAppearanceContextValue: MenuAppearanceContextValue = {
    tickPosition: 'left',
    classNameSelectedItem: 'selected-class',
  };

  it('should return default context values when no props are provided', () => {
    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <MenuAppearanceContext.Provider value={fakeMenuAppearanceContextValue}>
        {children}
      </MenuAppearanceContext.Provider>
    );

    const { result } = renderHook(() => useMenuAppearanceContext({}), { wrapper });

    expect(result.current.tickPosition).toBe(fakeMenuAppearanceContextValue.tickPosition);
    expect(result.current.classNameSelectedItem).toBe(
      fakeMenuAppearanceContextValue.classNameSelectedItem
    );
  });

  it('should override context values with provided props', () => {
    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <MenuAppearanceContext.Provider value={fakeMenuAppearanceContextValue}>
        {children}
      </MenuAppearanceContext.Provider>
    );

    const { result } = renderHook(
      () =>
        useMenuAppearanceContext({
          tickPosition: 'right',
          classNameSelectedItem: 'custom-selected-class',
        }),
      { wrapper }
    );

    expect(result.current.tickPosition).toBe('right');
    expect(result.current.classNameSelectedItem).toBe('custom-selected-class');
  });

  it('should use context values for props that are not provided', () => {
    // eslint-disable-next-line react/prop-types
    const wrapper = ({ children }) => (
      <MenuAppearanceContext.Provider value={fakeMenuAppearanceContextValue}>
        {children}
      </MenuAppearanceContext.Provider>
    );

    const { result } = renderHook(
      () =>
        useMenuAppearanceContext({
          tickPosition: 'right',
        }),
      { wrapper }
    );

    expect(result.current.tickPosition).toBe('right');
    expect(result.current.classNameSelectedItem).toBe(
      fakeMenuAppearanceContextValue.classNameSelectedItem
    );
  });
});

describe('<Menu />', () => {
  const defaultProps = {
    children: [<Item key="one">One</Item>, <Item key="two">Two</Item>],
    'aria-label': 'Menu component',
  };

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(<Menu {...defaultProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(<Menu {...defaultProps} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(<Menu {...defaultProps} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(<Menu {...defaultProps} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with itemSize', () => {
      expect.assertions(1);

      const itemSize = 50;

      const container = mount(<Menu {...defaultProps} itemSize={itemSize} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with itemShape', () => {
      expect.assertions(1);

      const itemShape = 'isPilled';

      const container = mount(<Menu {...defaultProps} itemSize={50} itemShape={itemShape} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with tickPosition', () => {
      expect.assertions(1);

      const tickPosition = 'left';

      const container = mount(<Menu {...defaultProps} itemSize={50} tickPosition={tickPosition} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with tickPosition', () => {
      expect.assertions(1);

      const tickPosition = 'left';

      const container = mount(<Menu {...defaultProps} itemSize={50} tickPosition={tickPosition} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const classNameSelectedItem = 'example-class-when-selected';

      const container = mount(
        <Menu {...defaultProps} classNameSelectedItem={classNameSelectedItem} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(<Menu {...defaultProps} />)
        .find(Menu)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(<Menu {...defaultProps} className={className} />)
        .find(Menu)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(<Menu {...defaultProps} id={id} />)
        .find(Menu)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have aria-labelledby prop when ariaLabelledby is provided', () => {
      expect.assertions(1);

      const ariaLabelledby = 'menu-label';

      const element = mount(<Menu {...defaultProps} aria-labelledby={ariaLabelledby} />).find(Menu);

      expect(element.prop('aria-labelledby')).toBe(ariaLabelledby);
    });

    it('should have aria-labelledby prop when ariaLabelledby is undefined', () => {
      expect.assertions(1);

      const ariaLabelledby = 'undefined';

      const element = mount(<Menu {...defaultProps} aria-labelledby={ariaLabelledby} />).find(Menu);

      expect(element.prop('aria-labelledby')).toBe(ariaLabelledby);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(<Menu {...defaultProps} style={style} />)
        .find(Menu)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided data-size when itemSize is provided', () => {
      expect.assertions(1);

      const itemSize = 50;

      const element = mount(<Menu {...defaultProps} itemSize={itemSize} />)
        .find(ListItemBase)
        .at(0)
        .getDOMNode();

      expect(element.getAttribute('data-size')).toBe(`${itemSize}`);
    });

    it('should have provided data-shape when itemShape is provided', () => {
      expect.assertions(1);

      const itemShape = 'isPilled';

      const element = mount(<Menu {...defaultProps} itemSize={50} itemShape={itemShape} />)
        .find(ListItemBase)
        .at(0)
        .getDOMNode();

      expect(element.getAttribute('data-shape')).toBe(itemShape);
    });

    it('should have provided data-shape when tickPosition is provided', () => {
      expect.assertions(1);

      const tickPosition = 'left';

      const element = mount(<Menu {...defaultProps} tickPosition={tickPosition} />)
        .find(ListItemBase)
        .at(0)
        .getDOMNode();

      expect(element.getAttribute('data-shape')).toBe(tickPosition);
    });
  });

  describe('actions', () => {
    it('should call onAction with the correct key when action clicked', () => {
      expect.assertions(1);

      const key = 'one';

      const onActionMock = jest.fn();

      const listItem = mount(<Menu onAction={onActionMock} {...defaultProps} />).find(
        `li[data-key="${key}"]`
      );

      triggerPress(listItem);

      expect(onActionMock).toHaveBeenCalledWith(key);
    });

    it('should handle up/down arrow keys correctly - for vertical menus', async () => {
      const user = userEvent.setup();

      const { getAllByRole } = render(<Menu {...defaultProps} />);

      await user.tab();

      const menuItems = getAllByRole('menuitem');
      expect(menuItems[0]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(menuItems[1]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(menuItems[0]).toHaveFocus();

      await user.keyboard('{ArrowRight}');

      expect(menuItems[0]).toHaveFocus();
    });

    it('should handle up/down arrow keys correctly - for vertical menu with section', async () => {
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <Menu {...defaultProps}>
          <Section title="Section 1" key="s1" aria-label="section1">
            <Item key="one">One</Item>
            <Item key="two">Two</Item>
          </Section>
          <Section title="Section 2" key="s2" aria-label="section2">
            <Item key="three">Three</Item>
            <Item key="four">Four</Item>
          </Section>
        </Menu>
      );

      await user.tab();

      const menuItems = getAllByRole('menuitem');

      expect(menuItems[0]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(menuItems[1]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(menuItems[2]).toHaveFocus();

      await user.keyboard('{ArrowUp}');

      expect(menuItems[1]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(menuItems[2]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(menuItems[3]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(menuItems[0]).toHaveFocus();

      await user.keyboard('{ArrowUp}');

      expect(menuItems[3]).toHaveFocus();

      await user.keyboard('{ArrowRight}');

      expect(menuItems[3]).toHaveFocus();
    });

    it('should handle up/down arrow keys correctly - for vertical menu with SelectionGroup', async () => {
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <Menu {...defaultProps}>
          <SelectionGroup
            selectionMode="single"
            title="SelectionGroup 1"
            key="s1"
            aria-label="selection1"
          >
            <Item key="one">One</Item>
            <Item key="two">Two</Item>
          </SelectionGroup>
          <SelectionGroup
            selectionMode="multiple"
            title="SelectionGroup 2"
            key="s2"
            aria-label="selection2"
          >
            <Item key="three">Three</Item>
            <Item key="four">Four</Item>
          </SelectionGroup>
        </Menu>
      );

      await user.tab();

      const radioItems = getAllByRole('menuitemradio');
      const checkboxItems = getAllByRole('menuitemcheckbox');

      expect(radioItems[0]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(radioItems[1]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(checkboxItems[0]).toHaveFocus();

      await user.keyboard('{ArrowUp}');

      expect(radioItems[1]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(checkboxItems[0]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(checkboxItems[1]).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(radioItems[0]).toHaveFocus();

      await user.keyboard('{ArrowUp}');

      expect(checkboxItems[1]).toHaveFocus();

      await user.keyboard('{ArrowRight}');

      expect(checkboxItems[1]).toHaveFocus();
    });

    it('should handle click - for vertical menu with SelectionGroup', async () => {
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <Menu {...defaultProps}>
          <SelectionGroup
            selectionMode="single"
            title="SelectionGroup 1"
            key="s1"
            aria-label="selection1"
          >
            <Item key="one">One</Item>
            <Item key="two">Two</Item>
          </SelectionGroup>
          <SelectionGroup
            selectionMode="multiple"
            title="SelectionGroup 2"
            key="s2"
            aria-label="selection2"
          >
            <Item key="three">Three</Item>
            <Item key="four">Four</Item>
          </SelectionGroup>
        </Menu>
      );

      const radioItems = getAllByRole('menuitemradio');
      const checkboxItems = getAllByRole('menuitemcheckbox');

      await user.click(radioItems[1]);

      expect(radioItems[0]).not.toHaveFocus();
      expect(radioItems[0]).not.toBeChecked();
      expect(radioItems[1]).toHaveFocus();
      expect(radioItems[1]).toBeChecked();
      expect(checkboxItems[0]).not.toHaveFocus();
      expect(checkboxItems[0]).not.toBeChecked();
      expect(checkboxItems[1]).not.toHaveFocus();
      expect(checkboxItems[1]).not.toBeChecked();

      await user.click(checkboxItems[0]);

      expect(radioItems[0]).not.toHaveFocus();
      expect(radioItems[0]).not.toBeChecked();
      expect(radioItems[1]).not.toHaveFocus();
      expect(radioItems[1]).toBeChecked();
      expect(checkboxItems[0]).toHaveFocus();
      expect(checkboxItems[0]).toBeChecked();
      expect(checkboxItems[1]).not.toHaveFocus();
      expect(checkboxItems[1]).not.toBeChecked();

      await user.click(checkboxItems[1]);

      expect(radioItems[0]).not.toHaveFocus();
      expect(radioItems[0]).not.toBeChecked();
      expect(radioItems[1]).not.toHaveFocus();
      expect(radioItems[1]).toBeChecked();
      expect(checkboxItems[0]).not.toHaveFocus();
      expect(checkboxItems[0]).toBeChecked();
      expect(checkboxItems[1]).toHaveFocus();
      expect(checkboxItems[1]).toBeChecked();

      await user.click(radioItems[0]);

      expect(radioItems[0]).toHaveFocus();
      expect(radioItems[0]).toBeChecked();
      expect(radioItems[1]).not.toHaveFocus();
      expect(radioItems[1]).not.toBeChecked();
      expect(checkboxItems[0]).not.toHaveFocus();
      expect(checkboxItems[0]).toBeChecked();
      expect(checkboxItems[1]).not.toHaveFocus();
      expect(checkboxItems[1]).toBeChecked();
    });

    it('should render MenuSelectionGroup if children has SelectionGroup', () => {
      const wrapper = mount(
        <Menu {...defaultProps}>
          <SelectionGroup
            selectionMode="single"
            title="SelectionGroup 1"
            key="s1"
            aria-label="selection1"
          >
            <Item key="one">One</Item>
            <Item key="two">Two</Item>
          </SelectionGroup>
          <SelectionGroup
            selectionMode="multiple"
            title="SelectionGroup 2"
            key="s2"
            aria-label="selection2"
          >
            <Item key="three">Three</Item>
            <Item key="four">Four</Item>
          </SelectionGroup>
        </Menu>
      );

      expect(wrapper.find(MenuSelectionGroup).at(0).props()).toEqual({
        item: expect.any(Object),
        state: expect.any(Object),
        onAction: undefined,
        selectionMode: 'single',
        title: 'SelectionGroup 1',
        'aria-label': 'selection1',
        children: expect.any(Object),
        selectionGroup: true,
      });
      expect(wrapper.find(MenuSelectionGroup).at(1).props()).toEqual({
        item: expect.any(Object),
        state: expect.any(Object),
        onAction: undefined,
        selectionMode: 'multiple',
        title: 'SelectionGroup 2',
        'aria-label': 'selection2',
        children: expect.any(Object),
        selectionGroup: true,
      });
    });
  });
});
