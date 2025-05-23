import React, { CSSProperties, ReactNode, isValidElement } from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import NotificationSystem from './';
import NotificationTemplate from './NotificationTemplate';
import type { AttentionType, PositionType } from './NotificationSystem.types';
import { STYLE } from './NotificationSystem.constants';
import userEvent from '@testing-library/user-event';
import { renderWithWebComponent } from '../../../test/utils';

type PrepareForSnapshotProps = {
  content: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  position?: PositionType;
  attention?: AttentionType;
  zIndex?: number;
  limit?: number;
  enterAnimation?: Parameters<typeof NotificationSystem>[0]['enterAnimation'];
  newestOnTop?: boolean;
  containerClassName?: string;
  bodyClassName?: string;
  toastClassName?: string;
  ariaLabel: string;
};

// pin the toast id to make the snapshots reliable:
const fixedToastId = '123456';
const textContent = 'This is a test';
const ariaLabelMock = 'notification system';
const content = <button>{textContent}</button>;

describe('<NotificationSystem />', () => {
  const waitForNotificationToAppear = async ({
    content,
    className,
    id,
    style,
    position,
    attention,
    zIndex,
    limit,
    enterAnimation,
    newestOnTop,
    containerClassName,
    bodyClassName,
    toastClassName,
    ariaLabel,
  }: PrepareForSnapshotProps) => {
    const { container } = render(
      <NotificationSystem
        className={className}
        id={id}
        style={style}
        position={position}
        zIndex={zIndex}
        limit={limit}
        enterAnimation={enterAnimation}
        newestOnTop={newestOnTop}
        containerClassName={containerClassName}
        bodyClassName={bodyClassName}
        toastClassName={toastClassName}
        ariaLabel={ariaLabel}
      />
    );

    act(() => {
      NotificationSystem.notify(
        <NotificationTemplate
          aria-label="Some notification"
          content={content}
          toastCloseButtonLabel="Close notification"
        />,
        {
          toastId: fixedToastId,
          notificationSystemId: id,
          attention,
        }
      );
    });

    // wait till the toast shows up on the screen:
    const isReactElement = isValidElement(content);
    if (isReactElement) {
      await screen.findByRole('button', { name: textContent });
    } else {
      await screen.findByText(content as string);
    }
    return { container };
  };

  describe('snapshot', () => {
    it('should match snapshot', async () => {
      expect.assertions(1);
      const { container } = await waitForNotificationToAppear({
        content,
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with className', async () => {
      expect.assertions(1);
      const className = 'example-class';

      const { container } = await waitForNotificationToAppear({
        content,
        className,
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with id', async () => {
      expect.assertions(1);

      const id = 'example-id';
      const { container } = await waitForNotificationToAppear({
        content,
        id,
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with style', async () => {
      expect.assertions(1);

      const style = { color: 'pink' };
      const { container } = await waitForNotificationToAppear({
        content,
        style,
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with different position than default', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        content,
        position: NotificationSystem.POSITION.BOTTOM_RIGHT,
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with different attention type than default', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        content,
        attention: NotificationSystem.ATTENTION.MEDIUM,
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with different zIndex than default', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        content,
        zIndex: 9898,
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with enter animation', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        content,
        enterAnimation: 'slideInBottom',
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with newest on top', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        content,
        newestOnTop: false,
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with toast class name', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        content,
        toastClassName: 'toast',
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with body class name', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        content,
        bodyClassName: 'body-toast',
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with container class name', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        content,
        bodyClassName: 'container',
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot when limit is set to notifications', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        content,
        limit: 5,
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot if notification content is a free string', async () => {
      expect.assertions(1);

      const { container } = await waitForNotificationToAppear({
        content: textContent,
        ariaLabel: ariaLabelMock,
      });

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot if notification content is not a free string', async () => {
      expect.assertions(1);
      const { container } = await waitForNotificationToAppear({
        content,
        ariaLabel: ariaLabelMock,
      });
      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with ariaLabel provided', async () => {
      expect.assertions(1);
      const { container } = await waitForNotificationToAppear({
        content,
        ariaLabel: 'test',
      });
      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have provided attributes when attributes are provided', async () => {
      expect.assertions(7);
      const { ATTENTION, POSITION } = NotificationSystem;
      const className = 'example-class';
      const style = { color: 'pink' };
      const zIndex = 8989;
      const styleString = `color: pink; z-index: ${zIndex};`;
      const id = 'example-id';
      const position = POSITION.BOTTOM_LEFT;
      const attention = ATTENTION.MEDIUM;

      const { container } = await waitForNotificationToAppear({
        content,
        className,
        style,
        id,
        position,
        attention,
        zIndex,
        ariaLabel: ariaLabelMock,
      });

      const notificationContainer = container.querySelector(`section[data-position="${position}"]`);
      expect(notificationContainer.classList.contains(STYLE.wrapper)).toBe(true);
      expect(notificationContainer.classList.contains(className)).toBe(true);
      expect(notificationContainer.getAttribute('style')).toBe(styleString);
      expect(notificationContainer.getAttribute('aria-label')).toBe(ariaLabelMock);
      expect(notificationContainer.getAttribute('data-position')).toBe(position);

      const firstChild = notificationContainer.childNodes[0] as HTMLElement;
      expect(firstChild.getAttribute('id')).toBe(`${id}_${ATTENTION.LOW}_notification_container`);

      const secondChild = notificationContainer.childNodes[1] as HTMLElement;
      expect(secondChild.getAttribute('id')).toBe(
        `${id}_${ATTENTION.MEDIUM}_notification_container`
      );
    });

    it("should limit toast notifications shown on screen when 'limit' is set", async () => {
      const toastLimit = 2;

      const { container } = await waitForNotificationToAppear({
        content,
        limit: toastLimit,
        id: '1234567',
        ariaLabel: ariaLabelMock,
      });

      act(() => {
        NotificationSystem.notify(
          <NotificationTemplate
            content="creating additional toast to meet the toast limit"
            toastCloseButtonLabel="Close notification"
            aria-label="Some notification"
          />,
          {
            toastId: '12345890',
            notificationSystemId: '1234567',
          }
        );
      });

      act(() => {
        NotificationSystem.notify(
          <NotificationTemplate
            content="additional toast to test the limit works"
            toastCloseButtonLabel="Close notification"
            aria-label="Some notification"
          />,
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
  });

  describe('actions', () => {
    it('should show a notification after notify has been fired and disappears after dismiss has been fired', async () => {
      expect.assertions(4);

      render(<NotificationSystem id="id" ariaLabel="test" />);

      const toastId = '12345';
      act(() => {
        NotificationSystem.notify(
          <NotificationTemplate
            aria-label="Some label"
            content={textContent}
            toastCloseButtonLabel="Close notification"
          />,
          {
            autoClose: false,
            toastId,
            notificationSystemId: 'id',
          }
        );
      });

      // wait till the toast shows up on the screen:
      const toast = await screen.findByRole('alert');
      expect(toast).toBeVisible();
      expect(toast).toHaveTextContent(textContent);

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
      await renderWithWebComponent(<NotificationSystem id="id" ariaLabel="test" />);

      const closeButtonText = 'Close';
      const toastId = '12345';
      act(() => {
        NotificationSystem.notify(
          <NotificationTemplate
            content={textContent}
            closeButtonText={closeButtonText}
            toastCloseButtonLabel="Close notification"
            aria-label="Some notification"
          />,
          {
            autoClose: false,
            toastId,
            attention: NotificationSystem.ATTENTION.MEDIUM,
            notificationSystemId: 'id',
          }
        );
      });

      // wait till the toast shows up on the screen:
      const toast = await screen.findByRole('alert');
      expect(toast).toBeVisible();
      expect(toast).toHaveTextContent(textContent);

      expect(NotificationSystem.isActive(toastId)).toBeTruthy();

      const closeButton = screen.getByRole('button', { name: closeButtonText });
      // dismiss the toast by clicking the close button

      fireEvent.click(closeButton);

      // check if toast got removed and the toast is not active anymore
      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      });
      expect(NotificationSystem.isActive(toastId)).toBeFalsy();
    });

    it('should update an existing notification', async () => {
      render(<NotificationSystem id="id" ariaLabel="test" />);

      const toastId = '12345';
      const newcontent = 'this is a new text';
      act(() => {
        NotificationSystem.notify(
          <NotificationTemplate
            aria-label="Some label"
            content={textContent}
            toastCloseButtonLabel="Close notification"
          />,
          {
            autoClose: false,
            toastId,
            notificationSystemId: 'id',
          }
        );
      });

      // wait till the toast shows up on the screen:
      const toast = await screen.findByRole('alert');
      expect(toast).toBeVisible();
      expect(toast).toHaveTextContent(textContent);

      expect(NotificationSystem.isActive(toastId)).toBeTruthy();

      act(() => {
        NotificationSystem.update(toastId, {
          render: (
            <NotificationTemplate
              aria-label="Some label"
              content={newcontent}
              toastCloseButtonLabel="Close notification"
            />
          ),
          notificationSystemId: 'id',
        });
      });

      await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(newcontent);
      });
    });

    it('should allow triggering notifications in multiple systems', async () => {
      expect.assertions(7);

      const firstSystemId = 'id123';
      const secondSystemId = 'id234';
      render(
        <>
          <NotificationSystem id={firstSystemId} ariaLabel="test" />
          <NotificationSystem id={secondSystemId} ariaLabel="test" />
        </>
      );

      act(() => {
        NotificationSystem.notify(
          <NotificationTemplate
            content={textContent + firstSystemId}
            toastCloseButtonLabel="Close notification"
            aria-label="Some notification"
          />,
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
      expect(toasts[0]).toHaveTextContent(textContent + firstSystemId);

      // trigger second notification
      act(() => {
        NotificationSystem.notify(
          <NotificationTemplate
            content={textContent + secondSystemId}
            toastCloseButtonLabel="Close notification"
            aria-label="Some notification"
          />,
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
      expect(toastsAfterUpdate[1]).toHaveTextContent(textContent + secondSystemId);
    });
  });
});
