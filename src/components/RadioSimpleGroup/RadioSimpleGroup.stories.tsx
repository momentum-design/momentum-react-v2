import React from 'react';
import { Template , MultiTemplate } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import RadioSimpleGroup, { RadioSimpleGroupProps } from '.';
import argTypes from './RadioSimpleGroup.stories.args';
import Documentation from './RadioSimpleGroup.stories.docs.mdx';
import RadioSimple from '../RadioSimple';
import Text from '../Text';
import Icon from '../Icon';

export default {
  title: 'Momentum UI/RadioSimpleGroup',
  component: RadioSimpleGroup,
  subComponents: { RadioSimple },
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<RadioSimpleGroupProps>(RadioSimpleGroup).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <RadioSimple
        value="red"
        key="0"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid red',
          padding: '8px',
          margin: '8px 8px'
        }}
      >
        <Icon name="accessibility" autoScale/>
        <Text>Red</Text>
        <Text>My value is 'red'</Text>
      </RadioSimple>
      <RadioSimple
        value="blue"
        key="1"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid blue',
          padding: '8px',
          margin: '8px 8px'
        }}
      >
        <Icon name="search" autoScale/>
        <Text>Blue</Text>
        <Text>My value is 'blue'</Text>
      </RadioSimple>
      <RadioSimple
        value="yellow"
        key="2"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid yellow',
          padding: '8px',
          margin: '8px 8px'
        }}
      >
        <Icon name="search" autoScale/>
        <Text>Yellow</Text>
        <Text>My value is 'yellow'</Text>
      </RadioSimple>
    </div>
  ),
  label: <div style={{padding: '16px 0'}}>Select your favorite color</div>,
  description: 'Only choose one',
};

const Layout = MultiTemplate<RadioSimpleGroupProps>(RadioSimpleGroup).bind({});

Layout.argTypes = { ...argTypes };

Layout.argTypes = {};

Layout.parameters = {
  variants: [
    {
      children: (
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <RadioSimple
            value="grid"
            key="0"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid white',
              padding: '4px',
              margin: '4px 4px'
            }}
          >
            <Icon name="video-layout-equal" autoScale/>
            <Text>Grid</Text>
            <Text>My value is 'grid'</Text>
          </RadioSimple>
          <RadioSimple
            value="stack"
            key="1"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid white',
              padding: '4px',
              margin: '4px 4px'
            }}
          >
            <Icon name="video-layout-stack" autoScale/>
            <Text>Stack</Text>
            <Text>My value is 'stack'</Text>
          </RadioSimple>
          <RadioSimple
            value="sideBySide"
            key="2"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid white',
              padding: '4px',
              margin: '4px 4px'
            }}
          >
            <Icon name="layout-side-by-side-vertical" autoScale/>
            <Text>SideBySide</Text>
            <Text>My value is 'sideBySide'</Text>
          </RadioSimple>
        </div>
      ),
      label: <div style={{padding: '16px 0'}}>Layout</div>,
    },
  ],
};

export { Example, Layout };
