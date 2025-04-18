import React from 'react';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import AddReactionButton, { AddReactionButtonProps } from './';
import argTypes from './AddReactionButton.stories.args';
import Documentation from './AddReactionButton.stories.docs.mdx';
import TooltipPopoverCombo from '../TooltipPopoverCombo';

export default {
  title: 'Momentum UI/AddReactionButton',
  component: AddReactionButton,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<AddReactionButtonProps>(AddReactionButton).bind({});

Example.argTypes = { ...argTypes };

Example.args = {};

const WithTooltipPopoverCombo = Template<AddReactionButtonProps>((args: any) => {
  return (
    <TooltipPopoverCombo
      otherTooltipProps={{
        placement: 'bottom',
        strategy: 'fixed',
      }}
      popoverContent={
        <div>
          <p>Popover content</p>
          <button>Button inside</button>
        </div>
      }
      tooltipContent={<p>Tooltip</p>}
      triggerComponent={<AddReactionButton {...args} />}
    />
  );
}).bind({});

Example.argTypes = { ...argTypes };

Example.args = {};

const Common = MultiTemplate<AddReactionButtonProps>(AddReactionButton).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {};

Common.parameters = {
  variants: [{}, { disabled: true }, {}],
};

export { Example, WithTooltipPopoverCombo, Common };
