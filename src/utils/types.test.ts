import { ReactNode } from 'react';
import { RequireOneOf } from './types';
import { Equal, Expect } from './types.test.util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  // If no attributes are defined, type should be never
  Expect<Equal<RequireOneOf<{ one: number }, []>, never>>,

  // Gets the type of the attribute from the first type parameter
  Expect<Equal<RequireOneOf<{ one: number }, ['one']>, { one: number }>>,

  // Gets the type and makes the attribute required by removing the ? and removing undefined from the type
  Expect<Equal<RequireOneOf<{ one?: number }, ['one']>, { one: number }>>,
  Expect<Equal<RequireOneOf<{ one: number | undefined }, ['one']>, { one: number }>>,

  // Works with non primitive types and doesn't output any attributes defined in the first parameter
  // but not defined in the second
  Expect<
    Equal<
      RequireOneOf<
        { a?: string | number; b: ReactNode; c: string; d?: JSX.Element },
        ['a', 'b', 'c']
      >,
      { a: string | number } | { b: ReactNode } | { c: string }
    >
  >,

  // If a union type is defined in the attributes, the option requires both values in the object
  // to satify this type
  Expect<
    Equal<
      RequireOneOf<{ a: number; b: number; c: number }, ['a' | 'b', 'c']>,
      { a: number; b: number } | { c: number }
    >
  >
];

// This is required otherwise the test suite will fail due to no tests being defined.
it('works', () => {
  expect(true).toBe(true);
});
