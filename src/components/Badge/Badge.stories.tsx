import Badge, { BadgeProps, BADGE_CONSTANTS as CONSTANTS } from './';
import Documentation from './Badge.documentation.mdx';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { ArgTypes } from '@storybook/react';

export default {
  title: 'Momentum UI/Badge',
  component: Badge,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation),
    },
  },
};

const argTypes: ArgTypes = {
  children: {
    description: 'Provides the child text for this element.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  size: {
    description: 'Modifies the size of this element.',
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE.toString(),
      },
    },
  },
};

const Example = Template<BadgeProps>(Badge);
Example.argTypes = { ...argTypes };

const Sizes = MultiTemplate<BadgeProps>(Badge);
Sizes.parameters = {
  variants: [{}, { size: 18 }, { size: 12 }],
};

Sizes.argTypes = { ...argTypes };
delete Sizes.argTypes.size;

export { Example, Sizes };
