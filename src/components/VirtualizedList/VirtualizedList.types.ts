import {
  SetListDataProps,
  VirtualizerProps,
} from '@momentum-design/components/dist/components/virtualizedlist/virtualizedlist.types.js';
import { CSSProperties, ReactNode } from 'react';

export interface Props extends VirtualizerProps {
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

  /**
   * Any list rendered inside of Virtualized Wrapper should accept these parameters
   * @param virtualItems - Array of virtual items to render cliet side
   * @param measureElement  - ref to pass to each item in order to size correctly
   * @param listStyle - style to give to list
   * @returns list with nested listitems
   */
  setListData: React.Dispatch<React.SetStateAction<SetListDataProps>>;

  /**
   * Passes current target back to client for handling
   * @param currentTarget
   */
  onScroll?: (this: GlobalEventHandlers, ev: Event) => void;

  /**
   * React node to render
   */
  children?: ReactNode;
}
