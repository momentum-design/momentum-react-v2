import React from 'react';
import { Item } from '@react-stately/collections';

/**
 * Check the type definition of '@react-types/shared' ItemProps has been updated to include closeOnSelect
 * If the definition is not updated, this test suite will not compile and Typescript will complain.
 */
it('has updated the react-aria <Item /> type definition', () => {
  <Item closeOnSelect={true}>Test</Item>;

  expect(true).toBe(true);
});
