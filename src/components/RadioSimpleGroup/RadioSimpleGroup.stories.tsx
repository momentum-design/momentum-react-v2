import React from 'react';
import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import RadioSimpleGroup, { RadioSimpleGroupProps } from '.';
import RadioSimple from '../RadioSimple';
import argTypes from './RadioSimpleGroup.stories.args';
import Documentation from './RadioSimpleGroup.stories.docs.mdx';
import { action } from '@storybook/addon-actions';
import Text from '../Text';
import Icon from '../Icon';

export default {
  title: 'Momentum UI/RadioSimpleGroup',
  component: RadioSimpleGroup,
  subcomponents: { RadioSimple },
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    setValue: action('setValue'),
  },
};

const Example = Template<RadioSimpleGroupProps>(RadioSimpleGroup).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: [
    <RadioSimple value="red" key="0" style={{ display: 'flex' }}>
      <Icon name="accessibility" autoScale />
      <Text>Red</Text>
    </RadioSimple>,
    <RadioSimple value="blue" key="0" style={{ display: 'flex' }}>
      <Icon name="search" autoScale />
      <Text>Blue</Text>
    </RadioSimple>,
    <RadioSimple value="yellow" key="0" style={{ display: 'flex' }}>
      <Icon name="accessories" autoScale />
      <Text>Yellow</Text>
    </RadioSimple>,
  ],
  label: <div>Select your favorite color</div>,
  description: 'Only choose one',
};

const Horizontal = Template<RadioSimpleGroupProps>(RadioSimpleGroup).bind({});

Horizontal.argTypes = { ...argTypes };

export { Example };
