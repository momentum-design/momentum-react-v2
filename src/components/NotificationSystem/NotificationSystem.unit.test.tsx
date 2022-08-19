import React, { CSSProperties } from 'react';
import { act, fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';

import NotificationSystem from './';
import NotificationTemplate from './NotificationTemplate';
import type { AttentionType, PositionType } from './NotificationSystem.types';
import { STYLE } from './NotificationSystem.constants';
import { Id } from 'react-toastify';

type PrepareForSnapshotProps = {
  notificationText: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
  position?: PositionType;
  attention?: AttentionType;
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
  }: PrepareForSnapshotProps) => {
    const { container } = render(
      <NotificationSystem className={className} id={id} style={style} position={position} />
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
  });

  describe('attributes', () => {
    it('should have provided attributes when attributes are provided', async () => {
      expect.assertions(6);
      const { ATTENTION, POSITION } = NotificationSystem;
      const className = 'example-class';
      const style = { color: 'pink' };
      const styleString = 'color: pink;';
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

  describe('actions', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
    it('should show a notification after notify has been fired and disappears after dismiss has been fired', async () => {
      expect.assertions(3);

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

      expect(NotificationSystem.isActive(toastId)).toBeTruthy();

      // dismiss the toast again
      act(() => {
        NotificationSystem.dismiss(toastId);
      });

      // check if toast got removed and the toast is not active anymore
      await waitForElementToBeRemoved(() => screen.getByRole('alert'));
      expect(NotificationSystem.isActive(toastId)).toBeFalsy();
    });

    /* interaction test with "Medium" attention notification missing */
  });
});
