import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import React from 'react';

import { Radio, RadioGroup, RadioGroupProps } from './';
import argTypes from './RadioGroup.stories.args';
import Documentation from './RadioGroup.stories.docs.mdx';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Momentum UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    onChange: action('onChange'),
  },
};

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<RadioGroupProps>(RadioGroup).bind({});

Example.argTypes = { ...argTypes };

// TODO: Provide default arguments for this story here. These populate into the argument table for this component.
Example.args = {
  children: (
    <>
      <Radio value="option1">Option 1</Radio>
      <Radio value="option2">Option 2</Radio>
      <Radio value="option3">Option 3</Radio>
    </>
  ),
  label: 'Example',
};

// TODO: Inject additional stories here.

// NOTE: Common variants story. This renders multiple variants of a single component.
const Common = MultiTemplate<RadioGroupProps>(RadioGroup).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

// TODO: Provide default arguments for this story here. These populate into the argument table for this component for all variants.
Common.args = {};

Common.parameters = {
  variants: [
    {
      children: (
        <>
          <Radio value="option1">Selected</Radio>
        </>
      ),
      value: 'option1',
    },
    {
      children: (
        <>
          <Radio value="option1">Unselected</Radio>
        </>
      ),
      value: 'option2',
    },
  ],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Common };
