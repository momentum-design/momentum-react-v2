import AriaButtonDocs from 'storybook/docs.stories.aria-button.mdx';
import HTMLGlobalAttributes from 'storybook/docs.stories.common-html-attributes.mdx';
import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import argTypes from './ButtonDialpad.stories.args';
import Documentation from './ButtonDialpad.stories.docs.mdx';

import ButtonDialpad, { ButtonDialpadProps } from './';

export default {
  title: 'Momentum UI/ButtonDialpad',
  component: ButtonDialpad,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, HTMLGlobalAttributes, AriaButtonDocs),
    },
  },
  args: {
    primaryText: '1',
    secondaryText: 'ABC',
  },
};

const Example = Template<ButtonDialpadProps>(ButtonDialpad).bind({});

Example.argTypes = { ...argTypes };

const Sizes = MultiTemplate<ButtonDialpadProps>(ButtonDialpad).bind({});

Sizes.parameters = {
  variants: [{}, { size: 52 }],
};

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

const States = MultiTemplate<ButtonDialpadProps>(ButtonDialpad).bind({});

States.parameters = {
  variants: [{}, { disabled: true }],
};

States.argTypes = { ...argTypes };
delete States.argTypes.disabled;

const Common = MultiTemplate<ButtonDialpadProps>(ButtonDialpad).bind({});

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
