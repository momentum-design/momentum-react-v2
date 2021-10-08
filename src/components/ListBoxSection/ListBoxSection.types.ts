import { Node } from '@react-types/shared';

export interface Props<T> {
  /**
   * Node containing the information about the section to be displayed
   */
  section?: Node<T>;

  /**
   * Determines wether the items should be wrapped inside a default list-item
   */
  itemWrapped?: boolean;
}
