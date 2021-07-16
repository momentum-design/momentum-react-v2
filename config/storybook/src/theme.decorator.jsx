import React from 'react';

import { ThemeProvider } from '../../../src/index';

const theme = (Story, { globals }) => (
  <ThemeProvider theme={globals.theme}>
    <div
      style={{
        backgroundColor: 'var(--theme-background-solid-primary-normal)',
        padding: '2rem',
      }}
    >
      <Story />
    </div>
  </ThemeProvider>
);

export default theme;
