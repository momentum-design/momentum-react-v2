import React, { useEffect, useState } from 'react';
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

    it('should match snapshot with role', () => {
      expect.assertions(1);

      const container = mount(
        <List role="tablist" {...commonProps}>
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
    it('should handle escape being pressed', async () => {
      const keyDownHandler = jest.fn();

      const { getByRole } = render(
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onKeyDown={keyDownHandler}>
          <List listSize={1}>
            <ListItemBase key="0" itemIndex={0}>
              ListItemBase 1
            </ListItemBase>
          </List>
        </div>
      );

      const listItem = getByRole('listitem');

      await userEvent.tab();
      expect(listItem).toHaveFocus();

      await userEvent.keyboard('{Escape}');
      expect(keyDownHandler).toHaveBeenCalled();
    });

    it('should handle up/down arrow keys correctly', async () => {
      expect.assertions(8);
      const user = userEvent.setup();

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

      await user.tab();

      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(listItems[1]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(listItems[2]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(listItems[2]).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(listItems[1]).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(listItems[2]).toHaveFocus();
    });

    it('should handle up/down arrow keys correctly - no loop', async () => {
      expect.assertions(5);
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <List listSize={3} noLoop>
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

      await user.tab();

      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(listItems[1]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(listItems[2]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(listItems[2]).toHaveFocus();
    });

    it('should handle left/right arrow keys correctly', async () => {
      expect.assertions(8);
      const user = userEvent.setup();

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

      await user.tab();

      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(listItems[1]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(listItems[2]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(listItems[2]).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(listItems[1]).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(listItems[2]).toHaveFocus();
    });

    it('should handle left/right arrow keys correctly - no loop', async () => {
      expect.assertions(5);
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <List listSize={3} noLoop>
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

      await user.tab();

      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowLeft}');
      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(listItems[1]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(listItems[2]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(listItems[2]).toHaveFocus();
    });

    it('should handle focus on tabbable elements in the list row', async () => {
      expect.assertions(10);
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <List listSize={2}>
          <ListItemBase key="0" itemIndex={0}>
            <ListItemBaseSection position="fill">
              <input type="text" id="1" />
              <button>Button 1</button>
            </ListItemBaseSection>
          </ListItemBase>
          <ListItemBase key="1" itemIndex={1}>
            <ListItemBaseSection position="fill">
              <input type="text" id="2" />
              <button>Button 2</button>
            </ListItemBaseSection>
          </ListItemBase>
        </List>
      );
      const listItems = getAllByRole('listitem');
      const inputs = getAllByRole('textbox');
      const buttons = getAllByRole('button');

      await user.tab();

      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(inputs[0]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(buttons[0]).toHaveFocus();

      await user.tab();
      expect(document.body).toHaveFocus();

      await user.tab({ shift: true });
      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowRight}');

      expect(inputs[0]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(listItems[1]).toHaveFocus();

      await user.keyboard('{ArrowRight}');

      expect(inputs[1]).toHaveFocus();

      await user.keyboard('{ArrowRight}');

      expect(buttons[1]).toHaveFocus();

      await user.keyboard('{ArrowLeft}');

      expect(inputs[1]).toHaveFocus();
    });

    it('should handle menu in the list item', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

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

      await user.tab();

      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      await user.keyboard('{Enter}');

      const firstMenuItem = (await findAllByText('menu item 1'))[0].closest('li');
      expect(firstMenuItem).toHaveFocus();
    });

    it('should handle focus on tabbable elements in the list row even when the item changes', async () => {
      expect.assertions(4);
      const user = userEvent.setup();

      const DynamicComponent = () => {
        const [muted, setMuted] = useState(false);
        useEffect(() => {
          setTimeout(() => setMuted(() => true));
        }, []);

        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        return muted ? <div tabIndex={0}>muted</div> : <button>mute</button>;
      };

      const { getAllByRole, findAllByText } = render(
        <List listSize={2}>
          <ListItemBase key="0" itemIndex={0}>
            <button>Button 1</button>
          </ListItemBase>
          <ListItemBase key="1" itemIndex={1}>
            <DynamicComponent />
          </ListItemBase>
        </List>
      );

      const listItems = getAllByRole('listitem');
      const buttons = getAllByRole('button');

      await user.tab();

      expect(listItems[0]).toHaveFocus();

      await user.keyboard('{ArrowRight}');
      expect(buttons[0]).toHaveFocus();

      const updatedButton = await findAllByText('muted');

      await user.tab();
      expect(updatedButton[0]).not.toHaveFocus();
      expect(document.body).toHaveFocus();
    });
  });
});
