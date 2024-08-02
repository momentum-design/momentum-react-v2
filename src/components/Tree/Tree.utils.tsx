import React, { useContext } from 'react';
import { ActiveTreeNode, TreeContextValue, TreeNode } from './Tree.types';

export const TreeContext = React.createContext<TreeContextValue>(null);

export const useTreeContext = (): TreeContextValue => useContext(TreeContext);

type ArrowKeyCodes = 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft';

const isLeaf = (node: TreeNode): boolean => node.children.length === 0;

/**
 * Toggle the open state of a node
 *
 * @param an Active node tree
 */
export const toggleActiveNode = (an: ActiveTreeNode): ActiveTreeNode => ({
  ...an,
  current: { ...an.current, isOpen: !an.current.isOpen },
});

/**
 * Find the next active tree node based on the current active node
 * @param active
 */
const findNextTreeNode = (active: ActiveTreeNode): ActiveTreeNode => {
  let current = active.current;

  // Step into an open node
  if (!isLeaf(current) && current.isOpen) {
    return {
      current: current.children[0],
      reverseParentPath: [current, ...active.reverseParentPath],
      selectedIndex: 0,
    };
  }

  // Otherwise, find the next sibling
  for (const parent of active.reverseParentPath) {
    const pos = parent.children.indexOf(current) + 1;

    if (pos < parent.children.length) {
      const parentPathPos = active.reverseParentPath.indexOf(parent);

      return {
        current: parent.children[pos],
        reverseParentPath: active.reverseParentPath.slice(parentPathPos),
        selectedIndex: pos,
      };
    } else {
      // If we are at the end of the parent's children, move up one level
      current = parent;
    }
  }
};

/**
 * Find the previous active tree node based on the current active node
 * @param active
 */
const findPreviousTreeNode = (active: ActiveTreeNode): ActiveTreeNode => {
  // Move one level up
  if (active.selectedIndex === 0) {
    const [currentParent, ...nextParentPath] = active.reverseParentPath;
    return {
      current: currentParent,
      reverseParentPath: nextParentPath,
      selectedIndex: nextParentPath[0].children.indexOf(currentParent),
    };
  }

  const parents = [...active.reverseParentPath];
  let next = parents[0].children[active.selectedIndex - 1];

  // Move to the previous sibling and find the last leaf or closed node
  for (;;) {
    if (isLeaf(next) || !next.isOpen) {
      const selectedIndex = parents[0].children.indexOf(next);
      return {
        current: next,
        reverseParentPath: parents,
        selectedIndex,
      };
    }
    parents.unshift(next);
    next = next.children[next.children.length - 1];
  }
};

/**
 * Open or find the next node based on the current active node
 *
 * @param active
 */
const openNextNode = (active: ActiveTreeNode): ActiveTreeNode => {
  if (!isLeaf(active.current)) {
    if (!active.current.isOpen) {
      // Open it if it's closed

      return toggleActiveNode(active);
    } else {
      // Move to the first child if it's open
      return {
        ...active,
        current: active.current.children[0],
        reverseParentPath: [active.current, ...active.reverseParentPath],
        selectedIndex: 0,
      };
    }
  }
  // Otherwise, do nothing
  return active;
};

/**
 * Close or find the next node based on the current active node
 *
 * @param active
 */
const closeNextNode = (active: ActiveTreeNode): ActiveTreeNode => {
  // Close the node if it's open and not a leaf
  if (active.current.isOpen && !isLeaf(active.current)) {
    return toggleActiveNode(active);
  }

  const [parent, ...parentsRest] = active.reverseParentPath;

  // Do nothing if it's the root
  if (parentsRest.length === 0) {
    return active;
  }
  // Move up one level if it's closed
  if (parent) {
    return {
      current: parent,
      reverseParentPath: parentsRest,
      selectedIndex: parentsRest[0].children.indexOf(parent),
    };
  }
  // Otherwise, do nothing
  return active;
};

/**
 * Set the next active tree node based on the key code.
 *
 * NOTE: Active node can be calculated based on the current active node except for opening/closing nodes,
 * because there it is not a side effect free operation.
 *
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/treeview/ WCAG Tree Pattern}
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/treeview/examples/treeview-1a/ WCAG Directory Tree example}
 *
 *
 * @param keyCode Arrow key code
 * @param activeNode Current active tree node descriptor
 */
export const getNextActiveNode = (
  keyCode: ArrowKeyCodes,
  activeNode: ActiveTreeNode
): ActiveTreeNode => {
  switch (keyCode) {
    case 'ArrowUp':
      return findPreviousTreeNode(activeNode);
    case 'ArrowDown':
      return findNextTreeNode(activeNode);
    case 'ArrowRight':
      return openNextNode(activeNode);
    case 'ArrowLeft':
      return closeNextNode(activeNode);
  }
};
