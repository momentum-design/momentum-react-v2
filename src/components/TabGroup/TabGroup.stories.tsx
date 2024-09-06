import React, { useState } from 'react';

import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import { Template } from '../../storybook/helper.stories.templates';

import TabGroup, { TabGroupProps } from './';
import argTypes from './TabGroup.stories.args';
import Documentation from './TabGroup.stories.docs.mdx';

import Tab from '../Tab';

export default {
  title: 'Momentum UI/TabGroup',
  component: TabGroup,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const commonChildren = [
  <Tab>Tab1</Tab>,
  <Tab>Tab2</Tab>,
  <Tab>Tab3</Tab>,
  <Tab>Tab4</Tab>,
];

const Example = Template<TabGroupProps>(TabGroup).bind({});

Example.args = {
  children: [...commonChildren],
  spaced: false,
};

Example.argTypes = { ...argTypes };

// const HorizontalTabGroup = Template<TabGroupProps>(TabGroup).bind({});

// HorizontalTabGroup.args = {
//   children: [...commonChildren],
//   orientation: 'horizontal',
//   spaced: true,
// }

// HorizontalTabGroup.argTypes = { ...argTypes };
const HorizontalTabGroup = () => {

  const [activeTab, setActiveTab] = useState('');
  const tabs = [
    { id: 'tab1', label: 'TabA', content: 'contentA' },
    { id: 'tab2', label: 'TabB', content: 'contentB' },
    { id: 'tab3', label: 'TabC', content: 'contentC' },
    { id: 'tab4', label: 'TabD', content: 'contentD' },
  ];

  return (
    <>
      <TabGroup
        orientation='horizontal'
        spaced={true}
        ariaLabel='horizontal tab group'
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            active={activeTab === tab.id}
            aria-selected={activeTab === tab.id}
            onPress={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Tab>
          ))}
      </TabGroup>
      {tabs.map((tab) => (
        activeTab === tab.id && <div key={tab.id}>{tab.content}</div>
      ))}
    </>
  )
}

const VerticalTabGroup = Template<TabGroupProps>(TabGroup).bind({});

VerticalTabGroup.args = {
  children: [...commonChildren],
  orientation: 'vertical',
  spaced: true,
};

VerticalTabGroup.argTypes = { ...argTypes };

export { Example, HorizontalTabGroup, VerticalTabGroup };
