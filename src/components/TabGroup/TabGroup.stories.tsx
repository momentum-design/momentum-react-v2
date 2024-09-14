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
  <Tab key="tab1">Tab1</Tab>,
  <Tab key="tab2">Tab2</Tab>,
  <Tab key="tab3">Tab3</Tab>,
  <Tab key="tab4">Tab4</Tab>,
];

const Example = Template<TabGroupProps>(TabGroup).bind({});

Example.args = {
  children: [...commonChildren],
};

Example.argTypes = { ...argTypes };

const HorizontalTabGroup = () => {

  const [activeTab, setActiveTab] = useState('');
  const tabs = [
    { id: 'tab1', label: 'TabA', content: 'content of TabA' },
    { id: 'tab2', label: 'TabB', content: 'content of TabB' },
    { id: 'tab3', label: 'TabC', content: 'content of TabC' },
    { id: 'tab4', label: 'TabD', content: 'content of TabD' },
  ];

  return (
    <>
      <TabGroup
        orientation="horizontal"
        spaced={true}
        ariaLabel="horizontal tab group"
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
      {tabs.map((tab) => (activeTab === tab.id && 
        <div
          key={tab.id}
          style={{border: '1px solid blue', margin:'8px', width:'200px'}}
        >
          {tab.content}
        </div>
      ))}
    </>
  )
};

const VerticalTabGroup = Template<TabGroupProps>(TabGroup).bind({});

VerticalTabGroup.args = {
  children: [...commonChildren],
  orientation: 'vertical',
  spaced: true,
};

VerticalTabGroup.argTypes = { ...argTypes };

export { Example, HorizontalTabGroup, VerticalTabGroup };
