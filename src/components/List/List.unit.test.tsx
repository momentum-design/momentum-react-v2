import React, { useEffect, useRef, useState } from 'react';
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
import { ListRefObject } from './List.types';

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

    it('should have provided aria-label when aria-label is provided', () => {
      expect.assertions(1);

      const label = 'test';

      const element = mount(
        <List aria-label={label} {...commonProps}>
          <ListItemBase key="1">ListItemBase 1</ListItemBase>
          <ListItemBase key="2">ListItemBase 2</ListItemBase>
        </List>
      )
        .find(List)
        .getDOMNode();

      expect(element.getAttribute('aria-label')).toBe('test');
    });

    it('should have provided aria-labelledby when aria-labelledby is provided', () => {
      expect.assertions(1);

      const labelBy = 'test';

      const element = mount(
        <List aria-labelledby={labelBy} {...commonProps}>
          <ListItemBase key="1">ListItemBase 1</ListItemBase>
          <ListItemBase key="2">ListItemBase 2</ListItemBase>
        </List>
      )
        .find(List)
        .getDOMNode();

      expect(element.getAttribute('aria-labelledby')).toBe('test');
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

    it('should handle up/down arrow keys correctly for vertical lists', async () => {
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

    it('is vertically oriented by default', async () => {
      expect.assertions(3);
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

      await user.keyboard('{ArrowUp}');
      expect(listItems[0]).toHaveFocus();
    });

    it('should handle up/down arrow keys correctly - no loop for vertical lists', async () => {
      expect.assertions(5);
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <List listSize={3} noLoop orientation="vertical">
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

    it('should handle left/right arrow keys correctly for horizontal lists', async () => {
      expect.assertions(8);
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <List listSize={3} orientation="horizontal">
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

    it('should handle left/right arrow keys correctly - no loop for horizontal lists', async () => {
      expect.assertions(5);
      const user = userEvent.setup();

      const { getAllByRole } = render(
        <List listSize={3} noLoop orientation="horizontal">
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
      expect.assertions(11);
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

      // Move focus to the list
      await user.tab();
      expect(listItems[0]).toHaveFocus();

      // Move focus to the first interactive element in the first list item
      await user.tab();
      expect(inputs[0]).toHaveFocus();

      // Second interactable
      await user.tab();
      expect(buttons[0]).toHaveFocus();

      // Move focus to the next interactable element after the list, when
      // no more interactable elements are in the selected list item
      await user.tab();
      expect(document.body).toHaveFocus();

      // Move focus to the last interactable element of the last selected list item
      await user.tab({ shift: true });
      expect(buttons[0]).toHaveFocus();

      // Second last interactable
      await user.tab({ shift: true });
      expect(inputs[0]).toHaveFocus();

      // Move focus to the selected list item
      await user.tab({ shift: true });
      expect(listItems[0]).toHaveFocus();

      // Second list item
      await user.keyboard('{ArrowDown}');
      expect(listItems[1]).toHaveFocus();

      // Second list item first interactable
      await user.tab();
      expect(inputs[1]).toHaveFocus();

      // Second list item second interactable
      await user.tab();
      expect(buttons[1]).toHaveFocus();

      // Second list item first interactable again
      await user.tab({ shift: true });
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

      await user.tab();
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

      await user.tab();
      expect(buttons[0]).toHaveFocus();

      const updatedButton = await findAllByText('muted');

      await user.tab();
      expect(updatedButton[0]).not.toHaveFocus();
      expect(document.body).toHaveFocus();
    });

    it('should focus programmatically on the specified index', async () => {
      expect.assertions(4);
      const user = userEvent.setup();

      const ProgrammaticList = () => {
        const listRef = useRef<ListRefObject>(null);

        return (
          <>
            <button
              onClick={() => {
                listRef.current.focusOnIndex(0);
              }}
            >
              focus on 0
            </button>
            <button
              onClick={() => {
                listRef.current.focusOnIndex(1);
              }}
            >
              focus on 1
            </button>
            <button
              onClick={() => {
                listRef.current.focusOnIndex(2);
              }}
            >
              focus on 2
            </button>
            <List listSize={3} ref={listRef}>
              <ListItemBase key="0" itemIndex={0}>
                <p>list item 1</p>
              </ListItemBase>
              <ListItemBase key="1" itemIndex={1}>
                <p>list item 2</p>
              </ListItemBase>
              <ListItemBase key="2" itemIndex={2}>
                <p>list item 3</p>
              </ListItemBase>
            </List>
          </>
        );
      };

      const { getAllByRole } = render(<ProgrammaticList />);

      const listItems = getAllByRole('listitem');
      const buttons = getAllByRole('button');

      // tab past the buttons
      await user.tab();
      await user.tab();
      await user.tab();
      await user.tab();

      expect(listItems[0]).toHaveFocus();

      await user.click(buttons[1]);
      expect(listItems[1]).toHaveFocus();

      await user.click(buttons[2]);

      expect(listItems[2]).toHaveFocus();

      await user.click(buttons[0]);

      expect(listItems[0]).toHaveFocus();
    });

    it('should move the current focus on if there are no child nodes - empty node at index 0', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <List listSize={3}>
          <ListItemBase data-testid="list-item-0" key="0" itemIndex={0} />
          <ListItemBase data-testid="list-item-1" key="1" itemIndex={1}>
            1
          </ListItemBase>
          <ListItemBase data-testid="list-item-2" key="2" itemIndex={2}>
            2
          </ListItemBase>
        </List>
      );

      await user.tab();

      expect(getByTestId('list-item-1')).toHaveFocus();

      // now element 1 has focus, we need to check going back the other way
      // press shift + tab
      await user.keyboard('{ArrowUp}');

      // element 0 should have been skipped and element 2 should have focus
      expect(getByTestId('list-item-2')).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(getByTestId('list-item-1')).toHaveFocus();
    });

    it('should move the current focus on if there are no child nodes - empty node at end', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <List listSize={3}>
          <ListItemBase data-testid="list-item-0" key="0" itemIndex={0}>
            0
          </ListItemBase>
          <ListItemBase data-testid="list-item-1" key="1" itemIndex={1}>
            1
          </ListItemBase>
          <ListItemBase data-testid="list-item-2" key="2" itemIndex={2} />
        </List>
      );

      await user.tab();

      expect(getByTestId('list-item-0')).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(getByTestId('list-item-1')).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(getByTestId('list-item-0')).toHaveFocus();
    });

    it('should move the current focus on if there are no child nodes - empty node at index 0, noLoop', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <List noLoop listSize={3}>
          <ListItemBase data-testid="list-item-0" key="0" itemIndex={0} />
          <ListItemBase data-testid="list-item-1" key="1" itemIndex={1}>
            1
          </ListItemBase>
          <ListItemBase data-testid="list-item-2" key="2" itemIndex={2}>
            2
          </ListItemBase>
        </List>
      );

      await user.tab();

      expect(getByTestId('list-item-1')).toHaveFocus();

      // now element 1 has focus, we need to check going back the other way
      // press shift + tab
      await user.keyboard('{ArrowUp}');

      // Because of noLoop, we are stuck on item 1
      expect(getByTestId('list-item-1')).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(getByTestId('list-item-2')).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      // Because of noLoop, we are stuck on item 2
      expect(getByTestId('list-item-2')).toHaveFocus();
    });

    it('should move the current focus on if there are no child nodes - empty node at end, noLoop', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <List noLoop listSize={3}>
          <ListItemBase data-testid="list-item-0" key="0" itemIndex={0}>
            0
          </ListItemBase>
          <ListItemBase data-testid="list-item-1" key="1" itemIndex={1}>
            1
          </ListItemBase>
          <ListItemBase data-testid="list-item-2" key="2" itemIndex={2} />
        </List>
      );

      await user.tab();

      expect(getByTestId('list-item-0')).toHaveFocus();

      await user.keyboard('{ArrowUp}');

      // Noloop, so we are stuck on item 0
      expect(getByTestId('list-item-0')).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(getByTestId('list-item-1')).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      // Noloop, so we are stuck on item 1
      expect(getByTestId('list-item-1')).toHaveFocus();
    });
  });
});
