import React from 'react';

import { ThemeProvider } from '../../../src/index';

const theme = (Story, { globals }) => {
  const { display, theme } = globals;

  const displayProperties =
    display === 'Flex'
      ? {
          alignItems: 'flex-start',
          display: 'flex',
          flexWrap: 'wrap',
        }
      : {};

  return (
    <ThemeProvider
      id="theme-provider"
      theme={theme}
      style={{
        backgroundColor: 'var(--theme-background-solid-primary-normal)',
        color: 'var(--theme-text-primary-normal)',
        height: '100vh',
        overflowY: 'scroll',
        padding: '2rem',
        ...displayProperties,
      }}
    >
      <Story />
    </ThemeProvider>
  );
};

export default theme;
