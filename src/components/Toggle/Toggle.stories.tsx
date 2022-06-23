import { MultiTemplateWithPseudoStates, Template } from '../../storybook/helper.stories.templates';
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

const Example = Template<ToggleProps>(Toggle).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  defaultSelected: TOGGLE_CONSTANTS.DEFAULTS.DEFAULT_SELECTION,
  isDisabled: TOGGLE_CONSTANTS.DEFAULTS.IS_DISABLED,
  label: 'Example text',
};

const componentStateToProps = (state) => {
  switch (state) {
    case 'hover':
      return { className: 'hover' };
    case 'active':
      return { className: 'active' };
    case 'focus':
      return { className: 'focused' };
    case 'disable':
      return { isDisabled: true };
    default:
      return undefined;
  }
};

const States = MultiTemplateWithPseudoStates<ToggleProps>(Toggle, componentStateToProps).bind({});

States.argTypes = { ...argTypes };
delete States.argTypes.defaultSelected;
delete States.argTypes.isDisabled;
delete States.argTypes.label;
delete States.argTypes.onChange;

States.args = {};

States.parameters = {
  variants: [
    { isSelected: false, label: 'Off' },
    { isSelected: true, label: 'On' },
  ],
};

export { Example, States };
