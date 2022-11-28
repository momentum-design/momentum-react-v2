import React from 'react';
import { Item } from '@react-stately/collections';

import MenuTrigger, { MENU_TRIGGER_CONSTANTS as CONSTANTS } from './';
import ButtonPill from '../ButtonPill';
import Menu from '../Menu';
import { mountAndWait } from '../../../test/utils';
import { ModalContainer } from '..';
import { ROUNDS } from '../ModalContainer/ModalContainer.constants';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('<MenuTrigger /> - Enzyme', () => {
  const defaultProps = {
    isOpen: true,
    triggerComponent: <ButtonPill>Hello world</ButtonPill>,
    children: [
      <Menu selectionMode="single" key="2">
        <Item key="one">One</Item>
        <Item key="two">Two</Item>
        <Item key="three">Three</Item>
      </Menu>,
      <Menu selectionMode="multiple" key="4">
        <Item key="asd">Four</Item>
        <Item key="ff">Five</Item>
        <Item key="d">Six</Item>
      </Menu>,
    ],
    'aria-label': 'Menu Trigger Component ',
  };
  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);

      const container = await mountAndWait(<MenuTrigger {...defaultProps} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const container = await mountAndWait(<MenuTrigger {...defaultProps} className={className} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const container = await mountAndWait(<MenuTrigger {...defaultProps} id={id} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };

      const container = await mountAndWait(<MenuTrigger {...defaultProps} style={style} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with variant', async () => {
      expect.assertions(1);

      const variant = 'small';

      const container = await mountAndWait(<MenuTrigger {...defaultProps} variant={variant} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', async () => {
      expect.assertions(1);

      const color = 'secondary';

      const container = await mountAndWait(<MenuTrigger {...defaultProps} color={color} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with showArrow', async () => {
      expect.assertions(1);

      const showArrow = true;

      const container = await mountAndWait(<MenuTrigger {...defaultProps} showArrow={showArrow} />);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with placement', async () => {
      expect.assertions(1);

      const placement = 'top';

      const container = await mountAndWait(<MenuTrigger {...defaultProps} placement={placement} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} />))
        .find(MenuTrigger)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} className={className} />))
        .find(MenuTrigger)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} id={id} />))
        .find(MenuTrigger)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.id).toBe(id);
    });

    it('should have provided style when style is provided', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const styleString = 'color: pink;';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} style={style} />))
        .find(MenuTrigger)
        .find(ModalContainer)
        .getDOMNode();

      expect(element.getAttribute('style')).toBe(styleString);
    });

    it('should have provided round to ModalContainer when variant is provided', async () => {
      expect.assertions(1);

      const variant = 'small';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} variant={variant} />))
        .find(MenuTrigger)
        .find(ModalContainer);

      expect(element.prop('round')).toBe(ROUNDS[50]);
    });

    it('should have provided color to ModalContainer when color is provided', async () => {
      expect.assertions(1);

      const color = 'secondary';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} color={color} />))
        .find(MenuTrigger)
        .find(ModalContainer);

      expect(element.prop('color')).toBe(color);
    });

    it('should have provided showArrow to ModalContainer when showArrow is provided', async () => {
      expect.assertions(1);

      const showArrow = true;

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} showArrow={showArrow} />))
        .find(MenuTrigger)
        .find(ModalContainer);

      expect(element.prop('showArrow')).toBe(showArrow);
    });

    it('should have provided placement to ModalContainer when placement is provided', async () => {
      expect.assertions(1);

      const placement = 'top';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} placement={placement} />))
        .find(MenuTrigger)
        .find(ModalContainer);

      expect(element.prop('placement')).toBe(placement);
    });
  });
});

