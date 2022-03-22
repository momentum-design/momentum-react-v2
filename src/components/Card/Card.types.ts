import { ButtonSimpleProps } from '../ButtonSimple';

import type { CardStatusColor } from './CardStatus';
import type { CSSProperties, ReactNode } from 'react';

export type Color = 'inactive' | 'success' | 'transparent';
export type Height = 'auto' | 'large' | 'medium' | 'small' | 'tiny';
export type Rounding = 0 | 1 | 2;

export interface Props extends ButtonSimpleProps {
  /**
   * Child components of this Card.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color of this component.
   */
  color?: Color;

  /**
   * Height of this component.
   */
  height?: Height;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Turns off hover and active styling for the component.
   */
  isStatic?: boolean;

  /**
   * Whether to use an outline for this component.
   */
  outline?: boolean;

  /**
   * magnitude of element rounding for this component.
   */
  rounding?: Rounding;

  /**
   * Color of this component's status indicator.
   */
  statusColor?: CardStatusColor;

  /**
   * Whether the status indicator for this component is striped.
   */
  statusStriped?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
