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
    style: { display: 'block', margin: '0.5rem 0' },
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
        children: type,
      };
    }),
  ],
};

const Fonts = MultiTemplate<TextProps>(Text).bind({});

Fonts.argTypes = { ...argTypes };
delete Types.argTypes.type;

Fonts.parameters = {
  variants: [
    ...Object.values([
      { weight: 100, style: 'normal', name: 'Thin' },
      { weight: 100, style: 'italic', name: 'Thin' },
      { weight: 200, style: 'normal', name: 'ExtraLight' },
      { weight: 200, style: 'italic', name: 'ExtraLight' },
      { weight: 300, style: 'normal', name: 'Light' },
      { weight: 300, style: 'italic', name: 'Light' },
      { weight: 'normal', style: 'normal', name: 'Regular' },
      { weight: 'normal', style: 'italic', name: 'Regular' },
      { weight: 500, style: 'normal', name: 'Medium' },
      { weight: 500, style: 'italic', name: 'Medium' },
      { weight: 'bold', style: 'normal', name: 'Bold' },
      { weight: 'bold', style: 'italic', name: 'Bold' },
      { weight: 800, style: 'normal', name: 'Heavy' },
      { weight: 800, style: 'italic', name: 'Heavy' },
    ]).map(({ weight, style, name }, index) => {
      return {
        style: { fontWeight: weight, fontStyle: style, marginTop: index % 2 == 0 ? '1rem' : 0 },
        children: `CiscoSans ${name} - ${style}`,
      };
    }),
  ],
};

export { Example, Types, Fonts };
