import { toast, ToastContent, Id } from 'react-toastify';
import { DEFAULTS, ATTENTION } from './NotificationSystem.constants';
import type {
  AttentionType,
  NotifyOptionsType,
  UpdateOptionsType,
} from './NotificationSystem.types';

export const getContainerID = (id: string, attention: AttentionType): string =>
  [id, attention, DEFAULTS.CONTAINER_ID_SUFFIX].join('_');

export const calculateAutoClose = (options?: NotifyOptionsType): number | false => {
  const defaultAutoClose =
    options?.attention === ATTENTION.MEDIUM ? false : DEFAULTS.AUTOCLOSE_TIMEOUT;
  return options?.autoClose > 0 ? options.autoClose : defaultAutoClose;
};

export const notify = (content: ToastContent, options?: NotifyOptionsType): Id =>
  toast(content, {
    toastId: options?.toastId,
    autoClose: calculateAutoClose(options),
    containerId: getContainerID(options?.notificationSystemId, options?.attention || ATTENTION.LOW),
    onClose: options?.onClose,
  });

export const update = (toastId: Id, options?: UpdateOptionsType): void => {
  toast.update(toastId, {
    ...options,
    containerId: getContainerID(options?.notificationSystemId, options?.attention || ATTENTION.LOW),
  });
};

export const dismiss = (toastId: Id) => {
  toast.dismiss(toastId);
};
