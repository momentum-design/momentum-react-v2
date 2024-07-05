import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Chip, { ChipProps, CHIP_CONSTANTS } from './';
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

const Example = Template<ChipProps>(Chip);

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Example',
  text: 'Hello World',
};

const exampleIcon = <Icon name="placeholder" scale={16} />;
const exampleRightIcon = <Icon name="cancel" scale={16} />;
const exampleAvatar = <Avatar initials="AA" size={24} />;
const Common = MultiTemplate<ChipProps>(Chip);

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  children: 'Example',
  style: { margin: '1rem' },
};

Common.parameters = {
  variants: [
    { children: 'Chip with icons', leftIcon: exampleIcon, rightIcon: exampleRightIcon },
    {
      children: 'Chip with avatar',
      avatar: exampleAvatar,
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
    },
    {
      children: 'With:',
      size: 28,
      search: true,
    },
    {
      children: 'With:',
      size: 24,
      search: true,
    },
    { children: 'Disabled chip', disabled: true },
    {
      children: 'Outline ghost chip',
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
      outline: true,
      ghost: true,
    },
    {
      children: 'Lonnnnnnnnnnnnnnng outline ghost chip',
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
      outline: true,
      ghost: true,
    },
    {
      children: 'Disabled outline ghost chip',
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
      outline: true,
      ghost: true,
      disabled: true,
    },
    {
      children: 'Error chip',
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
      error: true,
    },
    {
      children: 'Error outline ghost chip',
      leftIcon: exampleIcon,
      rightIcon: exampleRightIcon,
      outline: true,
      ghost: true,
      error: true,
    },
    {
      children: 'Error outline ghost chip with avatar',
      avatar: exampleAvatar,
      outline: true,
      ghost: true,
      error: true,
    },
  ],
};

const Colors = MultiTemplate<ChipProps>(Chip);

Colors.args = {
  style: { margin: '1rem' },
};

Colors.parameters = {
  variants: Object.values(CHIP_CONSTANTS.MULTILINE_COLORS).map((color) => ({
    children: `chipColor = ${color}`,
    chipColor: color,
    size: 16,
    multiline: true,
  })),
};

export { Example, Common, Colors };
