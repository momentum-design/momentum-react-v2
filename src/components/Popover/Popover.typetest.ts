import { PopoverCloseButtonProps } from './Popover.types';
import { ExpectExtends, Expect, ExpectFalse } from '../../utils/typetest.util';

// NOTE: STATIC TYPE TESTS RUN ON LINT
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  // if there is a close button, there must be a closeButtonProps aria-label
  Expect<ExpectExtends<PopoverCloseButtonProps, Record<string, never>>>,
  Expect<ExpectExtends<PopoverCloseButtonProps, { closeButtonPlacement: 'none' }>>,
  ExpectFalse<ExpectExtends<PopoverCloseButtonProps, { closeButtonPlacement: 'top-left' }>>,
  ExpectFalse<ExpectExtends<PopoverCloseButtonProps, { closeButtonPlacement: 'top-right' }>>,
  ExpectFalse<
    ExpectExtends<
      PopoverCloseButtonProps,
      { closeButtonPlacement: 'top-left'; closeButtonProps: Record<string, never> }
    >
  >,
  ExpectFalse<
    ExpectExtends<
      PopoverCloseButtonProps,
      { closeButtonPlacement: 'top-right'; closeButtonProps: Record<string, never> }
    >
  >,
  Expect<
    ExpectExtends<
      PopoverCloseButtonProps,
      { closeButtonPlacement: 'top-left'; closeButtonProps: { 'aria-label': 'abc' } }
    >
  >,
  Expect<
    ExpectExtends<
      PopoverCloseButtonProps,
      { closeButtonPlacement: 'top-right'; closeButtonProps: { 'aria-label': 'abc' } }
    >
  >
];
