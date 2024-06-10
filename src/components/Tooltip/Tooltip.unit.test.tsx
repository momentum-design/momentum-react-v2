import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import ButtonSimple from '../ButtonSimple';

import { COLORS, STYLE } from '../ModalContainer/ModalContainer.constants';
import Tooltip from './';
import { PositioningStrategy } from '../Popover/Popover.types';
import { act } from 'react-dom/test-utils';

jest.mock('uuid', () => {
  return {
    v4: () => '1',
  };
});

describe('<Tooltip />', () => {
  /**
   * Opens the tooltip by hover on the trigger component, waits until
   * content gets displayed, expects it to be visible and returns the content.
   * expect() statements count: 1
   * @returns {HTMLElement}
   */
  const openTooltipByHoveringOnTriggerAndCheckContent = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any,
    buttonName = /hover me!/i,
    contentName = /Content/i
  ) => {
    await user.hover(screen.getByRole('button', { name: buttonName }));
    const content = await screen.findByText(contentName);
    expect(content).toBeVisible();
    return content;
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Tooltip triggerComponent={<button>Hover Me!</button>}>
          <p>Content</p>
        </Tooltip>
      );

      expect(container).toMatchSnapshot();

      await openTooltipByHoveringOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const className = 'example-class';

      const { container } = render(
        <Tooltip triggerComponent={<button>Hover Me!</button>} className={className}>
          <p>Content</p>
        </Tooltip>
      );

      expect(container).toMatchSnapshot();

      await openTooltipByHoveringOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const id = 'example-id';

      const { container } = render(
        <Tooltip triggerComponent={<button>Hover Me!</button>} id={id}>
          <p>Content</p>
        </Tooltip>
      );

      expect(container).toMatchSnapshot();

      await openTooltipByHoveringOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const style = { color: 'pink' };

      const { container } = render(
        <Tooltip triggerComponent={<button>Hover Me!</button>} style={style}>
          <p>Content</p>
        </Tooltip>
      );

      expect(container).toMatchSnapshot();

      await openTooltipByHoveringOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Tooltip triggerComponent={<button>Hover Me!</button>} color={COLORS.TERTIARY}>
          <p>Content</p>
        </Tooltip>
      );

      expect(container).toMatchSnapshot();

      await openTooltipByHoveringOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with strategy = fixed', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Tooltip triggerComponent={<button>Hover Me!</button>} strategy="fixed">
          <p>Content</p>
        </Tooltip>
      );

      expect(container).toMatchSnapshot();

      await openTooltipByHoveringOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with offsetSkidding', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Tooltip offsetSkidding={2} triggerComponent={<button>Hover Me!</button>}>
          <p>Content</p>
        </Tooltip>
      );

      expect(container).toMatchSnapshot();

      await openTooltipByHoveringOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with offsetDistance', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Tooltip offsetDistance={3} triggerComponent={<button>Hover Me!</button>}>
          <p>Content</p>
        </Tooltip>
      );

      expect(container).toMatchSnapshot();

      await openTooltipByHoveringOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with offsetSkidding and offsetDistance', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Tooltip
          offsetDistance={3}
          offsetSkidding={10}
          triggerComponent={<button>Hover Me!</button>}
        >
          <p>Content</p>
        </Tooltip>
      );

      expect(container).toMatchSnapshot();

      await openTooltipByHoveringOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it.each([['fixed'], ['absolute']])(
      'should display only one tooltip at all time',
      async (strategy) => {
        expect.assertions(6);
        const user = userEvent.setup();

        const { container } = render(
          <>
            <Tooltip
              triggerComponent={<ButtonSimple>Tooltip 1</ButtonSimple>}
              strategy={strategy as PositioningStrategy}
            >
              <p>Content 1</p>
            </Tooltip>
            <Tooltip
              triggerComponent={<ButtonSimple>Tooltip 2</ButtonSimple>}
              strategy={strategy as PositioningStrategy}
            >
              <p>Content 2</p>
            </Tooltip>
            <ButtonSimple>Other button</ButtonSimple>
          </>
        );

        expect(container).toMatchSnapshot();

        await openTooltipByHoveringOnTriggerAndCheckContent(user, /Tooltip 1/i, /Content 1/i);

        expect(container).toMatchSnapshot();

        await openTooltipByHoveringOnTriggerAndCheckContent(user, /Tooltip 2/i, /Content 2/i);

        expect(container).toMatchSnapshot();

        await user.click(screen.getByRole('button', { name: /Other button/i }));

        expect(container).toMatchSnapshot();
      }
    );
  });

  describe('attributes', () => {
    it('should have provided attributes when attributes are provided', async () => {
      expect.assertions(7);
      const user = userEvent.setup();

      const className = 'example-class';
      const style = { color: 'pink' };
      const styleString = 'color: pink;';
      const id = 'example-id';

      render(
        <Tooltip
          triggerComponent={<button>Hover Me!</button>}
          className={className}
          style={style}
          color={COLORS.TERTIARY}
          id={id}
        >
          <p>Content</p>
        </Tooltip>
      );
      const content = await openTooltipByHoveringOnTriggerAndCheckContent(user);

      expect(content.parentElement.classList.contains(STYLE.wrapper)).toBe(true);
      expect(content.parentElement.classList.contains(className)).toBe(true);
      expect(content.parentElement.getAttribute('style')).toBe(styleString);
      expect(content.parentElement.getAttribute('data-color')).toBe(COLORS.TERTIARY);
      expect(content.parentElement.id).toBe(id);
      expect(content.parentElement.getAttribute('aria-labelledby')).toBeNull();
    });

    it('add aria-labelledby to trigger component by default', async () => {
      const user = userEvent.setup();

      render(
        <Tooltip triggerComponent={<button>Hover Me!</button>}>
          <p>Content</p>
        </Tooltip>
      );
      await openTooltipByHoveringOnTriggerAndCheckContent(user);
      const trigger = await screen.findByText(/hover me!/i);
      expect(trigger.getAttribute('aria-labelledby')).toMatch(/tippy-\d+/);
      expect(trigger.getAttribute('aria-haspopup')).toBe(null);
    });

    it('add aria-labelledby to trigger component  when isDescription is false', async () => {
      const user = userEvent.setup();

      render(
        <Tooltip isDescription={false} triggerComponent={<button>Hover Me!</button>}>
          <p>Content</p>
        </Tooltip>
      );
      await openTooltipByHoveringOnTriggerAndCheckContent(user);
      const trigger = await screen.findByText(/hover me!/i);
      expect(trigger.getAttribute('aria-labelledby')).toMatch(/tippy-\d+/);
      expect(trigger.getAttribute('aria-haspopup')).toBe(null);
    });

    it('add aria-describedby to trigger component when isDescription is true', async () => {
      const user = userEvent.setup();

      render(
        <Tooltip isDescription triggerComponent={<button>Hover Me!</button>}>
          <p>Content</p>
        </Tooltip>
      );
      await openTooltipByHoveringOnTriggerAndCheckContent(user);
      const trigger = await screen.findByText(/hover me!/i);
      expect(trigger.getAttribute('aria-describedby')).toMatch(/tippy-\d+/);
      expect(trigger.getAttribute('aria-haspopup')).toBe(null);
    });

    it('checks triggerComponent props when aria-haspopup is defined', async () => {
      render(
        <Tooltip triggerComponent={<button aria-haspopup={'grid'}>Tooltip 1</button>}>
          <p>Content</p>
        </Tooltip>
      );
      const button1 = screen.getByRole('button', { name: /Tooltip 1/i });
      expect(button1.getAttribute('id')).toBeNull();
      expect(button1.getAttribute('aria-haspopup')).toBe('grid');
    });

    it('checks triggerComponent props when id is not defined', async () => {
      render(
        <Tooltip triggerComponent={<button>Tooltip 1</button>}>
          <p>Content</p>
        </Tooltip>
      );
      const button1 = screen.getByRole('button', { name: /Tooltip 1/i });
      expect(button1.getAttribute('id')).toBeNull();
      expect(button1.getAttribute('aria-haspopup')).toBe(null);
    });

    it('checks triggerComponent props when id is defined', async () => {
      const id = 'example-id';
      render(
        <Tooltip triggerComponent={<button id={id}>Tooltip 1</button>}>
          <p>Content</p>
        </Tooltip>
      );
      const button1 = screen.getByRole('button', { name: /Tooltip 1/i });
      expect(button1.getAttribute('id')).toBe(id);
      expect(button1.getAttribute('aria-haspopup')).toBe(null);
    });

    it('should not add useNativeKeyDown on the DOM button', async () => {
      expect.assertions(2);

      render(
        <>
          <Tooltip triggerComponent={<button>Tooltip 1</button>} strategy="fixed">
            <p>Content 1</p>
          </Tooltip>
          <Tooltip triggerComponent={<ButtonSimple>Tooltip 2</ButtonSimple>} strategy="fixed">
            <p>Content 2</p>
          </Tooltip>
          <ButtonSimple>Other button</ButtonSimple>
        </>
      );

      const button1 = screen.getByRole('button', { name: /Tooltip 1/i });
      expect(button1.getAttribute('useNativeKeyDown')).toBeNull();

      const button2 = screen.getByRole('button', { name: /Tooltip 2/i });
      expect(button2.getAttribute('useNativeKeyDown')).toBeNull();
    });

    it('should display only one tooltip at all time', async () => {
      expect.assertions(7);
      const user = userEvent.setup();

      render(
        <>
          <Tooltip triggerComponent={<ButtonSimple>Tooltip 1</ButtonSimple>}>
            <p>Content 1</p>
          </Tooltip>
          <Tooltip triggerComponent={<ButtonSimple>Tooltip 2</ButtonSimple>}>
            <p>Content 2</p>
          </Tooltip>
          <ButtonSimple>Other button</ButtonSimple>
        </>
      );

      // assert no tooltip on screen
      const contentBeforeHoverTooltip1 = screen.queryByText('Content 1');
      expect(contentBeforeHoverTooltip1).not.toBeInTheDocument();

      // assert no tooltip on screen
      const contentBeforeHoverTooltip2 = screen.queryByText('Content 2');
      expect(contentBeforeHoverTooltip2).not.toBeInTheDocument();

      await openTooltipByHoveringOnTriggerAndCheckContent(user, /Tooltip 1/i, /Content 1/i);

      await openTooltipByHoveringOnTriggerAndCheckContent(user, /Tooltip 2/i, /Content 2/i);

      // assert that first tooltip has closed, and only second one is open
      const contentAfterHoveringBoth = screen.queryByText('Content 1');
      expect(contentAfterHoveringBoth).not.toBeInTheDocument();

      // at this point tooltip 2 is still open and we click on another button
      await user.click(screen.getByRole('button', { name: /Other button/i }));

      const content1AfterHoveringOuterButton = screen.queryByText('Content 1');
      expect(content1AfterHoveringOuterButton).not.toBeInTheDocument();

      // assert that first tooltip has closed, and only second one is open
      const content2AfterHoveringOuterButton = screen.queryByText('Content 2');
      expect(content2AfterHoveringOuterButton).not.toBeInTheDocument();
    });
  });

  it('should show/hide Tooltip on hover', async () => {
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
      <Tooltip isDescription triggerComponent={<button>Hover Me!</button>} {...props}>
        <p>Content</p>
      </Tooltip>
    );

    expect(props.onCreate).toBeCalled();

    expect(props.onShow).not.toBeCalled();
    expect(props.onShown).not.toBeCalled();
    expect(props.onTrigger).not.toBeCalled();

    // assert no tooltip on screen
    const contentBeforeHover = screen.queryByText('Content');
    expect(contentBeforeHover).not.toBeInTheDocument();

    // after hover, tooltip should be shown
    await openTooltipByHoveringOnTriggerAndCheckContent(user);

    expect(props.onMount).toBeCalled();
    expect(props.onShow).toBeCalled();
    expect(props.onTrigger).toBeCalled();

    expect(props.onHide).not.toBeCalled();
    expect(props.onHidden).not.toBeCalled();
    expect(props.onUntrigger).not.toBeCalled();
    expect(props.onDestroy).not.toBeCalled();

    // after un-hover, tooltip should be hidden again
    await user.unhover(screen.getByRole('button', { name: /hover me!/i }));
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    expect(props.onHide).toBeCalled();
    expect(props.onHidden).toBeCalled();
    expect(props.onUntrigger).toBeCalled();

    unmount();

    expect(props.onDestroy).toBeCalled();
  });

  it('should show Tooltip on mouseenter', async () => {
    expect.assertions(4);
    const user = userEvent.setup();

    render(
      <Tooltip isDescription triggerComponent={<button>Hover Me!</button>}>
        <p>Content</p>
      </Tooltip>
    );

    // assert no tooltip on screen
    const contentBeforeHover = screen.queryByText('Content');
    expect(contentBeforeHover).not.toBeInTheDocument();

    // after hover, tooltip should be shown
    await user.hover(screen.getByRole('button', { name: /hover me!/i }));
    const content = await screen.findByText('Content');
    expect(content).toBeVisible();

    // after unhover, tooltip should be hidden again
    await user.unhover(screen.getByRole('button', { name: /hover me!/i }));

    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });

  it('should show Tooltip on focusin', async () => {
    expect.assertions(4);
    const user = userEvent.setup();

    render(
      <Tooltip triggerComponent={<button>Focus Me!</button>}>
        <p>Content</p>
      </Tooltip>
    );

    // assert no tooltip on screen
    const contentBeforeHover = screen.queryByText('Content');
    expect(contentBeforeHover).not.toBeInTheDocument();

    // after tabbing to it, tooltip should be shown
    await user.tab();
    const content = await screen.findByText('Content');
    expect(content).toBeVisible();

    // after tabbing away, tooltip should be hidden again
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });

  it('should hide Tooltip after pressing Esc by default', async () => {
    expect.assertions(3);
    const user = userEvent.setup();

    render(
      <Tooltip triggerComponent={<button>Hover Me!</button>}>
        <p>Content</p>
      </Tooltip>
    );

    // assert no tooltip on screen
    const contentBeforeHover = screen.queryByText('Content');
    expect(contentBeforeHover).not.toBeInTheDocument();

    // after hover, tooltip should be shown
    await openTooltipByHoveringOnTriggerAndCheckContent(user);

    await user.keyboard('{Escape}');

    // content should be hidden
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });
});
