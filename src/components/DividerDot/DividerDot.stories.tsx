import React from 'react';

import StyleDocs from 'storybook/docs.stories.style.mdx';
import { DocumentationPage } from 'storybook/helper.stories.docs';
import { Template } from 'storybook/helper.stories.templates';

import Text from 'components/Text';

import argTypes from './DividerDot.stories.args';
import Documentation from './DividerDot.stories.docs.mdx';

import DividerDot, { DividerDotProps } from './';

export default {
  title: 'Momentum UI/DividerDot',
  component: DividerDot,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Example = Template<DividerDotProps>(DividerDot).bind({});

Example.argTypes = { ...argTypes };

const WrappedDividerDot = () => {
  return (
    <>
      <Text type="body-secondary" style={{ display: 'inline' }}>
        first part of text
      </Text>
      <DividerDot />
      <Text type="body-secondary">second part of text</Text>
    </>
  );
};
const Common = WrappedDividerDot.bind({});

Common.parameters = {
  variants: [{ id: 'divider-dot-1' }],
};

export { Example, Common };
