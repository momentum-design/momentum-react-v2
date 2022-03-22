import AriaButtonDocs from 'storybook/docs.stories.aria-button.mdx';
import HTMLGlobalAttributes from 'storybook/docs.stories.common-html-attributes.mdx';
import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import argTypes from './ButtonSimple.stories.args';
import Documentation from './ButtonSimple.stories.docs.mdx';

import ButtonSimple, { ButtonSimpleProps } from './';

export default {
  title: 'Momentum UI/ButtonSimple',
  component: ButtonSimple,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, HTMLGlobalAttributes, AriaButtonDocs),
    },
  },
  args: {
    children: 'Example',
  },
};

const Example = Template<ButtonSimpleProps>(ButtonSimple).bind({});

Example.argTypes = { ...argTypes };

const Common = MultiTemplate<ButtonSimpleProps>(ButtonSimple).bind({});

Common.argTypes = { ...argTypes };

Common.parameters = {
  variants: [
    {},
    {
      style: {
        backgroundColor: 'pink',
      },
    },
    {
      style: {
        padding: '1rem',
      },
    },
    {
      isDisabled: true,
      style: {
        backgroundColor: 'salmon',
      },
    },
    {
      style: {
        borderRadius: '100vh',
      },
    },
  ],
};

export { Example, Common };
