import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';

import TabsProvider from '.';
import argTypes from './TabsProvider.stories.args';
import Documentation from './TabsProvider.stories.docs.mdx';
import React, { ComponentProps, useState } from 'react';
import Tab from '../Tab/Tab';
import TabList from '../TabList';
import ContentSeparator from '../ContentSeparator';
import TabPanel from '../TabPanel';

export default {
  title: 'Momentum UI/TabsProvider',
  component: TabsProvider,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation),
    },
  },
};

const ExampleComponent = () => {
  const [selectedTab, setSelectedTab] = useState<React.Key>('tab-1');

  return (
    <TabsProvider selectedTab={selectedTab}>
      <TabList onTabSelection={setSelectedTab}>
        <Tab key="tab-1">Tab 1</Tab>
        <Tab key="tab-2">Tab 2</Tab>
        <Tab key="disabled" disabled>
          Disabled
        </Tab>
        <Tab key="tab-3">Tab 3</Tab>
      </TabList>
      <ContentSeparator />
      <TabPanel>
        {
          { 'tab-1': 'Tab 1 Selected', 'tab-2': 'Tab 2 Selected', 'tab-3': 'Tab 3 Selected' }[
            selectedTab
          ]
        }
      </TabPanel>
    </TabsProvider>
  );
};

const Example = Template<ComponentProps<typeof ExampleComponent>>(ExampleComponent).bind({});

Example.argTypes = { ...argTypes };

Example.args = {};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example };
