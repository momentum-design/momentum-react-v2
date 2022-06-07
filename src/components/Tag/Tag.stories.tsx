import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import argTypes from './Tag.stories.args';
import Documentation from './Tag.stories.docs.mdx';

import Tag, { TagProps, TAG_CONSTANTS as CONSTANTS } from './';

export default {
  title: 'Momentum UI/Tag',
  component: Tag,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<TagProps>(Tag).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Example',
};

const Colors = MultiTemplate<TagProps>(Tag).bind({});

Colors.argTypes = { ...argTypes };
delete Colors.argTypes.children;
delete Colors.argTypes.color;

Colors.parameters = {
  variants: Object.values(CONSTANTS.COLORS).map((value) => ({
    children: value,
    color: value,
  })),
};

const Formats = MultiTemplate<TagProps>(Tag).bind({});

Formats.argTypes = { ...argTypes };
delete Formats.argTypes.children;
delete Formats.argTypes.format;

Formats.parameters = {
  variants: Object.values(CONSTANTS.FORMATS).map((value) => ({
    children: value,
    format: value,
  })),
};

export { Example, Colors, Formats };
