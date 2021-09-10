import { Node } from '@react-types/shared';

export interface Props<T> {
  /**
   * Node containing the information about the section to be displayed
   */
  section?: Node<T>;
}
