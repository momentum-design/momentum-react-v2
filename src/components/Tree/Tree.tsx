import React, { FC, useRef, useState, useCallback } from 'react';
import classnames from 'classnames';

import { STYLE } from './Tree.constants';
import { ActiveTreeNode, Props } from './Tree.types';
import './Tree.style.scss';
import { getNextActiveNode, TreeContext } from './Tree.utils';
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
    ...rest
  } = props;

  const [tree] = useState(treeStructure);
  const [activeNode, setActiveNode] = useState<ActiveTreeNode>({
    current: tree?.children?.[0],
    reverseParentPath: [],
    selectedIndex: 0,
  });

  const setContext = useCallback(
    (newFocus) => {
      setActiveNode(newFocus);
    },
    [activeNode, setActiveNode, treeStructure]
  );

  const getContext = useCallback(
    () => ({ treeStructure, shouldFocusOnPress, shouldItemFocusBeInset, activeNode, setContext }),
    [activeNode, setActiveNode, treeStructure]
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
          evt.preventDefault();

          setActiveNode(getNextActiveNode(evt.key, activeNode));
          break;

        default:
          break;
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
