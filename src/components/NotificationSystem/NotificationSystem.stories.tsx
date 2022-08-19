import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import NotificationSystem, { NotificationSystemProps } from './';
import argTypes from './NotificationSystem.stories.args';
import Documentation from './NotificationSystem.stories.docs.mdx';
import ButtonPill from '../ButtonPill';
import Text from '../Text';
import { Id, toast } from 'react-toastify';
import { ATTENTION, POSITION } from './NotificationSystem.constants';
import NotificationTemplate from './NotificationTemplate';
import { PositionType } from './NotificationSystem.types';

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

const Example = Template<NotificationSystemProps>((args) => {
  return (
    <>
      <ButtonPill
        onPress={() =>
          NotificationSystem.notify(<NotificationTemplate notificationText="I'm a notification" />)
        }
      >
        Trigger a new notification
      </ButtonPill>
      <NotificationSystem {...args} />
    </>
  );
}).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  position: POSITION.TOP_RIGHT,
};

const Important = Template<NotificationSystemProps>((args) => {
  return (
    <>
      <ButtonPill
        onPress={() =>
          NotificationSystem.notify(
            <NotificationTemplate
              notificationText="I'm a important notification"
              closeButtonText="Close"
            />,
            { attention: ATTENTION.MEDIUM }
          )
        }
      >
        Trigger a new important notification
      </ButtonPill>
      <NotificationSystem {...args} />
    </>
  );
}).bind({});

Important.argTypes = { ...argTypes };

Important.args = {
  position: POSITION.TOP_RIGHT,
};

const Mixed = Template<NotificationSystemProps>((args) => {
  return (
    <>
      <ButtonPill
        onPress={() =>
          NotificationSystem.notify(
            <NotificationTemplate notificationText="I'm a normal notification" />
          )
        }
      >
        Trigger a new notification
      </ButtonPill>
      <ButtonPill
        onPress={() =>
          NotificationSystem.notify(
            <NotificationTemplate
              notificationText="I'm a important notification, which does stay here permanently and requires an action."
              closeButtonText="Close"
            />,
            {
              attention: ATTENTION.MEDIUM,
            }
          )
        }
      >
        Trigger a new important notification
      </ButtonPill>
      <NotificationSystem {...args} />
    </>
  );
}).bind({});

Mixed.argTypes = { ...argTypes };

Mixed.args = {
  position: POSITION.TOP_RIGHT,
};

const UpdateContent = Template<NotificationSystemProps>(() => {
  const toastId = React.useRef<Id>(null);
  const systemId = 'test';

  const [numberRaisedHand, setNumberRaisedHand] = React.useState(0);

  const Notification = (
    <NotificationTemplate
      notificationText={
        numberRaisedHand > 1
          ? `${numberRaisedHand} have their hand raised.`
          : 'User A has the hand raised.'
      }
    />
  );

  const increaseCount = React.useCallback(() => {
    setNumberRaisedHand((count) => count + 1);
  }, []);

  const decreaseCount = React.useCallback(() => {
    setNumberRaisedHand((count) => Math.max(count - 1, 0));
  }, []);

  React.useEffect(() => {
    if (toast.isActive(toastId.current)) {
      if (numberRaisedHand === 0) {
        // if toast active, but numberRaisedHand got 0, dismiss the toast
        NotificationSystem.dismiss(toastId.current);
      } else {
        // if toast active and numberRaisedHand higher than 0, update the existing toast
        NotificationSystem.update(toastId.current, {
          render: Notification,
          notificationSystemId: systemId,
        });
      }
    } else {
      if (numberRaisedHand > 0) {
        // if no toast is there and number of raised hand is higher than 0, show new notification
        toastId.current = NotificationSystem.notify(Notification, {
          notificationSystemId: systemId,
        });
      }
    }
  }, [numberRaisedHand]);

  return (
    <>
      <ButtonPill onPress={increaseCount}>Increase number raised hand</ButtonPill>
      <ButtonPill onPress={decreaseCount}>Decrease number raised hand</ButtonPill>
      <NotificationSystem id={systemId} />
    </>
  );
}).bind({});

UpdateContent.argTypes = { ...argTypes };
delete UpdateContent.argTypes['position'];
UpdateContent.args = {};

const ResetTimer = Template<NotificationSystemProps>(() => {
  const toastId = React.useRef<Id>(null);

  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [notificationIsShown, setNotificationIsShown] = React.useState(false);

  const Notification = <NotificationTemplate notificationText={`I am disappearing in 5 seconds`} />;

  const handleClose = React.useCallback(() => {
    setNotificationIsShown(false);
  }, []);

  const showNotification = React.useCallback(() => {
    toastId.current = NotificationSystem.notify(Notification, {
      autoClose: 5000,
      onClose: handleClose,
    });
    setNotificationIsShown(true);
  }, []);

  const resetTimer = React.useCallback(() => {
    NotificationSystem.update(toastId.current, {
      autoClose: 5000,
    });
  }, []);

  return (
    <>
      <ButtonPill onPress={showNotification} disabled={notificationIsShown}>
        Show Notification for 5 seconds
      </ButtonPill>
      <ButtonPill onPress={resetTimer}>Reset Timer</ButtonPill>
      <Text>Verify the reset with the help of this clock:</Text>
      <Text>{currentTime.toLocaleTimeString()}</Text>
      <NotificationSystem />
    </>
  );
}).bind({});

ResetTimer.argTypes = { ...argTypes };
delete ResetTimer.argTypes['position'];
ResetTimer.args = {};

const MultipleSystems = Template<NotificationSystemProps>(() => {
  const toastId = React.useRef<Id>(null);
  const { POSITION } = NotificationSystem;

  const showNotification = React.useCallback((position: PositionType) => {
    toastId.current = NotificationSystem.notify(
      <NotificationTemplate notificationText={`I'm a notification on the ${position} position`} />,
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
      <NotificationSystem position={POSITION.TOP_RIGHT} id={POSITION.TOP_RIGHT} />
      <NotificationSystem position={POSITION.BOTTOM_RIGHT} id={POSITION.BOTTOM_RIGHT} />
      <NotificationSystem position={POSITION.BOTTOM_LEFT} id={POSITION.BOTTOM_LEFT} />
    </>
  );
}).bind({});

MultipleSystems.argTypes = { ...argTypes };
delete MultipleSystems.argTypes['position'];
MultipleSystems.args = {};

// NOTE: Common variants story. This renders multiple variants of a single component.
const Common = MultiTemplate<NotificationSystemProps>(NotificationSystem).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

// TODO: Provide default arguments for this story here. These populate into the argument table for this component for all variants.
Common.args = {
  children: 'Example',
};

Common.parameters = {
  variants: [{ children: 'Example A' }, { children: 'Example B' }, { children: 'Example C' }],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Important, Mixed, UpdateContent, ResetTimer, MultipleSystems, Common };
