import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import Overlay, { OverlayProps } from './';
import argTypes from './Overlay.stories.args';
import Documentation from './Overlay.stories.docs.mdx';

export default {
  title: 'Momentum UI/Overlay',
  component: Overlay,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<OverlayProps>(Overlay).bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  children: 'Children',
  round: 50,
  isPadded: true,
};

const Common = MultiTemplate<OverlayProps>(Overlay).bind({});

Common.argTypes = { ...argTypes };

Common.args = {
  children: 'Children',
  round: 50,
  isPadded: true,
};

Common.parameters = {
  variants: [{}, { contain: true }],
};

export { Example, Common };
