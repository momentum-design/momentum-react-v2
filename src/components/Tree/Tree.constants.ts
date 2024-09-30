const CLASS_PREFIX = 'md-tree';

const DEFAULTS = {
  IS_RENDERED_FLAT: true,
  EXCLUDE_TREE_ROOT: true,
  SELECTION_MODE: 'none' as const,
  SELECTABLE_NODES: 'leafOnly' as const,
  IS_REQUIRED: false,
  NODE_ID_PREFIX: 'md-tree-node',
  SHOULD_NODE_FOCUS_BE_INSET: true,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  clonedVirtualTreeNode: `${CLASS_PREFIX}-cloned-virtual-tree-node`,
  clonedVirtualTreeNodeATBottom: `${CLASS_PREFIX}-cloned-virtual-tree-node-bottom`,
};

const TREE_NAVIGATION_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export { CLASS_PREFIX, DEFAULTS, STYLE, TREE_NAVIGATION_KEYS };
