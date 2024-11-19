import { AriaLabelRequired } from './a11y';
import { Equal, Expect } from './typetest.util';

// NOTE: STATIC TYPE TESTS RUN ON LINT
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  // Check that the AriaLabelRequired type is correct
  Expect<Equal<AriaLabelRequired, { 'aria-label': string } | { 'aria-labelledby': string }>>
];
