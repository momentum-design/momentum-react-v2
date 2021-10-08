import { _FocusRingProps1 } from '@react-aria/focus';

export interface Props extends _FocusRingProps1 {
  /**
   * Whether the focus ring is disabled or not.
   */
  disabled?: boolean;

  /**
   * Determines wether the shadow/outline should be inset
   */
  isInset?: boolean;
}
