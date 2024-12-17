import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { Props } from './ToastNotification.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<
    ExpectExtends<
      Props,
      { onClose: () => void; closeButtonLabel: 'Some label'; content: 'Some content' }
    >
  >,
  Expect<ExpectExtends<Props, { closeButtonLabel: 'Some label'; content: 'Some content' }>>,
  Expect<ExpectExtends<Props, { content: 'Some content' }>>,
  ExpectFalse<ExpectExtends<Props, { onClose: () => void; content: 'Some content' }>>
];
