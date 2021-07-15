import React from 'react';

import { ThemeProvider } from '../../../src/index';

const theme = (Story, { globals }) => (
  <ThemeProvider theme={globals.theme}>
    <div
      style={{
        backgroundColor: 'var(--theme-background-solid-normal, rgba(255, 255, 255, 1))',
        padding: '2rem',
      }}
    >
      <Story />
    </div>
  </ThemeProvider>
);

export default theme;
