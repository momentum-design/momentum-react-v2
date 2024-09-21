import { Key } from 'react';
import { Node } from '@react-types/shared';
import { TreeState } from '@react-stately/tree';

export interface Props<T> {
  /**
   * The contents of this menu item section
   */
  item: Node<T>;

  /**
   * The current state of the list of items
   */
  state: TreeState<T>;

  /**
   * Handler to be called when this element is selected
   */
  onAction?: (key: Key) => void;
}
