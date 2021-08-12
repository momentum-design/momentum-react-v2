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

import ButtonPill from '../ButtonPill';

import ButtonGroup, { ButtonGroupProps, BUTTON_GROUP_CONSTANTS as CONSTANTS } from './';
import Documentation from './ButtonGroup.documentation.mdx';

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
  title: 'Momentum UI/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
  subComponents: { ButtonPill },
};

const argTypes = {
  children: {
    description: 'Provides the SupportedButton child nodes for this component.',
    control: {
      type: 'none',
    },
    table: {
      type: {
        summary: 'ReactElement<SupportedComponents> | Array<ReactElement<SupportedComponents>>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  className: {
    defaultValue: undefined,
    description: 'Provides additional classes to this `<ButtonGroup />`',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  separation: {
    defaultValue: CONSTANTS.DEFAULTS.SEPARATION,
    description: 'Type of seperators to use with this `<ButtonGroup />`.',
    options: Object.values(CONSTANTS.SEPARATIONS),
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SEPARATION,
      },
    },
  },
  spaced: {
    defaultValue: CONSTANTS.DEFAULTS.SPACED,
    description: 'Whether to apply spacing around ChildNodes.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SPACED,
      },
    },
  },
  round: {
    defaultValue: CONSTANTS.DEFAULTS.ROUND,
    description: 'Whether this `<ButtonGroup /> is rounded.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.ROUND,
      },
    },
  },
};

const Template: Story<ButtonGroupProps> = (args: ButtonGroupProps) => {
  const mutatedArgs = { ...args };
  delete mutatedArgs.children;

  return (
    <ButtonGroup className="custom" {...args}>
      {args.children}
    </ButtonGroup>
  );
};

const MultiTemplate: Story<ButtonGroupProps> = (args: ButtonGroupProps, { parameters }) => {
  const mutatedArgs = { ...args };
  const { children } = mutatedArgs;
  delete mutatedArgs.children;

  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <ButtonGroup className="custom" key={index} {...variant} {...args}>
      {children}
    </ButtonGroup>
  ));

  return <>{items}</>;
};

const Example = Template.bind({});

Example.args = {
  children: [
    <ButtonPill key="0">Example A</ButtonPill>,
    <ButtonPill key="1">Example B</ButtonPill>,
    <ButtonPill key="2">Example B</ButtonPill>,
  ],
};

Example.argTypes = { ...argTypes };

const Separations = MultiTemplate.bind({});

Separations.args = {
  children: [
    <ButtonPill key="0">Example A</ButtonPill>,
    <ButtonPill key="1">Example B</ButtonPill>,
    <ButtonPill key="2">Example B</ButtonPill>,
  ],
};

Separations.parameters = {
  variants: [{}, { separation: 'partial' }, { separation: 'full' }],
};

Separations.argTypes = { ...argTypes };
delete Separations.argTypes.separation;

const Spacing = MultiTemplate.bind({});

Spacing.args = {
  children: [
    <ButtonPill key="0">Example A</ButtonPill>,
    <ButtonPill key="1">Example B</ButtonPill>,
    <ButtonPill key="2">Example B</ButtonPill>,
  ],
};

Spacing.parameters = {
  variants: [{}, { spaced: true }],
};

Spacing.argTypes = { ...argTypes };
delete Spacing.argTypes.spaced;

const Rounding = MultiTemplate.bind({});

Rounding.args = {
  children: [
    <ButtonPill key="0">Example A</ButtonPill>,
    <ButtonPill key="1">Example B</ButtonPill>,
    <ButtonPill key="2">Example B</ButtonPill>,
  ],
};

Rounding.parameters = {
  variants: [{}, { round: true }],
};

Rounding.argTypes = { ...argTypes };
delete Rounding.argTypes.round;

export { Example, Rounding, Separations, Spacing };
