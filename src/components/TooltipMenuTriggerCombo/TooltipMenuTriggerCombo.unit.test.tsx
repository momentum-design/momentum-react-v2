import { mount } from 'enzyme';
import React from 'react';

import { Item } from '@react-stately/collections';
import '@testing-library/jest-dom';
import { getByText, queryByText, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonPill from '../ButtonPill';
import Menu from '../Menu';
import MenuTrigger from '../MenuTrigger';
import { STYLE as POPOVER_STYLE } from '../Popover/Popover.constants';
import Text from '../Text';
import Tooltip from '../Tooltip';
import TooltipMenuTriggerCombo from './';

jest.mock('uuid', () => ({
  v4: () => '1',
}));

describe('<TooltipMenuTriggerCombo />', () => {
  const menu = (
    <Menu selectionMode="single" key="2">
      <Item key="one">One</Item>
      <Item key="two">Two</Item>
      <Item key="three">Three</Item>
    </Menu>
  );
  const tooltipContent = <Text tagName="p">Tooltip</Text>;
  const triggerComponent = <ButtonPill>Trigger component</ButtonPill>;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(
        <TooltipMenuTriggerCombo
          menuContent={menu}
          tooltipProps={{
            type: 'label',
          }}
          tooltipContent={tooltipContent}
          triggerComponent={triggerComponent}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with menuTriggerProps', () => {
      expect.assertions(1);

      const container = mount(
        <TooltipMenuTriggerCombo
          menuTriggerProps={{
            closeOnSelect: false,
          }}
          menuContent={menu}
          tooltipProps={{
            type: 'label',
          }}
          tooltipContent={tooltipContent}
          triggerComponent={triggerComponent}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with tooltipProps', () => {
      expect.assertions(1);

      const container = mount(
        <TooltipMenuTriggerCombo
          menuTriggerProps={{
            closeOnSelect: false,
          }}
          menuContent={menu}
          tooltipProps={{
            type: 'label',
            placement: 'bottom',
          }}
          tooltipContent={tooltipContent}
          triggerComponent={triggerComponent}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with tooltipProps.type = "description"', () => {
      expect.assertions(1);

      const container = mount(
        <TooltipMenuTriggerCombo
          menuContent={menu}
          tooltipProps={{
            type: 'description',
            placement: 'bottom',
          }}
          tooltipContent={tooltipContent}
          triggerComponent={triggerComponent}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have popover with correct props', () => {
      expect.assertions(4);

      const comboElement = mount(
        <TooltipMenuTriggerCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          menuContent={menu}
        />
      ).find(TooltipMenuTriggerCombo);

      const menuTrigger = comboElement.find(MenuTrigger);

      expect(menuTrigger.props()).toStrictEqual({
        children: menu,
        onOpenChange: expect.any(Function),
        triggerComponent: expect.anything(),
      });

      const tooltip = comboElement.find(Tooltip);

      expect(tooltip.props()).toStrictEqual({
        children: tooltipContent,
        onHide: expect.any(Function),
        onShow: expect.any(Function),
        setInstance: expect.any(Function),
        triggerComponent: expect.any(Object),
        type: 'label',
      });

      expect(tooltip.prop('triggerComponent').type).toEqual(triggerComponent.type);
      expect(tooltip.prop('triggerComponent').props).toEqual({
        ...triggerComponent.props,
        'aria-controls': null,
        'aria-expanded': false,
        'aria-haspopup': true,
        id: 'test-ID',
        onKeyDown: expect.any(Function),
        onPress: expect.any(Function),
        onPressStart: expect.any(Function),
      });
    });

    it('should have provided tooltipProps on Tooltip when provided', () => {
      expect.assertions(4);

      const comboElement = mount(
        <TooltipMenuTriggerCombo
          triggerComponent={triggerComponent}
          tooltipProps={{
            placement: 'top',
          }}
          tooltipContent={tooltipContent}
          menuContent={menu}
        />
      ).find(TooltipMenuTriggerCombo);

      const menuTrigger = comboElement.find(MenuTrigger);

      expect(menuTrigger.props()).toStrictEqual({
        children: menu,
        onOpenChange: expect.any(Function),
        triggerComponent: expect.anything(),
      });

      const tooltip = comboElement.find(Tooltip);

      expect(tooltip.props()).toStrictEqual({
        children: tooltipContent,
        placement: 'top',
        onHide: expect.any(Function),
        onShow: expect.any(Function),
        setInstance: expect.any(Function),
        triggerComponent: expect.any(Object),
        type: 'label',
      });

      expect(tooltip.prop('triggerComponent').type).toEqual(triggerComponent.type);
      expect(tooltip.prop('triggerComponent').props).toEqual({
        ...triggerComponent.props,
        'aria-controls': null,
        'aria-expanded': false,
        'aria-haspopup': true,
        id: 'test-ID',
        onKeyDown: expect.any(Function),
        onPress: expect.any(Function),
        onPressStart: expect.any(Function),
      });
    });
  });

  describe('actions', () => {
    it.each([
      ['mouse', false],
      ['keyboard', true],
    ])('passes through the event callbacks (with %s)', async (_, withKeyboard) => {
      const user = userEvent.setup();

      const handleOpenChange = jest.fn();
      const handleTooltipOpen = jest.fn();
      const handleTooltipHide = jest.fn();
      const handleSetTooltipInstance = jest.fn();

      render(
        <TooltipMenuTriggerCombo
          triggerComponent={triggerComponent}
          tooltipProps={{
            setInstance: handleSetTooltipInstance,
            onShow: handleTooltipOpen,
            onHide: handleTooltipHide,
          }}
          tooltipContent={tooltipContent}
          menuTriggerProps={{
            onOpenChange: handleOpenChange,
          }}
          menuContent={menu}
        />
      );

      expect(handleSetTooltipInstance).toHaveBeenCalled();

      // Open Tooltip
      if (withKeyboard) {
        await user.tab();
      } else {
        await user.hover(screen.getByRole('button'));
      }
      expect(handleTooltipOpen).toHaveBeenCalled();

      // Open Menu & Close Tooltip
      if (withKeyboard) {
        await user.keyboard('{Enter}');
      } else {
        await user.click(screen.getByRole('button'));
      }
      expect(handleTooltipHide).toHaveBeenCalled();
      expect(handleOpenChange).toHaveBeenCalledWith(true);
      handleOpenChange.mockReset();

      // Close Menu
      await user.keyboard('{Escape}');
      expect(handleOpenChange).toHaveBeenCalledWith(false);
    });

    it('should hide tooltip when opening menu when navigating with keyboard', async () => {
      const user = userEvent.setup();

      render(
        <TooltipMenuTriggerCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          menuContent={menu}
        />
      );

      // press tab
      await user.tab();

      // trigger button should be focused, tooltip should be shown & menu hidden
      expect(screen.getByRole('button')).toHaveFocus();

      let tooltip = screen.getByRole('tooltip', { hidden: true });
      await waitFor(() => {
        expect(getByText(tooltip, 'Tooltip')).toBeInTheDocument();
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });

      // press enter
      await user.keyboard('{Enter}');

      const menuItems = screen.getAllByRole('menuitemradio');

      // first menu item should be focused, menu should be shown & tooltip hidden
      expect(menuItems[0]).toHaveFocus();
      await waitFor(() => {
        expect(queryByText(tooltip, 'Tooltip')).not.toBeInTheDocument();
      });

      // focus lock inside popover should work
      await user.tab();
      expect(menuItems[0]).toHaveFocus();
      await user.tab({ shift: true });
      expect(menuItems[0]).toHaveFocus();

      // press Escape
      await user.keyboard('{Escape}');

      // trigger button should be focused once again, tooltip should be shown & menu hidden
      expect(screen.getByRole('button')).toHaveFocus();
      tooltip = screen.getByRole('tooltip', { hidden: true });
      await waitFor(() => {
        expect(getByText(tooltip, 'Tooltip')).toBeInTheDocument();
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });

      // press Escape 2nd time
      await user.keyboard('{Escape}');

      // trigger button should be focused still, tooltip & menu both hidden
      expect(screen.getByRole('button')).toHaveFocus();
      await waitFor(() => {
        expect(queryByText(tooltip, 'Tooltip')).not.toBeInTheDocument();
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });

    it('should hide tooltip when opening popover when navigating with mouse', async () => {
      const user = userEvent.setup();

      const { container } = render(
        <TooltipMenuTriggerCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          menuContent={menu}
        />
      );

      // user hovers over Example button
      await user.hover(screen.getByText('Trigger component'));

      // tooltip should be shown but menu remains hidden

      const tooltip = screen.getByRole('tooltip', { hidden: true });
      await waitFor(() => {
        expect(getByText(tooltip, 'Tooltip')).toBeInTheDocument();
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });

      // user clicks on Example button
      await user.click(screen.getByText('Trigger component'));

      // tooltip should be hidden and menu shown
      await waitFor(() => {
        expect(queryByText(tooltip, 'Tooltip')).not.toBeInTheDocument();
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      // user then clicks off the menu to close it
      const backdrop = container.querySelector(`.${POPOVER_STYLE.backdrop}`);

      await user.click(backdrop);

      // tooltip & menu both hidden
      await waitFor(() => {
        expect(queryByText(tooltip, 'Tooltip')).not.toBeInTheDocument();
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      });
    });
  });
});
