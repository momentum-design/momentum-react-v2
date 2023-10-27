import Select from '.';
import React from 'react';
import { Item } from '@react-stately/collections';
import { DIRECTIONS, STYLE } from './Select.constants';
import { mountAndWait, triggerPress, waitForComponentToPaint } from '../../../test/utils';
import ListBoxBase from '../ListBoxBase';
import Popover from '../Popover';

import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('@react-aria/utils');
jest.mock('uuid', () => {
  return {
    v4: () => '1',
  };
});

describe('Select', () => {
  let container;

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      container = await mountAndWait(
        <Select id="test-id" className={className} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      container = await mountAndWait(
        <Select id={id} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      container = await mountAndWait(
        <Select id="test-id" style={style} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with placeholder', async () => {
      expect.assertions(1);

      const placeholder = 'Select an option';

      container = await mountAndWait(
        <Select id="test-id" placeholder={placeholder} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with direction', async () => {
      expect.assertions(1);

      const direction = DIRECTIONS.top;

      container = await mountAndWait(
        <Select id="test-id" direction={direction} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with border', async () => {
      expect.assertions(1);

      const showBorder = false;

      container = await mountAndWait(
        <Select id="test-id" showBorder={showBorder} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with listbox opened', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select id="test-id" label="test" isOpen={true}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with disabled option', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select id="test-id" label="test" isOpen={true} disabledKeys={['$.0']}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with selected option and listbox closed', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select id="test-id" label="test" defaultSelectedKey={'$.0'}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with selected option and listbox open', async () => {
      expect.assertions(1);

      container = await mountAndWait(
        <Select id="test-id" label="test" isOpen={true} defaultSelectedKey={'$.0'}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot before and after opening select dropdown', async () => {
      expect.assertions(2);

      container = await mountAndWait(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();

      const button = container.find('.md-select-dropdown-input');

      triggerPress(button);

      await waitForComponentToPaint(container);
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with title', async () => {
      expect.assertions(1);

      const title = 'Example text';

      container = await mountAndWait(
        <Select title={title} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with listboxMaxHeight', async () => {
      expect.assertions(1);

      const listboxMaxHeight = '50px';

      container = await mountAndWait(
        <Select listboxMaxHeight={listboxMaxHeight} isOpen={true} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      container = await mountAndWait(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const element = container.find(Select).getDOMNode();

      expect(element.classList.contains(STYLE.wrapper));
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);
      const className = 'example-class';

      container = await mountAndWait(
        <Select id="test-id" className={className} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      const element = container.find(Select).getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const wrapper = await mountAndWait(
        <Select id={id} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const element = wrapper.find(Select).getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const wrapper = await mountAndWait(
        <Select id="test-id" style={style} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const element = wrapper.find(Select).getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have listbox open when isOpen prop is set to true', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(
        <Select id="test-id" isOpen={true} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const element = wrapper.find(ListBoxBase).getDOMNode();

      expect(element).toBeDefined();
    });

    it('should display tick next to selected option', async () => {
      expect.assertions(1);

      const wrapper = await mountAndWait(
        <Select id="test-id" isOpen={true} label="test" defaultSelectedKey={'$.0'}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const svg = wrapper.find('li[data-key="$.0"] svg').getDOMNode();

      expect(svg).toBeDefined();
    });

    it('should have provided title when title is provided', async () => {
      expect.assertions(1);

      const title = 'Example Text';

      const wrapper = await mountAndWait(
        <Select title={title} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );
      const button = wrapper.find('.md-select-dropdown-input').getDOMNode();

      expect(button.getAttribute('title')).toBe(title);
    });

    it('should have expected props on Popover', async () => {
      expect.assertions(1);

      const direction = 'top';

      const wrapper = await mountAndWait(
        <Select direction={direction} label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      expect(wrapper.find(Popover).props()).toEqual({
        interactive: true,
        showArrow: false,
        triggerComponent: expect.any(Object),
        trigger: 'manual',
        setInstance: expect.any(Function),
        placement: direction,
        onClickOutside: expect.any(Function),
        onHide: expect.any(Function),
        hideOnEsc: false,
        style: { maxHeight: 'none' },
        className: 'md-select-popover',
        children: expect.any(Object),
        onKeyDown: expect.any(Function),
        onKeyUp: undefined,
      });
    });
  });

  describe('actions', () => {
    it('should show Listbox on click', async () => {
      const user = userEvent.setup();

      render(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      // list box shouldn't be shown initially
      const listbox = screen.queryByRole('listbox');
      expect(listbox).not.toBeInTheDocument();

      // list box should be shown after clicking on button
      await user.click(screen.getByRole('button', { name: 'test' }));
      expect(screen.getByRole('listbox')).toBeVisible();
    });

    it('should show Listbox when focused and pressing enter', async () => {
      const user = userEvent.setup();

      render(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      // list box shouldn't be shown initially
      const listbox = screen.queryByRole('listbox');
      expect(listbox).not.toBeInTheDocument();

      const button = screen.getByRole('button', { name: 'test' });
      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard('{Enter}');
      // list box should be shown after focus and pressing enter
      expect(screen.getByRole('listbox')).toBeVisible();
    });

    it('should show Listbox when focused and pressing space', async () => {
      const user = userEvent.setup();

      render(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      // list box shouldn't be shown initially
      const listbox = screen.queryByRole('listbox');
      expect(listbox).not.toBeInTheDocument();

      const button = screen.getByRole('button', { name: 'test' });
      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard('{ }');
      // list box should be shown after focus and pressing space
      expect(screen.getByRole('listbox')).toBeVisible();
    });

    it('should hide Listbox when clicking outside', async () => {
      const user = userEvent.setup();

      render(
        <>
          <Select id="test-id" label="test">
            <Item>Item 1</Item>
            <Item>Item 2</Item>
          </Select>
          <button>button-outside</button>
        </>
      );

      // open listbox
      await user.click(screen.getByRole('button', { name: 'test' }));
      expect(screen.getByRole('listbox')).toBeVisible();

      // close listbox by clicking outside
      await user.click(screen.getByRole('button', { name: 'button-outside' }));
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('should hide Listbox when pressing Escape', async () => {
      const user = userEvent.setup();

      render(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      // open listbox
      await user.click(screen.getByRole('button', { name: 'test' }));
      expect(screen.getByRole('listbox')).toBeVisible();

      // close listbox by pressing escape
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('should select first option when pressing enter after opening', async () => {
      const user = userEvent.setup();

      render(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      // open listbox
      await user.click(screen.getByRole('button', { name: 'test' }));
      expect(screen.getByRole('listbox')).toBeVisible();

      // choose first value and close listbox by pressing enter
      await user.keyboard('{Enter}');

      // listbox should be closed
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
      // first item should be selected
      expect(screen.getByRole('button', { name: 'test' }).textContent).toBe('Item 1');
    });

    it('should select second option when pressing arrow-down & enter after opening', async () => {
      const user = userEvent.setup();

      render(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
        </Select>
      );

      // open listbox
      await user.click(screen.getByRole('button', { name: 'test' }));
      expect(screen.getByRole('listbox')).toBeVisible();

      // choose second value and close listbox by pressing arrow-down and enter
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      // listbox should be closed
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
      // second item should be selected
      expect(screen.getByRole('button', { name: 'test' }).textContent).toBe('Item 2');
    });

    it('should select third option when clicking on it after opening', async () => {
      const user = userEvent.setup();

      render(
        <Select id="test-id" label="test">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Select>
      );

      // open listbox
      await user.click(screen.getByRole('button', { name: 'test' }));
      expect(screen.getByRole('listbox')).toBeVisible();

      // choose third value and close listbox by clicking on it
      await user.click(screen.getByRole('option', { name: 'Item 3' }));

      // listbox should be closed
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
      // second item should be selected
      expect(screen.getByRole('button', { name: 'test' }).textContent).toBe('Item 3');
    });

    it('should focus on 2nd option after opening if first option is disabled', async () => {
      const user = userEvent.setup();

      render(
        <Select id="test-id" label="test" disabledKeys={['1']}>
          <Item key="1">Item 1</Item>
          <Item key="2">Item 2</Item>
        </Select>
      );

      // open listbox
      await user.click(screen.getByRole('button', { name: 'test' }));
      expect(screen.getByRole('listbox')).toBeVisible();

      // choose second value and close listbox by pressing enter
      await user.keyboard('{Enter}');

      // listbox should be closed
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
      // second item should be selected
      expect(screen.getByRole('button', { name: 'test' }).textContent).toBe('Item 2');
    });
  });
});
