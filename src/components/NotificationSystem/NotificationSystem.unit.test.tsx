import React, { CSSProperties } from 'react';
import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';

import NotificationSystem from './';
import NotificationTemplate from './NotificationTemplate';
import type { AttentionType, PositionType } from './NotificationSystem.types';
import { STYLE } from './NotificationSystem.constants';
import userEvent from '@testing-library/user-event';

type PrepareForSnapshotProps = {
  notificationText: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  position?: PositionType;
  attention?: AttentionType;
  zIndex?: number;
  limit?: number;
  enterAnimation?: string;
  newestOnTop?: boolean;
  containerClassName?: string;
  bodyClassName?: string;
  toastClassName?: string;
};

// pin the toast id to make the snapshots reliable:
const fixedToastId = '123456';
const notificationText = 'This is a test';

describe('<NotificationSystem />', () => {
  const waitForNotificationToAppear = async ({
    notificationText,
    className,
    id,
    style,
    position,
    attention,
    zIndex,
    limit,
  }: PrepareForSnapshotProps) => {
    const { container } = render(
      <NotificationSystem
        className={className}
        id={id}
        style={style}
        position={position}
        zIndex={zIndex}
        limit={limit}
      />
    );

    act(() => {
      NotificationSystem.notify(<NotificationTemplate notificationText={notificationText} />, {
        toastId: fixedToastId,
        notificationSystemId: id,
        attention,
      });
    });

    // wait till the toast shows up on the screen:
    await screen.findByText(notificationText);
    return { container };
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);
      const { container } = await waitForNotificationToAppear({ notificationText });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);
      const className = 'example-class';

      const { container } = await waitForNotificationToAppear({ notificationText, className });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';
      const { container } = await waitForNotificationToAppear({ notificationText, id });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const { container } = await waitForNotificationToAppear({ notificationText, style });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with different position than default', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        notificationText,
        position: NotificationSystem.POSITION.BOTTOM_RIGHT,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with different attention type than default', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        notificationText,
        attention: NotificationSystem.ATTENTION.MEDIUM,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with different zIndex than default', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        notificationText,
        zIndex: 9898,
      });

      expect(container).toMatchSnapshot();
    });
  });

  it('should match snapshot when limit is set to notifications', async () => {
    expect.assertions(1);

    const { container } = await waitForNotificationToAppear({
      notificationText,
      limit: 5,
    });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with enter animation', async () => {
    expect.assertions(1);

    const { container } = await waitForNotificationToAppear({
      notificationText,
      enterAnimation: 'slideInBottom',
    });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with newest on top', async () => {
    expect.assertions(1);

    const { container } = await waitForNotificationToAppear({
      notificationText,
      newestOnTop: false,
    });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with toast class name', async () => {
    expect.assertions(1);

    const { container } = await waitForNotificationToAppear({
      notificationText,
      toastClassName: 'toast',
    });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with body class name', async () => {
    expect.assertions(1);

    const { container } = await waitForNotificationToAppear({
      notificationText,
      bodyClassName: 'body-toast',
    });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot with container class name', async () => {
    expect.assertions(1);

    const { container } = await waitForNotificationToAppear({
      notificationText,
      bodyClassName: 'container',
    });

    expect(container).toMatchSnapshot();
  });

  describe('attributes', () => {
    it('should have provided attributes when attributes are provided', async () => {
      expect.assertions(6);
      const { ATTENTION, POSITION } = NotificationSystem;
      const className = 'example-class';
      const style = { color: 'pink' };
      const zIndex = 8989;
      const styleString = `color: pink; z-index: ${zIndex};`;
      const id = 'example-id';
      const position = POSITION.BOTTOM_LEFT;
      const attention = ATTENTION.MEDIUM;

      const { container } = await waitForNotificationToAppear({
        notificationText,
        className,
        style,
        id,
        position,
        attention,
        zIndex,
      });

      const notificationContainer = container.querySelector(`[data-position="${position}"]`);
      expect(notificationContainer.classList.contains(STYLE.wrapper)).toBe(true);
      expect(notificationContainer.classList.contains(className)).toBe(true);
      expect(notificationContainer.getAttribute('style')).toBe(styleString);
      expect(notificationContainer.getAttribute('data-position')).toBe(position);

      const firstChild = notificationContainer.childNodes[0] as HTMLElement;
      expect(firstChild.getAttribute('id')).toBe(`${id}_${ATTENTION.LOW}_notification_container`);

      const secondChild = notificationContainer.childNodes[1] as HTMLElement;
      expect(secondChild.getAttribute('id')).toBe(
        `${id}_${ATTENTION.MEDIUM}_notification_container`
      );
    });
  });

  it("should limit toast notifications shown on screen when 'limit' is set", async () => {
    const toastLimit = 2;

    const { container } = await waitForNotificationToAppear({
      notificationText,
      limit: toastLimit,
      id: '1234567',
    });

    act(() => {
      NotificationSystem.notify(
        <NotificationTemplate notificationText="creating additional toast to meet the toast limit" />,
        {
          toastId: '12345890',
          notificationSystemId: '1234567',
        }
      );
    });

    act(() => {
      NotificationSystem.notify(
        <NotificationTemplate notificationText="additional toast to test the limit works" />,
        {
          toastId: '1234589012',
          notificationSystemId: '1234567',
        }
      );
    });

    await screen.findByText('creating additional toast to meet the toast limit');

    const notificationContainerToasts = container.getElementsByClassName(
      'md-toast-notification-wrapper'
    );
    expect(notificationContainerToasts.length).toBe(toastLimit);
  });

  describe('actions', () => {
    it('should show a notification after notify has been fired and disappears after dismiss has been fired', async () => {
      expect.assertions(4);

      render(<NotificationSystem />);

      const toastId = '12345';
      act(() => {
        NotificationSystem.notify(<NotificationTemplate notificationText={notificationText} />, {
          autoClose: false,
          toastId,
        });
      });

      // wait till the toast shows up on the screen:
      const toast = await screen.findByRole('alert');
      expect(toast).toBeVisible();
      expect(toast).toHaveTextContent(notificationText);

      expect(NotificationSystem.isActive(toastId)).toBeTruthy();

      // dismiss the toast again
      act(() => {
        NotificationSystem.dismiss(toastId);
      });

      // check if toast got removed and the toast is not active anymore
      await waitForElementToBeRemoved(() => screen.queryByRole('alert'));
      expect(NotificationSystem.isActive(toastId)).toBeFalsy();
    });

    it('should close the `medium attention` notification after clicking on the close button', async () => {
      expect.assertions(5);
      const user = userEvent.setup();

      render(<NotificationSystem />);

      const closeButtonText = 'Close';
      const toastId = '12345';
      act(() => {
        NotificationSystem.notify(
          <NotificationTemplate
            notificationText={notificationText}
            closeButtonText={closeButtonText}
          />,
          {
            autoClose: false,
            toastId,
            attention: NotificationSystem.ATTENTION.MEDIUM,
          }
        );
      });

      // wait till the toast shows up on the screen:
      const toast = await screen.findByRole('alert');
      expect(toast).toBeVisible();
      expect(toast).toHaveTextContent(notificationText);

      expect(NotificationSystem.isActive(toastId)).toBeTruthy();

      const closeButton = screen.getByRole('button', { name: closeButtonText });
      // dismiss the toast by clicking the close button

      await user.click(closeButton);

      // check if toast got removed and the toast is not active anymore
      const toastAfterRemoval = screen.queryByRole('alert');
      expect(toastAfterRemoval).not.toBeInTheDocument();
      expect(NotificationSystem.isActive(toastId)).toBeFalsy();
    });

    it('should update an existing notification', async () => {
      expect.assertions(5);

      render(<NotificationSystem />);

      const toastId = '12345';
      const newNotificationText = 'this is a new text';
      act(() => {
        NotificationSystem.notify(<NotificationTemplate notificationText={notificationText} />, {
          autoClose: false,
          toastId,
        });
      });

      // wait till the toast shows up on the screen:
      const toast = await screen.findByRole('alert');
      expect(toast).toBeVisible();
      expect(toast).toHaveTextContent(notificationText);

      expect(NotificationSystem.isActive(toastId)).toBeTruthy();

      act(() => {
        NotificationSystem.update(toastId, {
          render: <NotificationTemplate notificationText={newNotificationText} />,
        });
      });

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(newNotificationText);
      });
    });

    it('should allow triggering notifications in multiple systems', async () => {
      expect.assertions(7);

      const firstSystemId = 'id123';
      const secondSystemId = 'id234';
      render(
        <>
          <NotificationSystem id={firstSystemId} />
          <NotificationSystem id={secondSystemId} />
        </>
      );

      act(() => {
        NotificationSystem.notify(
          <NotificationTemplate notificationText={notificationText + firstSystemId} />,
          {
            autoClose: false,
            notificationSystemId: firstSystemId,
          }
        );
      });

      // wait till the first toast shows up on the screen:
      const toasts = await screen.findAllByRole('alert');
      expect(toasts).toHaveLength(1);
      expect(toasts[0]).toBeVisible();
      expect(toasts[0]).toHaveTextContent(notificationText + firstSystemId);

      // trigger second notification
      act(() => {
        NotificationSystem.notify(
          <NotificationTemplate notificationText={notificationText + secondSystemId} />,
          {
            autoClose: false,
            notificationSystemId: secondSystemId,
          }
        );
      });

      // wait till the 2 toasts shows up on the screen:
      let toastsAfterUpdate: HTMLElement[];
      await waitFor(() => {
        toastsAfterUpdate = screen.getAllByRole('alert');
        expect(toastsAfterUpdate).toHaveLength(2);
      });
      expect(toastsAfterUpdate[1]).toBeVisible();
      expect(toastsAfterUpdate[1]).toHaveTextContent(notificationText + secondSystemId);
    });
  });
});
