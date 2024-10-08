import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  ForwardedRef,
} from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './Tree.constants';
import { TreeIdNodeMap, Props, TreeContextValue, TreeNodeId, TreeRefObject } from './Tree.types';
import './Tree.style.scss';
import {
  convertNestedTree2MappedTree,
  isActiveNodeInDOM,
  getInitialActiveNode,
  getNextActiveNode,
  getNodeDOMId,
  getTreeRootId,
  migrateTreeState,
  toggleTreeNodeRecord,
  TreeContext,
} from './Tree.utils';
import { useFocusWithin, useKeyboard } from '@react-aria/interactions';
import { useVirtualTreeNavigation } from './Tree.hooks';
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect';
import { usePrevious } from '../../hooks/usePrevious';
import { useItemSelected } from '../../hooks/useItemSelected';

const Tree = forwardRef((props: Props, ref: ForwardedRef<TreeRefObject>) => {
  const {
    className,
    id,
    style,
    children,
    shouldNodeFocusBeInset = DEFAULTS.SHOULD_NODE_FOCUS_BE_INSET,
    treeStructure,
    isRenderedFlat = DEFAULTS.IS_RENDERED_FLAT,
    excludeTreeRoot = DEFAULTS.EXCLUDE_TREE_ROOT,
    virtualTreeConnector,
    selectionMode = DEFAULTS.SELECTION_MODE,
    selectableNodes = DEFAULTS.SELECTABLE_NODES,
    selectedByDefault,
    onSelectionChange,
    selectedItems,
    isRequired = DEFAULTS.IS_REQUIRED,
    onToggleNode,
    ...rest
  } = props;

  const treeRef = useRef<HTMLDivElement>();

  const itemSelection = useItemSelected<TreeNodeId>({
    selectionMode,
    selectedByDefault,
    selectedItems,
    onSelectionChange,
    isRequired,
  });
  const [tree, setTree] = useState<TreeIdNodeMap>(convertNestedTree2MappedTree(treeStructure));
  const [activeNode, setActiveNode] = useState<TreeNodeId | undefined>(
    getInitialActiveNode(tree, excludeTreeRoot, itemSelection)
  );
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const activeNodeIdRef = useRef<TreeNodeId>(activeNode);

  const previousTree = usePrevious(tree);

  useDidUpdateEffect(() => {
    const newTree = convertNestedTree2MappedTree(treeStructure);
    migrateTreeState(previousTree, newTree);
    setTree(newTree);
    // Find the closest node to the last active node in the new tree
    let newActiveNodeId = activeNode;
    while (newActiveNodeId) {
      if (newTree.has(newActiveNodeId) && !newTree.get(newActiveNodeId).isHidden) break;
      newActiveNodeId = previousTree.get(newActiveNodeId)?.parent;
    }
    // Fallback to the first node
    if (!newActiveNodeId || newActiveNodeId === getTreeRootId(newTree)) {
      newActiveNodeId = getInitialActiveNode(newTree, excludeTreeRoot, itemSelection);
    }
    setActiveNodeId(newActiveNodeId);
  }, [treeStructure]);

  const isVirtualTree = virtualTreeConnector !== undefined;

  const scrollToVTreeNode = useCallback(
    (nodeId: TreeNodeId) => {
      if (isVirtualTree && virtualTreeConnector && !isActiveNodeInDOM(treeRef, nodeId)) {
        virtualTreeConnector.scrollToNode?.(nodeId);
      }
    },
    [isVirtualTree, virtualTreeConnector]
  );

  // Handle DOM changes for virtual tree
  useVirtualTreeNavigation({ virtualTreeConnector, treeRef: treeRef, activeNodeIdRef });

  const setActiveNodeId = useCallback(
    (newNodeId) => {
      if (activeNodeIdRef.current !== newNodeId) {
        activeNodeIdRef.current = newNodeId;
        setActiveNode(newNodeId);
        scrollToVTreeNode(newNodeId);
      }
    },
    [isVirtualTree, setActiveNode]
  );

  const toggleTreeNode = useCallback(
    async (id: TreeNodeId, isOpen?: boolean): Promise<void> => {
      const newOpenState = isOpen !== undefined ? isOpen : !tree.get(id).isOpen;

      if (isVirtualTree) {
        scrollToVTreeNode(id);
        await virtualTreeConnector.setNodeOpen?.(id, newOpenState);
      }

      onToggleNode?.(id, newOpenState);
      setTree((prevTree) => toggleTreeNodeRecord(id, prevTree, newOpenState));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tree, isVirtualTree]
  );

  const getNodeDetails = useCallback((id: TreeNodeId) => tree.get(id), [tree]);

  const getNodeAriaProps = useCallback(
    (id: TreeNodeId): ReturnType<TreeContextValue['getNodeAriaProps']> => {
      const node = tree.get(id);
      if (!node) return {};

      const parent = node.parent && tree.get(node.parent);
      const isRoot = parent === undefined;
      // tabindex depends on the treeNodeBase params as well
      const nodeProps = {
        id: getNodeDOMId(node.id),

        'aria-setsize': isRoot ? 1 : parent.children.length,
        'aria-level': node.level + (excludeTreeRoot ? 0 : 1),
        'aria-posinset': node.index + 1,
        role: 'treeitem',
      };
      // Root level node(s) should not have aria-level attribute and
      if (node.level > (excludeTreeRoot ? 1 : 0)) {
        // level should start with 1 under the root level nodes
        nodeProps['aria-level'] = node.level - (excludeTreeRoot ? 1 : 0);
      }
      if (!node.isLeaf) {
        nodeProps['aria-expanded'] = (!!node.isOpen).toString();
      }

      const contentId = `${getNodeDOMId(node.id)}-content`;
      const nodeContentProps = { id: contentId };
      const groupProps = {
        role: 'group',
        'aria-owns': node.children.map(getNodeDOMId).join(' '),
        'aria-labelledby': contentId,
      };

      return { nodeProps, nodeContentProps, groupProps };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tree]
  );

  const context = useMemo(
    (): TreeContextValue => ({
      getNodeAriaProps,
      getNodeDetails,
      isRenderedFlat,
      shouldNodeFocusBeInset,
      activeNodeId: activeNode,
      setActiveNodeId,
      toggleTreeNode,
      selectableNodes,
      itemSelection,
      isFocusWithin,
    }),
    [
      activeNode,
      getNodeAriaProps,
      getNodeDetails,
      isRenderedFlat,
      shouldNodeFocusBeInset,
      toggleTreeNode,
      itemSelection,
      selectableNodes,
      isFocusWithin,
    ]
  );

  useImperativeHandle(
    ref,
    () => ({
      treeRef,
      setActiveNodeId,
      toggleTreeNode,
      clearSelection: itemSelection.clear,
      updateSelection: itemSelection.update,
      toggleSelection: itemSelection.toggle,
    }),
    [setActiveNodeId, toggleTreeNode, itemSelection]
  );

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (val) => {
      setIsFocusWithin(val);
      if (val) {
        scrollToVTreeNode(activeNode);
      }
    },
  });

  const { keyboardProps } = useKeyboard({
    onKeyDown: (evt) => {
      const key = evt.key;
      switch (key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowRight':
        case 'ArrowLeft': {
          evt.preventDefault();
          if (activeNode) {
            const next = getNextActiveNode(tree, activeNode, key, excludeTreeRoot, toggleTreeNode);
            setActiveNodeId(next);
          }
          break;
        }
        case 'Space': // Space
          if (
            selectionMode !== 'none' &&
            activeNode &&
            (selectableNodes === 'any' || tree.get(activeNode)?.isLeaf)
          ) {
            evt.preventDefault();
            itemSelection.toggle(activeNode);
          }
          break;

        default:
          evt.continuePropagation();
          break;
      }
    },
  });

  const ariaProps = {
    role: 'tree',
  };

  if (selectionMode !== 'none') {
    ariaProps['aria-multiselectable'] = selectionMode === 'multiple' ? 'true' : 'false';
  }

  return (
    <TreeContext.Provider value={context}>
      <div
        className={classnames(className, STYLE.wrapper)}
        ref={treeRef}
        style={style}
        id={id}
        {...ariaProps}
        {...keyboardProps}
        {...rest}
        {...focusWithinProps}
      >
        {children}
      </div>
    </TreeContext.Provider>
  );
});

Tree.displayName = 'Tree';

export default Tree;
