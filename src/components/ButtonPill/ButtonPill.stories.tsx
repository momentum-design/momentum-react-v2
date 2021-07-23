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

import ButtonPill, { ButtonPillProps, BUTTON_PILL_CONSTANTS as CONSTANTS } from './';
import Documentation from './Button.documentation.mdx';

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
  title: 'Momentum UI/ButtonPill',
  component: ButtonPill,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
};

const argTypes = {
  children: {
    defaultValue: 'Example Text',
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
  color: {
    defaultValue: undefined,
    description:
      'Modifies the size of this `<ButtonPill />`. Some colors do not include an outline variant.',
    options: [undefined, ...Object.values(CONSTANTS.COLORS)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  disabled: {
    defaultValue: CONSTANTS.DEFAULTS.DISABLED,
    description: 'Whether to render the `<ButtonPill />` is disabled.',
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
  ghost: {
    defaultValue: CONSTANTS.DEFAULTS.GHOST,
    description:
      'Whether this `<ButtonPill />` is a ghost. This overrides the `color` and `outline` props.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.GHOST,
      },
    },
  },
  outline: {
    defaultValue: CONSTANTS.DEFAULTS.OUTLINE,
    description: 'Whether to render the outline variant of this `<ButtonPill />`.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.OUTLINE,
      },
    },
  },
  size: {
    defaultValue: CONSTANTS.DEFAULTS.SIZE,
    description: 'Modifies the size of this `<ButtonPill />`.',
    options: [40, 32, 28, 24],
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

const Template: Story<ButtonPillProps> = (args: ButtonPillProps) => {
  const mutatedArgs = { ...args };
  delete mutatedArgs.children;

  return <ButtonPill {...mutatedArgs}>{args.children}</ButtonPill>;
};

const MultiTemplate: Story<ButtonPillProps> = (args: ButtonPillProps, { parameters }) => {
  const mutatedArgs = { ...args };
  const { children } = mutatedArgs;
  delete mutatedArgs.children;

  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <ButtonPill key={index} {...variant} {...args}>
      {children}
    </ButtonPill>
  ));

  return <>{items}</>;
};

const Example = Template.bind({});

Example.argTypes = { ...argTypes };

const Colors = MultiTemplate.bind({});

Colors.parameters = {
  variants: [{}, { color: 'join' }, { color: 'cancel' }, { color: 'message' }],
};

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.color;

const Outline = MultiTemplate.bind({});

Outline.parameters = {
  variants: [
    { outline: true },
    { color: 'join', outline: true },
    { color: 'cancel', outline: true },
    { color: 'message', outline: true },
  ],
};

Outline.argTypes = { ...argTypes };
delete Outline.argTypes.color;
delete Outline.argTypes.outline;

const States = MultiTemplate.bind({});

States.parameters = {
  variants: [{}, { ghost: true }, { disabled: true }, { ghost: true, disabled: true }],
};

States.argTypes = { ...argTypes };
delete States.argTypes.disabled;
delete States.argTypes.ghost;

const Sizes = MultiTemplate.bind({});

Sizes.parameters = {
  variants: [{}, { size: 32 }, { size: 28 }, { size: 24 }],
};

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

export { Example, Colors, Outline, States, Sizes };
