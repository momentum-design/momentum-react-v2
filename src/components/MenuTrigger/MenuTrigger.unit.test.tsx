import React from 'react';
import { Item } from '@react-stately/collections';

import MenuTrigger, { MENU_TRIGGER_CONSTANTS as CONSTANTS } from './';
import ButtonPill from '../ButtonPill';
import Menu from '../Menu';
import { mountAndWait, renderWithWebComponent } from '../../../test/utils';
import { ModalContainer, Popover } from '..';
import { ROUNDS } from '../ModalContainer/ModalContainer.constants';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SpatialNavigationProvider from '../SpatialNavigationProvider';
import { DEFAULTS } from '../SpatialNavigationProvider/SpatialNavigationProvider.constants';

jest.mock('uuid', () => {
  return {
    v4: () => '1',
  };
});

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

    it('should match snapshot with zIndex', async () => {
      expect.assertions(1);

      const zIndex = 9998;

      const container = await mountAndWait(<MenuTrigger {...defaultProps} zIndex={zIndex} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have its wrapper class', async () => {
      expect.assertions(1);

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} />))
        .find(MenuTrigger)
        .find(ModalContainer)
        .children()
        .find('[role="generic"]')
        .getDOMNode();

      expect(element.classList.contains(CONSTANTS.STYLE.wrapper)).toBe(true);
    });

    it('should have provided class when className is provided', async () => {
      expect.assertions(1);

      const className = 'example-class';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} className={className} />))
        .find(MenuTrigger)
        .find(ModalContainer)
        .children()
        .find('[role="generic"]')
        .getDOMNode();

      expect(element.classList.contains(className)).toBe(true);
    });

    it('should have provided id when id is provided', async () => {
      expect.assertions(1);

      const id = 'example-id';

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} id={id} />))
        .find(MenuTrigger)
        .find(ModalContainer)
        .children()
        .find('[role="generic"]')
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
        .children()
        .find('[role="generic"]')
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

    it('should have provided zIndex to Popover when zIndex is provided', async () => {
      expect.assertions(1);

      const zIndex = 9998;

      const element = (await mountAndWait(<MenuTrigger {...defaultProps} zIndex={zIndex} />))
        .find(MenuTrigger)
        .find(Popover);

      expect(element.prop('zIndex')).toBe(zIndex);
    });
  });
});

