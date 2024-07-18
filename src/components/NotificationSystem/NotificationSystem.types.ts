import { CSSProperties, ReactNode } from 'react';
import { ATTENTION, POSITION } from './NotificationSystem.constants';
import { dismiss, isActive, notify, update } from './NotificationSystem.utils';
import type { ToastOptions, UpdateOptions } from 'react-toastify';

export type AttentionType = typeof ATTENTION[keyof typeof ATTENTION];
export type PositionType = typeof POSITION[keyof typeof POSITION];

type CustomOptions = {
  /**
   * attention type - can be either 'MEDIUM' or 'LOW'
   *
   * MEDIUM notifications will always stay on top and are meant to be notifications that require action, like clicking a button
   *
   * LOW notifications will be shown underneath the MEDIUM ones and are meant to be for information purposes
   */
  attention?: AttentionType;
  /**
   * The id of the NotificationSystem to add/update the notification at
   *
   * Can be used to trigger multiple notifications at different positions on the screen at the same time
   */
  notificationSystemId?: string;
};

export type UpdateOptionsType = UpdateOptions & CustomOptions;

export type NotifyOptionsType =
  | (Pick<ToastOptions, 'toastId' | 'autoClose' | 'onClose' | 'role'> & CustomOptions)
  | undefined;

export interface CompoundProps {
  /**
   * Trigger a notification
   *
   * `content` - custom content of the notification. A ToastNotification or TextToast component could be for example
   * be passed in - the component will receive a `closeToast` callback prop, which has to be put on the close buttons in
   * your custom notification component.
   *
   * Returns the id of the notification, which has been created - can be used for updates, etc.
   */
  notify: typeof notify;

  /**
   * Update a existing notification
   *
   * Pass in the toastId to update an existing notification. To update the content of the notification, use the `render` option
   */
  update: typeof update;

  /**
   * Dismiss a existing notification
   *
   * Pass in the toastId to dismiss an existing notification
   */
  dismiss: typeof dismiss;
  /**
   * Returns true if the provided toastId points to an active notification (= currently shown on the screen)
   */
  isActive: typeof isActive;
  /**
   * The ATTENTION enum to give consumers access to the different attention types
   */
  ATTENTION: typeof ATTENTION;
  /**
   * The POSITION enum to give consumers access to the different positioning options
   */
  POSITION: typeof POSITION;
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
   * Allows overriding the zIndex of the NotificationSystem
   *
   * Default: 10000
   */
  zIndex?: number;
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

  /**
   * limit the number of notifications displayed.
   */
  limit?: number;

  /**
   * Determines wether the new notifications go on top or not.
   */
  newestOnTop?: boolean;

  /**
   * CSS animation when the toast enters the screen.
   * @default 'slideInRight'
   */
  enterAnimation?: 'slideInRight' | 'slideInBottom';

  /**
   * Add optional classes to the toast
   */
  toastClassName?: string;

  /**
   * Add optional classes to the toast body
   */
  bodyClassName?: string;

  /**
   * Add optional classes to the container
   */
  containerClassName?: string;

  /**
   * Required ariaLabel for the notification system container section to be a region (a11y requirement)
   */
  ariaLabel: string
}
