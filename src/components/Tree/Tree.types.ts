import {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
} from 'react';
import { ItemSelection, UseItemSelectedProps } from '../../hooks/useItemSelected';

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
 * Empty tree type
 */
export type EmptyTree = Record<string, never>;

/**
 * The root node of the tree.
 */
export type TreeRoot = TreeNode | EmptyTree;

/**
 * A node in the tree.
 */
export interface TreeNode {
  /**
   * Children of the node. It is an empty array when the node is a leaf.
   */
  children: Array<TreeNode>;
  /**
   * Default open state of the node
   * @default true
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
export interface Props
  extends Partial<UseItemSelectedProps<TreeNodeId>>,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
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
   * Determines whether the focus ring around tree nodes should be inset or outset
   * It has only visual effect.
   */
  shouldNodeFocusBeInset?: boolean;

  /**
   * The initial tree structure
   *
   * It is used to build an internal tree for navigation and follow open/close states.
   *
   * The tree can be updated dynamically via `treeStructure`, but `isOpen` will be migrated from the old tree:
   * If the node exists the both old and new tree then the value used from the old tree otherwise
   * falls back to the `isOpenByDefault ?? true`
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
   * The selection mode of the tree nodes.
   *
   * Note: When user click to select a node and `selectableNodes` is `any` and the node is not a leaf node, the node will be opened/closed.
   * WCAG Tree patter sample implementation has the same behavior.
   *
   * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/treeview/ WCAG Tree Pattern}
   */
  selectableNodes?: 'leafOnly' | 'any';

  /**
   * Set of functions to communicate with virtualized tree and sync states.
   */
  virtualTreeConnector?: {
    /**
     * External function to scroll to a node.
     * This is used when the tree is rendered in a virtualized tree.
     *
     * @param id
     */
    scrollToNode: (id: TreeNodeId) => void;

    /**
     * Toggle open/close state of the tree node.
     *
     * @param id
     * @param isOpen
     */
    setNodeOpen?: (id: TreeNodeId, isOpen: boolean) => void | Promise<void>;
  };

  /**
   * Called when a node's open / close state is toggled.
   *
   * @param id
   * @param isOpen
   */
  onToggleNode?: (id: TreeNodeId, isOpen: boolean) => void;
}

/**
 * Props of the virtualized tree hook
 * @internal
 */
export interface UseVirtualTreeNavigationProps extends Pick<Props, 'virtualTreeConnector'> {
  /**
   * The active node id in the tree.
   */
  activeNodeId: TreeNodeId;
  /**
   * The reference of the tree DOM element.
   */
  treeRef: MutableRefObject<HTMLDivElement>;
}

export interface NodeAriaProps {
  /**
   * Additional attributes for the tree node.
   *
   * It is used when the tree is rendered flat and needs to provide additional
   * attributes to re-build the semantic structure of the tree.
   */
  nodeProps: Partial<HTMLAttributes<HTMLElement>>;
  /**
   * Additional attributes for the node connection group.
   *
   * It is used when the tree is rendered flat and needs to provide
   * a group element to re-build the semantic structure of the tree.
   */
  groupProps: Partial<HTMLAttributes<HTMLElement>>;
}

/**
 * Empty props object when the node is not found.
 */
type EmptyNodeAriaProps = Record<string, never>;

/**
 * The context value of the Tree component.
 */
export interface TreeContextValue
  extends Pick<Props, 'shouldNodeFocusBeInset' | 'isRenderedFlat' | 'selectableNodes'> {
  /**
   * The active node id in the tree.
   */
  activeNodeId: TreeNodeId;
  /**
   * Get semantic attributes of the tree node.
   * It returns with empty object when the node is not found.
   * @param id unique identifier of the tree node
   */
  getNodeAriaProps: (id: TreeNodeId) => NodeAriaProps | EmptyNodeAriaProps;
  /**
   * Get the details of the tree node.
   * @param id unique identifier of the tree node
   */
  getNodeDetails: (id: TreeNodeId) => undefined | TreeNodeRecord;
  /**
   * Set the active node id in the tree.
   * @param id unique identifier of the tree node
   */
  setActiveNodeId: (id: TreeNodeId) => void;
  /**
   * Toggle the isOpen state of the tree node.
   * @param id unique identifier of the tree node
   */
  toggleTreeNode: (id: TreeNodeId) => Promise<void>;
  /**
   * The item selection state of the tree nodes.
   */
  itemSelection: ItemSelection<TreeNodeId>;
  /**
   * True when the focus is inside the tree component before the tree structure changed,
   * otherwise false
   */
  isFocusWithin: boolean;
}

/**
 * Imperative tree component API
 *
 * Accessible through the ref prop of the Tree component.
 */
export interface TreeRefObject
  extends Pick<TreeContextValue, 'setActiveNodeId' | 'toggleTreeNode'> {
  /**
   * DOM reference of the tree component.
   */
  treeRef: MutableRefObject<HTMLDivElement>;
  /**
   * Toggle a single item selection
   */
  toggleSelection: ItemSelection<TreeNodeId>['toggle'];
  /**
   * Update selection with new list of selected items
   */
  updateSelection: ItemSelection<TreeNodeId>['update'];
  /**
   * Clear all selection
   */
  clearSelection: ItemSelection<TreeNodeId>['clear'];
}
