import React, { FC, useCallback, useState } from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import ButtonSimple from '../ButtonSimple';

import Popover from './';
import { COLORS, STYLE } from '../ModalContainer/ModalContainer.constants';
import { PopoverInstance } from './Popover.types';

describe('<Popover />', () => {
  /**
   * Opens the popover by clicking on the trigger component, waits until
   * content gets displayed, expects it to be visible and returns the content.
   * expect() statements count: 1
   * @returns {HTMLElement}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openPopoverByClickingOnTriggerAndCheckContent = async (user: any, name = /click me!/i) => {
    await user.click(screen.getByRole('button', { name }));
    const content = await screen.findByText('Content');
    expect(content).toBeVisible();
    return content;
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const className = 'example-class';

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} className={className}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const id = 'example-id';

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} id={id}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const style = { color: 'pink' };

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} style={style}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} color={COLORS.TERTIARY}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with closeButtonPlacement', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} closeButtonPlacement="top-right">
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with strategy = fixed', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} strategy="fixed">
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided attributes when attributes are provided', async () => {
      expect.assertions(6);
      const user = userEvent.setup();

      const className = 'example-class';
      const style = { color: 'pink' };
      const styleString = 'color: pink;';
      const id = 'example-id';

      render(
        <Popover
          triggerComponent={<button>Click Me!</button>}
          className={className}
          style={style}
          color={COLORS.TERTIARY}
          id={id}
        >
          <p>Content</p>
        </Popover>
      );
      const content = await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(content.parentElement.classList.contains(STYLE.wrapper)).toBe(true);
      expect(content.parentElement.classList.contains(className)).toBe(true);
      expect(content.parentElement.getAttribute('style')).toBe(styleString);
      expect(content.parentElement.getAttribute('data-color')).toBe(COLORS.TERTIARY);
      expect(content.parentElement.id).toBe(id);
    });

    it('should not automatically disappear on focus-change when trigger is manual', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      // Set up a test component for local state management via hooks.
      const TestComponent: FC = () => {
        const [instance, setInstance] = useState<PopoverInstance>(undefined);

        const toggle = useCallback(() => {
          if (!instance.state.isVisible) {
            instance.show();
          } else {
            instance.hide();
          }
        }, [instance]);

        return (
          <>
            <div>Other Element</div>
            <button onClick={toggle}>Trigger Element</button>
            <Popover setInstance={setInstance} triggerComponent={<div />} trigger="manual">
              <div>Popover Element</div>
            </Popover>
          </>
        );
      };

      // Test the expected component flow.
      render(<TestComponent />);

      let popover: HTMLElement;

      popover = screen.queryByText('Popover Element');
      expect(popover).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Trigger Element' }));

      popover = await screen.findByText('Popover Element');
      expect(popover).toBeVisible();

      await user.click(screen.getByText('Other Element'));

      popover = await screen.findByText('Popover Element');
      expect(popover).toBeVisible();
    });

    it('should render the close button if provided', async () => {
      expect.assertions(4);
      const user = userEvent.setup();

      render(
        <Popover
          triggerComponent={<button>Click Me!</button>}
          interactive
          closeButtonPlacement="top-right"
          closeButtonProps={{ 'aria-label': 'Close' }}
        >
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      await openPopoverByClickingOnTriggerAndCheckContent(user);

      const closeButton = await screen.findByRole('button', { name: 'Close' });
      expect(closeButton).toBeVisible();
      expect(closeButton.getAttribute('aria-label')).toBe('Close');
    });
  });

  describe('actions', () => {
    it('should show/hide Popover on click', async () => {
      expect.assertions(19);
      const user = userEvent.setup();

      const props = {
        onCreate: jest.fn(),
        onDestroy: jest.fn(),
        onHidden: jest.fn(),
        onHide: jest.fn(),
        onMount: jest.fn(),
        onShow: jest.fn(),
        onShown: jest.fn(),
        onTrigger: jest.fn(),
        onUntrigger: jest.fn(),
      };

      expect(props.onMount).not.toBeCalled();
      expect(props.onCreate).not.toBeCalled();

      const { unmount } = render(
        <Popover triggerComponent={<button>Click Me!</button>} {...props}>
          <p>Content</p>
        </Popover>
      );

      expect(props.onCreate).toBeCalled();

      expect(props.onShow).not.toBeCalled();
      expect(props.onShown).not.toBeCalled();
      expect(props.onTrigger).not.toBeCalled();

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(props.onMount).toBeCalled();
      expect(props.onShow).toBeCalled();
      expect(props.onTrigger).toBeCalled();

      expect(props.onHide).not.toBeCalled();
      expect(props.onHidden).not.toBeCalled();
      expect(props.onUntrigger).not.toBeCalled();
      expect(props.onDestroy).not.toBeCalled();

      // after another click, popover should be hidden again
      await user.click(screen.getByRole('button', { name: /click me!/i }));
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));

      expect(props.onHide).toBeCalled();
      expect(props.onHidden).toBeCalled();
      expect(props.onUntrigger).toBeCalled();

      unmount();

      expect(props.onDestroy).toBeCalled();
    });

    it('should show/hide Popover on tab + enter', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      render(
        <Popover triggerComponent={<ButtonSimple>Click Me!</ButtonSimple>}>
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after tab and enter, popover should be shown
      await user.tab();
      await user.keyboard('{Enter}');
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // after hitting space, popover should be hidden again
      await user.keyboard('{ }');
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));
    });

    it('should show Popover on mouseenter', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      render(
        <Popover triggerComponent={<button>Hover Me!</button>} trigger="mouseenter">
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after hover, popover should be shown
      await user.hover(screen.getByRole('button', { name: /hover me!/i }));
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // after unhover, popover should be hidden again
      await user.unhover(screen.getByRole('button', { name: /hover me!/i }));
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));
    });

    it('should show Popover on focusin', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      render(
        <Popover triggerComponent={<button>Focus Me!</button>} trigger="focusin">
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after tabbing to it, popover should be shown
      await user.tab();
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // after tabbing away, popover should be hidden again
      await user.tab();
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));
    });

    it('should show/hide Popover when triggered through instance', async () => {
      expect.assertions(2);
      const user = userEvent.setup();

      const ParentComponent = () => {
        const [instance, setInstance] = React.useState<PopoverInstance>();

        const handleShow = React.useCallback(() => {
          instance.show();
        }, [instance]);

        const handleHide = React.useCallback(() => {
          instance.hide();
        }, [instance]);

        return (
          <>
            <Popover
              triggerComponent={<button>Focus Me!</button>}
              trigger="focusin"
              setInstance={setInstance}
            >
              <p>Content</p>
            </Popover>
            <button id="show" onClick={handleShow}>
              Show
            </button>
            <button id="hide" onClick={handleHide}>
              Hide
            </button>
          </>
        );
      };

      render(<ParentComponent />);

      // show popover from the parent component
      await openPopoverByClickingOnTriggerAndCheckContent(user, /show/i);

      // hide popover from the parent component
      await user.click(screen.getByRole('button', { name: /hide/i }));
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('should hide Popover after pressing Esc by default', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      render(
        <Popover triggerComponent={<button>Click Me!</button>} trigger="click">
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      await openPopoverByClickingOnTriggerAndCheckContent(user);

      await user.keyboard('{Escape}');

      // content should be hidden
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('should not hide Popover after pressing Esc when hideOnEsc is false', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      render(
        <Popover triggerComponent={<button>Click Me!</button>} trigger="click" hideOnEsc={false}>
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      await openPopoverByClickingOnTriggerAndCheckContent(user);

      await user.keyboard('{Escape}');

      // content should still be visible
      const contentAfterEsc = await screen.findByText('Content');
      expect(contentAfterEsc).toBeVisible();
    });

    it('it should close the Popover if closeButtonPlacement is not none', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      render(
        <Popover
          closeButtonProps={{ 'aria-label': 'Close' }}
          triggerComponent={<button>Click Me!</button>}
          interactive
          closeButtonPlacement="top-right"
          trigger="click"
          hideOnEsc={false}
        >
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      await openPopoverByClickingOnTriggerAndCheckContent(user);

      // click the close button
      await user.click(screen.getByRole('button', { name: 'Close' }));

      // content should be hidden
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('it should focus on the trigger component when focusBackOnTrigger= = true and popover gets closed', async () => {
      expect.assertions(5);
      const user = userEvent.setup();

      render(
        <Popover
          closeButtonProps={{ 'aria-label': 'Close' }}
          triggerComponent={<button>Click Me!</button>}
          interactive
          closeButtonPlacement="top-right"
          trigger="click"
          hideOnEsc={false}
          focusBackOnTrigger
        >
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      const closeButton = screen.getByRole('button', { name: 'Close' });

      await user.tab();
      // click the close button

      expect(document.activeElement).toEqual(closeButton);

      await user.click(closeButton);

      // content should be hidden
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });

      const triggerComponent = screen.getByRole('button', { name: /click me!/i });
      expect(document.activeElement).toEqual(triggerComponent);
    });
  });
});
