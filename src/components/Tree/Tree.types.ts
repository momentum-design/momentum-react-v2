import { CSSProperties, ReactNode } from 'react';

export type TreeNodeId = string;

export interface TreeNode {
  children: Array<TreeNode>;
  isOpen?: boolean;
  id: TreeNodeId;
}

export type TreeRoot = TreeNode;

/**
 * Represent the active node in the tree with the 3 following properties:
 * - reverseParentPath: The path from the root node to the parent of the current node.
 */
export interface ActiveTreeNode {
  reverseParentPath: Array<TreeNode>;
  current: TreeNode;
  selectedIndex: number;
}

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
   * Determines if the onPress handler should also focus the selected item
   */
  shouldFocusOnPress?: boolean;

  /**
   * Determines whether the focus around list-items should be inset or outset
   * This is needed for virtualized lists
   */
  shouldItemFocusBeInset?: boolean;

  treeStructure: TreeRoot;
}

export interface TreeContextValue {
  currentFocus?: number;
  shouldFocusOnPress?: boolean;
  shouldItemFocusBeInset?: boolean;
  setContext?: (newFocus: number) => void;
  listSize?: number;
}
