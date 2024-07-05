import React from 'react';

import { MultiTemplate, Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';

import FocusRing, { FocusRingProps } from './';
import argTypes from './FocusRing.stories.args';
import Documentation from './FocusRing.stories.docs.mdx';

export default {
  title: 'Momentum UI/FocusRing',
  component: FocusRing,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation),
    },
  },
};

const Example = Template<FocusRingProps>(FocusRing);

Example.argTypes = { ...argTypes };

Example.args = {
  children: <button>Simple Button</button>,
};

const Common = MultiTemplate<FocusRingProps>(FocusRing);

Common.argTypes = { ...argTypes };

Common.parameters = {
  variants: [
    { children: <button>Hello World A</button> },
    { children: <button>Hello World B</button> },
    { children: <button>Hello World C</button> },
  ],
};

export { Example, Common };
