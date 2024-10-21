/* eslint-disable no-console */

import { Meta } from '@storybook/react';
import React from 'react';
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

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<TabListProps>(TabList).bind({});

Example.argTypes = { ...argTypes };

// TODO: Provide default arguments for this story here. These populate into the argument table for this component.
Example.args = {
  onTabSelection: console.log,
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
      onTabSelection: console.log,
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
      onTabSelection: console.log,
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

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Common };
