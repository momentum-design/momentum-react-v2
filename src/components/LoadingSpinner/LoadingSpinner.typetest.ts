import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { Props } from './LoadingSpinner.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<Props, { 'aria-label': 'Loading' }>>,
  Expect<ExpectExtends<Props, { 'aria-hidden': false; 'aria-label': 'Loading' }>>,
  Expect<ExpectExtends<Props, { 'aria-labelledby': 'some-id' }>>,
  Expect<ExpectExtends<Props, { 'aria-hidden': false; 'aria-labelledby': 'some-id' }>>,
  Expect<ExpectExtends<Props, { 'aria-hidden': true }>>,
  ExpectFalse<ExpectExtends<Props, { 'aria-hidden': false }>>
];
