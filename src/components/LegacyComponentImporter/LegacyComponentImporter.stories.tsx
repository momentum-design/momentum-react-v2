/* eslint-disable storybook/default-exports */
import './LegacyComponentImporter';

// This component only exists here to import the old momentum-ui style sheet for the story books
import { Template } from '../../storybook/helper.stories.templates';
import React from 'react';

export default {
  title: 'Momentum UI/LegacyComponentImporter',
  component: ({ children }) => <div>{children}</div>,
  parameters: {
    expanded: true,
  },
};

const Example = Template<unknown>(() => {
  return <p>This is an empty component</p>;
});

export { Example };
