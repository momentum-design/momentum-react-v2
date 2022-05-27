import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Chip, { ChipProps } from './';
import argTypes from './Chip.stories.args';
import Documentation from './Chip.stories.docs.mdx';
import Icon from '../Icon';
import React from 'react';
import Avatar from '../Avatar';

export default {
  title: 'Momentum UI/Chip',
  component: Chip,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<ChipProps>(Chip).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Example',
  text: 'Hello World',
};

const exampleIcon = <Icon name="placeholder" scale={16} />;
const exampleRightIcon = <Icon name="cancel" scale={16} />;
const exampleAvatar = <Avatar initials="AA" size={24} />;
const Common = MultiTemplate<ChipProps>(Chip).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  children: 'Example',
  style: { margin: '1rem' },
};

Common.parameters = {
  variants: [
    { children: 'Example A', isDisabled: true },
    { children: 'Example B', leftIcon: exampleIcon },
    { children: 'Example C', leftIcon: exampleIcon, rightIcon: exampleRightIcon },
    {
      children: 'Example D',
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
      outline: true,
    },
    {
      children: 'Lonnnnnnnnnnnnnnng Example E',
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
      disabled: true,
    },
    {
      children: 'Example F',
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
      error: true,
    },
    {
      children: 'Example G',
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
      outline: true,
      error: true,
    },
    {
      children: 'Example H',
      avatar: exampleAvatar,
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
    },
    {
      children: 'Example I',
      avatar: exampleAvatar,
      outline: true,
      error: true,
    },
  ],
};

export { Example, Common };
