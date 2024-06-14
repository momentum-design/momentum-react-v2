import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';
import HTMLGlobalAttributes from '../../storybook/docs.stories.common-html-attributes.mdx';

import ButtonHyperlink, { ButtonHyperlinkProps } from './';
import argTypes from './ButtonHyperlink.stories.args';
import Documentation from './ButtonHyperlink.stories.docs.mdx';

export default {
  title: 'Momentum UI/ButtonHyperlink',
  component: ButtonHyperlink,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, HTMLGlobalAttributes, AriaButtonDocs),
    },
  },
  args: {
    children: 'Example Text',
  },
};

const Example = Template<ButtonHyperlinkProps>(ButtonHyperlink).bind({});

Example.argTypes = { ...argTypes};

const States = MultiTemplateWithPseudoStates<ButtonHyperlinkProps>(ButtonHyperlink).bind({});

States.parameters = {
  variants: [{ label: 'Default hyperlink' }, { inverted: true }],
};

States.argTypes = { ...argTypes };
delete States.argTypes.disabled;
delete States.argTypes.inverted;

const Link = Template<ButtonHyperlinkProps>(ButtonHyperlink).bind({});

Link.args = {
  role: 'link',
  children: 'This is a link role button',
  href: 'https://www.webex.com/',
  target: '_blank',
};

Link.argTypes = {
  ...argTypes,
};

delete Link.argTypes.disabled;
delete Link.argTypes.inverted;

export { Example, States, Link };
