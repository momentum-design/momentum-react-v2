import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { RadioSimpleProps } from './RadioSimple.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<RadioSimpleProps, { 'aria-label': 'Some label'; value: 'A' }>>,
  Expect<ExpectExtends<RadioSimpleProps, { 'aria-labelledby': 'some-id'; value: 'A' }>>,

  ExpectFalse<ExpectExtends<RadioSimpleProps, { 'aria-label': 'Some label' }>>,
  ExpectFalse<ExpectExtends<RadioSimpleProps, { 'aria-labelledby': 'some-id' }>>,
  ExpectFalse<ExpectExtends<RadioSimpleProps, { value: 'A' }>>,

  ExpectFalse<ExpectExtends<RadioSimpleProps, Record<string, never>>>
];
