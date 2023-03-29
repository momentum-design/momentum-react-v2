import React, { FC, useCallback, useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import ButtonSimple from '../ButtonSimple';

import Popover from './';
import { COLORS, STYLE } from '../ModalContainer/ModalContainer.constants';
import { STYLE as POPOVER_STYLE } from './Popover.constants';
import { PopoverInstance, PositioningStrategy } from './Popover.types';

jest.mock('uuid', () => {
  return {
    v4: () => '1',
  };
});

describe('<Popover />', () => {
  /**
   * Opens the popover by clicking on the trigger component, waits until
   * content gets displayed, expects it to be visible and returns the content.
   * expect() statements count: 1
   * @returns {HTMLElement}
   */
  const openPopoverByClickingOnTriggerAndCheckContent = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any,
    buttonName = /click me!/i,
    contentName = /Content/i
  ) => {
    await user.click(screen.getByRole('button', { name: buttonName }));
    const content = await screen.findByText(contentName);
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

    it('should match snapshot with offsetSkidding', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Popover offsetSkidding={2} triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with offsetDistance', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Popover offsetDistance={3} triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with offsetSkidding and offsetDistance', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Popover
          offsetDistance={3}
          offsetSkidding={10}
          triggerComponent={<button>Click Me!</button>}
        >
          <p>Content</p>
        </Popover>
      );

      expect(container).toMatchSnapshot();

      await openPopoverByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it.each([['fixed'], ['absolute']])(
      'should display only one popover at all time',
      async (strategy) => {
        expect.assertions(6);
        const user = userEvent.setup();

        const { container } = render(
          <>
            <Popover
              triggerComponent={<ButtonSimple>Popover 1</ButtonSimple>}
              strategy={strategy as PositioningStrategy}
            >
              <p>Content 1</p>
            </Popover>
            <Popover
              triggerComponent={<ButtonSimple>Popover 2</ButtonSimple>}
              strategy={strategy as PositioningStrategy}
            >
              <p>Content 2</p>
            </Popover>
            <ButtonSimple>Other button</ButtonSimple>
          </>
        );

        expect(container).toMatchSnapshot();

        await openPopoverByClickingOnTriggerAndCheckContent(user, /Popover 1/i, /Content 1/i);

        expect(container).toMatchSnapshot();

        await openPopoverByClickingOnTriggerAndCheckContent(user, /Popover 2/i, /Content 2/i);

        expect(container).toMatchSnapshot();

        await user.click(screen.getByRole('button', { name: /Other button/i }));

        expect(container).toMatchSnapshot();
      }
    );
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

    it('should not add useNativeKeyDown on the DOM button', async () => {
      expect.assertions(2);

      render(
        <>
          <Popover triggerComponent={<button>Popover 1</button>} strategy="fixed">
            <p>Content 1</p>
          </Popover>
          <Popover triggerComponent={<ButtonSimple>Popover 2</ButtonSimple>} strategy="fixed">
            <p>Content 2</p>
          </Popover>
          <ButtonSimple>Other button</ButtonSimple>
        </>
      );

      const button1 = screen.getByRole('button', { name: /Popover 1/i });
      expect(button1.getAttribute('useNativeKeyDown')).toBeNull();

      const button2 = screen.getByRole('button', { name: /Popover 2/i });
      expect(button2.getAttribute('useNativeKeyDown')).toBeNull();
    });

    it('should display only one popover at all time', async () => {
      expect.assertions(7);
      const user = userEvent.setup();

      render(
        <>
          <Popover triggerComponent={<ButtonSimple>Popover 1</ButtonSimple>}>
            <p>Content 1</p>
          </Popover>
          <Popover triggerComponent={<ButtonSimple>Popover 2</ButtonSimple>}>
            <p>Content 2</p>
          </Popover>
          <ButtonSimple>Other button</ButtonSimple>
        </>
      );

      // assert no popover on screen
      const contentBeforeClickPopover1 = screen.queryByText('Content 1');
      expect(contentBeforeClickPopover1).not.toBeInTheDocument();

      // assert no popover on screen
      const contentBeforeClickPopover2 = screen.queryByText('Content 2');
      expect(contentBeforeClickPopover2).not.toBeInTheDocument();

      await openPopoverByClickingOnTriggerAndCheckContent(user, /Popover 1/i, /Content 1/i);

      await openPopoverByClickingOnTriggerAndCheckContent(user, /Popover 2/i, /Content 2/i);

      // assert that first popover has closed, and only second one is open
      const contentAfterClickingBoth = screen.queryByText('Content 1');
      expect(contentAfterClickingBoth).not.toBeInTheDocument();

      // at this point popover 2 is still open and we click on another button
      await user.click(screen.getByRole('button', { name: /Other button/i }));

      const content1AfterClickingOuterButton = screen.queryByText('Content 1');
      expect(content1AfterClickingOuterButton).not.toBeInTheDocument();

      // assert that first popover has closed, and only second one is open
      const content2AfterClickingOuterButton = screen.queryByText('Content 2');
      expect(content2AfterClickingOuterButton).not.toBeInTheDocument();
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

    it('should render the backdrop', async () => {
      expect.assertions(6);
      const user = userEvent.setup();
      const { container } = render(
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

      const backdrop = container.querySelector(`.${POPOVER_STYLE.backdrop}`);
      expect(backdrop).toBeVisible();
      expect(backdrop.getAttribute('aria-hidden')).toBe('true');

      // close the popover
      await user.click(backdrop);

      const contentAfterClick = screen.queryByText('Content');
      expect(contentAfterClick).not.toBeInTheDocument();

      const backdropAfterClose = container.querySelector(`.${POPOVER_STYLE.backdrop}`);
      expect(backdropAfterClose).not.toBeInTheDocument();
    });

    it('should not render the backdrop if addBackdrop is false', async () => {
      expect.assertions(3);
      const user = userEvent.setup();
      const { container } = render(
        <Popover
          triggerComponent={<button>Click Me!</button>}
          interactive
          closeButtonPlacement="top-right"
          closeButtonProps={{ 'aria-label': 'Close' }}
          addBackdrop={false}
        >
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      await openPopoverByClickingOnTriggerAndCheckContent(user);

      // assert no backdrop has been rendered
      const backdrop = container.querySelector(`.${POPOVER_STYLE.backdrop}`);
      expect(backdrop).not.toBeInTheDocument();
    });
  });

  describe('actions', () => {
    it('should show/hide Popover on click', async () => {
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
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });

      expect(props.onHide).toBeCalled();
      expect(props.onHidden).toBeCalled();
      expect(props.onUntrigger).toBeCalled();

      unmount();

      expect(props.onDestroy).toBeCalled();
    });

    it('should show/hide Popover on tab + enter', async () => {
      expect.assertions(4);
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
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('should show Popover on mouseenter', async () => {
      expect.assertions(4);
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

      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });

    it('should show Popover on focusin', async () => {
      expect.assertions(4);
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
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
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

    it('it should focus on the firstFocusElement', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const FirstFocusComponent = () => {
        const [ref, setRef] = useState<HTMLButtonElement>();

        return (
          <Popover
            closeButtonProps={{ 'aria-label': 'Close' }}
            triggerComponent={<button>Click Me!</button>}
            interactive
            closeButtonPlacement="top-right"
            trigger="click"
            hideOnEsc={false}
            firstFocusElement={ref}
          >
            <ButtonSimple role="group" ref={setRef}>
              FirstFocusButton
            </ButtonSimple>
            <p>Content</p>
          </Popover>
        );
      };

      render(<FirstFocusComponent />);

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      await openPopoverByClickingOnTriggerAndCheckContent(user);

      // focus should now be on the first focus el
      const button = screen.getByRole('group');

      expect(document.activeElement).toEqual(button);
    });

    it('should hide Popover after clicking on the backdrop', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Popover triggerComponent={<button>Click Me!</button>} trigger="click">
          <p>Content</p>
        </Popover>
      );

      // assert no popover on screen
      const contentBeforeClick = screen.queryByText('Content');
      expect(contentBeforeClick).not.toBeInTheDocument();

      // after click, popover should be shown
      await openPopoverByClickingOnTriggerAndCheckContent(user);

      const backdrop = container.querySelector(`.${POPOVER_STYLE.backdrop}`);

      await user.click(backdrop);

      // content should be hidden
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
      });
    });
  });
});
