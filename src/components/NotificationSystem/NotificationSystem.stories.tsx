import React from 'react';
import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import NotificationSystem, { NotificationSystemProps } from './';
import argTypes from './NotificationSystem.stories.args';
import Documentation from './NotificationSystem.stories.docs.mdx';
import ButtonPill from '../ButtonPill';
import Text from '../Text';
import { ATTENTION, POSITION } from './NotificationSystem.constants';
import NotificationTemplate from './NotificationTemplate';
import type { PositionType } from './NotificationSystem.types';
import type { Id } from 'react-toastify';

export default {
  title: 'Momentum UI/NotificationSystem',
  component: NotificationSystem,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<NotificationSystemProps>((args: NotificationSystemProps) => {
  return (
    <>
      <ButtonPill
        onPress={() =>
          NotificationSystem.notify(
            <NotificationTemplate
              content="I'm a low attention notification"
              toastCloseButtonLabel="Close notification"
              aria-label="Some notification"
            />,
            {
              notificationSystemId: 'id',
              screenReaderAnnouncement:
                "I'm a low attention notification screen reader announcement",
            }
          )
        }
      >
        Trigger a new low attention notification
      </ButtonPill>
      <NotificationSystem {...args} limit={3} id="id" />
    </>
  );
}).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  position: POSITION.TOP_RIGHT,
  ariaLabel: 'Notification System',
};

const Important = Template<NotificationSystemProps>((args: NotificationSystemProps) => {
  return (
    <>
      <ButtonPill
        onPress={() =>
          NotificationSystem.notify(
            <NotificationTemplate
              aria-label="Some notification"
              content="I'm a medium attention notification, which does stay here permanently and requires an action."
              closeButtonText="Close"
              toastCloseButtonLabel="Close notification"
            />,
            {
              attention: ATTENTION.MEDIUM,
              notificationSystemId: 'id',
              screenReaderAnnouncement:
                "I'm a medium attention notification screen reader announcement",
            }
          )
        }
      >
        Trigger a new medium attention notification
      </ButtonPill>
      <NotificationSystem {...args} id="id" />
    </>
  );
}).bind({});

Important.argTypes = { ...argTypes };

Important.args = {
  position: POSITION.TOP_RIGHT,
  ariaLabel: 'Notification System',
};

const Mixed = Template<NotificationSystemProps>((args: NotificationSystemProps) => {
  return (
    <>
      <ButtonPill
        onPress={() =>
          NotificationSystem.notify(
            <NotificationTemplate
              content="I'm a low attention notification"
              toastCloseButtonLabel="Close notification"
              aria-label="Some notification"
            />,
            {
              notificationSystemId: 'id',
              screenReaderAnnouncement:
                "I'm a low attention notification screen reader announcement",
            }
          )
        }
      >
        Trigger a new low attention notification
      </ButtonPill>
      <ButtonPill
        onPress={() =>
          NotificationSystem.notify(
            <NotificationTemplate
              aria-label="Some notification"
              content="I'm a medium attention notification, which does stay here permanently and requires an action."
              closeButtonText="Close"
              toastCloseButtonLabel="Close notification"
            />,
            {
              attention: ATTENTION.MEDIUM,
              notificationSystemId: 'id',
              screenReaderAnnouncement:
                "I'm a medium attention notification screen reader announcement",
            }
          )
        }
      >
        Trigger a new medium attention notification
      </ButtonPill>
      <NotificationSystem {...args} id="id" />
    </>
  );
}).bind({});

Mixed.argTypes = { ...argTypes };

Mixed.args = {
  position: POSITION.TOP_RIGHT,
};

