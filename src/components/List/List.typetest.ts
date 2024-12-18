import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { Props } from './List.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<Props, { listSize: 1; 'aria-label': 'abc' }>>,
  Expect<ExpectExtends<Props, { listSize: 1; 'aria-labelledby': 'some-id' }>>,
  Expect<ExpectExtends<Props, { listSize: 1; 'aria-label': 'abc'; 'aria-labelledby': 'some-id' }>>,

  ExpectFalse<ExpectExtends<Props, { 'aria-label': 'abc' }>>,
  ExpectFalse<ExpectExtends<Props, { 'aria-labelledby': 'some-id' }>>,
  ExpectFalse<ExpectExtends<Props, { 'aria-label': 'abc'; 'aria-labelledby': 'some-id' }>>,

  ExpectFalse<ExpectExtends<Props, { listSize: 1 }>>,

  ExpectFalse<ExpectExtends<Props, Record<string, never>>>
];
