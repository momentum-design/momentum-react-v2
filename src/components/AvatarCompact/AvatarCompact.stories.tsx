import React, { FC } from 'react';
import { Story } from '@storybook/react';

import AvatarCompact, { AvatarCompactProps } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './AvatarCompact.documentation.mdx';

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
  title: 'Momentum UI/AvatarCompact',
  component: AvatarCompact,
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
    count: {
      defaultValue: undefined,
      description: 'Number of people for this compact avatar.',
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
  },
};

const MultiTemplate: Story<AvatarCompactProps> = (args: AvatarCompactProps, { parameters }) => {
  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <div key={index}>
      <AvatarCompact {...args} {...variant} />
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

const Template: Story<AvatarCompactProps> = (args) => <AvatarCompact {...args} />;

const Example = Template.bind({});

Example.args = {
  count: 200,
};

const Common = MultiTemplate.bind({});

Common.parameters = {
  variants: [
    { count: 20 },
    { count: 1 },
    { count: 10000 },
    { count: 1001 },
    { count: 100000 },
    { count: 125343 },
    { count: 15343 },
  ],
};

export { Example, Common };
