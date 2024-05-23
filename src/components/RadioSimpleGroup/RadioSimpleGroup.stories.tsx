import React from 'react';
import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import RadioSimpleGroup, { RadioSimpleGroupProps } from '.';
import RadioSimple from '../RadioSimple';
import argTypes from './RadioSimpleGroup.stories.args';
import Documentation from './RadioSimpleGroup.stories.docs.mdx';
import { action } from '@storybook/addon-actions';
import ButtonSimple from '../ButtonSimple';

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

const Vertical = Template<RadioSimpleGroupProps>(RadioSimpleGroup).bind({});

Vertical.argTypes = { ...argTypes };

Vertical.args = {
  children: (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem', gap: '1rem' }}>
      <RadioSimple value="red">
        <ButtonSimple>Red</ButtonSimple>
      </RadioSimple>
      <RadioSimple value="blue">
        <ButtonSimple>Blue</ButtonSimple>
      </RadioSimple>
    </div>
  ),
  label: <div>Select your favorite color</div>,
  description: 'Only choose one',
};

const Horizontal = Template<RadioSimpleGroupProps>(RadioSimpleGroup).bind({});

Horizontal.argTypes = { ...argTypes };

Horizontal.args = {
  children: (
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem', gap: '1rem' }}>
      <RadioSimple value="theme-1">
        <ButtonSimple>Red</ButtonSimple>
      </RadioSimple>
      <RadioSimple value="theme-2">
        <ButtonSimple>Blue</ButtonSimple>
      </RadioSimple>
    </div>
  ),
  label: <div>Select your favorite color</div>,
  description: 'Only choose one',
};
export { Vertical, Horizontal };
