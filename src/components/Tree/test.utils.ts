import { TreeNode, TreeNodeId } from './Tree.types';

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
