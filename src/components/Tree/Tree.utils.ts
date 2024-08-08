import React, { useContext } from 'react';
import {
  TreeContextValue,
  TreeNode,
  TreeNodeId,
  FlatTree,
  TreeNavKeyCodes,
  ToggleTreeNode,
  FlattenedTreeNode,
} from './Tree.types';
import { THREE_ROOT } from './Tree.constants';

export const TreeContext = React.createContext<TreeContextValue>(null);

export const useTreeContext = (): TreeContextValue => useContext(TreeContext);

/**
 * Toggle the open state of a node
 *
 * @param tree
 * @param nodeId
 */
export const toggleActiveNode = (tree: FlatTree, nodeId: TreeNodeId): TreeNodeId => {
  const node = tree.get(nodeId);
  if (node) {
    tree.set(nodeId, { ...node, isOpen: !node.isOpen });
  }
  return nodeId;
};

/**
 * Find the next active tree node based on the current active node
 * @param tree
 * @param activeNodeId
 */
const findNextTreeNode = (tree: FlatTree, activeNodeId: TreeNodeId): TreeNodeId => {
  let current = tree.get(activeNodeId);

  // Step into an open node
  if (!current.isLeaf && current.isOpen) {
    return current.children[0];
  }

  // Otherwise, find the next sibling
  for (;;) {
    const parent = tree.get(current.parent);
    const pos = current.index + 1;

    if (parent.children[pos]) {
      return parent.children[pos];
    } else {
      // If we are at the end of the parent's children, move up one level
      current = parent;
    }
  }
};

/**
 * Find the previous active tree node based on the current active node
 * @param tree
 * @param activeNodeId
 */
const findPreviousTreeNode = (tree: FlatTree, activeNodeId: TreeNodeId): TreeNodeId => {
  const current = tree.get(activeNodeId);

  // We are at the root
  if (!current.parent) return activeNodeId;

  // Move one level up
  if (current.index === 0) return current.parent;

  // Find the previous sibling
  let next = tree.get(tree.get(current.parent).children[current.index - 1]);

  for (; next; ) {
    if (next.isLeaf || !next.isOpen) {
      return next.id;
    }
    // Last child of the open node
    next = tree.get(next.children[next.children.length - 1]);
  }
};

/**
 * Open or find the next node based on the current active node
 *
 * @param tree
 * @param activeNodeId
 * @param toggleTreeNode
 */
const openNextNode = (
  tree: FlatTree,
  activeNodeId: TreeNodeId,
  toggleTreeNode: ToggleTreeNode
): TreeNodeId => {
  const current = tree.get(activeNodeId);

  if (!current.isLeaf) {
    if (!current.isOpen) {
      // Open it if it's closed

      toggleTreeNode(activeNodeId);
      return activeNodeId;
    } else {
      // Move to the first child if it's open
      return current.children[0];
    }
  }
  // Otherwise, do nothing
  return activeNodeId;
};

/**
 * Close or find the next node based on the current active node
 *
 * @param tree
 * @param activeNodeId
 * @param toggleTreeNode
 */
const closeNextNode = (
  tree: FlatTree,
  activeNodeId: TreeNodeId,
  toggleTreeNode: ToggleTreeNode
): TreeNodeId => {
  const current = tree.get(activeNodeId);

  // Close the node if it's open and not a leaf
  if (current.isOpen && !current.isLeaf) {
    toggleTreeNode(activeNodeId);
    return activeNodeId;
  }
  // Do nothing if it's the root
  if (!current.parent || current.parent === THREE_ROOT) {
    return activeNodeId;
  }
  // Move up one level if it's closed
  if (current.parent) {
    return current.parent;
  }
  // Otherwise, do nothing
  return activeNodeId;
};

/**
 * Set the next active tree node based on the key code.
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/treeview/ WCAG Tree Pattern}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-1a/ WCAG Directory Tree example}
 *
 * @param tree
 * @param activeNodeId Current active tree node descriptor
 * @param keyCode Arrow key code
 * @param toggleTreeNode
 */
export const getNextActiveNode = (
  tree: FlatTree,
  activeNodeId: TreeNodeId,
  keyCode: TreeNavKeyCodes,
  toggleTreeNode: ToggleTreeNode
): TreeNodeId => {
  switch (keyCode) {
    case 'ArrowUp':
      return findPreviousTreeNode(tree, activeNodeId);
    case 'ArrowDown':
      return findNextTreeNode(tree, activeNodeId);
    case 'ArrowRight':
      return openNextNode(tree, activeNodeId, toggleTreeNode);
    case 'ArrowLeft':
      return closeNextNode(tree, activeNodeId, toggleTreeNode);
    case 'Enter':
      if (!tree.get(activeNodeId).isLeaf) {
        toggleTreeNode(activeNodeId);
      }
      return activeNodeId;
  }
};

/**
 * Travers the tree and convert it to a map between the node id and the node
 * It also adds additional information to the node like the parent, the level and the index
 *
 * @param tree
 */
export const convertTreeToFlatTree = (tree: TreeNode): FlatTree => {
  const map: FlatTree = new Map();

  const traverse = (
    node: TreeNode,
    parent: TreeNode,
    level: number,
    index: number,
    isHidden: boolean
  ) => {
    const children = node.children.map((n) => n.id);
    const isRoot = parent === null;
    map.set(isRoot ? THREE_ROOT : node.id, {
      ...node,
      level,
      index,
      children,
      isHidden: isHidden,
      parent: tree.id === parent?.id ? THREE_ROOT : parent?.id,
      isLeaf: !children.length,
    });

    node.children?.forEach?.((n, idx) =>
      traverse(n, node, level + 1, idx, isHidden || !node.isOpen)
    );
  };

  traverse(tree, null, 0, 0, false);

  return map;
};

/**
 * Map each tree node to a new value by calling the callback function.
 *
 * It uses Depth First Search (DFS) with Preorder traverse algorithm.
 *
 * @param tree The tree to traverse
 * @param cb Callback function to process each tree node
 * @param rootNodeId The root node id to start the traverse, it is the root node by default
 */
export const mapFlatTree = <T>(
  tree: FlatTree,
  cb: (node: FlattenedTreeNode) => T,
  rootNodeId?: TreeNodeId
): Array<T> => {
  const result: Array<T> = [];

  const mapper = (nodeId: TreeNodeId) => {
    const node = tree.get(nodeId);
    if (nodeId !== THREE_ROOT) {
      result.push(cb(node));
    }
    node.children.forEach(mapper);
  };

  mapper(rootNodeId || THREE_ROOT);

  return result;
};
