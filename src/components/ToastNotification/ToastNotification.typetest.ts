import { ToastNotificationCloseButtonProps } from './ToastNotification.types';
import { ExpectExtends, Expect, ExpectFalse } from '../../utils/typetest.util';

// NOTE: STATIC TYPE TESTS RUN ON LINT
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  // if there is no onClose, closeButtonLabel is optional
  Expect<ExpectExtends<ToastNotificationCloseButtonProps, Record<string, never>>>,
  Expect<ExpectExtends<ToastNotificationCloseButtonProps, { onClose: undefined }>>,
  Expect<
    ExpectExtends<
      ToastNotificationCloseButtonProps,
      { onClose: undefined; closeButtonLabel: 'abc' }
    >
  >,

  // if there is onClose, closeButtonLabel is required
  ExpectFalse<ExpectExtends<ToastNotificationCloseButtonProps, { onClose: () => void }>>,
  Expect<
    ExpectExtends<
      ToastNotificationCloseButtonProps,
      { onClose: () => void; closeButtonLabel: 'abc' }
    >
  >
];
