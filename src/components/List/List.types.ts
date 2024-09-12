import { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react';

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
  role?: string;

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
  initialFocus?: number;
}

export interface ListContextValue {
  currentFocus?: number;
  shouldFocusOnPress?: boolean;
  shouldItemFocusBeInset?: boolean;
  setCurrentFocus?: Dispatch<SetStateAction<number>>;
  listSize?: number;
  noLoop?: boolean;
  direction?: 'forward' | 'backward';
  setDirection?: Dispatch<SetStateAction<'forward' | 'backward'>>;
  isInitiallyRoving?: boolean;
  setIsInitiallyRoving?: Dispatch<SetStateAction<boolean>>;
  suppressFocus?: boolean;
  isFocusedWithin?: boolean;
}
export interface ListRefObject {
  listRef: React.RefObject<HTMLUListElement>;
  focusOnIndex: (index: number) => void;
  getCurrentFocusIndex: () => number;
}
