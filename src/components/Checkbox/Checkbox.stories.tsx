import { Template, MultiTemplateWithPseudoStates } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Checkbox, { CheckboxProps } from './';
import argTypes from './Checkbox.stories.args';
import Documentation from './Checkbox.stories.docs.mdx';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Momentum UI/Checkbox',
  component: Checkbox,
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

const Example = Template<CheckboxProps>(Checkbox).bind({});

Example.argTypes = { ...argTypes };

const States = MultiTemplateWithPseudoStates(Checkbox).bind({});

States.argTypes = { ...argTypes };
delete States.argTypes.isSelected;
delete States.argTypes.isDisabled;
delete States.argTypes.isIndeterminate;

States.parameters = {
  variants: [
    {
      label: 'Checked',
      isSelected: true,
    },
    {
      label: 'Unchecked',
      isSelected: false,
    },
    {
      label: 'Indeterminate',
      isIndeterminate: true,
    },
  ],
};

export { Example, States };
