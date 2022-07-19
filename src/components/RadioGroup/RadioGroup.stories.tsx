import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import React from 'react';

import RadioGroup, { Radio, RadioGroupProps } from './';
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
  options: [
    {
      children: 'Option 1',
      value: 'option1',
    },
    {
      children: 'Option 2',
      value: 'option2',
    },
    {
      children: 'Option 3',
      value: 'option3',
    },
  ],
  label: 'Example',
  defaultValue: 'option1',
  isReadOnly: false,
};

// TODO: Inject additional stories here.

// NOTE: Common variants story. This renders multiple variants of a single component.
const Common = MultiTemplate(RadioGroup).bind({});
// Psuedo states would be applied to group element
Common.argTypes = { ...argTypes };
delete Common.argTypes.isSelected;
delete Common.argTypes.isDisabled;

Common.parameters = {
  variants: [
    {
      children: (
        <>
          <Radio value="option1" className=".hover">
            Selected + Label
          </Radio>
        </>
      ),
      value: 'option1',
    },
    {
      children: (
        <>
          <Radio value="option1">Unselected + Label</Radio>
        </>
      ),
      value: 'option2',
    },
    {
      children: (
        <>
          <Radio value="option1" />
        </>
      ),
      value: 'option1',
    },
    {
      children: (
        <>
          <Radio value="option1" />
        </>
      ),
      value: 'option2',
    },
  ],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Common };
