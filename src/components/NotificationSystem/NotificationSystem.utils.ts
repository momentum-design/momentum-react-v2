import { toast, ToastContent, Id } from 'react-toastify';
import { DEFAULTS, ATTENTION } from './NotificationSystem.constants';
import type {
  AttentionType,
  NotifyOptionsType,
  UpdateOptionsType,
} from './NotificationSystem.types';

/**
 * Generates the container id for the notifications to be placed in
 * @param id identifier for container
 * @param attention attention type of container
 * @returns the generated id
 */
export const getContainerID = (id: string, attention: AttentionType): string =>
  [id, attention, DEFAULTS.CONTAINER_ID_SUFFIX].join('_').replace(/^_+/, '');

/**
 * Calculates the autoClose value, based on the passed in NotifyOptions
 * @param options notify options, which will decide about what value the autoClose will have
 * @returns a number or false, depended on the passed in options
 */
export const calculateAutoClose = (options?: NotifyOptionsType): number | false => {
  const defaultAutoClose =
    options?.attention === ATTENTION.MEDIUM ? false : DEFAULTS.AUTOCLOSE_TIMEOUT;
  return options?.autoClose > 0 ? options.autoClose : defaultAutoClose;
};

/**
 * **notify** utility function, to trigger a notification with the provided `content`
 * in the defined notification system (`notificationSystemId`)
 * Other options are `attention`, `autoClose`, `toastId` (if u want to define a fixed toastId)
 * and more
 * @param content content to render in the Notification (React.ReactNode)
 * @param options several options to pass in (for details check type)
 * @returns the toastId of the triggered notification
 */
export const notify = (content: ToastContent, options?: NotifyOptionsType): Id =>
  toast(content, {
    toastId: options?.toastId,
    autoClose: calculateAutoClose(options),
    containerId: getContainerID(options?.notificationSystemId, options?.attention || ATTENTION.LOW),
    onClose: options?.onClose,
  });

/**
 * **update** utility function, to update an existing notification in the defined notification system (`notificationSystemId`)
 * Other update options are `render` (to update the content), `autoClose`, `attention` and more
 * @param toastId id of the notification to update
 * @param options several options to pass in (for details check type)
 */
export const update = (toastId: Id, options?: UpdateOptionsType): void => {
  const { notificationSystemId, attention, ...updateOptions } = options;
  toast.update(toastId, {
    ...updateOptions,
    containerId: getContainerID(notificationSystemId, attention || ATTENTION.LOW),
  });
};

/**
 * **dismiss** utility function, to dismiss an existing notification
 * @param toastId id of the notification to dismiss
 */
export const dismiss = (toastId: Id): void => {
  toast.dismiss(toastId);
};

/**
 * **isActive** utility function, which returns true if notification is currently active (=shown)
 * @param toastId id of the notification to check for
 */
export const isActive = (toastId: Id): boolean => toast.isActive(toastId);
