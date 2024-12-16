import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { Props } from './Banner.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<Props, { title: 'x' }>>,
  Expect<ExpectExtends<Props, { 'aria-label': 'label' }>>,
  Expect<ExpectExtends<Props, { 'aria-labelledby': 'some-id' }>>,
  Expect<ExpectExtends<Props, { title: 'x'; 'aria-label': 'label' }>>,
  Expect<ExpectExtends<Props, { title: 'x'; 'aria-labelledby': 'some-id' }>>,
  ExpectFalse<ExpectExtends<Props, { noTitleOrLabel: 'x' }>>
];
