/* eslint-disable no-console */
import React from 'react';

import { Meta } from '@storybook/react';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import Tab from '../Tab';
import TabList, { TabListProps } from './';
import argTypes from './TabList.stories.args';
import Documentation from './TabList.stories.docs.mdx';

export default {
  title: 'Momentum UI/TabList',
  component: TabList,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
} as Meta<TabListProps>;

const Example = Template<TabListProps>(TabList).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  onTabSelection: (key: React.Key) => console.log('tab selected', key),
  children: [
    <Tab key="tab-1" active>
      Tab 1
    </Tab>,
    <Tab key="tab-2">Tab 2</Tab>,
    <Tab key="disabled" disabled>
      Disabled
    </Tab>,
    <Tab key="tab-3">Tab 3</Tab>,
  ],
};

const SubTabs = Template<TabListProps>(TabList).bind({});

SubTabs.argTypes = { ...argTypes };

SubTabs.args = {
  onTabSelection: (key: React.Key) => console.log('tab selected', key),
  isSubTabList: true,
  children: [
    <Tab key="tab-1" active>
      Tab 1
    </Tab>,
    <Tab key="tab-2">Tab 2</Tab>,
    <Tab key="disabled" disabled>
      Disabled
    </Tab>,
    <Tab key="tab-3">Tab 3</Tab>,
  ],
};

const Common = MultiTemplate<TabListProps>(TabList).bind({});

Common.argTypes = { ...argTypes };

Common.parameters = {
  variants: [
    {
      onTabSelection: (key: React.Key) => console.log('tab selected', key),
      children: [
        <Tab key="tab-1" active>
          Tab 1
        </Tab>,
        <Tab key="tab-2">Tab 2</Tab>,
        <Tab key="tab-3" disabled>
          Tab 3
        </Tab>,
      ],
    },
    {
      onTabSelection: (key: React.Key) => console.log('tab selected', key),
      round: false,
      spaced: false,
      children: [
        <Tab key="tab-1" active>
          Tab 1
        </Tab>,
        <Tab key="tab-2">Tab 2</Tab>,
        <Tab key="tab-3" disabled>
          Tab 3
        </Tab>,
      ],
    },
  ],
};

export { Example, SubTabs, Common };
