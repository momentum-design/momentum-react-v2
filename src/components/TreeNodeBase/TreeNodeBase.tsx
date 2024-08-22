import React, {
  forwardRef,
  ReactNode,
  useRef,
  useCallback,
  useLayoutEffect,
  ReactElement,
  useEffect,
} from 'react';
import { usePress } from '@react-aria/interactions';
import classnames from 'classnames';

import { verifyTypes } from '../../helpers/verifyTypes';
import { useMutationObservable } from '../../hooks/useMutationObservable';
import ListItemBaseSection from '../ListItemBaseSection';
import { useTreeContext } from '../Tree';
import FocusRing from '../FocusRing';
import Text from '../Text';

import {
  DEFAULTS,
  KEYS,
  NODE_ID_ATTRIBUTE_NAME,
  SHAPES,
  SIZES,
  STYLE,
} from './TreeNodeBase.constants';
import { Props, TreeNodeBaseRefOrCallbackRef } from './TreeNodeBase.types';
import './TreeNodeBase.style.scss';
import { getKeyboardFocusableElements } from '../../utils/navigation';
import { usePrevious } from '../../hooks/usePrevious';
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect';

const TreeNodeBase = (props: Props, providedRef: TreeNodeBaseRefOrCallbackRef): ReactElement => {
  const {
    id,
    className,
    nodeId,
    children,
    shape = DEFAULTS.SHAPE,
    size = DEFAULTS.SIZE(shape || DEFAULTS.SHAPE),
    isPadded = DEFAULTS.IS_PADDED,
    isSelected,
    style,
    onPress,
    lang,
    ...rest
  } = props;
  if (!nodeId) {
    console.warn('TreeNodeBase: nodeId prop is required.');
  }

  let content: ReactNode = null;

  const treeContext = useTreeContext();
  const { isHidden, isLeaf } = treeContext.getNodeDetails(nodeId);

  const internalRef = useRef<HTMLDivElement>();
  const ref = providedRef && typeof providedRef !== 'function' ? providedRef : internalRef;

  // When used in a popover, the ref will be a callback.
  // We need to update this callback ref, so the popover
  // knows about the dom element, but we can't use the callback
  // ref directly because we want it to be a useRef style ref
  // We useLayoutEffect so that it happens in time for tippy
  // to use the ref when adding event handlers
  useLayoutEffect(() => {
    if (providedRef && typeof providedRef === 'function') {
      providedRef(ref.current);
    }
  });

  if (shape === SHAPES.isPilled && (size === SIZES[40] || size === SIZES[70])) {
    console.warn(
      'TreeNodeBase: This variation is against the design spec. Rounded Tree Node can only be size 32 or 50.'
    );
  }

  if (Array.isArray(children)) {
    if (children.length > 3) {
      console.warn('TreeNodeBase: This component can only have at most 3 sections inside.');
    } else {
      if (verifyTypes(children, ListItemBaseSection)) {
        const [start, middle, end] = children;
        content = (
          <>
            {start}
            {middle}
            {end}
          </>
        );
      } else if (verifyTypes(children, Text)) {
        content = children;
      } else {
        console.warn(
          'TreeNodeBase: When there is more then one child component then use React.Fragment, ListItemBaseSection or Text components.'
        );
      }
    }
  } else {
    content = children;
  }

  // The keyboard press events are not propagated
  const internalOnPress = useCallback((event) => {
    if (event.pointerType === 'keyboard') {
      ref.current.click();
    }
    if (onPress) {
      onPress(event);
    }
  }, []);

  const { pressProps, isPressed } = usePress({
    preventFocusOnPress: true, // we handle it ourselves
    onPress: internalOnPress,
    ref,
  });

  // Prevent tree node update because it can cause state lost in the focused component e.g. Menu
  const treeNodePressProps = {
    ...pressProps,
    onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (ref.current === document.activeElement || event.key === KEYS.TAB_KEY) {
        pressProps.onKeyDown(event);
      }
    },
  };

  /**
   * Focus management
   */
  const shouldNodeFocusBeInset =
    treeContext?.shouldNodeFocusBeInset || DEFAULTS.SHOULD_ITEM_FOCUS_BE_INSET;

  const tabIndex = nodeId === treeContext.activeNodeId ? 0 : -1;

  // makes sure that whenever an item is pressed, the tree focus state gets updated as well
  useEffect(() => {
    if (!isHidden && treeContext && isPressed && nodeId !== undefined) {
      ref.current.focus();
      treeContext.setActiveNodeId(nodeId);
      treeContext.toggleTreeNode(nodeId);
    }
  }, [isPressed, isHidden]);

  const updateTabIndexes = useCallback(() => {
    if (!isHidden) {
      getKeyboardFocusableElements(ref.current, false)
        .filter((el) => el.closest(`.${STYLE.wrapper}`) === ref.current)
        .forEach((el) => el.setAttribute('tabindex', tabIndex.toString()));
    }
  }, [ref, tabIndex, isHidden]);

  const lastCurrentFocus = usePrevious(treeContext?.activeNodeId);
  useDidUpdateEffect(() => {
    if (
      lastCurrentFocus !== undefined &&
      lastCurrentFocus !== treeContext?.activeNodeId &&
      treeContext?.activeNodeId === nodeId
    ) {
      ref.current.focus();
    }
  }, [treeContext?.activeNodeId]);

  // Update tab indexes of the node's element when the active node changes
  useEffect(() => {
    if (treeContext?.activeNodeId === undefined) return;
    updateTabIndexes();
  }, [treeContext?.activeNodeId]);

  useMutationObservable(ref.current, updateTabIndexes);

  if (isHidden) {
    return null;
  }

  return (
    <FocusRing isInset={shouldNodeFocusBeInset}>
      <div
        tabIndex={tabIndex}
        id={id}
        style={style}
        ref={ref}
        aria-selected={isSelected}
        data-size={size}
        data-padded={isPadded}
        data-shape={shape}
        className={classnames(className, STYLE.wrapper, { active: isPressed || isSelected })}
        lang={lang}
        {...{ [NODE_ID_ATTRIBUTE_NAME]: nodeId }}
        {...treeNodePressProps}
        {...treeContext.getNodeProps(nodeId)}
        {...rest}
      >
        {content}
        {treeContext.isRenderedFlat && !isLeaf && (
          <div {...treeContext.getNodeGroupProps(nodeId)} />
        )}
      </div>
    </FocusRing>
  );
};

/**
 * Tree Node Base component that can be used inside Trees
 */
const _TreeNodeBase = forwardRef(TreeNodeBase);
_TreeNodeBase.displayName = 'TreeNodeBase';

export default _TreeNodeBase;
