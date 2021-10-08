import { Node } from '@react-types/shared';

export interface Props<T> {
  /**
   * Represents the item to be displayed in this ListBoxItem
   */
  item: Node<T>;

  /**
   * Determines wether the item should be wrapped inside a list base item as default
   */
  wrapped?: boolean;
}
