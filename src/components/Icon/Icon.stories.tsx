import React, { FC } from 'react';
import { Story } from '@storybook/react';

import Icon, { IconProps } from './';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import Documentation from './Icon.documentation.mdx';
import { DEFAULTS, SIZES, WEIGHTS } from './Icon.constants';

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
  title: 'Momentum UI/Icon',
  component: Icon,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
  argTypes: {
    name: {
      defaultValue: 'accessibility',
      description: 'Name of the icon.',
      control: { type: 'text' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'accessibility',
        },
      },
    },
    scale: {
      defaultValue: DEFAULTS.SCALE,
      description: 'Scale represents the size/scale of te icon.',
      options: [undefined, ...Object.values(SIZES)],
      control: { type: 'select' },
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: DEFAULTS.SCALE,
        },
      },
    },
    autoScale: {
      defaultValue: DEFAULTS.AUTO_SCALE,
      description: 'If set to true, the icon size will match the parent size.',
      options: [undefined, true, false],
      control: { type: 'boolean' },
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: DEFAULTS.AUTO_SCALE,
        },
      },
    },
    weight: {
      defaultValue: DEFAULTS.WEIGHT,
      description: 'Represents the style of the icon. Note: Not all icons have all 4 styles.',
      options: [undefined, ...Object.values(WEIGHTS)],
      control: { type: 'select' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: DEFAULTS.WEIGHT,
        },
      },
    },
    className: {
      defaultValue: undefined,
      description:
        'If present, the class name will be added to the underlying svg. Used to override styles by consumers.',
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
    fillColor: {
      defaultValue: undefined,
      description: 'Color for the icon to be filled with.',
      control: { type: 'color' },
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
  },
};

const MultiTemplate: Story<IconProps> = (args: IconProps, { parameters }) => {
  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <Icon key={index} {...args} {...variant} />
  ));

  return <div style={{ alignItems: 'flex-end' }}>{items}</div>;
};

const Template: Story<IconProps> = (args) => <Icon {...args} />;

const Example = Template.bind({});

Example.args = {
  name: 'accessories',
};

const Sizes = MultiTemplate.bind({});

Sizes.args = {
  name: 'accessibility',
};

Sizes.parameters = {
  variants: [
    ...Object.values(SIZES).map((size) => {
      return {
        scale: size,
      };
    }),
  ],
};

const Weights = MultiTemplate.bind({});

Weights.args = {
  name: 'accessories',
};

Weights.parameters = {
  variants: [
    ...Object.values(WEIGHTS).map((weight) => {
      return {
        weight,
      };
    }),
  ],
};

const Common = MultiTemplate.bind({});

Common.args = {
  name: 'accessories',
};

const cartesian = <T extends (string | number)[][]>(...arr: T) =>
  arr.reduce((a, b) => a.flatMap((c) => b.map((d) => [...c, d])), [[]]);

Common.parameters = {
  variants: [
    ...cartesian(Object.values(WEIGHTS), Object.values(SIZES)).flatMap((variant) => {
      return { weight: variant[0], scale: variant[1] };
    }),
  ],
};

export { Example, Sizes, Weights, Common };
