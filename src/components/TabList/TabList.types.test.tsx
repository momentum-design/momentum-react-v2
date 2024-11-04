/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import TabList from '.';

/**
 * Check that a label is required for <TabList />
 * If the negative case fails, typescript will complain and the test describe will fail
 */
it('errors when no label is defined', () => {
  // @ts-expect-error
  <TabList />;

  expect(true).toBe(true);
});

it('is valid with aria-label', () => {
  <TabList aria-label="test" />;

  expect(true).toBe(true);
});

it('is valid with aria-labelledby', () => {
  <TabList aria-labelledby="test" />;

  expect(true).toBe(true);
});

it('is valid with title', () => {
  <TabList title="test" />;

  expect(true).toBe(true);
});
