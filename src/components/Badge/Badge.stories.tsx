import React, { FC } from 'react';
import { Story } from '@storybook/react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Badge, { BadgeProps, BADGE_CONSTANTS as CONSTANTS } from './';
import Documentation from './Badge.documentation.mdx';

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
  title: 'Momentum UI/Badge',
  component: Badge,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
};

const argTypes = {
  children: {
    defaultValue: '10',
    description: 'Provides the child nodes for this element.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  size: {
    defaultValue: CONSTANTS.DEFAULTS.SIZE,
    description: 'Modifies the size of this `<Badge />`.',
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'size',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
};

const Template: Story<BadgeProps> = (args: BadgeProps) => {
  const mutatedArgs = { ...args };
  delete mutatedArgs.children;

  return <Badge {...mutatedArgs}>{args.children}</Badge>;
};

const MultiTemplate: Story<BadgeProps> = (args: BadgeProps, { parameters }) => {
  const mutatedArgs = { ...args };
  const { children } = mutatedArgs;
  delete mutatedArgs.children;

  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <Badge key={index} {...variant} {...args}>
      {children}
    </Badge>
  ));

  return <>{items}</>;
};

const Example = Template.bind({});

Example.argTypes = { ...argTypes };

const Sizes = MultiTemplate.bind({});

Sizes.parameters = {
  variants: [{}, { size: 'S' }, { size: 'M' }, { size: 'L' }],
};

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

export { Example, Sizes };
