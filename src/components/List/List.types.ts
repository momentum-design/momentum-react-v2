import { CSSProperties, ReactNode } from 'react';

export interface Props {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Child components of this component.
   */
  children?: ReactNode;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Size of list
   */
  listSize: number;

  /**
   * Determines if the onPress handler should also focus the selected item
   */
  shouldFocusOnPres?: boolean;

  /**
   * Determines wether the focus around list-items should be inset or outset
   * This is needed for virtualized lists
   */
  shouldItemFocusBeInset?: boolean;
}

export interface ListContextValue {
  currentFocus?: number;
  shouldFocusOnPres?: boolean;
  shouldItemFocusBeInset?: boolean;
}
