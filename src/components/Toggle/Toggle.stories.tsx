import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Toggle, { ToggleProps, TOGGLE_CONSTANTS } from './';
import Documentation from './Toggle.stories.docs.mdx';
import argTypes from './Toggle.stories.args';
import React from 'react';

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

type ToggleWithLabelProps = ToggleProps & { label: string };
const ToggleWithLabel = ({ label, ...props }: ToggleWithLabelProps) => (
  <div>
    <label htmlFor={label} style={{ display: 'flex', alignItems: 'center' }}>
      <Toggle id={label} {...props} />
      {label}
    </label>
  </div>
);

const Example = Template<ToggleProps>(Toggle).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  defaultSelected: TOGGLE_CONSTANTS.DEFAULTS.DEFAULT_SELECTION,
  isDisabled: TOGGLE_CONSTANTS.DEFAULTS.IS_DISABLED,
};

const Common = MultiTemplate<ToggleWithLabelProps>(ToggleWithLabel).bind({});

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

export { Example, Common };
