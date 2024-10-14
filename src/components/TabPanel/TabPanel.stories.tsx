import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import TabPanel, { TabPanelProps } from './';
import argTypes from './TabPanel.stories.args';
import Documentation from './TabPanel.stories.docs.mdx';

export default {
  title: 'Momentum UI/TabPanel',
  component: TabPanel,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<TabPanelProps>(TabPanel).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Example',
};

export { Example };
