import React from 'react';
import { mount } from 'enzyme';

import List, { LIST_CONSTANTS as CONSTANTS } from './';
import ListItemBase from '../ListItemBase';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ListItemBaseSection, MenuTrigger } from '@momentum-ui/react-collaboration';
import ButtonPill from '../ButtonPill';
import Menu from '../Menu';
import { Item } from '@react-stately/collections';

describe('<List />', () => {
  const commonProps = {
    'aria-label': 'test',
    listSize: 2,
  };
  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(
        <List {...commonProps}>
          <ListItemBase key="1">ListItemBase 1</ListItemBase>
          <ListItemBase key="2">ListItemBase 2</ListItemBase>
        </List>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = mount(
        <List className={className} {...commonProps}>
          <ListItemBase key="1">ListItemBase 1</ListItemBase>
          <ListItemBase key="2">ListItemBase 2</ListItemBase>
        </List>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = mount(
        <List id={id} {...commonProps}>
          <ListItemBase key="1">ListItemBase 1</ListItemBase>
          <ListItemBase key="2">ListItemBase 2</ListItemBase>
        </List>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = mount(
        <List style={style} {...commonProps}>
          <ListItemBase key="1">ListItemBase 1</ListItemBase>
          <ListItemBase key="2">ListItemBase 2</ListItemBase>
        </List>
      );

      expect(container).toMatchSnapshot();
    });

    /* ...additional snapshot tests... */
  });

  describe('attributes', () => {
    it('should have its wrapper class', () => {
      expect.assertions(1);

      const element = mount(
        <List {...commonProps}>
          <ListItemBase key="1">ListItemBase 1</ListItemBase>
          <ListItemBase key="2">ListItemBase 2</ListItemBase>
        </List>
      )
        .find(List)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = mount(
        <List className={className} {...commonProps}>
          <ListItemBase key="1">ListItemBase 1</ListItemBase>
          <ListItemBase key="2">ListItemBase 2</ListItemBase>
        </List>
      )
        .find(List)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = mount(
        <List id={id} {...commonProps}>
          <ListItemBase key="1">ListItemBase 1</ListItemBase>
          <ListItemBase key="2">ListItemBase 2</ListItemBase>
        </List>
      )
        .find(List)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = mount(
        <List style={style} {...commonProps}>
          <ListItemBase key="1">ListItemBase 1</ListItemBase>
          <ListItemBase key="2">ListItemBase 2</ListItemBase>
        </List>
      )
        .find(List)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });
  });

  describe('list focus', () => {
    it('should handle up/down arrow keys correctly', () => {
      expect.assertions(8);

      const { getAllByRole } = render(
        <List listSize={3}>
          <ListItemBase key="0" itemIndex={0}>
            ListItemBase 1
          </ListItemBase>
          <ListItemBase key="1" itemIndex={1}>
            ListItemBase 2
          </ListItemBase>
          <ListItemBase key="2" itemIndex={2}>
            ListItemBase 3
          </ListItemBase>
        </List>
      );

      const listItems = getAllByRole('listitem');

      expect(listItems[0]).toHaveFocus();

      userEvent.keyboard('{ArrowDown}');
      expect(listItems[1]).toHaveFocus();

      userEvent.keyboard('{ArrowDown}');
      expect(listItems[2]).toHaveFocus();

      userEvent.keyboard('{ArrowDown}');
      expect(listItems[0]).toHaveFocus();

      userEvent.keyboard('{ArrowUp}');
      expect(listItems[2]).toHaveFocus();

      userEvent.keyboard('{ArrowUp}');
      expect(listItems[1]).toHaveFocus();

      userEvent.keyboard('{ArrowUp}');
      expect(listItems[0]).toHaveFocus();

      userEvent.keyboard('{ArrowUp}');
      expect(listItems[2]).toHaveFocus();
    });

    it('should handle left/right arrow keys correctly', () => {
      expect.assertions(8);

      const { getAllByRole } = render(
        <List listSize={3}>
          <ListItemBase key="0" itemIndex={0}>
            ListItemBase 1
          </ListItemBase>
          <ListItemBase key="1" itemIndex={1}>
            ListItemBase 2
          </ListItemBase>
          <ListItemBase key="2" itemIndex={2}>
            ListItemBase 3
          </ListItemBase>
        </List>
      );
      const listItems = getAllByRole('listitem');

      expect(listItems[0]).toHaveFocus();

      userEvent.keyboard('{ArrowRight}');
      expect(listItems[1]).toHaveFocus();

      userEvent.keyboard('{ArrowRight}');
      expect(listItems[2]).toHaveFocus();

      userEvent.keyboard('{ArrowRight}');
      expect(listItems[0]).toHaveFocus();

      userEvent.keyboard('{ArrowLeft}');
      expect(listItems[2]).toHaveFocus();

      userEvent.keyboard('{ArrowLeft}');
      expect(listItems[1]).toHaveFocus();

      userEvent.keyboard('{ArrowLeft}');
      expect(listItems[0]).toHaveFocus();

      userEvent.keyboard('{ArrowLeft}');
      expect(listItems[2]).toHaveFocus();
    });

    it('should handle focus on tabbable elements in the list row', () => {
      expect.assertions(11);

      const { getAllByRole } = render(
        <List listSize={2}>
          <ListItemBase key="0" itemIndex={0}>
            <ListItemBaseSection>
              <input type="text" />
              <button>Button 1</button>
            </ListItemBaseSection>
          </ListItemBase>
          <ListItemBase key="1" itemIndex={1}>
            <ListItemBaseSection>
              <input type="text" />
              <button>Button 2</button>
            </ListItemBaseSection>
          </ListItemBase>
        </List>
      );
      const listItems = getAllByRole('listitem');
      const inputs = getAllByRole('textbox');
      const buttons = getAllByRole('button');

      expect(listItems[0]).toHaveFocus();

      userEvent.tab();
      expect(inputs[0]).toHaveFocus();

      userEvent.tab();
      expect(buttons[0]).toHaveFocus();

      userEvent.tab();
      expect(document.body).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(buttons[0]).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(inputs[0]).toHaveFocus();

      userEvent.keyboard('{ArrowDown}');
      expect(listItems[1]).toHaveFocus();

      userEvent.tab();
      expect(inputs[1]).toHaveFocus();

      userEvent.tab();
      expect(buttons[1]).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(inputs[1]).toHaveFocus();

      userEvent.tab({ shift: true });
      expect(listItems[1]).toHaveFocus();
    });

    it('should handle menu in the list item', async () => {
      expect.assertions(2);

      const { getAllByRole, findAllByText } = render(
        <List listSize={1}>
          <ListItemBase key="0" itemIndex={0}>
            <MenuTrigger triggerComponent={<ButtonPill size={28}>Menu</ButtonPill>}>
              <Menu selectionMode="single" key="2">
                <Item key="one">menu item 1</Item>
                <Item key="two">menu item 2</Item>
                <Item key="three">menu item 3</Item>
              </Menu>
            </MenuTrigger>
          </ListItemBase>
        </List>
      );
      const listItems = getAllByRole('listitem');

      expect(listItems[0]).toHaveFocus();

      userEvent.tab();
      userEvent.keyboard('{Enter}');

      const firstMenuItem = (await findAllByText('menu item 1'))[0].parentElement;
      expect(firstMenuItem).toHaveFocus();
    });
  });
});
