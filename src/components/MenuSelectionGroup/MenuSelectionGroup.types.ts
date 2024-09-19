import { Key } from 'react';
import { Node, MultipleSelection, CollectionBase } from '@react-types/shared';
import { TreeState } from '@react-stately/tree';
export type TickPosition = 'left' | 'right' | 'none';
export interface SelectionGroupProps<T>
  extends Omit<CollectionBase<T>, 'disabledKeys' | 'children'>,
    Omit<MultipleSelection, 'disabledKeys'> {}

export interface Props<T> extends SelectionGroupProps<T> {
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
   * Position of the tick when selected, none when no tick
   * @default right
   */
  tickPosition?: TickPosition;

  /**
   * Custom class for overriding this component's items CSS when selected.
   */
  classNameSelectedItem?: string;

  /**
   * Custom class for overriding this Slection Group's CSS.
   */
  className?: string;
}

export interface MenuSelectionGroupSelectedStyle {
  selectionTickPosition?: TickPosition;
  selectionclassNameSelectedItem?: string;
}

export interface MenuSelectionItemSelectedStyle {
  tickPosition?: TickPosition;
  classNameSelectedItem?: string;
}
