import { PopoverCloseButtonProps } from './Popover.types';
import { ExpectExtends, Expect, ExpectFalse } from '../../utils/typetest.util';

// NOTE: STATIC TYPE TESTS RUN ON LINT
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type cases = [
  // closeButtonProps must always contain aria-label
  // if there is no close button, closeButtonProps is optional
  Expect<ExpectExtends<PopoverCloseButtonProps, Record<string, never>>>,
  Expect<ExpectExtends<PopoverCloseButtonProps, { closeButtonPlacement: 'none' }>>,
  Expect<
    ExpectExtends<
      PopoverCloseButtonProps,
      { closeButtonPlacement: 'none'; closeButtonProps: { 'aria-label': 'abc' } }
    >
  >,
  ExpectFalse<
    ExpectExtends<
      PopoverCloseButtonProps,
      { closeButtonPlacement: 'none'; closeButtonProps: Record<string, never> }
    >
  >,

  // closeButtonProps must always contain aria-label
  // if there is a close button, closeButtonProps is required
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
