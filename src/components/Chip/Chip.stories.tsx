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

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<ChipProps>(Chip).bind({});

Example.argTypes = { ...argTypes };

// TODO: Provide default arguments for this story here. These populate into the argument table for this component.
Example.args = {
  children: 'Example',
  text: 'Hello World',
};

const exampleIcon = <Icon name="placeholder" scale={16} />;

const exampleRightIcon = <Icon name="cancel" scale={16} />;

const exampleAvatar = <Avatar size={24}>AA</Avatar>;

const Common = MultiTemplate<ChipProps>(Chip).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {
  children: 'Example',
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
      children: 'Example E',
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

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Common };
