import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import DividerDot, { DividerDotProps } from './';
import argTypes from './DividerDot.stories.args';
import Documentation from './DividerDot.stories.docs.mdx';

export default {
  title: 'Momentum UI/DividerDot',
  component: DividerDot,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<DividerDotProps>(DividerDot).bind({});

Example.argTypes = { ...argTypes };

export { Example };
