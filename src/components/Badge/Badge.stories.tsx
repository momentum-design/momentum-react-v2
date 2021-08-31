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
    description: 'Provides the child text for this element.',
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
    description: 'Modifies the size of this element.',
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
};

const Template: Story<BadgeProps> = (args: BadgeProps) => {
  return <Badge {...args}>{args.children}</Badge>;
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
  variants: [{}, { size: 18 }, { size: 12 }],
};

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

export { Example, Sizes };
