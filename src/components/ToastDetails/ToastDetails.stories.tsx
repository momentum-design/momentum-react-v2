import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Avatar from '../Avatar';
import ButtonControl from '../ButtonControl';

import ToastDetails, { ToastDetailsProps } from './';
import argTypes from './ToastDetails.stories.args';
import Documentation from './ToastDetails.stories.docs.mdx';

export default {
  title: 'Momentum UI/ToastDetails',
  component: ToastDetails,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<ToastDetailsProps>(ToastDetails).bind({});

Example.args = {
  controls: [
    <ButtonControl key={0} control="close" />,
    <ButtonControl key={1} control="mute" />,
    <ButtonControl key={2} control="favorite" />,
  ],
  image: <Avatar size={32} initials="T" />,
  info: 'Information',
  infoColor: 'join',
  subject: 'Subject',
  title: 'Title',
};

Example.argTypes = { ...argTypes };

const Colors = MultiTemplate<ToastDetailsProps>(ToastDetails).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.infoColor;

Colors.args = {
  children: 'Title',
  controls: [
    <ButtonControl key={0} control="close" />,
    <ButtonControl key={1} control="mute" />,
    <ButtonControl key={2} control="favorite" />,
  ],
  image: <Avatar initials="T" />,
  info: 'Information',
};

Colors.parameters = {
  variants: [
    {},
    { infoColor: 'cancel' },
    { infoColor: 'join' },
    { infoColor: 'success' },
    { infoColor: 'warning' },
  ],
};

const Common = MultiTemplate<ToastDetailsProps>(ToastDetails).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.badges;
delete Common.argTypes.children;
delete Common.argTypes.controls;
delete Common.argTypes.image;
delete Common.argTypes.info;
delete Common.argTypes.infoColor;
delete Common.argTypes.subject;
delete Common.argTypes.title;

Common.parameters = {
  variants: [
    {
      controls: [
        <ButtonControl key={0} control="close" />,
        <ButtonControl key={1} control="mute" />,
        <ButtonControl key={2} control="favorite" />,
      ],
      image: <Avatar size={32} initials="T" />,
      info: 'Information',
      infoColor: 'join',
      subject: 'Subject',
      title: 'Title',
    },
    {
      badges: ['Static', 'Static'],
      controls: [
        <ButtonControl key={0} control="close" />,
        <ButtonControl key={1} control="mute" />,
        <ButtonControl key={2} control="favorite" />,
      ],
      image: <Avatar size={32} initials="T" />,
      info: 'Information',
      infoColor: 'join',
      subject: 'Subject',
      title: 'Title',
    },
    {
      controls: [
        <ButtonControl key={0} control="close" />,
        <ButtonControl key={1} control="maximize" />,
        <ButtonControl key={2} control="minimize" />,
      ],
      image: <Avatar size={32} initials="T" />,
      info: 'Information',
      infoColor: 'cancel',
      subject: 'Subject',
      title: 'Title',
    },
    {
      controls: [<ButtonControl key={0} control="close" />],
      image: <Avatar size={32} initials="T" />,
      info: 'Information',
      infoColor: 'success',
      title: 'Title',
    },
    {
      controls: [<ButtonControl key={0} control="close" />],
      image: <Avatar size={32} initials="T" />,
      title: 'Title',
    },
  ],
};

export { Example, Colors, Common };
