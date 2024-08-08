import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

/**
 * The key codes used to navigate the tree.
 */
export type TreeNavKeyCodes = 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft' | 'Enter';

/**
 * The unique identifier of a tree node.
 */
export type TreeNodeId = string;

/**
 * Toggles the state of the tree node.
 */
export type ToggleTreeNode = (id: TreeNodeId) => void;

/**
 * The root node of the tree.
 */
export type TreeRoot = TreeNode;

export interface TreeNode {
  /**
   * Child nodes of the node. It is an empty array when the node is a leaf.
   */
  children: Array<TreeNode>;
  /**
   * State of the node. It is undefined when the node is a leaf.
   */
  isOpen?: boolean;
  /**
   * The unique identifier of the node.
   */
  id: TreeNodeId;
}

/**
 * A node in the flattened tree.
 */
export interface FlattenedTreeNode extends Omit<TreeNode, 'children'> {
  /**
   * List of child node ids.
   */
  children: Array<TreeNodeId>;
  /**
   * The unique identifier of the parent node.
   */
  parent?: TreeNodeId;
  /**
   * Index of the node in the parent's children list. Starts from 0.
   */
  index: number;
  /**
   * The level of the node in the tree. The root node has level 0.
   */
  level: number;
  /**
   * Determines if the node is a leaf node.
   */
  isLeaf: boolean;
  /**
   * Node is hidden when any of its ancestors is closed.
   */
  isHidden: boolean;
}

/**
 * Flattened tree represented with map.
 */
export type FlatTree = Map<TreeNodeId, FlattenedTreeNode>;

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

  /**
   * The tree structure to be rendered.
   */
  treeStructure: TreeRoot;

  /**
   * Tree structure can be rendered 2 ways in the DOM:
   * 1) Nested: The tree is rendered as a nested list where the structure reflect the semantic structure of the tree
   * 2) Flat: The tree is rendered as a single level list where the DOM does not reflect the semantic structure of the tree, and
   *    we need to provide additional aria attributes to re-build it for the accessibility tree.
   *    Virtualized trees are usually rendered flat.
   *
   * @see {@link https://codepen.io/maxinteger/pen/zYVNabV Example of a nested and flat tree}
   * @default true
   */
  isRenderedFlat?: boolean;
}

export interface TreeContextValue
  extends Pick<Props, 'shouldFocusOnPress' | 'shouldItemFocusBeInset' | 'isRenderedFlat'> {
  /**
   * The active node id in the tree.
   */
  activeNodeId: TreeNodeId;
  /**
   * Get semantic attributes of the tree node.
   * @param id
   */
  getNodeProps: (id: TreeNodeId) => Partial<HTMLAttributes<HTMLElement>>;
  /**
   * Get additional attributes of the tree node group.
   * @param id
   */
  getNodeGroupProps: (id: TreeNodeId) => Partial<HTMLAttributes<HTMLElement>>;
  /**
   * Get the details of the tree node.
   * @param id
   */
  getNodeDetails: (id: TreeNodeId) => FlattenedTreeNode;
  /**
   * Set the active node id in the tree.
   * @param id
   */
  setActiveNodeId: (id: TreeNodeId) => void;
  /**
   * Toggle the isOpen state of the tree node.
   * @param id
   */
  toggleTreeNode: (id: TreeNodeId) => void;
}
