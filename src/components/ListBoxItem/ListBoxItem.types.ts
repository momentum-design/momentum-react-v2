import { Node } from '@react-types/shared';

export interface Props<T> {
  /**
   * Represents the item to be displayed in this ListBoxItem
   */
  item: Node<T>;
}
