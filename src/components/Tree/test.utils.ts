import { TreeNode, TreeNodeId } from './Tree.types';

/**
 * Create a tree node with the given id, isOpen and children.
 *
 * @param id The id of the node
 * @param isOpenByDefault
 * @param children List of child nodes
 */
export const createTreeNode = (
  id: TreeNodeId,
  isOpenByDefault: boolean = undefined,
  children: Array<TreeNode> = []
): TreeNode => ({
  children,
  isOpenByDefault,
  id,
});
