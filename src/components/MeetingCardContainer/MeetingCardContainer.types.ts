import type { CSSProperties, ReactNode } from 'react';

import type { MeetingCardContainerStatusColor } from './MeetingCardContainerStatus';

export type Color = 'inactive' | 'success' | 'transparent';
export type Height = 'auto' | 'large' | 'medium' | 'small' | 'tiny';
export type Rounding = 0 | 1 | 2;

export interface Props {
  /**
   * Child components of this MeetingCardContainer.
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
   * Whether to use an outline for this component.
   */
  outline?: boolean;

  /**
   * magnitude of container rounding for this component.
   */
  rounding?: Rounding;

  /**
   * Color of this component's status indicator.
   */
  statusColor?: MeetingCardContainerStatusColor;

  /**
   * Whether the status indicator for this component is striped.
   */
  statusStriped?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
