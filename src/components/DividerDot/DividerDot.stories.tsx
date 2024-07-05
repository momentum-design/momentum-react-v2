import { Template } from '../../storybook/helper.stories.templates';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import DividerDot, { DividerDotProps } from './';
import argTypes from './DividerDot.stories.args';
import Documentation from './DividerDot.stories.docs.mdx';
import Text from '../Text';
import React from 'react';

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

const Example = Template<DividerDotProps>(DividerDot);

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
const Common = WrappedDividerDot;

Common.parameters = {
  variants: [{ id: 'divider-dot-1' }],
};

export { Example, Common };
