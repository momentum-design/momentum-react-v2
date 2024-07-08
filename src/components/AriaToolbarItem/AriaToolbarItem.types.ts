import { CSSProperties, ReactElement, ReactNode } from 'react';

export interface Props {
  /**
   * Child components of this AriaToolbarItem.
   */
  children: ReactElement;

  /**
   * The index of this item in the toolbar. Used for focus.
   */
  itemIndex: number;
}
