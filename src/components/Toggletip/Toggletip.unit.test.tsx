import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import ButtonSimple from '../ButtonSimple';

import { COLORS, STYLE } from '../ModalContainer/ModalContainer.constants';
import Toggletip from './';
import { PositioningStrategy } from '../Popover/Popover.types';

jest.mock('uuid', () => {
  return {
    v4: () => '1',
  };
});

describe('<Toggletip />', () => {
  /**
   * Opens the toggletip by click on the trigger component, waits until
   * content gets displayed, expects it to be visible and returns the content.
   * expect() statements count: 1
   * @returns {HTMLElement}
   */
  const openToggletipByClickingOnTriggerAndCheckContent = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any,
    buttonName = /Click me!/i,
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
        <Toggletip triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Toggletip>
      );

      expect(container).toMatchSnapshot();

      await openToggletipByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const className = 'example-class';

      const { container } = render(
        <Toggletip triggerComponent={<button>Click Me!</button>} className={className}>
          <p>Content</p>
        </Toggletip>
      );

      expect(container).toMatchSnapshot();

      await openToggletipByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const id = 'example-id';

      const { container } = render(
        <Toggletip triggerComponent={<button>Click Me!</button>} id={id}>
          <p>Content</p>
        </Toggletip>
      );

      expect(container).toMatchSnapshot();

      await openToggletipByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const style = { color: 'pink' };

      const { container } = render(
        <Toggletip triggerComponent={<button>Click Me!</button>} style={style}>
          <p>Content</p>
        </Toggletip>
      );

      expect(container).toMatchSnapshot();

      await openToggletipByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with color', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Toggletip triggerComponent={<button>Click Me!</button>} color={COLORS.TERTIARY}>
          <p>Content</p>
        </Toggletip>
      );

      expect(container).toMatchSnapshot();

      await openToggletipByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with strategy = fixed', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Toggletip triggerComponent={<button>Click Me!</button>} strategy="fixed">
          <p>Content</p>
        </Toggletip>
      );

      expect(container).toMatchSnapshot();

      await openToggletipByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with offsetSkidding', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Toggletip offsetSkidding={2} triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Toggletip>
      );

      expect(container).toMatchSnapshot();

      await openToggletipByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with offsetDistance', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Toggletip offsetDistance={3} triggerComponent={<button>Click Me!</button>}>
          <p>Content</p>
        </Toggletip>
      );

      expect(container).toMatchSnapshot();

      await openToggletipByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with offsetSkidding and offsetDistance', async () => {
      expect.assertions(3);
      const user = userEvent.setup();

      const { container } = render(
        <Toggletip
          offsetDistance={3}
          offsetSkidding={10}
          triggerComponent={<button>Click Me!</button>}
        >
          <p>Content</p>
        </Toggletip>
      );

      expect(container).toMatchSnapshot();

      await openToggletipByClickingOnTriggerAndCheckContent(user);

      expect(container).toMatchSnapshot();
    });

    it.each([['fixed'], ['absolute']])(
      'should display only one toggletip at all time',
      async (strategy) => {
        expect.assertions(6);
        const user = userEvent.setup();

        const { container } = render(
          <>
            <Toggletip
              triggerComponent={<ButtonSimple>Toggletip 1</ButtonSimple>}
              strategy={strategy as PositioningStrategy}
            >
              <p>Content 1</p>
            </Toggletip>
            <Toggletip
              triggerComponent={<ButtonSimple>Toggletip 2</ButtonSimple>}
              strategy={strategy as PositioningStrategy}
            >
              <p>Content 2</p>
            </Toggletip>
            <ButtonSimple>Other button</ButtonSimple>
          </>
        );

        expect(container).toMatchSnapshot();

        await openToggletipByClickingOnTriggerAndCheckContent(user, /Toggletip 1/i, /Content 1/i);

        expect(container).toMatchSnapshot();

        await openToggletipByClickingOnTriggerAndCheckContent(user, /Toggletip 2/i, /Content 2/i);

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
        <Toggletip
          triggerComponent={<button>Click Me!</button>}
          className={className}
          style={style}
          color={COLORS.TERTIARY}
          id={id}
        >
          <p>Content</p>
        </Toggletip>
      );
      const content = await openToggletipByClickingOnTriggerAndCheckContent(user);

      expect(content.parentElement.classList.contains(STYLE.wrapper)).toBe(true);
      expect(content.parentElement.classList.contains(className)).toBe(true);
      expect(content.parentElement.getAttribute('style')).toBe(styleString);
      expect(content.parentElement.getAttribute('data-color')).toBe(COLORS.TERTIARY);
      expect(content.parentElement.id).toBe(id);
      expect(content.parentElement.getAttribute('aria-labelledby')).toBeNull();
    });

    it('checks triggerComponent props when id is not defined', async () => {
      render(
        <Toggletip triggerComponent={<button>Toggletip 1</button>}>
          <p>Content</p>
        </Toggletip>
      );
      const button1 = screen.getByRole('button', { name: /Toggletip 1/i });
      expect(button1.getAttribute('id')).toBeNull();
      expect(button1.getAttribute('aria-haspopup')).toBe(null);
    });

    it('checks triggerComponent props when id is defined', async () => {
      const id = 'example-id';
      render(
        <Toggletip triggerComponent={<button id={id}>Toggletip 1</button>}>
          <p>Content</p>
        </Toggletip>
      );
      const button1 = screen.getByRole('button', { name: /Toggletip 1/i });
      expect(button1.getAttribute('id')).toBe(id);
      expect(button1.getAttribute('aria-haspopup')).toBe(null);
    });

    it('should not add useNativeKeyDown on the DOM button', async () => {
      expect.assertions(2);

      render(
        <>
          <Toggletip triggerComponent={<button>Toggletip 1</button>} strategy="fixed">
            <p>Content 1</p>
          </Toggletip>
          <Toggletip triggerComponent={<ButtonSimple>Toggletip 2</ButtonSimple>} strategy="fixed">
            <p>Content 2</p>
          </Toggletip>
          <ButtonSimple>Other button</ButtonSimple>
        </>
      );

      const button1 = screen.getByRole('button', { name: /Toggletip 1/i });
      expect(button1.getAttribute('useNativeKeyDown')).toBeNull();

      const button2 = screen.getByRole('button', { name: /Toggletip 2/i });
      expect(button2.getAttribute('useNativeKeyDown')).toBeNull();
    });

    it('should display only one toggletip at all time', async () => {
      expect.assertions(7);
      const user = userEvent.setup();

      render(
        <>
          <Toggletip triggerComponent={<ButtonSimple>Toggletip 1</ButtonSimple>}>
            <p>Content 1</p>
          </Toggletip>
          <Toggletip triggerComponent={<ButtonSimple>Toggletip 2</ButtonSimple>}>
            <p>Content 2</p>
          </Toggletip>
          <ButtonSimple>Other button</ButtonSimple>
        </>
      );

      // assert no toggletip on screen
      const contentBeforeClickToggletip1 = screen.queryByText('Content 1');
      expect(contentBeforeClickToggletip1).not.toBeInTheDocument();

      // assert no toggletip on screen
      const contentBeforeClickToggletip2 = screen.queryByText('Content 2');
      expect(contentBeforeClickToggletip2).not.toBeInTheDocument();

      await openToggletipByClickingOnTriggerAndCheckContent(user, /Toggletip 1/i, /Content 1/i);

      await openToggletipByClickingOnTriggerAndCheckContent(user, /Toggletip 2/i, /Content 2/i);

      // assert that first toggletip has closed, and only second one is open
      const contentAfterClickingBoth = screen.queryByText('Content 1');
      expect(contentAfterClickingBoth).not.toBeInTheDocument();

      // at this point toggletip 2 is still open and we click on another button
      await user.click(screen.getByRole('button', { name: /Other button/i }));

      const content1AfterClickingOuterButton = screen.queryByText('Content 1');
      expect(content1AfterClickingOuterButton).not.toBeInTheDocument();

      // assert that first toggletip has closed, and only second one is open
      const content2AfterClickingOuterButton = screen.queryByText('Content 2');
      expect(content2AfterClickingOuterButton).not.toBeInTheDocument();
    });
  });

  it('should show/hide Toggletip on click', async () => {
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
      <Toggletip triggerComponent={<button>Click Me!</button>} {...props}>
        <p>Content</p>
      </Toggletip>
    );

    expect(props.onCreate).toBeCalled();

    expect(props.onShow).not.toBeCalled();
    expect(props.onShown).not.toBeCalled();
    expect(props.onTrigger).not.toBeCalled();

    // assert no toggletip on screen
    const contentBeforeClick = screen.queryByText('Content');
    expect(contentBeforeClick).not.toBeInTheDocument();

    // after click, toggletip should be shown
    await openToggletipByClickingOnTriggerAndCheckContent(user);

    expect(props.onMount).toBeCalled();
    expect(props.onShow).toBeCalled();
    expect(props.onTrigger).toBeCalled();

    expect(props.onHide).not.toBeCalled();
    expect(props.onHidden).not.toBeCalled();
    expect(props.onUntrigger).not.toBeCalled();
    expect(props.onDestroy).not.toBeCalled();

    // after click second time, toggletip should be hidden again
    await user.click(screen.getByRole('button', { name: /Click me!/i }));
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    expect(props.onHide).toBeCalled();
    expect(props.onHidden).toBeCalled();
    expect(props.onUntrigger).toBeCalled();

    unmount();

    expect(props.onDestroy).toBeCalled();
  });

  it('should hide Toggletip on focus out', async () => {
    expect.assertions(3);
    const user = userEvent.setup();

    render(
      <Toggletip triggerComponent={<button>Click Me!</button>}>
        <p>Content</p>
      </Toggletip>
    );

    // assert no toggletip on screen
    const contentBeforeClick = screen.queryByText('Content');
    expect(contentBeforeClick).not.toBeInTheDocument();

    await openToggletipByClickingOnTriggerAndCheckContent(user);

    // after tabbing to it, toggletip should disappear
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });

  it('should hide Toggletip after pressing Esc by default', async () => {
    expect.assertions(3);
    const user = userEvent.setup();

    render(
      <Toggletip triggerComponent={<button>Click Me!</button>}>
        <p>Content</p>
      </Toggletip>
    );

    // assert no toggletip on screen
    const contentBeforeClick = screen.queryByText('Content');
    expect(contentBeforeClick).not.toBeInTheDocument();

    // after click, toggletip should be shown
    await openToggletipByClickingOnTriggerAndCheckContent(user);

    await user.keyboard('{Escape}');

    // content should be hidden
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });
  });
});
