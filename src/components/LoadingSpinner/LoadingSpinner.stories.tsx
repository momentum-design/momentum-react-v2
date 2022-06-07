import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { MultiTemplate, Template } from 'storybook/helper.stories.templates';

import { SIZES } from 'components/Icon/Icon.constants';

import argTypes from './LoadingSpinner.stories.args';
import Documentation from './LoadingSpinner.stories.docs.mdx';

import LoadingSpinner, { LoadingSpinnerProps } from './';

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
  variants: [...Object.values(SIZES).map((scale) => ({ scale }))],
};

export { Example, Common };
