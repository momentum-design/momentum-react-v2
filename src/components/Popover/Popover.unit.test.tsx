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
  const openPopoverByClickingOnTriggerAndCheckContent = async (name = /click me!/i) => {
    userEvent.click(screen.getByRole('button', { name }));
    const content = await screen.findByText('Content');
    expect(content).toBeVisible();
    return content;
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(3);

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent();

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(3);

      const className = 'example-class';

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} className={className}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent();

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(3);

      const id = 'example-id';

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} id={id}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent();

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(3);

      const style = { color: 'pink' };

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} style={style}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent();

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', async () => {
      expect.assertions(3);

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} color={COLORS.TERTIARY}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent();

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with closeButtonPlacement', async () => {
      expect.assertions(3);

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} closeButtonPlacement="top-right">
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent();

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with strategy = fixed', async () => {
      expect.assertions(3);

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} strategy="fixed">
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent();

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided attributes when attributes are provided', async () => {
      expect.assertions(6);
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
      const content = await openPopoverByClickingOnTriggerAndCheckContent();

      expect(content.parentElement.classList.contains(STYLE.wrapper)).toBe(true);
      expect(content.parentElement.classList.contains(className)).toBe(true);
      expect(content.parentElement.getAttribute('style')).toBe(styleString);
      expect(content.parentElement.getAttribute('data-color')).toBe(COLORS.TERTIARY);
      expect(content.parentElement.id).toBe(id);
    });

    it('should not automatically disappear on focus-change when trigger is manual', async () => {
      expect.assertions(3);

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

      userEvent.click(screen.getByRole('button', { name: 'Trigger Element' }));

      popover = await screen.findByText('Popover Element');
      expect(popover).toBeVisible();

      userEvent.click(screen.getByText('Other Element'));

      popover = await screen.findByText('Popover Element');
      expect(popover).toBeVisible();
    });

    it('should render the close button if provided', async () => {
      expect.assertions(4);

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
      await openPopoverByClickingOnTriggerAndCheckContent();

      const closeButton = await screen.findByRole('button', { name: 'Close' });
      expect(closeButton).toBeVisible();
      expect(closeButton.getAttribute('aria-label')).toBe('Close');
    });
  });

  describe('actions', () => {
    it('should show/hide Popover on click', async () => {
      expect.assertions(19);

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
      await openPopoverByClickingOnTriggerAndCheckContent();

      expect(props.onMount).toBeCalled();
      expect(props.onShow).toBeCalled();
      expect(props.onTrigger).toBeCalled();

      expect(props.onHide).not.toBeCalled();
      expect(props.onHidden).not.toBeCalled();
      expect(props.onUntrigger).not.toBeCalled();
      expect(props.onDestroy).not.toBeCalled();

      // after another click, popover should be hidden again
      userEvent.click(screen.getByRole('button', { name: /click me!/i }));
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));

      expect(props.onHide).toBeCalled();
      expect(props.onHidden).toBeCalled();
      expect(props.onUntrigger).toBeCalled();

      unmount();

      expect(props.onDestroy).toBeCalled();
    });

    it('should show/hide Popover on tab + enter', async () => {
      expect.assertions(2);
      render(
        <Popover triggerComponent={<ButtonSimple useNativeKeyDown>Click Me!</ButtonSimple>}>
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after tab and enter, popover should be shown
      userEvent.tab();
      userEvent.keyboard('{enter}');
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // after hitting space, popover should be hidden again
      userEvent.keyboard('{space}');
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));
    });

    it('should show Popover on mouseenter', async () => {
      expect.assertions(2);

      render(
        <Popover triggerComponent={<button>Hover Me!</button>} trigger="mouseenter">
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after hover, popover should be shown
      userEvent.hover(screen.getByRole('button', { name: /hover me!/i }));
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // after unhover, popover should be hidden again
      userEvent.unhover(screen.getByRole('button', { name: /hover me!/i }));
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));
    });

    it('should show Popover on focusin', async () => {
      expect.assertions(2);

      render(
        <Popover triggerComponent={<button>Focus Me!</button>} trigger="focusin">
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after tabbing to it, popover should be shown
      userEvent.tab();
      const content = await screen.findByText('Content');
      expect(content).toBeVisible();

      // after tabbing away, popover should be hidden again
      userEvent.tab();
      await waitForElementToBeRemoved(() => screen.queryByText('Content'));
    });

    it('should show/hide Popover when triggered through instance', async () => {
      expect.assertions(2);

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
      await openPopoverByClickingOnTriggerAndCheckContent(/show/i);

      // hide popover from the parent component
      userEvent.click(screen.getByRole('button', { name: /hide/i }));
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('should hide Popover after pressing Esc by default', async () => {
      expect.assertions(3);

      render(
        <Popover triggerComponent={<button>Click Me!</button>} trigger="click">
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      await openPopoverByClickingOnTriggerAndCheckContent();

      userEvent.keyboard('{Escape}');

      // content should be hidden
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('should not hide Popover after pressing Esc when hideOnEsc is false', async () => {
      expect.assertions(3);

      render(
        <Popover triggerComponent={<button>Click Me!</button>} trigger="click" hideOnEsc={false}>
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      await openPopoverByClickingOnTriggerAndCheckContent();

      userEvent.keyboard('{Escape}');

      // content should still be visible
      const contentAfterEsc = await screen.findByText('Content');
      expect(contentAfterEsc).toBeVisible();
    });

    it('it should close the Popover if closeButtonPlacement is not none', async () => {
      expect.assertions(3);

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
      await openPopoverByClickingOnTriggerAndCheckContent();

      // click the close button
      userEvent.click(screen.getByRole('button', { name: 'Close' }));

      // content should be hidden
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('it should focus on the trigger component when focusBackOnTrigger= = true and popover gets closed', async () => {
      expect.assertions(5);

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

      await openPopoverByClickingOnTriggerAndCheckContent();

      const closeButton = screen.getByRole('button', { name: 'Close' });

      userEvent.tab();
      // click the close button

      expect(document.activeElement).toEqual(closeButton);

      userEvent.click(closeButton);

      // content should be hidden
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });

      const triggerComponent = screen.getByRole('button', { name: /click me!/i });
      expect(document.activeElement).toEqual(triggerComponent);
    });
  });
});
