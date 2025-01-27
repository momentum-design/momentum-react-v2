import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { CSSProperties, ReactNode } from 'react';

export interface Props {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */

  /**
   * Child components of this component.
   */
  children: ReactNode;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  onScroll?: (e) => void;
  count: number;
  estimateSize: () => number;
}

export interface WrapperRefObject {
  wrapperRef: React.RefObject<HTMLDivElement>;
  virtualItems: Array<VirtualItem>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}
