import { CSSProperties, ReactNode } from 'react';
import { ATTENTION, POSITION } from './NotificationSystem.constants';
import { dismiss, notify, update } from './NotificationSystem.utils';
import NotificationTemplate from './NotificationTemplate';
import type { ToastOptions, UpdateOptions } from 'react-toastify';

export type AttentionType = typeof ATTENTION[keyof typeof ATTENTION];
export type PositionType = typeof POSITION[keyof typeof POSITION];

type CustomOptions = {
  attention?: AttentionType;
  notificationSystemId?: string;
};

export type UpdateOptionsType = UpdateOptions & CustomOptions;

export type NotifyOptionsType =
  | (Pick<ToastOptions, 'toastId' | 'autoClose' | 'onClose'> & CustomOptions)
  | undefined;

export interface CompoundProps {
  /**
   * Trigger a notification
   *
   * These notifications are normal notifications, which will be ranked underneath important notifications,
   * if there are some.
   *
   * `content` - custom content of the notification. A ToastNotification or TextToast component could be for example
   * be passed in - the component will receive a `closeToast` callback prop, which has to be put on the close buttons in
   * your custom notification component.
   * There's also a NotificationTemplate available, which can be used (`<NotificationSystem.Template/>`).
   *
   * If no autoClose is provided, the default autoClose duration of 3000ms will be used
   *
   * Returns the id of the notification, which has been created - can be used for updates, etc.
   */
  notify: typeof notify;

  /**
   * Update a existing notification
   *
   * ...
   */
  update: typeof update;
  dismiss: typeof dismiss;
  /**
   * The ATTENTION enum to give consumers access to the different attention types
   */
  ATTENTION: typeof ATTENTION;
}

export interface Props {
  /**
   * Position of the notifications to appear
   *
   * Could be either `top-right`, `bottom-right`, `top-left` or `bottom-left`
   *
   * Default: `top-right`
   */
  position?: PositionType;
  /**
   * Child components of this NotificationSystem.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
