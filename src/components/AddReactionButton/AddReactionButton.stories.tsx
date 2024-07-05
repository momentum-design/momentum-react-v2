import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import AddReactionButton, { AddReactionButtonProps } from './';
import argTypes from './AddReactionButton.stories.args';
import Documentation from './AddReactionButton.stories.docs.mdx';

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

const Example = Template<AddReactionButtonProps>(AddReactionButton);

Example.argTypes = { ...argTypes };

Example.args = {};

const Common = MultiTemplate<AddReactionButtonProps>(AddReactionButton);

Common.argTypes = { ...argTypes };
delete Common.argTypes.children;

Common.args = {};

Common.parameters = {
  variants: [{}, { disabled: true }, {}],
};

export { Example, Common };
