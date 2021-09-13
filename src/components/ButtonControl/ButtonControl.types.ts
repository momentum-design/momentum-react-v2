import { CSSProperties } from 'react';
import { AriaButtonProps } from '@react-types/button';

export type ButtonControlControl = 'close' | 'favorite' | 'maximize' | 'minimize' | 'mute';

export interface Props extends AriaButtonProps {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * The control type.
   */
  control: ButtonControlControl;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Whether to render this button as a circle.
   */
  isCircular?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
