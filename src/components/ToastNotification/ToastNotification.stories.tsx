import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ToastNotification, { ToastNotificationProps } from './';
import argTypes from './ToastNotification.stories.args';
import Documentation from './ToastNotification.stories.docs.mdx';
import Avatar from '../Avatar';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';

export default {
  title: 'Momentum UI/ToastNotification',
  component: ToastNotification,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<ToastNotificationProps>(ToastNotification).bind({});

Example.argTypes = { ...argTypes, onClose: { action: 'closed' } };

Example.args = {
  text: 'Example text',
};

const LeadingVisual = MultiTemplate<ToastNotificationProps>(ToastNotification).bind({});

LeadingVisual.argTypes = { ...argTypes, onClose: { action: 'closed' } };

LeadingVisual.parameters = {
  variants: [
    {
      text: 'Example text',
      leadingVisual: <Avatar initials="CW" size={32} />,
    },
    {
      text: 'Very long text that can occupy two, three or even more lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      leadingVisual: <Avatar initials="CW" size={32} />,
    },
    {
      text: 'Example text',
      leadingVisual: <Icon name="help-circle" scale={24} weight="bold" />,
    },
    {
      text: 'Very long text that can occupy two, three or even more lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      leadingVisual: <Icon name="help-circle" scale={24} weight="bold" />,
    },
    {
      text: 'Example text',
      leadingVisual: <Icon name="info-circle" scale={14} weight="filled" fillColor="yellow" />,
    },
    {
      text: 'Very long text that can occupy two, three or even more lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      leadingVisual: <Icon name="info-circle" scale={14} weight="filled" fillColor="yellow" />,
    },
  ],
};

const ButtonGroup = MultiTemplate<ToastNotificationProps>(ToastNotification).bind({});

ButtonGroup.argTypes = { ...argTypes, onClose: { action: 'closed' } };

ButtonGroup.parameters = {
  variants: [
    {
      text: 'Example text',
      buttonGroup: (
        <ButtonPill outline size={28}>
          Button
        </ButtonPill>
      ),
    },
    {
      text: 'Very long text that can occupy two, three or even more lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      buttonGroup: (
        <ButtonPill outline size={28}>
          Button
        </ButtonPill>
      ),
    },
    {
      text: 'Example text',
      buttonGroup: (
        <>
          <ButtonPill size={28}>Button</ButtonPill>
          <ButtonPill outline size={28}>
            Button
          </ButtonPill>
        </>
      ),
    },
    {
      text: 'Very long text that can occupy two, three or even more lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      buttonGroup: (
        <>
          <ButtonPill size={28}>Button</ButtonPill>
          <ButtonPill outline size={28}>
            Button
          </ButtonPill>
        </>
      ),
    },
  ],
};

const Common = MultiTemplate<ToastNotificationProps>(ToastNotification).bind({});

Common.argTypes = { ...argTypes, onClose: { action: 'closed' } };

Common.parameters = {
  variants: [
    {
      text: 'Example text',
      leadingVisual: <Avatar initials="CW" size={32} />,
      buttonGroup: (
        <ButtonPill outline size={28}>
          Button
        </ButtonPill>
      ),
    },
    {
      text: 'Very long text that can occupy two, three or even more lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      leadingVisual: <Avatar initials="CW" size={32} />,
      buttonGroup: (
        <ButtonPill outline size={28}>
          Button
        </ButtonPill>
      ),
    },
    {
      text: 'Example text',
      leadingVisual: <Icon name="help-circle" scale={24} weight="bold" />,
      buttonGroup: (
        <>
          <ButtonPill size={28}>Button</ButtonPill>
          <ButtonPill outline size={28}>
            Button
          </ButtonPill>
        </>
      ),
    },
    {
      text: 'Very long text that can occupy two, three or even more lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      leadingVisual: <Icon name="help-circle" scale={24} weight="bold" />,
      buttonGroup: (
        <>
          <ButtonPill size={28}>Button</ButtonPill>
          <ButtonPill outline size={28}>
            Button
          </ButtonPill>
        </>
      ),
    },
  ],
};

export { Example, LeadingVisual, ButtonGroup, Common };
