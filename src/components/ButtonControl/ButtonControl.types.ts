import { CSSProperties } from 'react';
import { AriaButtonProps } from '@react-types/button';

export type ButtonControlControl = 'close' | 'maximize' | 'minimize';

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
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
