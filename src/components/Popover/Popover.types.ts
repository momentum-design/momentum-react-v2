import { CSSProperties, ReactElement, ReactNode } from 'react';
import { TippyProps } from '@tippyjs/react';

export type PlacementType = TippyProps['placement'];

export interface Props {
  /**
   * Child components of this Popover.
   */
  children: ReactNode;
  /**
   * The component which triggers the Popover
   */
  triggerComponent: ReactElement;
  placement?: PlacementType;
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;
  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
