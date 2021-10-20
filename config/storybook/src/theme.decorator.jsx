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
    <ThemeProvider id="theme-provider" theme={theme}>
      <div
        style={{
          ...displayProperties,
          backgroundColor: 'var(--theme-background-solid-primary-normal)',
          color: 'var(--theme-text-primary-normal)',
          padding: '2rem',
        }}
      >
        <Story />
      </div>
    </ThemeProvider>
  );
};

export default theme;
