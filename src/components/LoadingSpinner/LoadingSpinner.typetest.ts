import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { Props } from './LoadingSpinner.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<Props, { 'aria-label': 'Loading' }>>,
  Expect<ExpectExtends<Props, { 'aria-label': 'Loading'; 'aria-hidden': false }>>,
  Expect<ExpectExtends<Props, { 'aria-label': 'Loading'; 'aria-hidden': undefined }>>,

  Expect<ExpectExtends<Props, { 'aria-labelledby': 'some-id' }>>,
  Expect<ExpectExtends<Props, { 'aria-labelledby': 'some-id'; 'aria-hidden': false }>>,
  Expect<ExpectExtends<Props, { 'aria-labelledby': 'some-id'; 'aria-hidden': undefined }>>,

  Expect<ExpectExtends<Props, { 'aria-hidden': true }>>,
  ExpectFalse<ExpectExtends<Props, { 'aria-hidden': false }>>,
  ExpectFalse<ExpectExtends<Props, Record<string, never>>>
];
