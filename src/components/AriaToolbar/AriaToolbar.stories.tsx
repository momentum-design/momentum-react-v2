import React from 'react';
import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import AriaToolbar from './';
import Documentation from './AriaToolbar.stories.docs.mdx';
import ButtonCircle from '../ButtonCircle';
import ButtonPill from '../ButtonPill';

export default {
  title: 'Momentum UI/AriaToolbar',
  component: AriaToolbar,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Horizontal = () => {
  return (
    <AriaToolbar style={{ display: 'flex', columnGap: '0.5rem' }}>
      <ButtonPill>Item 1</ButtonPill>
      <ButtonCircle>2</ButtonCircle>
      <ButtonCircle>3</ButtonCircle>
    </AriaToolbar>
  );
};

const Vertical = () => {
  return (
    <AriaToolbar
      orientation="vertical"
      style={{ display: 'flex', rowGap: '0.5rem', flexDirection: 'column' }}
    >
      <ButtonCircle>1</ButtonCircle>
      <ButtonCircle>2</ButtonCircle>
      <ButtonCircle>3</ButtonCircle>
    </AriaToolbar>
  );
};

// NOTE: Export stories here. The first export should be `Example`, and the last export should be `Common`.
export { Horizontal, Vertical };
