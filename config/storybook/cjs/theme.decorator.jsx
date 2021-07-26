import React from 'react';

import { ThemeProvider } from '../../../dist/cjs/index';

const theme = (Story, { globals }) => (
  <ThemeProvider theme={globals.theme}>
    <div
      style={{
        backgroundColor: 'var(--theme-background-solid-primary-normal)',
        display: 'flex',
        flexWrap: 'wrap',
        padding: '2rem',
      }}
    >
      <Story />
    </div>
  </ThemeProvider>
);

export default theme;
