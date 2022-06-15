import React, { FC, useCallback, useState } from 'react';
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

const InteractiveExample: FC<ToggleProps> = (props: ToggleProps) => {
  const [isSelected, setIsSelected] = useState(props.isSelected);
  const onChangeHandler = useCallback(
    (value) => {
      props.onChange(value);
      setIsSelected(value);
    },
    [props.onChange, setIsSelected]
  );
  return <Toggle {...props} isSelected={isSelected} onChange={onChangeHandler} />;
};

// NOTE: Primary story. This renders a single component with all external props.
const Example = Template<ToggleProps>(InteractiveExample).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  isSelected: TOGGLE_CONSTANTS.DEFAULTS.IS_SELECTED,
  isDisabled: TOGGLE_CONSTANTS.DEFAULTS.IS_DISABLED,
  label: 'Example text',
};

// NOTE: Common variants story. This renders multiple variants of a single component.
const Common = MultiTemplate<ToggleProps>(Toggle).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.isSelected;
delete Common.argTypes.isDisabled;
delete Common.argTypes.label;
delete Common.argTypes.onChange;

Common.args = {};
Common.parameters = {
  variants: [
    { isSelected: true, isDisabled: false, label: 'Selected' },
    { isSelected: true, isDisabled: true, label: 'Selected + Disabled' },
    { isSelected: false, isDisabled: false, label: 'Not selected' },
    { isSelected: false, isDisabled: true, label: 'Not selected + Disabled' },
  ],
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Example, Common };