const UpdateContent = Template<NotificationSystemProps>((args: NotificationSystemProps) => {
  const toastId = React.useRef<Id>(null);

  const [numberRaisedHand, setNumberRaisedHand] = React.useState(0);

  const Notification = (
    <NotificationTemplate
      aria-label="Some notification"
      content={
        numberRaisedHand > 1
          ? `${numberRaisedHand} have their hand raised.`
          : 'User A has the hand raised.'
      }
      toastCloseButtonLabel="Close notification"
    />
  );

  const increaseCount = React.useCallback(() => {
    setNumberRaisedHand((count) => count + 1);
  }, []);

  const decreaseCount = React.useCallback(() => {
    setNumberRaisedHand((count) => Math.max(count - 1, 0));
  }, []);

  React.useEffect(() => {
    if (NotificationSystem.isActive(toastId.current)) {
      if (numberRaisedHand === 0) {
        // if toast active, but numberRaisedHand got 0, dismiss the toast
        NotificationSystem.dismiss(toastId.current);
      } else {
        // if toast active and numberRaisedHand higher than 0, update the existing toast
        NotificationSystem.update(toastId.current, {
          render: Notification,
          notificationSystemId: 'id',
        });
      }
    } else {
      if (numberRaisedHand > 0) {
        // if no toast is there and number of raised hand is higher than 0, show new notification
        toastId.current = NotificationSystem.notify(Notification, { notificationSystemId: 'id' });
      }
    }
  }, [Notification, numberRaisedHand]);

  return (
    <>
      <ButtonPill onPress={increaseCount}>Increase number raised hand</ButtonPill>
      <ButtonPill onPress={decreaseCount}>Decrease number raised hand</ButtonPill>
      <NotificationSystem {...args} id="id" />
    </>
  );
}).bind({});

UpdateContent.argTypes = { ...argTypes };
delete UpdateContent.argTypes.position;
UpdateContent.args = {
  ariaLabel: 'Notification System',
};

const ResetTimer = Template<NotificationSystemProps>((args: NotificationSystemProps) => {
  const toastId = React.useRef<Id>(null);

  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [notificationIsShown, setNotificationIsShown] = React.useState(false);

  const Notification = (
    <NotificationTemplate
      content={`I am disappearing in 5 seconds`}
      toastCloseButtonLabel="Close notification"
      aria-label="Some notification"
    />
  );

  const handleClose = React.useCallback(() => {
    setNotificationIsShown(false);
  }, []);

  const showNotification = React.useCallback(() => {
    toastId.current = NotificationSystem.notify(Notification, {
      autoClose: 5000,
      onClose: handleClose,
      notificationSystemId: 'id',
    });
    setNotificationIsShown(true);
  }, [Notification, handleClose]);

  const resetTimer = React.useCallback(() => {
    NotificationSystem.update(toastId.current, {
      autoClose: 5000,
      notificationSystemId: 'id',
    });
  }, []);

  return (
    <>
      <ButtonPill onPress={showNotification} disabled={notificationIsShown}>
        Show Notification for 5 seconds
      </ButtonPill>
      <ButtonPill onPress={resetTimer}>Reset Timer</ButtonPill>
      <Text tagName="p">Verify the reset with the help of this clock:</Text>
      <Text tagName="p">{currentTime.toLocaleTimeString()}</Text>
      <NotificationSystem {...args} id="id" />
    </>
  );
}).bind({});

ResetTimer.argTypes = { ...argTypes };
delete ResetTimer.argTypes.position;
ResetTimer.args = {
  ariaLabel: 'Notification System',
};

const MultipleSystems = Template<NotificationSystemProps>((args: NotificationSystemProps) => {
  const toastId = React.useRef<Id>(null);
  const { POSITION } = NotificationSystem;

  const showNotification = React.useCallback((position: PositionType) => {
    toastId.current = NotificationSystem.notify(
      <NotificationTemplate
        content={`I'm a notification on the ${position} position`}
        toastCloseButtonLabel="Close notification"
        aria-label="Some notification"
      />,
      {
        autoClose: 5000,
        notificationSystemId: position,
      }
    );
  }, []);

  return (
    <>
      <ButtonPill onPress={() => showNotification(POSITION.TOP_RIGHT)}>
        Show Notification on top-right
      </ButtonPill>
      <ButtonPill onPress={() => showNotification(POSITION.BOTTOM_RIGHT)}>
        Show Notification on bottom-right
      </ButtonPill>
      <ButtonPill onPress={() => showNotification(POSITION.BOTTOM_LEFT)}>
        Show Notification on bottom-left
      </ButtonPill>
      <NotificationSystem {...args} position={POSITION.TOP_RIGHT} id={POSITION.TOP_RIGHT} />
      <NotificationSystem {...args} position={POSITION.BOTTOM_RIGHT} id={POSITION.BOTTOM_RIGHT} />
      <NotificationSystem {...args} position={POSITION.BOTTOM_LEFT} id={POSITION.BOTTOM_LEFT} />
    </>
  );
}).bind({});

MultipleSystems.argTypes = { ...argTypes };
delete MultipleSystems.argTypes.position;
MultipleSystems.args = {
  ariaLabel: 'Notification System',
};

export { Example, Important, Mixed, UpdateContent, ResetTimer, MultipleSystems };
