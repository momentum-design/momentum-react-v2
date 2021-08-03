import React, { FC } from 'react';
import { Story } from '@storybook/react';

import Avatar, { AvatarProps } from './';

import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './Avatar.documentation.mdx';
import { PresenceType } from './Avatar.types';
import { COLORS, DEFAULTS, SIZES, TYPES } from './Avatar.constants';

const DocsPage: FC = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Documentation />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
  </>
);

export default {
  title: 'Momentum UI/Avatar',
  component: Avatar,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    className: {
      defaultValue: undefined,
      description:
        'If present, the class name will be added to the underlying component. Used to override styles by consumers.',
      control: { type: 'text' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    size: {
      defaultValue: DEFAULTS.SIZE,
      description: 'Size represents the size of te avatar.',
      options: [undefined, ...Object.values(SIZES)],
      control: { type: 'select' },
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: DEFAULTS.SIZE,
        },
      },
    },
    presence: {
      defaultValue: DEFAULTS.PRESENCE,
      description:
        'Determines the current state of the user. (User is in meeting, presenting etc).',
      options: [undefined, ...Object.values(PresenceType)],
      control: { type: 'select' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: DEFAULTS.PRESENCE,
        },
      },
    },
    src: {
      defaultValue: undefined,
      description: 'URL with profile image for the avatar.',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    initials: {
      defaultValue: undefined,
      description: 'Initials to display inside the avatar.',
      control: { type: 'text' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    title: {
      defaultValue: undefined,
      description:
        'Name of person/space. The component will extract initials from this value and display accordingly',
      control: { type: 'text', required: true },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
    color: {
      defaultValue: DEFAULTS.COLOR,
      description:
        'In case `src` is not provided, we can provide a color for the avatar using this property.',
      options: [undefined, ...Object.values(COLORS)],
      control: { type: 'select' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: DEFAULTS.COLOR,
        },
      },
    },
    type: {
      defaultValue: DEFAULTS.TYPE,
      description: 'Determines weather the avatar is for a person or a space.',
      options: [undefined, ...Object.values(TYPES)],
      control: { type: 'select' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: DEFAULTS.TYPE,
        },
      },
    },
    isInMeeting: {
      defaultValue: DEFAULTS.IS_IN_MEETING,
      description: 'Determines weather the avatar component is used in a meeting list/context.',
      options: [undefined, true, false],
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: DEFAULTS.IS_IN_MEETING,
        },
      },
    },
    isSpeaking: {
      defaultValue: DEFAULTS.IS_SPEAKING,
      description:
        'Determines weather the user is speaking. Should only be used in combination with `isInMeeting`',
      options: [undefined, true, false],
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: DEFAULTS.IS_SPEAKING,
        },
      },
    },
  },
};

const Template: Story<AvatarProps> = (args) => <Avatar title="Cisco Webex" {...args} />;

const MultiTemplate: Story<AvatarProps> = (args: AvatarProps, { parameters }) => {
  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <div key={index}>
      <Avatar title="Cisco Webex" {...args} {...variant} />
      <p>{variant.label}</p>
    </div>
  ));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(4, auto)`,
        gap: '1.5rem',
        alignItems: 'end',
      }}
    >
      {items}
    </div>
  );
};

const Example = Template.bind({});

Example.args = {
  src: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2855&q=80',
  initials: 'AS',
};

const PresenceTypes = MultiTemplate.bind({});

PresenceTypes.args = {
  initials: 'AS',
  color: 'gold',
  size: 48,
};

PresenceTypes.parameters = {
  variants: [
    ...Object.values(PresenceType).map((type) => {
      return { presence: type, label: `Type: ${type}` };
    }),
  ],
};

const Sizes = MultiTemplate.bind({});

Sizes.args = {
  initials: 'A',
};

Sizes.parameters = {
  variants: [
    { label: 'Default' },
    ...Object.values(SIZES).map((size) => {
      return {
        size,
        label: `Size: ${size}`,
      };
    }),
  ],
};

const States = MultiTemplate.bind({});

States.args = {
  src: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2855&q=80',
  size: 48,
};

States.parameters = {
  variants: [
    { label: 'Default' },
    { label: 'In Meeting x Active', isInMeeting: true, presence: PresenceType.Active },
    { label: 'In Meeting x Meet', isInMeeting: true, presence: PresenceType.Meet },
    { label: 'In Meeting x Present', isInMeeting: true, presence: PresenceType.Presenting },
    {
      label: 'In Meeting x Active x Speaking',
      isInMeeting: true,
      isSpeaking: true,
      presence: PresenceType.Active,
    },
    {
      label: 'In Meeting x Meet x Speaking',
      isInMeeting: true,
      isSpeaking: true,
      presence: PresenceType.Meet,
    },
    {
      label: 'In Meeting x Present x Speaking',
      isInMeeting: true,
      isSpeaking: true,
      presence: PresenceType.Presenting,
    },
  ],
};

const Common = MultiTemplate.bind({});

const cartesian = <T extends (string | number)[][]>(...arr: T) =>
  arr.reduce((a, b) => a.flatMap((c) => b.map((d) => [...c, d])), [[]]);

Common.args = {
  initials: 'B',
  color: 'gold',
};

Common.parameters = {
  variants: [
    { label: 'Default' },
    ...cartesian(Object.values(SIZES), Object.values(PresenceType)).flatMap((item) => {
      return {
        size: item[0],
        presence: item[1],
        label: `${item[0]} x ${item[1]}`,
      };
    }),
  ],
};

export { Example, PresenceTypes, Sizes, States, Common };
