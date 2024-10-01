import { Key } from 'react';
import { Node } from '@react-types/shared';
import { TreeState } from '@react-stately/tree';
import { MenuAppearanceContextValue, MenuContextValue } from '../Menu/Menu.types';

export type TickPosition = 'left' | 'right' | 'none';
export interface Props<T> extends MenuAppearanceContextValue {
  /**
   * The contents of this menu item
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

declare module '@react-types/shared' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface
  interface ItemProps<T> extends Pick<MenuContextValue, 'closeOnSelect'> {}
}
