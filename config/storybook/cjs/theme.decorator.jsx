import React from 'react';

import { ThemeProvider } from '../../../dist/cjs/index';

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
        backgroundColor:
          'var(--md-color-theme-bg-mob-primary, var(--theme-background-solid-primary-normal))',
        color:
          'var(--md-color-theme-content-text-neutral-primary, var(--theme-text-primary-normal))',
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
