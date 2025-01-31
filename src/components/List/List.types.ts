import { AriaRole, CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react';
import { ListItemBaseIndex } from '../ListItemBase/ListItemBase.types';

export type ListOrientation = 'horizontal' | 'vertical';

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
   * Whether the list should loop when you reach the top/bottom
   */
  noLoop?: boolean;

  /**
   * Aria role
   */
  role?: AriaRole;

  /**
   * Determines if the onPress handler should also focus the selected item
   */
  shouldFocusOnPress?: boolean;

  /**
   * Determines whether the focus around list-items should be inset or outset
   * This is needed for virtualized lists
   */
  shouldItemFocusBeInset?: boolean;

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
  orientation?: ListOrientation;

  /**
   * The index of the item that should be focused initially
   */
  initialFocus?: ListItemBaseIndex;

  /**
   * The full list of item indexes to be displayed. This is necessary for non-numeric item indexes
   */
  allItemIndexes?: ListItemBaseIndex[];
}

export interface ListContextValue {
  shouldFocusOnPress?: boolean;
  shouldItemFocusBeInset?: boolean;
  setCurrentFocus?: Dispatch<SetStateAction<ListItemBaseIndex>>;
  noLoop?: boolean;
  setUpdateFocusBlocked?: Dispatch<SetStateAction<boolean>>;
  isFocusedWithin?: boolean;
  getCurrentFocus?: () => ListItemBaseIndex;
  addFocusCallback?: (
    index: ListItemBaseIndex,
    callback: (focused: boolean, focusBlocked: boolean) => void
  ) => void;
}
export interface ListRefObject {
  listRef: React.RefObject<HTMLUListElement>;
  focusOnIndex: (index: ListItemBaseIndex) => void;
  getCurrentFocusIndex: () => ListItemBaseIndex;
}
