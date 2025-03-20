/* eslint-disable import/no-unresolved */
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
import { TYPES } from './Badge.constants';

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
  type: {
    description: 'Modifies the type of the badge',
    options: [undefined, ...TYPES],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.TYPE,
      },
    },
  },
  counter: {
    description: 'Provides the counter number for this element. \n\n (when `type` === counter)',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  maxCounter: {
    description: 'Provides the maxCounter number for this element. \n\n (when `type` === counter)',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  iconName: {
    description: 'Provides the iconName for this element. \n\n (when `type` === icon)',
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
  overlay: {
    description: 'Provides the overlay attribute for this element.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
};

const Template: Story<BadgeProps> = (args: BadgeProps) => {
  return <Badge {...args} />;
};

const Example = Template.bind({});
Example.argTypes = { ...argTypes };

export { Example };
