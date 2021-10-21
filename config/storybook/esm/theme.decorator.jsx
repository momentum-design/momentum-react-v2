import React from 'react';

import { ThemeProvider } from '../../../dist/esm/index';

const theme = (Story, { globals }) => {
  const { display, theme } = globals;

  const displayProperties =
    display === 'Flex'
      ? {
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
        }
      : {};

  return (
    <ThemeProvider theme={theme}>
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
