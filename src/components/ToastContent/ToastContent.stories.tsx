import React from 'react';

import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import ButtonCircle from 'components/ButtonCircle';
import ButtonGroup from 'components/ButtonGroup';
import ButtonPill from 'components/ButtonPill';
import Icon from 'components/Icon';

import argTypes from './ToastContent.stories.args';
import Documentation from './ToastContent.stories.docs.mdx';

import ToastContent, { ToastContentProps } from './';

export default {
  title: 'Momentum UI/ToastContent',
  component: ToastContent,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<ToastContentProps>(ToastContent).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  action: 'Performed Action 👍',
  actionColor: 'success',
  actions: (
    <ButtonGroup spaced>
      <ButtonCircle outline size={28}>
        <Icon name="alarm" weight="bold" autoScale={125} />
      </ButtonCircle>
      <ButtonPill color="message" size={28}>
        Message
      </ButtonPill>
      <ButtonPill color="cancel" size={28}>
        Decline
      </ButtonPill>
      <ButtonPill color="join" size={28}>
        Answer
      </ButtonPill>
    </ButtonGroup>
  ),
  actor: 'Actor',
  info: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing. \n\n- Example Bullet\n- Example Bullet',
};

const Colors = MultiTemplate<ToastContentProps>(ToastContent).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.actionColor;

Colors.args = {
  action: 'Performed Action 👍',
  actor: 'Actor',
  info: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing.',
};

Colors.parameters = {
  variants: [
    {},
    { actionColor: 'cancel' },
    { actionColor: 'join' },
    { actionColor: 'success' },
    { actionColor: 'warning' },
  ],
};

const Common = MultiTemplate<ToastContentProps>(ToastContent).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.parameters = {
  variants: [
    {
      action: 'Performed Action 👍',
      actionColor: 'join',
      actions: (
        <ButtonGroup spaced>
          <ButtonCircle outline size={28}>
            <Icon name="alarm" weight="bold" autoScale={125} />
          </ButtonCircle>
          <ButtonPill color="message" size={28}>
            Message
          </ButtonPill>
          <ButtonPill color="cancel" size={28}>
            Decline
          </ButtonPill>
          <ButtonPill color="join" size={28}>
            Answer
          </ButtonPill>
        </ButtonGroup>
      ),
      actor: 'Actor',
      info: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing.',
    },
    {
      action: 'Performed a very long action ✅',
      actionColor: 'success',
      actor: 'Actor',
      info: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing.',
      actions: (
        <ButtonGroup spaced>
          <ButtonCircle outline size={28}>
            <Icon name="alarm" weight="bold" autoScale={125} />
          </ButtonCircle>
          <ButtonPill color="join" size={28}>
            Accept
          </ButtonPill>
        </ButtonGroup>
      ),
    },
    {
      action: 'Performed an action 🛑',
      actionColor: 'warning',
      actions: (
        <ButtonGroup spaced>
          <ButtonPill color="cancel" size={28}>
            End Call
          </ButtonPill>
        </ButtonGroup>
      ),
      info: 'Lorem ipsum dolor site aw aetns ctetuer adipiscing.',
    },
    {
      action: 'Action',
      actor: 'Actor',
      actions: (
        <ButtonGroup spaced>
          <ButtonPill outline size={28}>
            Snooze
          </ButtonPill>
        </ButtonGroup>
      ),
      info: 'A generic item list:\n- Item A\n- Item B',
    },
  ],
};

export { Example, Colors, Common };
