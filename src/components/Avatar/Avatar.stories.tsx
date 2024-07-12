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
import argTypes from './Avatar.stories.args';
import { PresenceType , Props } from './Avatar.types';
import { AVATAR_COLORS, SIZES } from './Avatar.constants';


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
        gridTemplateColumns: `repeat(7, auto)`,
        gap: '1.5rem',
        alignItems: 'end',
      }}
    >
      {items}
    </div>
  );
};

const Example = Template.bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  src: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2855&q=80',
  initials: 'AS',
  onPress: () => 1,
};

const PresenceTypes = MultiTemplate.bind({});

PresenceTypes.argTypes = { ...argTypes };
delete PresenceTypes.argTypes.presence;

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

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

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

const Icons = MultiTemplate.bind({});

Icons.argTypes = { ...argTypes };

Icons.args = {
  initials: 'A',
};

Icons.parameters = {
  variants: [
    ...Object.values(SIZES).map((size) => {
      return {
        size,
        icon: 'accessories',
        label: `Size: ${size} + icon`,
      };
    }),
  ],
};

const Color = MultiTemplate.bind({});

Color.argTypes = { ...argTypes };
delete Color.argTypes.color;

Color.args = {
  initials: 'A',
  size: 48,
};

Color.parameters = {
  variants: [
    ...Object.values(AVATAR_COLORS).map((color) => {
      return {
        color: color,
        label: `Color: ${color}`,
      };
    }),
  ],
};

const Common = MultiTemplate.bind({});

const cartesian = <T extends (string | number)[][]>(...arr: T) =>
  arr.reduce((a, b) => a.flatMap((c) => b.map((d) => [...c, d])), [[]]);

Common.argTypes = { ...argTypes };
delete Common.argTypes.size;
delete Common.argTypes.presence;

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

const Accessibility = MultiTemplate.bind({});

Accessibility.argTypes = {};

const onPressFunc = () => {
  return 'h1';
};

type simpleDataType = Props & {label:string}

const simpleData:simpleDataType[] = [
  {
    label: 'Person typing case',
    type: 'person',
    onPress: onPressFunc,
    mainLabel: 'Avatar of Person with src avatar',
    title: 'Person with src avatar',
    presence: PresenceType.Active,
    presenceLabel: 'Active',
    typingLabel: 'is typing',
    isTyping: true,
    src: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2855&q=80',
  },
  {
    label: 'Person with icon avatar',
    type: 'person',
    onPress: onPressFunc,
    mainLabel: 'Avatar of Person with icon avatar',
    title: 'Person with src avatar',
    presence: PresenceType.Active,
    presenceLabel: 'Active',
    src: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2855&q=80',
  },
  {
    label: 'Person with icon avatar',
    type: 'person',
    onPress: onPressFunc,
    mainLabel: 'Avatar of Person with icon avatar',
    title: 'Person with icon avatar',
    presence: PresenceType.Active,
    presenceLabel: 'Active',
    icon:'accessibility'
  },
  {
    label: 'Person without avatar',
    type: 'person',
    onPress: onPressFunc,
    mainLabel: 'Avatar of Person without avatar',
    title: 'Person without avatar',
    presence: PresenceType.Active,
    presenceLabel: 'Active',
  },
  {
    label: 'Bot with src avatar',
    type: 'person',
    onPress: onPressFunc,
    mainLabel: 'Bot picture of Bot with src avatar',
    title: 'Bot with src avatar',
    src: 'https://avatar-prod-us-east-2.webexcontent.com/Avtr~V1~1eb65fdf-9643-417f-9974-ad72cae0e10f/V1~dfd58fd0-6fbd-4a63-82e0-2d35d79ad7ab~56b4f47a60a841bfb31c188ef2ba1c62~40',
  },
  {
    label: 'Bot with icon avatar',
    type: 'person',
    onPress: onPressFunc,
    mainLabel: 'Bot picture of Bot with icon avatar',
    title: 'Bot with icon avatar',
    icon:'accessibility'
  },
  {
    label: 'Bot without avatar',
    type: 'person',
    onPress: onPressFunc,
    mainLabel: 'Bot picture of Bot without avatar',
    title: 'Bot without avatar',
  },
  {
    label: 'Space with src avatar',
    type: 'space',
    mainLabel: 'Space picture of Space with src avatar',
    title: 'Space with src avatar',
    src:'https://avatar-prod-us-east-2.webexcontent.com/Avtr~V1~1eb65fdf-9643-417f-9974-ad72cae0e10f/V1~6dca4ec5f302164eaba2a84b9055d8d169508c4f615741e961874df6851726f8~d66e9b1ec2f747b18741cd8c29cffebd~40'
  },
  {
    label: 'Space with icon avatar',
    type: 'space',
    mainLabel: 'Space picture of Space with src avatar',
    title: 'Space with icon avatar',
    icon:'accessibility'
  },
  {
    label: 'Space without avatar',
    type: 'space',
    mainLabel: 'Space picture of Space with src avatar',
    title: 'Space without avatar',
  },
];

Accessibility.parameters = {
  variants:simpleData
};

export { Example, PresenceTypes, Color, Sizes, Icons, Common, Accessibility};
