import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { Props } from './ReactionPicker.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<Props, { ariaToolbarItemsSize: 1; 'aria-label': 'Some label' }>>,
  Expect<ExpectExtends<Props, { ariaToolbarItemsSize: 1; 'aria-labelledby': 'some-id' }>>,
  Expect<
    ExpectExtends<
      Props,
      { ariaToolbarItemsSize: 1; 'aria-label': 'Some label'; 'aria-labelledby': 'some-id' }
    >
  >,

  ExpectFalse<ExpectExtends<Props, { 'aria-label': 'Some label' }>>,
  ExpectFalse<ExpectExtends<Props, { 'aria-labelledby': 'some-id' }>>,
  ExpectFalse<ExpectExtends<Props, { 'aria-label': 'Some label'; 'aria-labelledby': 'some-id' }>>,

  ExpectFalse<ExpectExtends<Props, { ariaToolbarItemsSize: 1 }>>,

  ExpectFalse<ExpectExtends<Props, Record<string, never>>>
];
