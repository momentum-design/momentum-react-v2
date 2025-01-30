import React, { useEffect, useRef, useState } from 'react';
import { mount } from 'enzyme';

import List, { LIST_CONSTANTS as CONSTANTS } from './';
import ListItemBase from '../ListItemBase';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  AriaToolbar,
  AriaToolbarItem,
  ListItemBaseSection,
  MenuTrigger,
} from '@momentum-ui/react-collaboration';
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

    it.each([
      { indexes: [0, 1, 2], useItemIndexes: true },
      { indexes: [0, 1, 2], useItemIndexes: false },
      { indexes: ['a', 'b', 'c'], useItemIndexes: true },
    ])(
      'should handle up/down arrow keys correctly for vertical lists',
      async ({ useItemIndexes, indexes }) => {
        expect.assertions(8);
        const user = userEvent.setup();

        const { getAllByRole } = render(
          <List allItemIndexes={useItemIndexes ? indexes : undefined} listSize={3}>
            <ListItemBase key="0" itemIndex={indexes[0]}>
              ListItemBase 1
            </ListItemBase>
            <ListItemBase key="1" itemIndex={indexes[1]}>
              ListItemBase 2
            </ListItemBase>
            <ListItemBase key="2" itemIndex={indexes[2]}>
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
      }
    );

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

    it.each([
      { indexes: [0, 1, 2], useItemIndexes: true },
      { indexes: [0, 1, 2], useItemIndexes: false },
      { indexes: ['a', 'b', 'c'], useItemIndexes: true },
    ])(
      'should handle up/down arrow keys correctly - no loop for vertical lists',
      async ({ useItemIndexes, indexes }) => {
        expect.assertions(6);
        const user = userEvent.setup();

        const { getAllByRole } = render(
          <List
            allItemIndexes={useItemIndexes ? indexes : undefined}
            listSize={3}
            noLoop
            orientation="vertical"
          >
            <ListItemBase key="0" itemIndex={indexes[0]}>
              ListItemBase 1
            </ListItemBase>
            <ListItemBase key="1" itemIndex={indexes[1]}>
              ListItemBase 2
            </ListItemBase>
            <ListItemBase key="2" itemIndex={indexes[2]}>
              ListItemBase 3
            </ListItemBase>
          </List>
        );

        const listItems = getAllByRole('listitem');

        expect(listItems[0]).not.toHaveFocus();

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
      }
    );

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

      // Shift tabbing into the last selects the list item itself again
      await user.tab({ shift: true });
      expect(listItems[0]).toHaveFocus();

      // First interactable within the list item
      await user.tab();
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

    it.each([
      { indexes: [0, 1, 2], useItemIndexes: true },
      { indexes: [0, 1, 2], useItemIndexes: false },
      { indexes: ['a', 'b', 'c'], useItemIndexes: true },
    ])(
      'should focus programmatically on the specified index',
      async ({ useItemIndexes, indexes }) => {
        expect.assertions(4);
        const user = userEvent.setup();

        const ProgrammaticList = () => {
          const listRef = useRef<ListRefObject>(null);

          return (
            <>
              <button
                onClick={() => {
                  listRef.current.focusOnIndex(indexes[0]);
                }}
              >
                focus on 0
              </button>
              <button
                onClick={() => {
                  listRef.current.focusOnIndex(indexes[1]);
                }}
              >
                focus on 1
              </button>
              <button
                onClick={() => {
                  listRef.current.focusOnIndex(indexes[2]);
                }}
              >
                focus on 2
              </button>
              <List
                allItemIndexes={useItemIndexes ? indexes : undefined}
                listSize={3}
                ref={listRef}
              >
                <ListItemBase key="0" itemIndex={indexes[0]}>
                  <p>list item 1</p>
                </ListItemBase>
                <ListItemBase key="1" itemIndex={indexes[1]}>
                  <p>list item 2</p>
                </ListItemBase>
                <ListItemBase key="2" itemIndex={indexes[2]}>
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
      }
    );

    it.each([
      { indexes: [0, 1, 2], useItemIndexes: true },
      { indexes: [0, 1, 2], useItemIndexes: false },
      { indexes: ['a', 'b', 'c'], useItemIndexes: true },
    ])('should focus the item with initialFocus', async ({ useItemIndexes, indexes }) => {
      const user = userEvent.setup();

      const { getByTestId, rerender } = render(
        <List
          listSize={3}
          allItemIndexes={useItemIndexes ? indexes : undefined}
          initialFocus={indexes[1]}
        >
          <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
            0
          </ListItemBase>
          <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
            1
          </ListItemBase>
          <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[2]}>
            2
          </ListItemBase>
        </List>
      );

      expect(document.body).toHaveFocus();

      await user.tab();

      expect(getByTestId('list-item-1')).toHaveFocus();

      // If the list is already focused, changing the initial
      // focus should not change the current focused position

      rerender(
        <List
          listSize={3}
          allItemIndexes={useItemIndexes ? indexes : undefined}
          initialFocus={indexes[1]}
        >
          <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
            0
          </ListItemBase>
          <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
            1
          </ListItemBase>
          <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[2]}>
            2
          </ListItemBase>
          <ListItemBase data-testid="list-item-3" key="3" itemIndex={indexes[3]}>
            3
          </ListItemBase>
        </List>
      );

      expect(getByTestId('list-item-1')).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(getByTestId('list-item-2')).toHaveFocus();
    });

    it.each([
      { indexes: [0, 1, 2, 3], useItemIndexes: true },
      { indexes: [0, 1, 2, 3], useItemIndexes: false },
      { indexes: ['a', 'b', 'c', 'd'], useItemIndexes: true },
    ])(
      'should focus the item with initialFocus when updated',
      async ({ useItemIndexes, indexes }) => {
        const user = userEvent.setup();

        const { getByTestId, rerender } = render(
          <List
            allItemIndexes={useItemIndexes ? indexes : undefined}
            listSize={3}
            initialFocus={indexes[1]}
          >
            <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
              0
            </ListItemBase>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
              1
            </ListItemBase>
            <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[2]}>
              2
            </ListItemBase>
          </List>
        );

        expect(document.body).toHaveFocus();

        rerender(
          <List
            allItemIndexes={useItemIndexes ? indexes : undefined}
            listSize={4}
            initialFocus={indexes[2]}
          >
            <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
              0
            </ListItemBase>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
              1
            </ListItemBase>
            <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[2]}>
              2
            </ListItemBase>
            <ListItemBase data-testid="list-item-3" key="3" itemIndex={indexes[3]}>
              3
            </ListItemBase>
          </List>
        );

        expect(document.body).toHaveFocus();

        await user.tab();

        expect(getByTestId('list-item-2')).toHaveFocus();
      }
    );

    it.each([
      { indexes: [0, 1, 2], useItemIndexes: true },
      { indexes: [0, 1, 2], useItemIndexes: false },
      { indexes: ['a', 'b', 'c'], useItemIndexes: true },
    ])(
      'should not autofocus when a new item is added to the list',
      async ({ useItemIndexes, indexes }) => {
        const { rerender } = render(
          <List allItemIndexes={useItemIndexes ? indexes : undefined} listSize={2}>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[0]}>
              1
            </ListItemBase>
            <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[1]}>
              2
            </ListItemBase>
          </List>
        );

        expect(document.body).toHaveFocus();

        rerender(
          <List allItemIndexes={useItemIndexes ? indexes : undefined} listSize={3}>
            <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
              0
            </ListItemBase>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
              1
            </ListItemBase>
            <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[2]}>
              2
            </ListItemBase>
          </List>
        );

        expect(document.body).toHaveFocus();
      }
    );

    it.each([
      {
        initialData: [
          { index: 0, label: 0 },
          { index: 1, label: 1 },
          { index: 2, label: 2 },
          { index: 3, label: 3 },
        ],
        endData: [
          { index: 0, label: 1 },
          { index: 1, label: 2 },
          { index: 2, label: 3 },
        ],
        useItemIndexes: true,
      },

      {
        initialData: [
          { index: 0, label: 0 },
          { index: 1, label: 1 },
          { index: 2, label: 2 },
          { index: 3, label: 3 },
        ],
        endData: [
          { index: 0, label: 1 },
          { index: 1, label: 2 },
          { index: 2, label: 3 },
        ],
        useItemIndexes: false,
      },

      {
        initialData: [
          { index: 'a', label: 0 },
          { index: 'b', label: 1 },
          { index: 'c', label: 2 },
          { index: 'd', label: 3 },
        ],
        endData: [
          { index: 'b', label: 1 },
          { index: 'c', label: 2 },
          { index: 'd', label: 3 },
        ],
        useItemIndexes: true,
      },
    ])(
      'should retain focus when the first item is removed from list',
      async ({ initialData, endData, useItemIndexes }) => {
        const user = userEvent.setup();

        const { getByTestId, rerender } = render(
          <List
            allItemIndexes={useItemIndexes ? initialData.map((item) => item.index) : undefined}
            listSize={3}
          >
            {initialData.map((item) => (
              <ListItemBase
                data-testid={`list-item-${item.label}`}
                key={item.label}
                itemIndex={item.index}
              >
                {item.label}
              </ListItemBase>
            ))}
          </List>
        );

        expect(document.body).toHaveFocus();

        await user.tab();

        expect(getByTestId('list-item-0')).toHaveFocus();

        rerender(
          <List
            allItemIndexes={useItemIndexes ? endData.map((item) => item.index) : undefined}
            listSize={2}
          >
            {endData.map((item) => (
              <ListItemBase
                data-testid={`list-item-${item.label}`}
                key={item.label}
                itemIndex={item.index}
              >
                {item.label}
              </ListItemBase>
            ))}
          </List>
        );

        expect(getByTestId('list-item-1')).toHaveFocus();
      }
    );

    it.each([
      { initialIndexes: [0, 1, 2], indexesEnd: [1, 2], useItemIndexes: true },
      { initialIndexes: [0, 1, 2], indexesEnd: [0, 1], useItemIndexes: false },
      { initialIndexes: ['a', 'b', 'c'], indexesEnd: ['b', 'c'], useItemIndexes: true },
    ])(
      'should retain focus when the an item before the focused item is removed from list',
      async ({ initialIndexes, indexesEnd, useItemIndexes }) => {
        const user = userEvent.setup();

        const { getByTestId, rerender } = render(
          <List allItemIndexes={useItemIndexes ? initialIndexes : undefined} listSize={3}>
            <ListItemBase
              data-testid="list-item-0"
              key={initialIndexes[0]}
              itemIndex={initialIndexes[0]}
            >
              0
            </ListItemBase>
            <ListItemBase
              id="test"
              data-testid="list-item-1"
              key={initialIndexes[1]}
              itemIndex={initialIndexes[1]}
            >
              1
            </ListItemBase>
            <ListItemBase
              data-testid="list-item-2"
              key={initialIndexes[2]}
              itemIndex={initialIndexes[2]}
            >
              2
            </ListItemBase>
          </List>
        );

        expect(document.body).toHaveFocus();

        await user.tab();

        expect(getByTestId('list-item-0')).toHaveFocus();

        await user.keyboard('{ArrowDown}');

        expect(getByTestId('list-item-1')).toHaveFocus();

        rerender(
          <List allItemIndexes={useItemIndexes ? indexesEnd : undefined} listSize={2}>
            <ListItemBase
              id="test"
              data-testid="list-item-1"
              key={initialIndexes[1]}
              itemIndex={indexesEnd[0]}
            >
              1
            </ListItemBase>
            <ListItemBase
              data-testid="list-item-2"
              key={initialIndexes[2]}
              itemIndex={indexesEnd[1]}
            >
              2
            </ListItemBase>
          </List>
        );

        expect(getByTestId('list-item-1')).toHaveFocus();
      }
    );

    it.each([
      { indexes: [0, 1, 2], useItemIndexes: true, expectedNextFocus: 'list-item-1' },
      { indexes: [0, 1, 2], useItemIndexes: false },
      { indexes: ['a', 'b', 'c'], useItemIndexes: true, expectedNextFocus: 'list-item-1' },
    ])(
      'should retain focus when the last item has focus and is removed from list',
      async ({ indexes, useItemIndexes, expectedNextFocus }) => {
        const user = userEvent.setup();

        const { getByTestId, rerender } = render(
          <List allItemIndexes={useItemIndexes ? indexes : undefined} listSize={3}>
            <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
              0
            </ListItemBase>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
              1
            </ListItemBase>
            <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[2]}>
              2
            </ListItemBase>
          </List>
        );

        await user.tab();

        expect(getByTestId('list-item-0')).toHaveFocus();

        await user.keyboard('{ArrowDown}');

        expect(getByTestId('list-item-1')).toHaveFocus();

        await user.keyboard('{ArrowDown}');

        expect(getByTestId('list-item-2')).toHaveFocus();

        rerender(
          <List allItemIndexes={useItemIndexes ? indexes.slice(0, 2) : undefined} listSize={2}>
            <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
              0
            </ListItemBase>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
              1
            </ListItemBase>
          </List>
        );

        expect(getByTestId(expectedNextFocus ?? 'list-item-1')).toHaveFocus();
      }
    );

    it.each([
      { indexes: [0, 1, 2], useItemIndexes: true },
      { indexes: [0, 1, 2], useItemIndexes: false },
      { indexes: ['a', 'b', 'c'], useItemIndexes: true },
    ])(
      'should not autofocus when the last item is removed from the list',
      async ({ indexes, useItemIndexes }) => {
        const { rerender } = render(
          <List allItemIndexes={useItemIndexes ? indexes : undefined} listSize={3}>
            <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
              0
            </ListItemBase>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
              1
            </ListItemBase>
            <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[2]}>
              2
            </ListItemBase>
          </List>
        );

        expect(document.body).toHaveFocus();

        rerender(
          <List allItemIndexes={useItemIndexes ? indexes : undefined} listSize={2}>
            <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
              0
            </ListItemBase>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
              1
            </ListItemBase>
          </List>
        );

        expect(document.body).toHaveFocus();
      }
    );

    it.each([
      { indexes: [0, 1, 2], useItemIndexes: true },
      { indexes: [0, 1, 2], useItemIndexes: false },
      { indexes: ['a', 'b', 'c'], useItemIndexes: true },
    ])(
      'should retain focus when a middle focused item is removed from list',
      async ({ indexes, useItemIndexes }) => {
        const user = userEvent.setup();

        const { getByTestId, rerender } = render(
          <List allItemIndexes={useItemIndexes ? indexes : undefined} listSize={3}>
            <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
              0
            </ListItemBase>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
              1
            </ListItemBase>
            <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[2]}>
              2
            </ListItemBase>
          </List>
        );

        await user.tab();

        expect(getByTestId('list-item-0')).toHaveFocus();

        await user.keyboard('{ArrowDown}');

        expect(getByTestId('list-item-1')).toHaveFocus();

        rerender(
          <List allItemIndexes={indexes} listSize={2}>
            <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
              0
            </ListItemBase>
            <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[1]}>
              2
            </ListItemBase>
          </List>
        );

        expect(getByTestId('list-item-2')).toHaveFocus();
      }
    );

    it.each([
      { indexes: [0, 1, 2], useItemIndexes: false },
      { indexes: [0, 1, 2], useItemIndexes: true },
      { indexes: ['a', 'b', 'c'], useItemIndexes: true },
    ])(
      'should focus as expected when more items are added before tabbing to the list',
      async ({ indexes, useItemIndexes }) => {
        const user = userEvent.setup();

        const { getByTestId, rerender } = render(
          <List allItemIndexes={useItemIndexes ? indexes : undefined} listSize={2}>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
              1
            </ListItemBase>
            <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[2]}>
              2
            </ListItemBase>
          </List>
        );

        expect(document.body).toHaveFocus();

        rerender(
          <List allItemIndexes={useItemIndexes ? indexes : undefined} listSize={3}>
            <ListItemBase data-testid="list-item-0" key="0" itemIndex={indexes[0]}>
              0
            </ListItemBase>
            <ListItemBase data-testid="list-item-1" key="1" itemIndex={indexes[1]}>
              1
            </ListItemBase>
            <ListItemBase data-testid="list-item-2" key="2" itemIndex={indexes[2]}>
              2
            </ListItemBase>
          </List>
        );

        await user.tab();

        expect(getByTestId('list-item-0')).toHaveFocus();
      }
    );

    it('should handle the list size going to zero and then back again', async () => {
      const user = userEvent.setup();

      const { getByTestId, rerender } = render(
        <List listSize={2}>
          <ListItemBase data-testid="list-item-0" key="0" itemIndex={0}>
            0
          </ListItemBase>
          <ListItemBase data-testid="list-item-1" key="1" itemIndex={1}>
            1
          </ListItemBase>
        </List>
      );

      await user.tab();

      expect(getByTestId('list-item-0')).toHaveFocus();

      await user.keyboard('{ArrowDown}');

      expect(getByTestId('list-item-1')).toHaveFocus();

      rerender(<List listSize={0} />);

      expect(document.body).toHaveFocus();

      rerender(
        <List listSize={1}>
          <ListItemBase data-testid="list-item-0" key="0" itemIndex={0}>
            0
          </ListItemBase>
        </List>
      );

      expect(getByTestId('list-item-0')).toHaveFocus();
    });

    it('should handle text selection', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <List listSize={1} shouldFocusOnPress>
          <ListItemBase allowTextSelection data-testid="list-item-0" key="0" itemIndex={0}>
            text selection
          </ListItemBase>
        </List>
      );

      await user.pointer([
        { target: getByTestId('list-item-0'), offset: 0, keys: '[MouseLeft>]' },
        { offset: 4 },
        { keys: '[/MouseLeft]' },
      ]);

      const selection = document.getSelection()?.toString();

      expect(selection).toBe('text');
    });

    it('should handle text selection - pointer', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <List listSize={1} shouldFocusOnPress>
          <ListItemBase allowTextSelection data-testid="list-item-0" key="0" itemIndex={0}>
            textselection
          </ListItemBase>
        </List>
      );

      await user.pointer([
        { target: getByTestId('list-item-0'), offset: 0, keys: '[TouchA]' },
        { target: getByTestId('list-item-0'), offset: 4, keys: '[TouchB]' },
      ]);

      const selection = document.getSelection()?.toString();

      expect(selection).toBe('textselection');
    });

    it('should handle text selection of a not currently focused element', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <List listSize={2} shouldFocusOnPress>
          <ListItemBase allowTextSelection data-testid="list-item-0" key="0" itemIndex={0}>
            text selection
          </ListItemBase>
          <ListItemBase allowTextSelection data-testid="list-item-1" key="1" itemIndex={1}>
            other selection
          </ListItemBase>
        </List>
      );

      await user.tab();

      expect(getByTestId('list-item-0')).toHaveFocus();

      await user.pointer([
        { target: getByTestId('list-item-1'), offset: 0, keys: '[MouseLeft>]' },
        { offset: 4 },
        { keys: '[/MouseLeft]' },
      ]);

      const selection = document.getSelection()?.toString();

      expect(selection).toBe('othe');
    });

    it('should handle text selection of a not currently focused element - pointer', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <List listSize={2} shouldFocusOnPress>
          <ListItemBase allowTextSelection data-testid="list-item-0" key="0" itemIndex={0}>
            text selection
          </ListItemBase>
          <ListItemBase allowTextSelection data-testid="list-item-1" key="1" itemIndex={1}>
            other selection
          </ListItemBase>
        </List>
      );

      await user.tab();

      await user.pointer([
        { target: getByTestId('list-item-1'), offset: 0, keys: '[TouchA]' },
        { target: getByTestId('list-item-1'), offset: 4, keys: '[TouchB]' },
      ]);
      const selection = document.getSelection()?.toString();

      expect(selection).toBe('other');
    });

    it('should focus on press when shouldFocusOnPress is true', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <List listSize={3} shouldFocusOnPress>
          <ListItemBase data-testid="list-item-0" key="0" itemIndex={0}>
            0
          </ListItemBase>
          <ListItemBase
            id="test"
            allowTextSelection
            data-testid="list-item-1"
            key="1"
            itemIndex={1}
          >
            1
          </ListItemBase>
          <ListItemBase allowTextSelection data-testid="list-item-2" key="2" itemIndex={2}>
            2
          </ListItemBase>
        </List>
      );

      await user.tab();

      expect(getByTestId('list-item-0')).toHaveFocus();

      await user.click(getByTestId('list-item-1'));

      expect(getByTestId('list-item-1')).toHaveFocus();
    });

    it('should handle an AriaToolbar in a list correctly', async () => {
      const user = userEvent.setup();

      const { getByTestId } = render(
        <>
          <ButtonPill data-testid="before">Before</ButtonPill>
          <List listSize={2}>
            <ListItemBase data-testid="list-item-0" size="auto" itemIndex={0} key={0}>
              <AriaToolbar aria-label="toolbar" ariaToolbarItemsSize={2}>
                <AriaToolbarItem itemIndex={0}>
                  <ButtonPill data-testid="button-1">Button 1</ButtonPill>
                </AriaToolbarItem>
                <AriaToolbarItem itemIndex={1}>
                  <ButtonPill data-testid="button-2">Button 2</ButtonPill>
                </AriaToolbarItem>
              </AriaToolbar>
            </ListItemBase>
            <ListItemBase data-testid="list-item-1" itemIndex={1} key={1}>
              1
            </ListItemBase>
          </List>
          <ButtonPill data-testid="after">After</ButtonPill>
        </>
      );

      expect(document.body).toHaveFocus();

      await user.tab();

      expect(getByTestId('before')).toHaveFocus();

      await user.tab();

      expect(getByTestId('list-item-0')).toHaveFocus();

      await user.tab();

      expect(getByTestId('button-1')).toHaveFocus();

      await user.tab();

      expect(getByTestId('after')).toHaveFocus();

      await user.tab({ shift: true });

      expect(getByTestId('list-item-0')).toHaveFocus();

      await user.tab();

      expect(getByTestId('button-1')).toHaveFocus();

      await user.keyboard('{ArrowRight}');

      expect(getByTestId('button-2')).toHaveFocus();

      await user.tab();

      expect(getByTestId('after')).toHaveFocus();
    });
  });
});
