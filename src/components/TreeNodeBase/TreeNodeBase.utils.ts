import { TreeNodeId } from '../Tree/Tree.types';

/**
 * Returns the intended tabIndex for the TreeNodeBase
 */
export const getTreeNodeBaseTabIndex = (
  nodeId: TreeNodeId,
  activeNodeId: TreeNodeId,
  interactive: boolean
): number => {
  if (!interactive || nodeId !== activeNodeId) {
    return -1;
  } else {
    return 0;
  }
};
