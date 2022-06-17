import { Template, MultiTemplate } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Checkbox, { CheckboxProps } from './';
import argTypes from './Checkbox.stories.args';
import Documentation from './Checkbox.stories.docs.mdx';

export default {
  title: 'Momentum UI/Checkbox',
  component: Checkbox,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<CheckboxProps>(Checkbox).bind({});

Example.argTypes = { ...argTypes };

const States = MultiTemplate<CheckboxProps>(Checkbox).bind({});

States.argTypes = { ...argTypes };
delete States.argTypes.isSelected;
delete States.argTypes.disabled;
delete States.argTypes.isIndeterminate;

States.parameters = {
  variants: [
    { isSelected: true, disabled: false, isIndeterminate: false, label: 'Selected normal' },
    {
      className: ':hover',
      isSelected: true,
      disabled: false,
      isIndeterminate: false,
      label: 'Selected hover',
    },
    { isSelected: false, disabled: false, isIndeterminate: false, label: 'Not selected' },
    { isSelected: true, disabled: false, isIndeterminate: true, label: 'Indeterminate' },
  ],
};

export { Example, States };
