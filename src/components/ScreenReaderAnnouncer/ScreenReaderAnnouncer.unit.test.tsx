import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AnnounceOptions } from './ScreenReaderAnnouncer.types';

import ScreenReaderAnnouncer from './';

type ExpectedAnnouncement = {
  'aria-live': string;
  children: AnnounceOptions['body'];
  'data-testid': string | ReturnType<typeof expect.any>;
};
type ExpectedAnnouncementNodes = Record<string, Element>;

describe('<ScreenReaderAnnouncer />', () => {
  let container;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  describe.each([undefined, 'custom-identity'])('Announcer identity: %s', (announcerIdentity) => {
    const checkRender = (expectedAnnouncements: ExpectedAnnouncement[] = []) => {
      const announcer = screen.getByTestId('screen-reader-announcer');

      expect(announcer).toHaveStyle({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: '1px',
        overflow: 'hidden',
        position: 'absolute',
        width: '1px',
        whiteSpace: 'nowrap',
      });

      const announcements = Array.from(
        announcer.querySelectorAll('[data-testid^="screen-reader-announcement-"]')
      ).map((announcement) => ({
        'aria-live': announcement.getAttribute('aria-live'),
        children: announcement.textContent,
        'data-testid': announcement.getAttribute('data-testid'),
      }));

      expect(announcements).toStrictEqual(expectedAnnouncements);
      expect(container).toMatchSnapshot();
    };

    const setup = () => {
      const props = announcerIdentity ? { identity: announcerIdentity } : {};
      const result = render(<ScreenReaderAnnouncer {...props} />);
      container = result.container;
      checkRender();
    };

    const advanceTimers = (amount: number) => {
      act(() => {
        jest.advanceTimersByTime(amount);
      });
    };

    const makeAnnouncement = (announceOptions: AnnounceOptions) => {
      act(() => {
        ScreenReaderAnnouncer.announce(announceOptions, announcerIdentity);
      });
    };

    const getAnnouncementNode = (identity: string) =>
      screen.getByTestId(`screen-reader-announcement-${identity}`);

    const checkAnnouncementNodes = (expectedNodes: ExpectedAnnouncementNodes = {}) => {
      Object.entries(expectedNodes).forEach(([identity, expectedNode]) => {
        expect(getAnnouncementNode(identity)).toBe(expectedNode);
      });
    };

    const checkSingle = (announceOptions: AnnounceOptions) => {
      const expectedPreAnnouncement = {
        'aria-live': announceOptions.level ?? 'polite',
        children: '',
        'data-testid': expect.any(String),
      };
      const expectedPostAnnouncement = {
        ...expectedPreAnnouncement,
        children: announceOptions.body,
      };

      // Mount the announcer
      setup();

      // Announce a new message
      makeAnnouncement(announceOptions);
      checkRender([expectedPreAnnouncement]);

      const expectedAnnouncementNodes = { 'message-0': getAnnouncementNode('message-0') };

      // Wait for just under the delay
      advanceTimers((announceOptions.delay ?? 150) - 1);
      checkRender([expectedPreAnnouncement]);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Wait for the delay to elapse
      advanceTimers(1);
      checkRender([expectedPostAnnouncement]);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Wait for just under the timeout
      advanceTimers((announceOptions.timeout ?? 20_000) - 1);
      checkRender([expectedPostAnnouncement]);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Wait for the timeout to elapse
      advanceTimers(1);
      checkRender();
    };

    it('announces with default configuration', () => {
      checkSingle({ body: 'default configuration' });
    });

    it.each(['assertive', 'polite'])(
      'announces with a custom level',
      (level: AnnounceOptions['level']) => {
        checkSingle({ body: 'custom level', level });
      }
    );

    it.each([100, 150, 200])('announces with a custom delay of %sms', (delay) => {
      checkSingle({ body: 'custom delay', delay });
    });

    it.each([15_000, 20_000, 25_000])('announces with a custom timeout', (timeout) => {
      checkSingle({ body: 'custom timeout', timeout });
    });

    it('announces with a fully custom configuration', () => {
      checkSingle({
        body: 'fully custom configuration',
        level: 'assertive',
        delay: 123,
        timeout: 12345,
      });
    });

    it('can have multiple announcements', () => {
      const initialAnnouncement = {
        'aria-live': 'polite',
        children: '',
        'data-testid': expect.any(String),
      };
      const expectedAnnouncements: ExpectedAnnouncement[] = [];
      const expectedAnnouncementNodes: ExpectedAnnouncementNodes = {};

      setup();

      // Make first announcement
      expectedAnnouncements.push({ ...initialAnnouncement });
      makeAnnouncement({ body: 'first' });
      checkRender(expectedAnnouncements);

      expectedAnnouncementNodes['message-0'] = getAnnouncementNode('message-0');

      advanceTimers(50);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Make second announcement
      expectedAnnouncements.push({ ...initialAnnouncement });
      makeAnnouncement({ body: 'second' });
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      expectedAnnouncementNodes['message-1'] = getAnnouncementNode('message-1');

      expectedAnnouncements[0].children = 'first';
      advanceTimers(100);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Make third announcement
      expectedAnnouncements.push({ ...initialAnnouncement });
      makeAnnouncement({ body: 'third' });
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      expectedAnnouncementNodes['message-2'] = getAnnouncementNode('message-2');

      expectedAnnouncements[1].children = 'second';
      advanceTimers(50);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Make fourth announcement
      expectedAnnouncements.push({ ...initialAnnouncement });
      makeAnnouncement({ body: 'fourth' });
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      expectedAnnouncementNodes['message-3'] = getAnnouncementNode('message-3');

      expectedAnnouncements[2].children = 'third';
      advanceTimers(100);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Wait for the first announcement to be removed
      expectedAnnouncements.shift();
      expectedAnnouncements[2].children = 'fourth';
      delete expectedAnnouncementNodes['message-0'];
      advanceTimers(19_850);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Make fifth announcement
      expectedAnnouncements.push({ ...initialAnnouncement });
      makeAnnouncement({ body: 'fifth' });
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      expectedAnnouncementNodes['message-4'] = getAnnouncementNode('message-4');

      // Wait for the second announcement to be removed
      expectedAnnouncements.shift();
      delete expectedAnnouncementNodes['message-1'];
      advanceTimers(50);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Wait for the third announcement to be removed
      expectedAnnouncements.shift();
      expectedAnnouncements[1].children = 'fifth';
      delete expectedAnnouncementNodes['message-2'];
      advanceTimers(100);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Wait for the fourth announcement to be removed
      expectedAnnouncements.shift();
      delete expectedAnnouncementNodes['message-3'];
      advanceTimers(50);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Wait for the fifth announcement to be removed
      advanceTimers(19_950);
      checkRender([]);
    });

    it('can have the same announcement multiple times', () => {
      const body = 'same message';
      const initialAnnouncement = {
        'aria-live': 'polite',
        children: '',
        'data-testid': expect.any(String),
      };
      const expectedAnnouncements: ExpectedAnnouncement[] = [];
      const expectedAnnouncementNodes: ExpectedAnnouncementNodes = {};

      setup();

      // Make first announcement
      expectedAnnouncements.push({ ...initialAnnouncement });
      makeAnnouncement({ body });
      checkRender(expectedAnnouncements);

      expectedAnnouncementNodes['message-0'] = getAnnouncementNode('message-0');

      advanceTimers(100);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Make second announcement
      expectedAnnouncements.push({ ...initialAnnouncement });
      makeAnnouncement({ body });
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      expectedAnnouncementNodes['message-1'] = getAnnouncementNode('message-1');

      expectedAnnouncements[0].children = body;
      advanceTimers(100);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Make third announcement
      expectedAnnouncements.push({ ...initialAnnouncement });
      makeAnnouncement({ body });
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      expectedAnnouncementNodes['message-2'] = getAnnouncementNode('message-2');

      expectedAnnouncements[1].children = body;
      advanceTimers(100);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      expectedAnnouncements[2].children = body;
      advanceTimers(100);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Wait for the first announcement to be removed
      expectedAnnouncements.shift();
      delete expectedAnnouncementNodes['message-0'];
      advanceTimers(19_750);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Wait for the second announcement to be removed
      expectedAnnouncements.shift();
      delete expectedAnnouncementNodes['message-1'];
      advanceTimers(100);
      checkRender(expectedAnnouncements);
      checkAnnouncementNodes(expectedAnnouncementNodes);

      // Wait for the third announcement to be removed
      advanceTimers(100);
      checkRender([]);
    });

    it('errors when announcing on an unregistered announcer', () => {
      setup();

      expect(() => {
        ScreenReaderAnnouncer.announce({ body: 'announcement' }, 'unknown');
      }).toThrow(`ScreenReaderAnnouncer with identity unknown is not registered`);
    });

    it('errors when registering a duplicate announcer', () => {
      // Stub console.error since the duplicate registration test will trigger it
      jest.spyOn(console, 'error').mockReturnValue();

      setup();

      expect(() => {
        setup();
      }).toThrow(
        `ScreenReaderAnnouncer with identity ${
          announcerIdentity ?? 'default'
        } is already registered`
      );
    });

    it('deregisters on unmount', () => {
      const { unmount } = render(<ScreenReaderAnnouncer identity={announcerIdentity} />);

      unmount();

      // This would error if it had not deregistered on unmount
      render(<ScreenReaderAnnouncer identity={announcerIdentity} />);
    });

    it('clears timers when unmounted before the delay has elapsed', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {
        throw new Error('console error');
      });
      const { unmount } = render(<ScreenReaderAnnouncer identity={announcerIdentity} />);

      const delay = 150;

      makeAnnouncement({ body: 'unmount before delay', delay, timeout: 15_000 });

      advanceTimers(delay - 1);

      unmount();

      // This would error if the announcement timer was not cleared
      advanceTimers(1);
    });

    it('clears timers when unmounted before the timeout has elapsed', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {
        throw new Error('console error');
      });
      const { unmount } = render(<ScreenReaderAnnouncer identity={announcerIdentity} />);

      const delay = 200;
      const timeout = 20_000;

      makeAnnouncement({ body: 'unmount before timeout', delay, timeout });

      advanceTimers(delay);
      advanceTimers(timeout - 1);

      unmount();

      // This would error if the announcement timer was not cleared
      advanceTimers(delay);
    });
  });
});
