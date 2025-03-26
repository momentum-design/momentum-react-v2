import React from 'react';
import { toast } from 'react-toastify';

import ScreenReaderAnnouncer from '../ScreenReaderAnnouncer';

import { ATTENTION, DEFAULTS } from './NotificationSystem.constants';
import * as utils from './NotificationSystem.utils';

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
    const toastId = 'test';
    const notificationSystemId = 'test_containerbla';
    const autoClose = 5000;
    const onClose = jest.fn();
    const attention = ATTENTION.MEDIUM;
    const screenReaderAnnouncement = 'some announcement';
    const announcerIdentity = 'some_announcer_id';

    let spies;

    const setup = ({ screenReaderAnnouncerIsRegistered = true } = {}) => {
      spies = {
        autoClose: jest.spyOn(utils, 'calculateAutoClose'),
        getContainerID: jest.spyOn(utils, 'getContainerID'),
        isRegistered: jest
          .spyOn(ScreenReaderAnnouncer, 'isRegistered')
          .mockReturnValue(screenReaderAnnouncerIsRegistered),
        announce: jest.spyOn(ScreenReaderAnnouncer, 'announce').mockReturnValue(),
      };
    };

    it('should fire the right functions and returns correctly when firing the toast function', () => {
      setup();

      const options = { toastId, onClose, autoClose, notificationSystemId, attention };
      expect(notify(<div />, options)).toBe(toastId);

      expect(toast).toHaveBeenCalledWith(<div />, {
        autoClose: autoClose,
        containerId: 'test_containerbla_medium_notification_container',
        onClose: onClose,
        toastId: toastId,
      });
      expect(spies.autoClose).toHaveBeenCalledWith(options);
      expect(spies.getContainerID).toHaveBeenCalledWith(notificationSystemId, ATTENTION.MEDIUM);
      expect(spies.isRegistered).not.toHaveBeenCalled();
      expect(spies.announce).not.toHaveBeenCalled();
    });

    it('should announce the screenReaderAnnouncement if provided, using the notificationSystemId', () => {
      setup();

      const options = {
        toastId,
        onClose,
        autoClose,
        notificationSystemId,
        attention,
        screenReaderAnnouncement,
      };
      expect(notify(<div />, options)).toBe(toastId);

      expect(toast).toHaveBeenCalledWith(<div />, {
        autoClose: autoClose,
        containerId: 'test_containerbla_medium_notification_container',
        onClose: onClose,
        toastId: toastId,
      });
      expect(spies.autoClose).toHaveBeenCalledWith(options);
      expect(spies.getContainerID).toHaveBeenCalledWith(notificationSystemId, ATTENTION.MEDIUM);
      expect(spies.isRegistered).not.toHaveBeenCalled();
      expect(spies.announce).toHaveBeenCalledWith(
        { body: screenReaderAnnouncement },
        notificationSystemId
      );
    });

    it('should announce the screenReaderAnnouncement using the announcerIdentity, if provided and registered', () => {
      setup();

      const options = {
        toastId,
        onClose,
        autoClose,
        notificationSystemId,
        attention,
        screenReaderAnnouncement,
        announcerIdentity,
      };
      expect(notify(<div />, options)).toBe(toastId);

      expect(toast).toHaveBeenCalledWith(<div />, {
        autoClose: autoClose,
        containerId: 'test_containerbla_medium_notification_container',
        onClose: onClose,
        toastId: toastId,
      });
      expect(spies.autoClose).toHaveBeenCalledWith(options);
      expect(spies.getContainerID).toHaveBeenCalledWith(notificationSystemId, ATTENTION.MEDIUM);
      expect(spies.isRegistered).toHaveBeenCalledWith(announcerIdentity);
      expect(spies.announce).toHaveBeenCalledWith(
        { body: screenReaderAnnouncement },
        announcerIdentity
      );
    });

    it('should announce the screenReaderAnnouncement using the notificationSystemId, if announcerIdentity not registered', () => {
      setup({ screenReaderAnnouncerIsRegistered: false });

      const options = {
        toastId,
        onClose,
        autoClose,
        notificationSystemId,
        attention,
        screenReaderAnnouncement,
        announcerIdentity,
      };
      expect(notify(<div />, options)).toBe(toastId);

      expect(toast).toHaveBeenCalledWith(<div />, {
        autoClose: autoClose,
        containerId: 'test_containerbla_medium_notification_container',
        onClose: onClose,
        toastId: toastId,
      });
      expect(spies.autoClose).toHaveBeenCalledWith(options);
      expect(spies.getContainerID).toHaveBeenCalledWith(notificationSystemId, ATTENTION.MEDIUM);
      expect(spies.isRegistered).toHaveBeenCalledWith(announcerIdentity);
      expect(spies.announce).toHaveBeenCalledWith(
        { body: screenReaderAnnouncement },
        notificationSystemId
      );
    });
  });

  describe('update', () => {
    let toastId;
    let spies;

    const setup = ({ screenReaderAnnouncerIsRegistered = true } = {}) => {
      toastId = notify(<div />, { notificationSystemId: 'id' });
      spies = {
        getContainerID: jest.spyOn(utils, 'getContainerID'),
        isRegistered: jest
          .spyOn(ScreenReaderAnnouncer, 'isRegistered')
          .mockReturnValue(screenReaderAnnouncerIsRegistered),
        announce: jest.spyOn(ScreenReaderAnnouncer, 'announce').mockReturnValue(),
      };
    };

    it('should fire the right functions when updating an existing toast', () => {
      setup();

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
      expect(spies.getContainerID).toHaveBeenCalledWith('id', 'medium');
      expect(spies.isRegistered).not.toHaveBeenCalled();
      expect(spies.announce).not.toHaveBeenCalled();
    });

    it('should announce the screenReaderAnnouncement if provided, using the notificationSystemId', () => {
      setup();

      update(toastId, {
        toastId: 'new',
        render: <p />,
        attention: ATTENTION.MEDIUM,
        notificationSystemId: 'id',
        screenReaderAnnouncement: 'some screenreader announcement',
      });
      expect(toast.update).toHaveBeenCalledWith(toastId, {
        containerId: 'id_medium_notification_container',
        toastId: 'new',
        render: <p />,
      });
      expect(spies.getContainerID).toHaveBeenCalledWith('id', 'medium');
      expect(spies.isRegistered).not.toHaveBeenCalled();
      expect(spies.announce).toHaveBeenCalledWith({ body: 'some screenreader announcement' }, 'id');
    });

    it('should announce the screenReaderAnnouncement using the announcerIdentity, if provided and registered', () => {
      setup();

      update(toastId, {
        toastId: 'new',
        render: <p />,
        attention: ATTENTION.MEDIUM,
        notificationSystemId: 'id',
        screenReaderAnnouncement: 'some screenreader announcement',
        announcerIdentity: 'some_announcer_id',
      });
      expect(toast.update).toHaveBeenCalledWith(toastId, {
        containerId: 'id_medium_notification_container',
        toastId: 'new',
        render: <p />,
      });
      expect(spies.getContainerID).toHaveBeenCalledWith('id', 'medium');
      expect(spies.isRegistered).toHaveBeenCalledWith('some_announcer_id');
      expect(spies.announce).toHaveBeenCalledWith(
        { body: 'some screenreader announcement' },
        'some_announcer_id'
      );
    });

    it('should announce the screenReaderAnnouncement using the notificationSystemId, if announcerIdentity not registered', () => {
      setup({ screenReaderAnnouncerIsRegistered: false });

      update(toastId, {
        toastId: 'new',
        render: <p />,
        attention: ATTENTION.MEDIUM,
        notificationSystemId: 'id',
        screenReaderAnnouncement: 'some screenreader announcement',
        announcerIdentity: 'some_announcer_id',
      });
      expect(toast.update).toHaveBeenCalledWith(toastId, {
        containerId: 'id_medium_notification_container',
        toastId: 'new',
        render: <p />,
      });
      expect(spies.getContainerID).toHaveBeenCalledWith('id', 'medium');
      expect(spies.isRegistered).toHaveBeenCalledWith('some_announcer_id');
      expect(spies.announce).toHaveBeenCalledWith({ body: 'some screenreader announcement' }, 'id');
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
