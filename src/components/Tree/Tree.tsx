import React, { FC, useRef, useState, useCallback, HTMLAttributes } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS, THREE_ROOT } from './Tree.constants';
import { FlatTree, Props, TreeContextValue, TreeNodeId } from './Tree.types';
import './Tree.style.scss';
import { convertTreeToFlatTree, getNextActiveNode, TreeContext } from './Tree.utils';
import { useKeyboard } from '@react-aria/interactions';

const Tree: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    children,
    shouldFocusOnPress,
    shouldItemFocusBeInset,
    treeStructure,
    isRenderedFlat = DEFAULTS.IS_RENDERED_FLAT,
    ...rest
  } = props;
  const [flatTree, setFlatTree] = useState<FlatTree>(convertTreeToFlatTree(treeStructure));
  const [activeNodeId, setActiveNodeId] = useState<TreeNodeId>(
    flatTree.get(THREE_ROOT)?.children?.[0]
  );

  const toggleTreeNode = useCallback(
    (id: TreeNodeId) => {
      const newTree = new Map(flatTree.entries());
      const current = flatTree.get(id);
      const isOpen = !flatTree.get(id).isOpen;
      newTree.set(id, { ...current, isOpen });

      const traversWhileOpen = (nodeId: TreeNodeId) => {
        const node = newTree.get(nodeId);

        node.children.forEach((childId) => {
          const child = newTree.get(childId);
          newTree.set(childId, { ...child, isHidden: !node.isOpen || node.isHidden });
          traversWhileOpen(childId);
        });
      };
      traversWhileOpen(id);

      setFlatTree(newTree);
    },
    [flatTree]
  );

  const getNodeDetails = useCallback((id: TreeNodeId) => flatTree.get(id), [flatTree]);

  const getNodeProps = useCallback(
    (id: TreeNodeId): Partial<HTMLAttributes<HTMLElement>> => {
      const node = flatTree.get(id);
      const parent = flatTree.get(node.parent);
      const isSelected = activeNodeId === node.id;

      // tabindex depends on the treeNodeBase params as well
      const props = {
        id: node.id,
        'aria-setsize': parent.children.length,
        'aria-level': node.level + 1,
        'aria-posinset': node.index + 1,
        'aria-selected': isSelected,
        role: 'treeitem',
      };
      if (node.isOpen !== undefined) {
        props['aria-expanded'] = node.isOpen.toString();
      }
      return props;
    },
    [flatTree]
  );

  const getNodeGroupProps = useCallback(
    (id: TreeNodeId): Partial<HTMLAttributes<HTMLElement>> => {
      const node = flatTree.get(id);

      return {
        role: 'group',
        'aria-owns': node.children.join(' '),
      };
    },
    [flatTree]
  );

  const getContext = useCallback(
    (): TreeContextValue => ({
      getNodeProps,
      getNodeGroupProps,
      getNodeDetails,
      isRenderedFlat,
      shouldFocusOnPress,
      shouldItemFocusBeInset,
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
      shouldFocusOnPress,
      shouldItemFocusBeInset,
      toggleTreeNode,
    ]
  );

  const { keyboardProps } = useKeyboard({
    onKeyDown: (evt) => {
      switch (evt.key) {
        case 'Escape':
          evt.continuePropagation();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'Enter': {
          evt.preventDefault();
          setActiveNodeId(getNextActiveNode(flatTree, activeNodeId, evt.key, toggleTreeNode));
          break;
        }
      }
    },
  });

  const ref = useRef<HTMLDivElement>();

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
