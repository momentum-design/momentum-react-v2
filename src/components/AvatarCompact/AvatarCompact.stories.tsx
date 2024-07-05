import AvatarCompact, { AvatarCompactProps } from './';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';
import AriaButtonDocs from '../../storybook/docs.stories.aria-button.mdx';
import HTMLGlobalAttributes from '../../storybook/docs.stories.common-html-attributes.mdx';
import Documentation from './AvatarCompact.documentation.mdx';

export default {
  title: 'Momentum UI/AvatarCompact',
  component: AvatarCompact,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs, HTMLGlobalAttributes, AriaButtonDocs),
    },
  },
  argTypes: {
    className: {
      defaultValue: undefined,
      description:
        'If present, the class name will be added to the underlying component. Used to override styles by consumers.',
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
    count: {
      defaultValue: undefined,
      description: 'Number of people for this compact avatar.',
      control: { type: 'number' },
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: undefined,
        },
      },
    },
  },
};

const Example = Template<AvatarCompactProps>(AvatarCompact);

Example.args = {
  count: 200,
};

const Common = MultiTemplate<AvatarCompactProps>(AvatarCompact);

Common.parameters = {
  variants: [
    { count: 20 },
    { count: 1 },
    { count: 10000 },
    { count: 1001 },
    { count: 100000 },
    { count: 125343 },
    { count: 15343 },
  ],
};

export { Example, Common };
