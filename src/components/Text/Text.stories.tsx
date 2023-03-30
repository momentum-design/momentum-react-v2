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
      { weight: 200, style: 'normal', name: 'Thin' },
      { weight: 200, style: 'italic', name: 'Thin' },
      { weight: 250, style: 'normal', name: 'Extra Light' },
      { weight: 250, style: 'italic', name: 'Extra Light' },
      { weight: 350, style: 'normal', name: 'Light' },
      { weight: 350, style: 'italic', name: 'Light' },
      { weight: 450, style: 'normal', name: 'Regular' },
      { weight: 450, style: 'italic', name: 'Regular' },
      { weight: 550, style: 'normal', name: 'Medium' },
      { weight: 550, style: 'italic', name: 'Medium' },
      { weight: 750, style: 'normal', name: 'Bold' },
      { weight: 750, style: 'italic', name: 'Bold' },
      { weight: 850, style: 'normal', name: 'Heavy' },
      { weight: 850, style: 'italic', name: 'Heavy' },
    ]).map(({ weight, style }, index) => {
      return {
        style: {
          fontWeight: weight,
          fontStyle: style,
          marginTop: index % 2 == 0 ? '1rem' : 0,
        },
        children: `Inter ${weight} - ${style}`,
      };
    }),
  ],
};

const FontsLegacy = MultiTemplate<TextProps>(Text).bind({});

FontsLegacy.argTypes = { ...argTypes };
delete FontsLegacy.argTypes.type;

FontsLegacy.parameters = {
  variants: [
    ...Object.values([
      { weight: 200, style: 'normal', name: 'Thin' },
      { weight: 200, style: 'italic', name: 'Thin' },
      { weight: 250, style: 'normal', name: 'Extra Light' },
      { weight: 250, style: 'italic', name: 'Extra Light' },
      { weight: 350, style: 'normal', name: 'Light' },
      { weight: 350, style: 'italic', name: 'Light' },
      { weight: 450, style: 'normal', name: 'Regular' },
      { weight: 450, style: 'italic', name: 'Regular' },
      { weight: 550, style: 'normal', name: 'Medium' },
      { weight: 550, style: 'italic', name: 'Medium' },
      { weight: 750, style: 'normal', name: 'Bold' },
      { weight: 750, style: 'italic', name: 'Bold' },
      { weight: 850, style: 'normal', name: 'Heavy' },
      { weight: 850, style: 'italic', name: 'Heavy' },
    ]).map(({ style, name }, index) => {
      return {
        style: {
          fontFamily: `Inter ${name}`,
          // fontWeight: weight,
          fontStyle: style,
          marginTop: index % 2 == 0 ? '1rem' : 0,
        },
        children: `Inter ${name} - ${style}`,
      };
    }),
  ],
};

export { Example, Types, Fonts, FontsLegacy };
