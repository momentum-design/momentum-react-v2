import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Link, { LinkProps } from './';
import argTypes from './Link.stories.args';
import Documentation from './Link.stories.docs.mdx';

export default {
  title: 'Momentum UI/Link',
  component: Link,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    children: 'Example Text',
  },
};

const Example = Template<LinkProps>(Link).bind({});

Example.args = {
  href: 'https://www.webex.com/',
  target: '_blank',
};

Example.argTypes = { ...argTypes };


const States = MultiTemplateWithPseudoStates<LinkProps>(Link).bind({});

States.parameters = {
  variants: [{ label: 'Default link' }, { inverted: true }],
};

States.argTypes = { ...argTypes };
delete States.argTypes.disabled;
delete States.argTypes.inverted;

export { Example, States };
