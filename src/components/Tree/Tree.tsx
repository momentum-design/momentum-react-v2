import React, { FC, useRef, useState, useCallback, HTMLAttributes } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './Tree.constants';
import { TreeIdNodeMap, Props, TreeContextValue, TreeNavKeyCodes, TreeNodeId } from './Tree.types';
import './Tree.style.scss';
import {
  convertNestedTree2MappedTree,
  getNextActiveNode,
  toggleTreeNodeRecord,
  TreeContext,
} from './Tree.utils';
import { useKeyboard } from '@react-aria/interactions';
import { useVirtualTreeNavigation } from './Tree.hooks';

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
    virtualTreeConnector,
    ...rest
  } = props;

  const ref = useRef<HTMLDivElement>();

  const [tree, setTree] = useState<TreeIdNodeMap>(convertNestedTree2MappedTree(treeStructure));
  const [activeNodeId, setActiveNodeId] = useState<TreeNodeId | undefined>(
    excludeTreeRoot ? treeStructure?.children?.[0]?.id : treeStructure?.id
  );

  const isVirtualTree = virtualTreeConnector !== undefined;

  // Handle DOM changes for virtual tree
  useVirtualTreeNavigation({ virtualTreeConnector, treeRef: ref, activeNodeId });

  const toggleTreeNode = useCallback(
    async (id: TreeNodeId, isOpen?: boolean): Promise<void> => {
      const newOpenState = isOpen !== undefined ? isOpen : !tree.get(id).isOpen;

      if (isVirtualTree) {
        await virtualTreeConnector.setNodeOpen?.(id, newOpenState);
        // Call scroll to every time so it scrolls to parent when the user presses left arrow in vtree
        virtualTreeConnector.scrollToNode?.(id);
      }

      setTree((prevTree) => toggleTreeNodeRecord(id, prevTree, newOpenState));
    },
    [tree, isVirtualTree]
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
      if (!node.isLeaf) {
        props['aria-expanded'] = (!!node.isOpen).toString();
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
      const key = evt.key as TreeNavKeyCodes;
      switch (key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowRight':
        case 'ArrowLeft': {
          evt.preventDefault();
          if (activeNodeId) {
            const nextActiveNode = getNextActiveNode(
              tree,
              activeNodeId,
              key,
              excludeTreeRoot,
              toggleTreeNode
            );
            setActiveNodeId(nextActiveNode);
          }
          break;
        }
        default:
          evt.continuePropagation();
          break;
      }
    },
  });

  return (
    <TreeContext.Provider value={getContext()}>
      <div
        className={classnames(className, STYLE.wrapper)}
        ref={ref}
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
