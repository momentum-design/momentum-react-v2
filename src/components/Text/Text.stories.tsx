import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Text, { TextProps } from './';
import argTypes from './Text.stories.args';
import Documentation from './Text.stories.docs.mdx';
import { TYPES } from './Text.constants';

export default {
  title: 'Momentum UI/Text',
  component: Text,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
  args: {
    children: 'Example Text',
  },
};

const Example = Template<TextProps>(Text).bind({});
Example.argTypes = { ...argTypes };

const Types = MultiTemplate<TextProps>(Text).bind({});

Types.argTypes = { ...argTypes };
delete Types.argTypes.type;

Types.parameters = {
  variants: [
    ...Object.values(TYPES).map((type) => {
      return {
        type,
      };
    }),
  ],
};

export { Example, Types };
