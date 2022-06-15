import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Toggle, { ToggleProps, TOGGLE_CONSTANTS } from './';
import Documentation from './Toggle.stories.docs.mdx';
import argTypes from './Toggle.stories.args';

export default {
  title: 'Momentum UI/Toggle',
  component: Toggle,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<ToggleProps>(Toggle).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  defaultSelected: TOGGLE_CONSTANTS.DEFAULTS.IS_SELECTED,
  isDisabled: TOGGLE_CONSTANTS.DEFAULTS.IS_DISABLED,
  label: 'Example text',
};

// NOTE: Common variants story. This renders multiple variants of a single component.
const Common = MultiTemplate<ToggleProps>(Toggle).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.defaultSelected;
delete Common.argTypes.isDisabled;
delete Common.argTypes.label;
delete Common.argTypes.onChange;

Common.args = {};
Common.parameters = {
  variants: [
    { defaultSelected: true, isDisabled: false, label: 'Selected' },
    { defaultSelected: true, isDisabled: true, label: 'Selected + Disabled' },
    { defaultSelected: false, isDisabled: false, label: 'Not selected' },
    { defaultSelected: false, isDisabled: true, label: 'Not selected + Disabled' },
  ],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Common };