describe('<MenuTrigger /> - React Testing Library', () => {
  const defaultProps = {
    'aria-label': 'Label',
    triggerComponent: <ButtonPill aria-label="Open Menu">Open Menu</ButtonPill>,
    children: [
      <Menu selectionMode="single" key="2" aria-label="Single Menu">
        <Item key="one">One</Item>
        <Item key="two">Two</Item>
        <Item key="three">Three</Item>
      </Menu>,
      <Menu selectionMode="multiple" key="4" aria-label="Multi Menu">
        <Item key="asd">Four</Item>
        <Item key="ff">Five</Item>
        <Item key="d">Six</Item>
      </Menu>,
    ],
  };

  const openMenu = async (user: any) => {
    await user.click(screen.getByRole('button', { name: 'Open Menu' }));
  };

  describe('actions', () => {
    it('should callback correctly when onOpenChange is provided ', async () => {
      expect.assertions(5);
      const user = userEvent.setup();

      const onOpenChangeMock = jest.fn();

      render(<MenuTrigger {...defaultProps} onOpenChange={onOpenChangeMock} />);
      expect(onOpenChangeMock).not.toHaveBeenCalled();

      await openMenu(user);
      await screen.findByRole('menu', { name: 'Single Menu' });

      expect(onOpenChangeMock).toHaveBeenCalledWith(true);
      expect(onOpenChangeMock).toHaveBeenCalledTimes(1);
      onOpenChangeMock.mockClear();

      await user.keyboard('{Escape}');

      expect(onOpenChangeMock).toHaveBeenCalledWith(false);
      expect(onOpenChangeMock).toHaveBeenCalledTimes(1);
    });

    it('should close the menu when closeOnSelect is true', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      render(<MenuTrigger {...defaultProps} closeOnSelect={true} />);

      await openMenu(user);

      const menu = await screen.findByRole('menu', { name: 'Single Menu' });
      expect(menu).toBeVisible();
      await user.click(screen.getByRole('menuitemradio', { name: 'One' }));

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'Single Menu' })).not.toBeInTheDocument();
      });
    });

    it('should not close the menu when closeOnSelect is false', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      render(<MenuTrigger {...defaultProps} closeOnSelect={false} />);

      await openMenu(user);

      const menu = await screen.findByRole('menu', { name: 'Single Menu' });
      expect(menu).toBeVisible();
      await user.click(screen.getByRole('menuitemradio', { name: 'One' }));

      await waitFor(() => {
        expect(screen.getByRole('menu', { name: 'Single Menu' })).toBeVisible();
      });
    });

    it('should open and close if isOpen prop is provided (controlled)', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const ParentComponent = () => {
        const [open, setOpen] = React.useState(false);

        return (
          <>
            <button id="show" onClick={() => setOpen(true)}>
              Show
            </button>
            <button id="hide" onClick={() => setOpen(false)}>
              Hide
            </button>
            <MenuTrigger {...defaultProps} isOpen={open} />
          </>
        );
      };
      render(<ParentComponent />);

      let menu = screen.queryByRole('menu', { name: 'Single Menu' });
      expect(menu).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: /show/i }));

      menu = await screen.findByRole('menu', { name: 'Single Menu' });
      expect(menu).toBeVisible();

      await user.click(screen.getByRole('button', { name: /hide/i }));
      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'Single Menu' })).not.toBeInTheDocument();
      });
    });
  });

  describe('keyboard accessibility', () => {
    it('closes the menu on Escape', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      render(<MenuTrigger {...defaultProps} />);

      await openMenu(user);

      const menu = await screen.findByRole('menu', { name: 'Single Menu' });
      expect(menu).toBeVisible();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'Single Menu' })).not.toBeInTheDocument();
      });
    });

    it('closes the menu on Tab if only one menu present', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      render(<MenuTrigger {...defaultProps} children={[defaultProps.children[0]]} />);

      await openMenu(user);

      const menu = await screen.findByRole('menu', { name: 'Single Menu' });
      expect(menu).toBeVisible();

      await user.tab();

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'Single Menu' })).not.toBeInTheDocument();
      });
    });

    it("doesn't close the menu on Tab if more than one menu present", async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      render(<MenuTrigger {...defaultProps} />);

      await openMenu(user);

      const menu = await screen.findByRole('menu', { name: 'Single Menu' });
      expect(menu).toBeVisible();

      await user.tab();

      expect(menu).toBeVisible();
    });

    it('will focus back on trigger component after the menu trigger closes', async () => {
      expect.assertions(1);
      const user = userEvent.setup();

      render(<MenuTrigger {...defaultProps} />);

      await openMenu(user);

      await screen.findByRole('menu', { name: 'Single Menu' });

      await user.keyboard('{escape}');

      expect(await screen.findByRole('button', { name: 'Open Menu' })).toHaveFocus();
    });

    it('will focus on the first menu option when menu trigger is opened', async () => {
      expect.assertions(1);
      const user = userEvent.setup();

      render(<MenuTrigger {...defaultProps} closeOnSelect={true} />);

      await openMenu(user);

      expect(await screen.findByRole('menuitemradio', { name: 'One' })).toHaveFocus();
    });

    it('selects option on Space', async () => {
      expect.assertions(1);
      const user = userEvent.setup();

      render(<MenuTrigger {...defaultProps} closeOnSelect={false} />);

      await openMenu(user);

      await screen.findByRole('menu', { name: 'Single Menu' });

      screen.getByRole('menuitemradio', { name: 'One' }).focus();

      await user.keyboard('{space}');

      expect(
        (await screen.findByRole('menuitemradio', { name: 'One' })).getAttribute('aria-checked')
      ).toBeTruthy();
    });

    it('selects option on Enter', async () => {
      expect.assertions(1);
      const user = userEvent.setup();

      render(<MenuTrigger {...defaultProps} closeOnSelect={false} />);

      await openMenu(user);

      await screen.findByRole('menu', { name: 'Single Menu' });

      screen.getByRole('menuitemradio', { name: 'Two' }).focus();

      await user.keyboard('{enter}');

      expect(
        (await screen.findByRole('menuitemradio', { name: 'Two' })).getAttribute('aria-checked')
      ).toBeTruthy();
    });
  });
});
