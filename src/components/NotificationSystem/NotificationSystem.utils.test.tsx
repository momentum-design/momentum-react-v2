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
    const id = '12345';
    it('should return the right container id if attention is low', () => {
      expect(getContainerID(id, ATTENTION.LOW)).toBe('12345_low_notification_container');
    });

    it('should return the right container id if attention is medium', () => {
      expect(getContainerID(id, ATTENTION.MEDIUM)).toBe('12345_medium_notification_container');
    });

    it('should return the right container id if attention is undefined', () => {
      expect(getContainerID(id, undefined)).toBe('12345__notification_container');
    });
  });

  describe('calculateAutoClose', () => {
    it('should return the DEFAULT timeout if no option is provided', () => {
      expect(calculateAutoClose({ notificationSystemId: 'id' })).toBe(DEFAULTS.AUTOCLOSE_TIMEOUT);
    });

    it('should return the DEFAULT timeout if no custom autoClose is provided and ATTENTION is low', () => {
      expect(calculateAutoClose({ attention: ATTENTION.LOW, notificationSystemId: 'id' })).toBe(
        DEFAULTS.AUTOCLOSE_TIMEOUT
      );
    });

    it('should return the right autoClose timeout if an custom autoClose is provided', () => {
      const autoClose = 3500;
      expect(calculateAutoClose({ autoClose, notificationSystemId: 'id' })).toBe(3500);
    });

    it('should return false if no custom autoClose is provided', () => {
      expect(calculateAutoClose({ autoClose: false, notificationSystemId: 'id' })).toBe(false);
    });

    it('should return false if no custom autoClose is provided and ATTENTION is medium', () => {
      expect(calculateAutoClose({ attention: ATTENTION.MEDIUM, notificationSystemId: 'id' })).toBe(
        false
      );
    });
  });

  describe('notify', () => {
    it('should fire the right functions and returns correctly when firing the toast function', () => {
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
      const toastId = notify(<div />, { notificationSystemId: 'id' });
      const getContainerIDSpy = jest.spyOn(utils, 'getContainerID');

      update(toastId, {
        toastId: 'new',
        render: <p />,
        attention: ATTENTION.MEDIUM,
        notificationSystemId: 'id',
      });
      expect(toast.update).toHaveBeenCalledWith(toastId, {
        containerId: 'id_medium_notification_container',
        toastId: 'new',
        render: <p />,
      });
      expect(getContainerIDSpy).toHaveBeenCalledWith('id', 'medium');
    });
  });

  describe('dismiss', () => {
    it('should fire the right functions when dismissing an existing toast', () => {
      const toastId = notify(<div />, { notificationSystemId: ' id' });

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
