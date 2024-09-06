import React from 'react';
import { mount } from 'enzyme';
import { Item, Section } from '@react-stately/collections';

import Menu, { MENU_CONSTANTS as CONSTANTS } from './';
import { triggerPress } from '../../../test/utils';
import ListItemBase from '../ListItemBase';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

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

    it('should have provided tabindex when tabIndex is provided', () => {
      expect.assertions(1);

      const element = mount(<Menu {...defaultProps} itemSize={50} tabIndex={-1} />)
        .find('div[role="menu"]')
        .at(0)
        .getDOMNode();

      expect(element.getAttribute('tabindex')).toBe('-1');
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
  });
});
