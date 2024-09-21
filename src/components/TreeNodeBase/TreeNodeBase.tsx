import React, {
  forwardRef,
  ReactNode,
  useRef,
  useCallback,
  useLayoutEffect,
  ReactElement,
  useEffect,
  useMemo,
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
    style,
    onPress,
    lang,
    ...rest
  } = props;
  if (!nodeId) {
    console.warn('TreeNodeBase: nodeId prop is required.');
  }

  const treeContext = useTreeContext();
  const nodeDetails = treeContext.getNodeDetails(nodeId);

  const internalRef = useRef<HTMLDivElement>();
  const ref = providedRef && typeof providedRef !== 'function' ? providedRef : internalRef;
  const isHidden = !nodeDetails || nodeDetails.isHidden;

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

  const content: ReactNode = useMemo(() => {
    if (!isHidden && children) {
      const childrenContent = children(nodeDetails);
      if (Array.isArray(childrenContent)) {
        if (childrenContent.length > 3) {
          console.warn('TreeNodeBase: This component can only have at most 3 sections inside.');
        } else {
          if (verifyTypes(childrenContent, ListItemBaseSection)) {
            const [start, middle, end] = childrenContent;
            return (
              <>
                {start}
                {middle}
                {end}
              </>
            );
          } else if (verifyTypes(childrenContent, Text)) {
            return childrenContent;
          } else {
            console.warn(
              'TreeNodeBase: When there is more then one child component then use React.Fragment, ListItemBaseSection or Text components.'
            );
          }
        }
      } else {
        return childrenContent;
      }
    }
    return null;
  }, [children, isHidden, nodeDetails]);

  // The keyboard press events are not propagated
  const internalOnPress = useCallback(
    (event) => {
      if (event.pointerType === 'keyboard') {
        ref.current.click();
      }
      if (
        treeContext &&
        treeContext.itemSelection.selectionMode !== 'none' &&
        (treeContext.selectableNodes === 'any' || nodeDetails?.isLeaf)
      ) {
        treeContext.itemSelection.toggle(nodeId);
      }

      onPress?.(event);
    },
    [treeContext, nodeDetails.isLeaf, onPress, ref, nodeId]
  );

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
  const tabIndex = nodeId === treeContext.activeNodeId ? 0 : -1;

  // makes sure that whenever an item is pressed, the tree focus state gets updated as well
  useEffect(() => {
    if (!isHidden && treeContext && isPressed && nodeId !== undefined) {
      ref.current.focus();
      treeContext.setActiveNodeId(nodeId);
      treeContext.toggleTreeNode(nodeId);
    }
  }, [isPressed, isHidden, treeContext, nodeId, ref]);

  const updateTabIndexes = useCallback(() => {
    if (!isHidden) {
      getKeyboardFocusableElements(ref.current, false)
        .filter((el) => el.closest(`.${STYLE.wrapper}`) === ref.current)
        .forEach((el) => el.setAttribute('tabindex', tabIndex.toString()));
    }
  }, [ref, tabIndex, isHidden]);

  const lastActiveNode = usePrevious(treeContext?.activeNodeId);
  useDidUpdateEffect(() => {
    if (
      ref.current &&
      lastActiveNode !== undefined &&
      lastActiveNode !== treeContext?.activeNodeId &&
      treeContext?.activeNodeId === nodeId &&
      treeContext.isFocusWithin
    ) {
      ref.current.focus();
    }
  }, [treeContext?.activeNodeId]);

  // Update tab indexes of the node's element when the active node changes
  useEffect(() => {
    if (treeContext?.activeNodeId !== undefined) {
      updateTabIndexes();
    }
  }, [treeContext.activeNodeId, updateTabIndexes]);

  useMutationObservable(ref.current, updateTabIndexes);

  if (isHidden) {
    return null;
  }

  const { nodeProps, groupProps } = treeContext.getNodeAriaProps(nodeId);
  const isSelected =
    treeContext.itemSelection.selectionMode !== 'none'
      ? treeContext.itemSelection.isSelected(nodeId)
      : undefined;

  return (
    <FocusRing isInset={treeContext?.shouldNodeFocusBeInset}>
      <div
        tabIndex={tabIndex}
        id={id}
        style={style}
        ref={ref}
        aria-selected={isSelected}
        data-size={size}
        data-padded={isPadded}
        data-shape={shape}
        className={classnames(className, STYLE.wrapper, {
          selected: isPressed || isSelected,
          'active-node': nodeId === treeContext.activeNodeId,
        })}
        lang={lang}
        {...{ [NODE_ID_ATTRIBUTE_NAME]: nodeId }}
        {...treeNodePressProps}
        {...nodeProps}
        {...rest}
      >
        {content}
        {treeContext.isRenderedFlat && !nodeDetails.isLeaf && (
          <div className={STYLE.group} {...groupProps} />
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
