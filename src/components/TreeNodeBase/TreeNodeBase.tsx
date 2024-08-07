import React, {
  RefObject,
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

import { DEFAULTS, KEYS, SHAPES, SIZES, STYLE } from './TreeNodeBase.constants';
import { Props } from './TreeNodeBase.types';
import { getTreeNodeBaseTabIndex } from './TreeNodeBase.utils';
import './TreeNodeBase.style.scss';
import { getKeyboardFocusableElements } from '../../utils/navigation';
import { usePrevious } from '../../hooks/usePrevious';
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect';

type RefOrCallbackRef = RefObject<HTMLLIElement> | ((instance: HTMLLIElement) => void);

const TreeNodeBase = (props: Props, providedRef: RefOrCallbackRef): ReactElement => {
  const {
    id,
    className,
    children,
    shape = DEFAULTS.SHAPE,
    size = DEFAULTS.SIZE(shape || DEFAULTS.SHAPE),
    isDisabled = DEFAULTS.IS_DISABLED,
    isPadded = DEFAULTS.IS_PADDED,
    isSelected,
    style,
    interactive = DEFAULTS.INTERACTIVE,
    onPress,
    lang,
    ...rest
  } = props;
  let content: ReactNode = null;

  const treeContext = useTreeContext();
  const { isHidden } = treeContext.getNodeDetails(id);

  const internalRef = useRef<HTMLLIElement>();

  let ref = internalRef;

  if (providedRef && typeof providedRef !== 'function') {
    ref = providedRef;
  }

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
          'TreeNodeBase: this component can only receive TreeNodeBaseSection as children.'
        );
      }
    }
  } else {
    content = children;
  }

  // The keyboard press events are not propagated
  // To make popovers work with click, we manually call the click event
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
    isDisabled: !interactive,
    onPress: internalOnPress,
    ...rest,
  });

  // Prevent tree node update because it can cause state lost in the focused component e.g. Menu
  const listItemPressProps = {
    ...pressProps,
    onKeyDown: (event) => {
      if (ref.current === document.activeElement || event.key === KEYS.TAB_KEY) {
        pressProps.onKeyDown(event);
      }
    },
  };

  /**
   * Focus management
   */
  const shouldFocusOnPress = treeContext?.shouldFocusOnPress || false;
  const shouldItemFocusBeInset =
    treeContext?.shouldItemFocusBeInset || DEFAULTS.SHOULD_ITEM_FOCUS_BE_INSET;

  const treeNodeTabIndex = getTreeNodeBaseTabIndex(id, treeContext.activeNodeId, interactive);

  // makes sure that whenever an item is pressed, the list focus state gets updated as well
  useEffect(() => {
    if (!isHidden && treeContext && isPressed && shouldFocusOnPress && id !== undefined) {
      ref.current.focus();
      treeContext.setActiveNodeId(id);
      treeContext.toggleTreeNode(id);
    }
  }, [isPressed, isHidden]);

  const updateTabIndexes = useCallback(() => {
    if (!isHidden) {
      getKeyboardFocusableElements(ref.current, false)
        .filter((el) => el.closest(`.${STYLE.wrapper}`) === ref.current)
        .forEach((el) => el.setAttribute('tabindex', treeNodeTabIndex.toString()));
    }
  }, [ref, treeNodeTabIndex, isHidden]);

  const lastCurrentFocus = usePrevious(treeContext?.activeNodeId);
  useDidUpdateEffect(() => {
    if (
      lastCurrentFocus !== undefined &&
      lastCurrentFocus !== treeContext?.activeNodeId &&
      treeContext?.activeNodeId === id
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
    <FocusRing isInset={shouldItemFocusBeInset}>
      <li
        tabIndex={treeNodeTabIndex}
        style={style}
        ref={ref}
        data-size={size}
        data-disabled={isDisabled}
        data-padded={isPadded}
        data-shape={shape}
        data-interactive={interactive}
        className={classnames(className, STYLE.wrapper, { active: isPressed || isSelected })}
        lang={lang}
        {...listItemPressProps}
        {...treeContext.getNodeProps(id)}
      >
        {content}
        {treeContext.isRenderedFlat ?? <div {...treeContext.getNodeGroupProps(id)} />}
      </li>
    </FocusRing>
  );
};

/**
 * Tree Node Base component that can be used inside Trees
 */
const _TreeNodeBase = forwardRef(TreeNodeBase);
_TreeNodeBase.displayName = 'TreeNodeBase';

export default _TreeNodeBase;
