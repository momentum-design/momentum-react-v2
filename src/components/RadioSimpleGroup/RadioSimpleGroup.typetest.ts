import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { RadioSimpleGroupProps } from './RadioSimpleGroup.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<RadioSimpleGroupProps, { label: 'Some label'; children: 'Some children' }>>,
  Expect<
    ExpectExtends<RadioSimpleGroupProps, { 'aria-label': 'Some label'; children: 'Some children' }>
  >,
  Expect<
    ExpectExtends<
      RadioSimpleGroupProps,
      { 'aria-labelledby': 'some-id'; children: 'Some children' }
    >
  >,

  ExpectFalse<ExpectExtends<RadioSimpleGroupProps, { label: 'Some label' }>>,
  ExpectFalse<ExpectExtends<RadioSimpleGroupProps, { 'aria-label': 'Some label' }>>,
  ExpectFalse<ExpectExtends<RadioSimpleGroupProps, { 'aria-labelledby': 'some-id' }>>,
  ExpectFalse<ExpectExtends<RadioSimpleGroupProps, { children: 'Some children' }>>,

  ExpectFalse<ExpectExtends<RadioSimpleGroupProps, Record<string, never>>>
];