describe('<MenuTrigger /> - React Testing Library', () => {
  const defaultProps = {
    'aria-label': 'Label',
    triggerComponent: (
      <ButtonPill aria-label="Open Menu" stopPropagation={false}>
        Open Menu
      </ButtonPill>
    ),
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

  describe('accessibility properties', () => {
    it('triggerComponent has aria-haspopup true by default', async () => {
      await renderWithWebComponent(<MenuTrigger {...defaultProps} />);

      const button = screen.getByRole('button', { name: 'Open Menu' });
      expect(button).toBeVisible();
      expect(button.getAttribute('aria-haspopup')).toBe('true');
    });

    it('exposes triggerComponentRef which references the button element', async () => {
      const ref = {
        current: {
          triggerComponentRef: {
            current: null,
          },
        },
      };

      await renderWithWebComponent(<MenuTrigger {...defaultProps} ref={ref} />);

      const button = screen.getByRole('button', { name: 'Open Menu' });

      // Assert that the triggerComponentRef in the ref is the same as the button element
      expect(ref.current.triggerComponentRef.current).toBe(button);
    });

    it('triggerComponent can have aria-haspopup as passed in props', async () => {
      await renderWithWebComponent(
        <MenuTrigger
          {...defaultProps}
          triggerComponent={
            <ButtonPill aria-haspopup="dialog" aria-label="Open Menu">
              Open Menu
            </ButtonPill>
          }
        />
      );

      const button = screen.getByRole('button', { name: 'Open Menu' });
      expect(button).toBeVisible();
      expect(button.getAttribute('aria-haspopup')).toBe('dialog');
    });
  });

  describe('actions', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const openMenu = async (screen: any) => {
      fireEvent.click(screen.getByRole('button', { name: 'Open Menu' }));
      await waitFor(() => {
        expect(screen.getByRole('menu', { name: 'Single Menu' })).toBeInTheDocument();
      });
      const menu = screen.getByRole('menu', { name: 'Single Menu' });
      return menu;
    };

    it('should callback correctly when onOpenChange is provided ', async () => {
      const onOpenChangeMock = jest.fn();

      await renderWithWebComponent(
        <MenuTrigger {...defaultProps} onOpenChange={onOpenChangeMock} />
      );
      expect(onOpenChangeMock).not.toHaveBeenCalled();

      await openMenu(screen);

      expect(onOpenChangeMock).toHaveBeenCalledWith(true);
      expect(onOpenChangeMock).toHaveBeenCalledTimes(1);
      onOpenChangeMock.mockClear();

      fireEvent.click(screen.getByRole('button', { name: 'Open Menu' }));

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'Single Menu' })).not.toBeInTheDocument();
      });

      expect(onOpenChangeMock).toHaveBeenCalledWith(false);
      expect(onOpenChangeMock).toHaveBeenCalledTimes(1);
    });

    it('should close the menu when closeOnSelect is true', async () => {
      const user = userEvent.setup();

      await renderWithWebComponent(<MenuTrigger {...defaultProps} closeOnSelect={true} />);

      await openMenu(screen);

      await user.click(screen.getByRole('menuitemradio', { name: 'One' }));

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'Single Menu' })).not.toBeInTheDocument();
      });
    });

    it('should not close the menu when closeOnSelect is false', async () => {
      const user = userEvent.setup();

      await renderWithWebComponent(<MenuTrigger {...defaultProps} closeOnSelect={false} />);

      await openMenu(screen);

      await user.click(screen.getByRole('menuitemradio', { name: 'One' }));

      await waitFor(() => {
        expect(screen.getByRole('menu', { name: 'Single Menu' })).toBeVisible();
      });
    });

    it('should close the menu when closeOnSelect is false but overridden by <Item closeOnSelect={true} />', async () => {
      const user = userEvent.setup();

      const children = [...defaultProps.children];
      children.push(
        <Menu aria-label="Additional Menu">
          <Item key="close" closeOnSelect={true}>
            Close
          </Item>
        </Menu>
      );

      await renderWithWebComponent(
        <MenuTrigger {...defaultProps} closeOnSelect={false}>
          {children}
        </MenuTrigger>
      );

      await openMenu(screen);

      fireEvent.click(screen.getByRole('menuitemradio', { name: 'One' }));

      await waitFor(() => {
        expect(screen.getByRole('menu', { name: 'Single Menu' })).toBeVisible();
      });

      fireEvent.click(screen.getByRole('menuitem', { name: 'Close' }));

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'Single Menu' })).not.toBeInTheDocument();
      });
    });

    it('should not close the menu when closeOnSelect is true but overridden by <Item closeOnSelect={false} />', async () => {
      const children = [...defaultProps.children];
      children.push(
        <Menu aria-label="Additional Menu">
          <Item key="close" closeOnSelect={false}>
            Close
          </Item>
        </Menu>
      );

      await renderWithWebComponent(
        <MenuTrigger {...defaultProps} closeOnSelect={true}>
          {children}
        </MenuTrigger>
      );

      await openMenu(screen);

      fireEvent.click(screen.getByRole('menuitem', { name: 'Close' }));

      await waitFor(() => {
        expect(screen.getByRole('menu', { name: 'Single Menu' })).toBeVisible();
      });

      fireEvent.click(screen.getByRole('menuitemradio', { name: 'One' }));

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'Single Menu' })).not.toBeInTheDocument();
      });
    });

    it('should open and close if isOpen prop is provided (controlled)', async () => {
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
      await renderWithWebComponent(<ParentComponent />);

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

    describe('keyboard accessibility', () => {
      it('closes the menu on Escape', async () => {
        const user = userEvent.setup();

        await renderWithWebComponent(<MenuTrigger {...defaultProps} />);
        await user.tab();
        expect(await screen.findByRole('button', { name: 'Open Menu' })).toHaveFocus();

        await openMenu(screen);

        await waitFor(() => {
          expect(screen.getByRole('menuitemradio', { name: 'One' })).toHaveFocus();
        });
        await user.keyboard('{Escape}');

        await waitFor(() => {
          expect(screen.queryByRole('menu', { name: 'Single Menu' })).not.toBeInTheDocument();
        });
      });

      it("doesn't close the menu on Tab & Shift+Tab if only one menu present", async () => {
        const user = userEvent.setup();

        await renderWithWebComponent(
          <MenuTrigger {...defaultProps} children={[defaultProps.children[0]]} />
        );

        const menu = await openMenu(screen);

        await user.tab();

        expect(menu).toBeVisible();

        await user.tab({ shift: true });

        expect(menu).toBeVisible();
      });

      it("doesn't close the menu on Tab if more than one menu present", async () => {
        const user = userEvent.setup();

        await renderWithWebComponent(<MenuTrigger {...defaultProps} />);

        const menu = await openMenu(screen);

        await user.tab();

        expect(menu).toBeVisible();

        await user.tab({ shift: true });

        expect(menu).toBeVisible();
      });

      it('will focus back on trigger component after the menu trigger closes', async () => {
        const user = userEvent.setup();

        await renderWithWebComponent(<MenuTrigger {...defaultProps} />);

        await user.tab();
        expect(await screen.findByRole('button', { name: 'Open Menu' })).toHaveFocus();
        await openMenu(screen);

        await waitFor(() => {
          expect(screen.getByRole('menuitemradio', { name: 'One' })).toHaveFocus();
        });
        await user.keyboard('{escape}');

        expect(await screen.findByRole('button', { name: 'Open Menu' })).toHaveFocus();
      });

      it('will focus on the first menu option when menu trigger is opened', async () => {
        const user = userEvent.setup();

        await renderWithWebComponent(<MenuTrigger {...defaultProps} closeOnSelect={true} />);

        await user.tab();
        expect(await screen.findByRole('button', { name: 'Open Menu' })).toHaveFocus();
        await openMenu(screen);

        await waitFor(() => {
          expect(screen.getByRole('menuitemradio', { name: 'One' })).toHaveFocus();
        });
      });

      it('selects option on Space', async () => {
        const user = userEvent.setup();

        await renderWithWebComponent(<MenuTrigger {...defaultProps} closeOnSelect={false} />);

        await openMenu(screen);

        screen.getByRole('menuitemradio', { name: 'One' }).focus();

        await user.keyboard('{space}');

        expect(
          (await screen.findByRole('menuitemradio', { name: 'One' })).getAttribute('aria-checked')
        ).toBeTruthy();
      });

      it('selects option on Enter', async () => {
        const user = userEvent.setup();

        await renderWithWebComponent(<MenuTrigger {...defaultProps} closeOnSelect={false} />);

        await openMenu(screen);

        screen.getByRole('menuitemradio', { name: 'Two' }).focus();

        await user.keyboard('{enter}');

        expect(
          (await screen.findByRole('menuitemradio', { name: 'Two' })).getAttribute('aria-checked')
        ).toBeTruthy();
      });

      it('allows cycling through multiple menus with tab / shift+tab', async () => {
        const user = userEvent.setup();

        await renderWithWebComponent(<MenuTrigger {...defaultProps} />);

        await user.tab();
        expect(await screen.findByRole('button', { name: 'Open Menu' })).toHaveFocus();

        await openMenu(screen);
        await waitFor(() => {
          expect(screen.getByRole('menuitemradio', { name: 'One' })).toHaveFocus();
        });

        await user.tab();
        expect(await screen.findByRole('menuitemcheckbox', { name: 'Four' })).toHaveFocus();

        await user.tab();
        expect(await screen.findByRole('menuitemradio', { name: 'One' })).toHaveFocus();

        await user.tab({ shift: true });
        expect(await screen.findByRole('menuitemcheckbox', { name: 'Four' })).toHaveFocus();

        await user.tab({ shift: true });
        expect(await screen.findByRole('menuitemradio', { name: 'One' })).toHaveFocus();
      });

      it('allows cycling through multiple menus with tab / shift+tab & persists focus of menuitems inside', async () => {
        const user = userEvent.setup();

        await renderWithWebComponent(<MenuTrigger {...defaultProps} />);

        await user.tab();
        expect(await screen.findByRole('button', { name: 'Open Menu' })).toHaveFocus();

        await openMenu(screen);
        await waitFor(() => {
          expect(screen.getByRole('menuitemradio', { name: 'One' })).toHaveFocus();
        });

        await user.keyboard('{ArrowDown}');
        expect(await screen.findByRole('menuitemradio', { name: 'Two' })).toHaveFocus();

        await user.tab();
        expect(await screen.findByRole('menuitemcheckbox', { name: 'Four' })).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        expect(await screen.findByRole('menuitemcheckbox', { name: 'Five' })).toHaveFocus();

        await user.tab();
        expect(await screen.findByRole('menuitemradio', { name: 'Two' })).toHaveFocus();

        await user.tab({ shift: true });
        expect(await screen.findByRole('menuitemcheckbox', { name: 'Five' })).toHaveFocus();
      });
    });

    describe('spatial navigation', () => {
      it('closes the menu on Escape', async () => {
        const user = userEvent.setup();

        await renderWithWebComponent(
          <SpatialNavigationProvider
            navigationKeyMapping={{
              ...DEFAULTS.SPATIAL_NAVIGATION_KEY_MAPPING,
              back: 'GoBack',
            }}
          >
            <MenuTrigger {...defaultProps} />
          </SpatialNavigationProvider>
        );

        await user.tab();
        expect(await screen.findByRole('button', { name: 'Open Menu' })).toHaveFocus();

        await openMenu(screen);
        await waitFor(() => {
          expect(screen.getByRole('menuitemradio', { name: 'One' })).toHaveFocus();
        });
        await user.keyboard('{GoBack}');

        await waitFor(() => {
          expect(screen.queryByRole('menu', { name: 'Single Menu' })).not.toBeInTheDocument();
        });
      });
    });
  });
});
