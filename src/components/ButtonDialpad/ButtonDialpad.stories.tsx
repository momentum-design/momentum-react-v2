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

import ButtonDialPad, { ButtonDialpadProps, BUTTON_DIALPAD_CONSTANTS as CONSTANTS } from './';
import Documentation from './ButtonDialpad.documentation.mdx';

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
  title: 'Momentum UI/ButtonDialpad',
  component: ButtonDialPad,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
};

const argTypes = {
  children: {
    defaultValue: '',
    description: 'Provides the child node for this element.',
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
  disabled: {
    defaultValue: CONSTANTS.DEFAULTS.DISABLED,
    description: 'Whether to render the `<ButtonDialpad />` is disabled.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.DISABLED,
      },
    },
  },
  primaryText: {
    defaultValue: '1',
    description: 'Provides the primary text for this `<ButtonDialPad />`.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  secondaryText: {
    defaultValue: 'ABC',
    description: 'Provides the prsecondaryimary text for this `<ButtonDialPad />`.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  size: {
    defaultValue: CONSTANTS.DEFAULTS.SIZE,
    description: 'Modifies the size of this `<ButtonPill />`.',
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
  onPress: {
    action: 'onPress',
    description:
      'From [AriaButtonProps](https://react-spectrum.adobe.com/react-aria/useButton.html). Handler that is called when the press is released over the target.',
    table: {
      category: 'AriaButtonProps',
      type: {
        summary: '(e: PressEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  autoFocus: {
    action: 'autoFocus',
    description:
      'From [AriaButtonProps](https://react-spectrum.adobe.com/react-aria/useButton.html). Whether the element should receive focus on render.',
    table: {
      category: 'AriaButtonProps',
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onKeyDown: {
    action: 'onKeyDown',
    description:
      'From [AriaButtonProps](https://react-spectrum.adobe.com/react-aria/useButton.html). Handler that is called when a key is pressed.',
    table: {
      category: 'AriaButtonProps',
      type: {
        summary: '(e: KeyboardEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

const Template: Story<ButtonDialpadProps> = (args: ButtonDialpadProps) => {
  const mutatedArgs = { ...args };
  delete mutatedArgs.children;

  return <ButtonDialPad {...mutatedArgs}>{args.children}</ButtonDialPad>;
};

const MultiTemplate: Story<ButtonDialpadProps> = (args: ButtonDialpadProps, { parameters }) => {
  const mutatedArgs = { ...args };
  const { children } = mutatedArgs;
  delete mutatedArgs.children;

  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <ButtonDialPad key={index} {...variant} {...args}>
      {children}
    </ButtonDialPad>
  ));

  return <>{items}</>;
};

const Example = Template.bind({});

Example.argTypes = { ...argTypes };

const Sizes = MultiTemplate.bind({});

Sizes.parameters = {
  variants: [{}, { size: 52 }],
};

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

const Common = MultiTemplate.bind({});

const States = MultiTemplate.bind({});

States.parameters = {
  variants: [{}, { disabled: true }],
};

States.argTypes = { ...argTypes };
delete States.argTypes.disabled;

Common.parameters = {
  variants: [
    { primaryText: '1' },
    { primaryText: '2', secondaryText: 'ABC' },
    { primaryText: '3', secondaryText: 'DEF' },
    { primaryText: '4', secondaryText: 'GHI' },
    { primaryText: '5', secondaryText: 'JKL' },
    { primaryText: '6', secondaryText: 'MNO' },
    { primaryText: '7', secondaryText: 'PQRS' },
    { primaryText: '8', secondaryText: 'TUV' },
    { primaryText: '9', secondaryText: 'WXYZ' },
    { primaryText: '0' },
    { primaryText: '*' },
    { primaryText: '#' },
  ],
};

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;
delete Common.argTypes.primaryText;
delete Common.argTypes.secondaryText;

export { Example, Sizes, States, Common };
