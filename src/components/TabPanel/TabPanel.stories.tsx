import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';

import TabPanel, { TabPanelProps } from './';
import argTypes from './TabPanel.stories.args';
import Documentation from './TabPanel.stories.docs.mdx';

export default {
  title: 'Momentum UI/TabPanel',
  component: TabPanel,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation),
    },
  },
};

const Example = Template<TabPanelProps>(TabPanel).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Example',
};

export { Example };
