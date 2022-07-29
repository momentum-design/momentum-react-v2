import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import RadioGroup, { RadioGroupProps } from './';
import Radio from './Radio';
import argTypes from './RadioGroup.stories.args';
import Documentation from './RadioGroup.stories.docs.mdx';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Momentum UI/RadioGroup',
  component: RadioGroup,
  subcomponents: { Radio },
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

const Example = Template<RadioGroupProps>(RadioGroup).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  options: [
    {
      label: 'Option 1',
      value: 'option1',
    },
    {
      label: 'Option 2',
      value: 'option2',
    },
    {
      label: 'Option 3',
      value: 'option3',
    },
  ],
  label: 'Example',
};

const Common = MultiTemplate(RadioGroup).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.isSelected;
delete Common.argTypes.isDisabled;

Common.parameters = {
  variants: [
    {
      options: [
        {
          value: 'option1',
          label: 'Selected + Label',
        },
      ],
      value: 'option1',
    },
    {
      options: [
        {
          value: 'option1',
          label: 'Selected + Label',
        },
      ],
      value: 'option2',
    },
    {
      options: [
        {
          value: 'option1',
        },
      ],
      value: 'option1',
    },
    {
      options: [
        {
          value: 'option1',
        },
      ],
      value: 'option2',
    },
    {
      options: [
        {
          value: 'option1',
          label: 'Selected + Label',
          isDisabled: true,
        },
      ],
      value: 'option1',
    },
    {
      options: [
        {
          value: 'option1',
          label: 'Selected + Label',
          isDisabled: true,
        },
      ],
      value: 'option2',
    },
  ],
};

export { Example, Common };
