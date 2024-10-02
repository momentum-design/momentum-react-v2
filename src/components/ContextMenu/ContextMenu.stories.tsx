import { DocumentationPage } from '../../storybook/helper.stories.docs';
import StyleDocs from '../../storybook/docs.stories.style.mdx';

import ContextMenu from './';
import argTypes from './ContextMenu.stories.args';
import Documentation from './ContextMenu.stories.docs.mdx';
import React, { useRef } from 'react';

export default {
  title: 'Momentum UI/ContextMenu',
  component: ContextMenu,
  parameters: {
    expanded: true,
    docs: {
      page: DocumentationPage(Documentation, StyleDocs),
    },
  },
};

const Template = (args) => {
  const triggerRef = useRef(null); // Create a ref for the trigger component

  return (
    <div>
      <button ref={triggerRef}>Right click on me</button>
      <ContextMenu triggerRef={triggerRef} {...args} />
    </div>
  );
};

const Example = Template.bind({});

Example.argTypes = { ...argTypes };

Example.args = {
  contextMenuActions: [
    // eslint-disable-next-line no-console
    { text: 'Action 1', action: () => console.log('Action 1') },
    // eslint-disable-next-line no-console
    { text: 'Action 2', action: () => console.log('Action 2') },
  ],
};

export { Example };
