import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { Props } from './NavigationTab.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<Props, { 'aria-label': 'label' }>>,
  Expect<ExpectExtends<Props, { 'aria-labelledby': 'some-label' }>>,
  Expect<ExpectExtends<Props, { label: 'Some label' }>>,
  ExpectFalse<ExpectExtends<Props, Record<string, never>>>
];
