import { Key } from 'react';
import { Node } from '@react-types/shared';
import { TreeState } from '@react-stately/tree';
import { ListOrientation } from '../List/List.types';

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

  /**
   * Determines the orientation of the list
   *
   * The orientation of the list change the keyboard navigation in the list:
   *
   * - vertical: up and down arrow keys
   * - horizontal: left and right arrow keys
   *
   * @default 'vertical'
   */
  orientation?: ListOrientation
}
