import { ActiveTreeNode, TreeNode, TreeNodeId, TreeRoot } from './Tree.types';

/**
 * Create a tree node with the given id, isOpen and children.
 *
 * @param id The id of the node
 * @param isOpen Whether the node is open
 * @param children List of child nodes
 */
export const createTreeNode = (
  id: TreeNodeId,
  isOpen: boolean = undefined,
  children: Array<TreeNode> = []
): TreeNode => ({
  children,
  id,
  isOpen,
});

/**
 * Create an active node from a tree and a path to a node.
 * The path is a list of node ids starting from the root node and continuing to the currently active node as well.
 *
 * Note: in the result the `reverseParentPath` does not contain the active node itself.
 *
 * @param tree The tree to create the active node from
 * @param pathToNode The path to the node
 * @param isCurrentOpen
 */
export const createActiveNode = (
  tree: TreeRoot,
  pathToNode: Array<TreeNodeId>,
  isCurrentOpen: boolean = undefined
): ActiveTreeNode => {
  const [currentNode, ...reverseParentPath]: ActiveTreeNode['reverseParentPath'] =
    pathToNode.reduce(
      ({ path, currentNode }, nextNodeId) => {
        const nextNode = currentNode.children.find((n) => n.id === nextNodeId);
        return { path: [nextNode, ...path], currentNode: nextNode };
      },
      { path: [tree], currentNode: tree }
    ).path;

  const res = {
    current: currentNode,
    reverseParentPath,
    selectedIndex: reverseParentPath[0].children.indexOf(currentNode),
  };

  if (isCurrentOpen !== undefined) {
    res.current = { ...currentNode, isOpen: isCurrentOpen };
  }
  return res;
};
