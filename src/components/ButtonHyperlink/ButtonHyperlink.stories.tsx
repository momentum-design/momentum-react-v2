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

import ButtonHyperlink, { ButtonHyperlinkProps, BUTTON_HYPERLINK_CONSTANTS as CONSTANTS } from './';
import Documentation from './ButtonHyperlink.documentation.mdx';

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
  title: 'Momentum UI/ButtonHyperlink',
  component: ButtonHyperlink,
  parameters: {
    expanded: true,
    docs: {
      page: DocsPage,
    },
  },
};

const argTypes = {
  children: {
    defaultValue: 'Hyperlink',
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
  disabled: {
    defaultValue: CONSTANTS.DEFAULTS.DISABLED,
    description: 'Whether to render the `<ButtonHyperlink />` is disabled.',
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

const Template: Story<ButtonHyperlinkProps> = (args: ButtonHyperlinkProps) => {
  const mutatedArgs = { ...args };
  delete mutatedArgs.children;

  return <ButtonHyperlink {...mutatedArgs}>{args.children}</ButtonHyperlink>;
};

const MultiTemplate: Story<ButtonHyperlinkProps> = (args: ButtonHyperlinkProps, { parameters }) => {
  const mutatedArgs = { ...args };
  const { children } = mutatedArgs;
  delete mutatedArgs.children;

  const { variants } = parameters;

  const items = variants.map((variant, index: number) => (
    <ButtonHyperlink key={index} {...variant} {...args}>
      {children}
    </ButtonHyperlink>
  ));

  return <>{items}</>;
};

const Example = Template.bind({});

Example.argTypes = { ...argTypes };

const States = MultiTemplate.bind({});

States.parameters = {
  variants: [{}, { disabled: true }],
};

States.argTypes = { ...argTypes };
delete States.argTypes.disabled;

export { Example, States };
