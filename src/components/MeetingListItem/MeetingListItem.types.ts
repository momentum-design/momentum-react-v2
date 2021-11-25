import { CSSProperties, ReactNode } from 'react';
import { PressEvents } from '@react-types/shared';

export enum MeetingMarker {
  AcceptedActive = 'AcceptedActive', // green
  AcceptedInactive = 'AcceptedInactive', //gray
  TentativeActive = 'TentativeActive', // green stripe
  TentativeInactive = 'TentativeInactive', //gray stripe
  Empty = 'Empty',
}
export interface Props extends PressEvents {
  /**
   * Buttons or icons for end of item
   */
  buttonGroup?: ReactNode;

  /**
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Color status
   */
  color?: MeetingMarker;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Determines if this item is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Icon, Avatar, or other content for beginning of item
   */
  image?: ReactNode;

  /**
   * Determines if this item has a larger height
   */
  large?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Used to manage focus when this is used inside a list.
   */
  itemIndex?: number;
}
