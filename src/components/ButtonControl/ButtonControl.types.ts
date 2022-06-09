import type { ButtonSimpleProps } from '../ButtonSimple';

export type ButtonControlControl = 'close' | 'favorite' | 'maximize' | 'minimize' | 'mute';

export interface Props extends ButtonSimpleProps {
  /**
   * The control type.
   */
  control: ButtonControlControl;

  /**
   * Whether to render this button as a circle.
   */
  isCircular?: boolean;
}
