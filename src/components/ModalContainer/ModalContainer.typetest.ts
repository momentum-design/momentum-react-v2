import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { Props } from './ModalContainer.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<Props, { 'aria-label': 'abc' }>>,
  Expect<ExpectExtends<Props, { 'aria-labelledby': 'some-id' }>>,
  Expect<ExpectExtends<Props, { 'aria-label': 'abc'; 'aria-labelledby': 'some-id' }>>,
  ExpectFalse<ExpectExtends<Props, Record<string, never>>>
];
