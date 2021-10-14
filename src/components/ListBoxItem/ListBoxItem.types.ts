import { Node } from '@react-types/shared';
import { CSSProperties } from 'react';

export interface Props<T> {
  /**
   * Represents the item to be displayed in this ListBoxItem
   */
  item: Node<T>;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
