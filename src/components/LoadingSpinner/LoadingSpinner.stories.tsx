import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import LoadingSpinner, { LoadingSpinnerProps } from './';
import argTypes from './LoadingSpinner.stories.args';
import Documentation from './LoadingSpinner.stories.docs.mdx';
import { SCALES, SIZES } from './LoadingSpinner.constants';

export default {
  title: 'Momentum UI/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<LoadingSpinnerProps>(LoadingSpinner).bind({});

Example.argTypes = { ...argTypes };

const Common = MultiTemplate<LoadingSpinnerProps>(LoadingSpinner).bind({});

Common.argTypes = { ...argTypes };
delete Common.argTypes.scale;

Common.parameters = {
  variants: [
    ...Object.values(SIZES).map((size) => ({ size })),
    ...Object.values(SCALES).map((scale) => ({ scale })),
  ],
};

export { Example, Common };
