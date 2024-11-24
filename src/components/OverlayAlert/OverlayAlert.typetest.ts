import { Expect, ExpectExtends, ExpectFalse } from '../../utils/typetest.util';
import { Props } from './OverlayAlert.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  Expect<ExpectExtends<Props, { title: 'x'; onClose: () => void }>>,
  Expect<ExpectExtends<Props, { 'aria-label': 'label'; onClose: () => void }>>,
  Expect<ExpectExtends<Props, { title: 'x'; 'aria-label': 'label'; onClose: () => void }>>,
  ExpectFalse<ExpectExtends<Props, { noTitleOrLabel: 'x'; onClose: () => void }>>
];
