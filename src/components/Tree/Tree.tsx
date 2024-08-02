import React, { FC, useState, useCallback, HTMLAttributes } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './Tree.constants';
import { TreeIdNodeMap, Props, TreeContextValue, TreeNodeId } from './Tree.types';
import {
  convertNestedTree2MappedTree,
  getNextActiveNode,
  toggleTreeNodeRecord,
  TreeContext,
} from './Tree.utils';
import { useKeyboard } from '@react-aria/interactions';
import { isFocusableNode } from '../../utils/navigation';

const Tree: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    children,
    shouldNodeFocusBeInset,
    treeStructure,
    isRenderedFlat = DEFAULTS.IS_RENDERED_FLAT,
    excludeTreeRoot = DEFAULTS.EXCLUDE_TREE_ROOT,
    setVirtualTreeNodeOpenState,
    ...rest
  } = props;

  if (excludeTreeRoot && !treeStructure.children.length) {
    throw new Error('Tree must have at least one child when excludeTreeRoot is true');
  }

  const [tree, setTree] = useState<TreeIdNodeMap>(convertNestedTree2MappedTree(treeStructure));
  const [activeNodeId, setActiveNodeId] = useState<TreeNodeId>(
    excludeTreeRoot ? treeStructure.children[0].id : treeStructure.id
  );

  const toggleTreeNode = useCallback(
    (id: TreeNodeId, isOpen?: boolean) => {
      const newOpenState = isOpen !== undefined ? isOpen : !tree.get(id).isOpen;
      setVirtualTreeNodeOpenState?.(id, newOpenState);
      setTree((prevTree) => toggleTreeNodeRecord(id, prevTree, newOpenState));
    },
    [tree]
  );

  const getNodeDetails = useCallback((id: TreeNodeId) => tree.get(id), [tree]);

  const getNodeProps = useCallback(
    (id: TreeNodeId): Partial<HTMLAttributes<HTMLElement>> => {
      const node = tree.get(id);
      const parent = node.parent && tree.get(node.parent);
      const isRoot = parent === undefined;

      // tabindex depends on the treeNodeBase params as well
      const props = {
        id: node.id.toString(),
        'aria-setsize': isRoot ? 1 : parent.children.length,
        'aria-level': node.level + 1,
        'aria-posinset': node.index + 1,
        role: 'treeitem',
      };
      if (node.isOpen !== undefined) {
        props['aria-expanded'] = node.isOpen.toString();
      }
      return props;
    },
    [tree]
  );

  const getNodeGroupProps = useCallback(
    (id: TreeNodeId): Partial<HTMLAttributes<HTMLElement>> => {
      const node = tree.get(id);

      return {
        role: 'group',
        'aria-owns': node.children.join(' '),
      };
    },
    [tree]
  );

  const getContext = useCallback(
    (): TreeContextValue => ({
      getNodeProps,
      getNodeGroupProps,
      getNodeDetails,
      isRenderedFlat,
      shouldNodeFocusBeInset,
      activeNodeId,
      setActiveNodeId,
      toggleTreeNode,
    }),
    [
      activeNodeId,
      getNodeGroupProps,
      getNodeProps,
      getNodeDetails,
      isRenderedFlat,
      shouldNodeFocusBeInset,
      toggleTreeNode,
    ]
  );

  const { keyboardProps } = useKeyboard({
    onKeyDown: (evt) => {
      const target = evt.target as HTMLElement;
      switch (evt.key) {
        case 'Escape':
          evt.continuePropagation();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'Enter': {
          // Ignore event when the target is an interactable element inside the tree node
          if (target.getAttribute('role') === 'treeitem' || !isFocusableNode(target)) {
            evt.preventDefault();
            setActiveNodeId(
              getNextActiveNode(tree, activeNodeId, evt.key, excludeTreeRoot, toggleTreeNode)
            );
          }
          break;
        }
      }
    },
  });

  return (
    <TreeContext.Provider value={getContext()}>
      <div
        className={classnames(className, STYLE.wrapper)}
        style={style}
        id={id}
        role="tree"
        {...keyboardProps}
        {...rest}
      >
        {children}
      </div>
    </TreeContext.Provider>
  );
};

export default Tree;
