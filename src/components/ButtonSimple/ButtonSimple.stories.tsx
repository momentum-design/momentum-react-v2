import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';

import ButtonSimple, { ButtonSimpleProps } from './';
import argTypes from './ButtonSimple.stories.args';
import Documentation from './ButtonSimple.stories.docs.mdx';

export default {
  title: 'Momentum UI/ButtonSimple',
  component: ButtonSimple,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, AriaButtonDocs),
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
