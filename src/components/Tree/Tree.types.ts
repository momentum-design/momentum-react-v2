import { CSSProperties, DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

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
export type ToggleTreeNode = (id: TreeNodeId, isOpen?: boolean) => void;

/**
 * The root node of the tree.
 */
export type TreeRoot = TreeNode;

/**
 * A node in the tree.
 */
export interface TreeNode {
  /**
   * Children of the node. It is an empty array when the node is a leaf.
   */
  children: Array<TreeNode>;
  /**
   * Default open state of the node.
   */
  isOpenByDefault?: boolean;
  /**
   * The unique identifier of the node.
   */
  id: TreeNodeId;
}

/**
 * Tree node states in the Tree component.
 */
export interface TreeNodeRecord extends Omit<TreeNode, 'children' | 'isOpenByDefault'> {
  /**
   * List of child node ids.
   */
  children: Array<TreeNodeId>;
  /**
   * The unique identifier of the parent node.
   *
   * `undefined` when it is the root node.
   */
  parent?: TreeNodeId;
  /**
   * Index of the node in the parent's children list. Starts from 0.
   */
  index: number;
  /**
   * The level of the node in the tree. The root node is level 0.
   */
  level: number;
  /**
   * Determines if the node is a leaf node.
   */
  isLeaf: boolean;
  /**
   * Determines if the node with the children is open.
   */
  isOpen: boolean;
  /**
   * Node is hidden when any of its ancestors are closed.
   */
  isHidden: boolean;
}

/**
 * Tree representation with map.
 *
 * It is used to store the tree states internally.
 * @internal
 */
export type TreeIdNodeMap = Map<TreeNodeId, TreeNodeRecord>;

/**
 * The props of the Tree component.
 */
export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
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
   * Determines whether the focus around tree nodes should be inset or outset
   * This is needed for virtualized tree
   */
  shouldNodeFocusBeInset?: boolean;

  /**
   * The initial tree structure
   *
   * It is used to build an internal tree for navigation and follow open/close states.
   */
  treeStructure: TreeRoot;

  /**
   * Tree structure can be rendered 2 ways in the DOM:
   * 1) Nested: The tree is rendered as a nested list where the structure reflect the semantic structure of the tree
   * 2) Flat: The tree is rendered as a single level list where the DOM does not reflect the semantic structure of the tree, and
   *    we need to provide additional aria attributes to re-build it for the accessibility tree.
   *    Virtualized trees are usually rendered flat.
   * @default true
   */
  isRenderedFlat?: boolean;

  /**
   * Determines if the tree root should be excluded from the tree keyboard navigation.
   *
   * In many case we want to hide the root of the tree, for example when the tree used for grouping some list items.
   *
   * Note: it does not change the visibility of the root node.
   * @default true
   */
  excludeTreeRoot?: boolean;

  /**
   * Toggle open/close state of the tree node.
   */
  setVirtualTreeNodeOpenState?: (id: TreeNodeId, isOpen: boolean) => void;
}

/**
 * The context value of the Tree component.
 */
export interface TreeContextValue extends Pick<Props, 'shouldNodeFocusBeInset' | 'isRenderedFlat'> {
  /**
   * The active node id in the tree.
   */
  activeNodeId: TreeNodeId;
  /**
   * Get semantic attributes of the tree node.
   * @param id unique identifier of the tree node
   */
  getNodeProps: (id: TreeNodeId) => Partial<HTMLAttributes<HTMLElement>>;
  /**
   * Get additional attributes of the tree node group.
   * @param id unique identifier of the tree node
   */
  getNodeGroupProps: (id: TreeNodeId) => Partial<HTMLAttributes<HTMLElement>>;
  /**
   * Get the details of the tree node.
   * @param id unique identifier of the tree node
   */
  getNodeDetails: (id: TreeNodeId) => TreeNodeRecord;
  /**
   * Set the active node id in the tree.
   * @param id unique identifier of the tree node
   */
  setActiveNodeId: (id: TreeNodeId) => void;
  /**
   * Toggle the isOpen state of the tree node.
   * @param id unique identifier of the tree node
   */
  toggleTreeNode: ToggleTreeNode;
}
