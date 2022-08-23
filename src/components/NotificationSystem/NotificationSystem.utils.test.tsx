import React from 'react';
import { ATTENTION, DEFAULTS } from './NotificationSystem.constants';
import * as utils from './NotificationSystem.utils';
import { toast } from 'react-toastify';

const { getContainerID, calculateAutoClose, notify, update, dismiss, isActive } = utils;

// this mocking is necessary cause spying on toast function didn't work:
jest.mock('react-toastify', () => {
  const original = jest.requireActual('react-toastify');
  return {
    ...original,
    toast: jest.fn(original.toast),
  };
});

toast.update = jest.fn();
toast.dismiss = jest.fn();
toast.isActive = jest.fn();

describe('NotificationSystem utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('getContainerID', () => {
    it('should return the right container id if an id is passed in', () => {
      const id = '12345';
      expect(getContainerID(id, ATTENTION.LOW)).toBe('12345_low_notification_container');
    });

    it('should return the right container id if no id is passed in', () => {
      expect(getContainerID(undefined, ATTENTION.MEDIUM)).toBe('medium_notification_container');
    });

    it('should return the right container id if no id is passed in', () => {
      expect(getContainerID(undefined, undefined)).toBe('notification_container');
    });
  });

  describe('calculateAutoClose', () => {
    it('should return the right autoClose timeout if an custom autoClose is provided', () => {
      const autoClose = 3500;
      expect(calculateAutoClose({ autoClose })).toBe(3500);
    });

    it('should return false if no custom autoClose is provided and ATTENTION is medium', () => {
      expect(calculateAutoClose({ attention: ATTENTION.MEDIUM })).toBe(false);
    });

    it('should return the DEFAULT timeout if no custom autoClose is provided and ATTENTION is low', () => {
      expect(calculateAutoClose({ attention: ATTENTION.LOW })).toBe(DEFAULTS.AUTOCLOSE_TIMEOUT);
    });
  });

  describe('notify', () => {
    it('should fire the right functions and returns correctly when firing the toast function without any options passed in', () => {
      const autoCloseSpy = jest.spyOn(utils, 'calculateAutoClose');
      const getContainerIDSpy = jest.spyOn(utils, 'getContainerID');

      expect(notify(<div />)).toStrictEqual(expect.any(String));

      expect(toast).toHaveBeenCalledWith(<div />, {
        autoClose: 3000,
        containerId: 'low_notification_container',
        onClose: undefined,
        toastId: undefined,
      });
      expect(autoCloseSpy).toHaveBeenCalledWith(undefined);
      expect(getContainerIDSpy).toHaveBeenCalledWith(undefined, 'low');
    });

    it('should fire the right functions and returns correctly when firing the toast function with custom options passed in', () => {
      const autoCloseSpy = jest.spyOn(utils, 'calculateAutoClose');
      const getContainerIDSpy = jest.spyOn(utils, 'getContainerID');
      const toastId = 'test';
      const notificationSystemId = 'test_containerbla';
      const autoClose = 5000;
      const onClose = jest.fn();
      const attention = ATTENTION.MEDIUM;

      const options = { toastId, onClose, autoClose, notificationSystemId, attention };
      expect(notify(<div />, options)).toBe(toastId);

      expect(toast).toHaveBeenCalledWith(<div />, {
        autoClose: autoClose,
        containerId: 'test_containerbla_medium_notification_container',
        onClose: onClose,
        toastId: toastId,
      });
      expect(autoCloseSpy).toHaveBeenCalledWith(options);
      expect(getContainerIDSpy).toHaveBeenCalledWith(notificationSystemId, ATTENTION.MEDIUM);
    });
  });

  describe('update', () => {
    it('should fire the right functions when updating an existing toast', () => {
      const toastId = notify(<div />);
      const getContainerIDSpy = jest.spyOn(utils, 'getContainerID');

      update(toastId, { toastId: 'new', render: <p />, attention: ATTENTION.MEDIUM });
      expect(toast.update).toHaveBeenCalledWith(toastId, {
        containerId: 'medium_notification_container',
        toastId: 'new',
        render: <p />,
      });
      expect(getContainerIDSpy).toHaveBeenCalledWith(undefined, 'low');
    });
  });

  describe('dismiss', () => {
    it('should fire the right functions when dismissing an existing toast', () => {
      const toastId = notify(<div />);

      dismiss(toastId);
      expect(toast.dismiss).toHaveBeenCalledWith(toastId);
    });
  });

  describe('isActive', () => {
    it('should fire the right functions when firing isActive', () => {
      const toastId = 'test';
      isActive(toastId);
      expect(toast.isActive).toHaveBeenCalledWith(toastId);
    });
  });
});
