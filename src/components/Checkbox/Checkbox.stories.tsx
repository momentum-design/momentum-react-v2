import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Checkbox, { CheckboxProps } from './';
import argTypes from './Checkbox.stories.args';
import Documentation from './Checkbox.stories.docs.mdx';
import { DEFAULTS } from './Checkbox.constants';

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
Example.args = {
  isSelected: DEFAULTS.IS_SELECTED,
  disabled: DEFAULTS.DISABLED,
  isIndeterminate: DEFAULTS.IS_INDETERMINATE,
  label: 'Example text',
};

const States = MultiTemplate<CheckboxProps>(Checkbox).bind({});

States.argTypes = { ...argTypes };
delete States.argTypes.isSelected;
delete States.argTypes.disabled;
delete States.argTypes.isIndeterminate;

States.parameters = {
  variants: [
    { isSelected: true, disabled: false, isIndeterminate: false, label: 'Selected' },
    { isSelected: true, disabled: true, isIndeterminate: false, label: 'Selected + Disabled' },
    {
      isSelected: true,
      disabled: false,
      isIndeterminate: true,
      label: 'Selected + Not disabled + Indeterminate',
    },
    {
      isSelected: true,
      disabled: true,
      isIndeterminate: true,
      label: 'Selected + Disabled + Indeterminate',
    },
    { isSelected: false, disabled: false, isIndeterminate: false, label: 'Not selected' },
    { isSelected: false, disabled: true, isIndeterminate: false, label: 'Not selected + Disabled' },
    {
      isSelected: false,
      disabled: false,
      isIndeterminate: true,
      label: 'Not selected + Not disabled + Indeterminate',
    },
    {
      isSelected: false,
      disabled: true,
      isIndeterminate: true,
      label: 'Not selected + Disabled + Indeterminate',
    },
  ],
};

export { Example, States };
