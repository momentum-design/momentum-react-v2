import React, { useEffect, useState, useRef, useCallback, FC } from 'react';

import { STYLE, DEFAULTS } from './ScreenReaderAnnouncer.constants';
import {
  Level,
  AnnounceOptions,
  Announce,
  Clear,
  Message,
  AnnouncementProps,
  AnnouncerProps,
  CompoundProps,
  ScreenReaderAnnouncerAnnounce,
} from './ScreenReaderAnnouncer.types';

const registry: Record<string, { announce: Announce }> = {};

// This hides the announcer, since it should not be visible on the page (see https://www.a11yproject.com/posts/how-to-hide-content/)
const containerStyle = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  width: '1px',
  whiteSpace: 'nowrap',
} as const;

const register = (identity: string, announce: Announce) => {
  if (registry[identity]) {
    throw Error(`ScreenReaderAnnouncer with identity ${identity} is already registered`);
  }
  registry[identity] = { announce };
};

const deregister = (identity: string) => {
  delete registry[identity];
};

/**
 * Announce a message via a screen reader.
 * To allow for multiple announcers to exist concurrently, an announcer identity can be provided.
 * This is useful for scenarios where another announcer may be hidden from the screen reader.
 * An example of this is when an element with role="dialog" and aria-modal="true" is on the page.
 * In this case, everything outside of the modal is hidden from the accessibility tree.
 * If an unregistered announcer identity is used, this will error.
 */
const announce: ScreenReaderAnnouncerAnnounce = (
  options,
  announcerIdentity = DEFAULTS.IDENTITY
) => {
  if (registry[announcerIdentity]) {
    return registry[announcerIdentity].announce(options);
  }
  throw Error(`ScreenReaderAnnouncer with identity ${announcerIdentity} is not registered`);
};

const ScreenReaderAnnouncement = ({
  clear,
  delay,
  identity,
  level,
  body,
  timeout,
}: AnnouncementProps) => {
  const [message, setMessage] = useState<AnnouncementProps['body']>();

  useEffect(() => {
    let timer = setTimeout(() => {
      setMessage(body);

      timer = setTimeout(() => {
        clear({ messageIdentity: identity });
      }, timeout);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [clear, delay, identity, body, timeout]);

  return (
    <div aria-live={level} data-testid={`screen-reader-announcement-${identity}`}>
      {message}
    </div>
  );
};

/**
 * Component which will cause a screen reader to announce a message when required.
 * To allow for multiple announcers to exist concurrently, each announcer must have a unique identity.
 * If no identity is provided, a default one is used (useful for a top level announcer).
 * If an announcer with a duplicate identity is mounted, an error will occur.
 */
const ScreenReaderAnnouncer: FC<AnnouncerProps> & CompoundProps = ({
  identity = DEFAULTS.IDENTITY,
}: AnnouncerProps) => {
  const messageIndex = useRef(0);
  const [messages, setMessages] = useState<Message[]>([]);

  const announce = useCallback<Announce>(
    ({
      delay = DEFAULTS.DELAY,
      level = DEFAULTS.LEVEL as Level,
      body,
      timeout = DEFAULTS.TIMEOUT,
    }: AnnounceOptions) => {
      const messageIdentity = `message-${messageIndex.current}`;

      setMessages((previous) =>
        previous.concat([{ messageIdentity, body, level, delay, timeout }])
      );
      messageIndex.current += 1;
    },
    []
  );

  const clear = useCallback<Clear>(({ messageIdentity }) => {
    setMessages((previous) =>
      previous.filter((message) => message.messageIdentity !== messageIdentity)
    );
  }, []);

  useEffect(() => {
    register(identity, announce);

    return () => {
      deregister(identity);
    };
  }, [announce, clear, identity]);

  return (
    <div className={STYLE.wrapper} data-testid="screen-reader-announcer" style={containerStyle}>
      {messages.map(({ messageIdentity, ...messageProps }) => (
        <ScreenReaderAnnouncement
          key={messageIdentity}
          identity={messageIdentity}
          clear={clear}
          {...messageProps}
        />
      ))}
    </div>
  );
};

export default ScreenReaderAnnouncer;

ScreenReaderAnnouncer.announce = announce;
