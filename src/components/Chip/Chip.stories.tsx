import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Chip, { ChipProps } from './';
import argTypes from './Chip.stories.args';
import Documentation from './Chip.stories.docs.mdx';

export default {
  title: 'Momentum UI/Chip',
  component: Chip,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<ChipProps>(Chip).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  label: 'Example',
  color: 'default',
};

export { Example };
