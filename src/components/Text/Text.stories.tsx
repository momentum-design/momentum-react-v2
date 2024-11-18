import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Text, { TextProps } from './';
import argTypes from './Text.stories.args';
import Documentation from './Text.stories.docs.mdx';
import { TYPES } from './Text.constants';
import './Text.stories.css';
import { TYPE as FONT_TYPE } from '@momentum-design/components/dist/components/text/text.constants.js';

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

const NewMomentumDesignTypes = MultiTemplate<TextProps>(Text).bind({});

NewMomentumDesignTypes.argTypes = { ...argTypes };
delete NewMomentumDesignTypes.argTypes.type;

NewMomentumDesignTypes.parameters = {
  variants: [
    ...Object.values(FONT_TYPE).map((type) => {
      return {
        type,
        children: type,
      };
    }),
  ],
};

const TypesWithTagNameSmall = MultiTemplate<TextProps>(Text).bind({});

TypesWithTagNameSmall.argTypes = { ...argTypes };
delete TypesWithTagNameSmall.argTypes.type;
TypesWithTagNameSmall.argTypes.tagName = {
  ...argTypes.tagName,
  control: false,
};

TypesWithTagNameSmall.parameters = {
  variants: [
    ...Object.values(TYPES).map((type) => {
      return {
        type,
        children: type,
        tagName: 'small',
      };
    }),
  ],
};


export { Example, Types, NewMomentumDesignTypes, TypesWithTagNameSmall };
