import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';
import HTMLGlobalAttributes from '../../storybook/docs.stories.common-html-attributes.mdx';

import ButtonSimple, { ButtonSimpleProps } from './';
import argTypes from './ButtonSimple.stories.args';
import Documentation from './ButtonSimple.stories.docs.mdx';

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

const Example = Template<ButtonSimpleProps>(ButtonSimple);

Example.argTypes = { ...argTypes };

const Common = MultiTemplate<ButtonSimpleProps>(ButtonSimple);

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
