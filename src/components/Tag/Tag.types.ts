import type { ButtonSimpleProps } from '../ButtonSimple';

export type Color =
  | 'cobalt'
  | 'gold'
  | 'lime'
  | 'mint'
  | 'orange'
  | 'primary'
  | 'purple'
  | 'slate'
  | 'violet';

export type Format = 'error' | 'normal' | 'overlay' | 'static';

export interface Props extends ButtonSimpleProps {
  /**
   * Child components of this Tag.
   */
  children?: string;

  /**
   * Color of this component.
   */
  color?: Color;

  /**
   * Special type for this component.
   */
  format?: Format;
}
