import React, {
  RefObject,
  forwardRef,
  ReactNode,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import classnames from 'classnames';

import './ListItemBase.style.scss';
import { ContextMenuState, Props } from './ListItemBase.types';
import { DEFAULTS, KEYS, SHAPES, SIZES, STYLE } from './ListItemBase.constants';
import ListItemBaseSection from '../ListItemBaseSection';
import { verifyTypes } from '../../helpers/verifyTypes';
import FocusRing from '../FocusRing';
import { usePress } from '@react-aria/interactions';
import ModalContainer from '../ModalContainer';
import { useOverlay } from '@react-aria/overlays';
import { useListContext } from '../List/List.utils';
import ButtonSimple from '../ButtonSimple';
import Text from '../Text';
import {
  getKeyboardFocusableElements,
  getListItemBaseTabIndex,
  handleLeftRightArrowNavigation,
  useDidUpdateEffect,
} from './ListItemBase.utils';
import { useMutationObservable } from '../../hooks/useMutationObservable';
import { usePrevious } from '../../hooks/usePrevious';

//TODO: Implement multi-line
const ListItemBase = (props: Props, providedRef: RefObject<HTMLLIElement>) => {
  const {
    className,
    children,
    shape = DEFAULTS.SHAPE,
    size = DEFAULTS.SIZE(shape || DEFAULTS.SHAPE),
    isDisabled = DEFAULTS.IS_DISABLED,
    isPadded = DEFAULTS.IS_PADDED,
    role = DEFAULTS.ROLE,
    isSelected,
    style,
    itemIndex,
    contextMenuActions,
    interactive = DEFAULTS.INTERACTIVE,
    ...rest
  } = props;

  let content: ReactNode, start: ReactNode, middle: ReactNode, end: ReactNode;

  const listContext = useListContext();

  const internalRef = useRef<HTMLLIElement>();
  const ref = providedRef || internalRef;
  const navigableChildren = useRef<Element[]>();

  if (shape === SHAPES.isPilled && (size === SIZES[40] || size === SIZES[70])) {
    console.warn(
      'ListItemBase: This variation is against the design spec. Rounded List Items can only be size 32 or 50.'
    );
  }

  if (Array.isArray(children)) {
    if (children.length > 3) {
      console.warn('ListItemBase: This component can only have at most 3 sections inside.');
    } else {
      if (verifyTypes(children, ListItemBaseSection)) {
        start = children[0];
        middle = children[1];
        end = children[2];
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
          'ListItemBase: this component can only receive ListItemBaseSection as children.'
        );
      }
    }
  } else {
    content = children;
  }

  const { pressProps, isPressed } = usePress({
    preventFocusOnPress: true, // we handle it ourselves
    isDisabled: !interactive,
    ...rest,
  });

  // Update navigableChildren if children change
  useEffect(() => {
    if (children) {
      navigableChildren.current = getKeyboardFocusableElements(ref.current, false);
    }
  }, [ref, children]);

  // Prevent list item update because it can cause state lost in the focused component e.g. Menu
  const listItemPressProps = {
    ...pressProps,
    onKeyDown: (event) => {
      if (ref.current === document.activeElement || event.key === KEYS.TAB_KEY) {
        pressProps.onKeyDown(event);
      }

      if (event.key === KEYS.RIGHT_KEY || event.key === KEYS.LEFT_KEY) {
        if (!navigableChildren.current) {
          navigableChildren.current = getKeyboardFocusableElements(ref.current, false);
        }
        if (navigableChildren.current.length > 0) {
          handleLeftRightArrowNavigation(event, navigableChildren.current);
        }
      }
    },
  };

  /**
   * Focus management
   */
  const focus = listContext?.currentFocus === itemIndex;
  const shouldFocusOnPress = listContext?.shouldFocusOnPress || false;
  const shouldItemFocusBeInset =
    listContext?.shouldItemFocusBeInset || DEFAULTS.SHOULD_ITEM_FOCUS_BE_INSET;

  const listItemTabIndex = getListItemBaseTabIndex({ interactive, listContext, focus });

  // makes sure that whenever an item is pressed, the list focus state gets updated as well
  useEffect(() => {
    if (listContext?.setContext && isPressed && shouldFocusOnPress && itemIndex !== undefined) {
      ref.current.focus();
      listContext.setContext(itemIndex);
    }
  }, [isPressed]);

  const updateTabIndexes = useCallback(() => {
    getKeyboardFocusableElements(ref.current)
      .filter((el) => el.closest(`.${STYLE.wrapper}`) === ref.current)
      .forEach((el) => el.setAttribute('tabindex', '-1'));
  }, [ref]);

  const lastCurrentFocus = usePrevious(listContext?.currentFocus);
  useDidUpdateEffect(() => {
    if (lastCurrentFocus !== undefined && lastCurrentFocus !== listContext?.currentFocus && focus) {
      ref.current.focus();
    }
  }, [listContext?.currentFocus]);

  /**
   * When the items inside the list context gets smaller (search/filter applied)
   * we want to silently update the currentFocus back to the first element in
   * case the index of the element focused before the list shrink is now outside
   * the size of the new list size (shrinked size)
   */
  useEffect(() => {
    if (!!listContext?.listSize && listContext?.currentFocus >= listContext?.listSize) {
      // set focus to first item
      listContext.setContext(0);
      updateTabIndexes();
    }
  }, [listContext?.currentFocus, listContext?.listSize]);

  useEffect(() => {
    if (listContext?.currentFocus === undefined) {
      return;
    }
    updateTabIndexes();
  }, [listContext?.currentFocus]);

  useMutationObservable(ref.current, updateTabIndexes);

  /**
   * Context menu
   */

  const [contextMenuState, setContextMenuState] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const toggleContextMenu = () => {
    setContextMenuState({ ...contextMenuState, isOpen: !contextMenuState.isOpen });
  };

  const overlayRef = useRef();
  const { overlayProps } = useOverlay(
    {
      onClose: () => toggleContextMenu(),
      shouldCloseOnBlur: true,
      isOpen: contextMenuState.isOpen,
      isDismissable: true,
    },
    overlayRef
  );

  const renderContextMenu = () => {
    const { x, y } = contextMenuState;

    return (
      <ModalContainer
        isPadded
        round={75}
        className={STYLE.contextMenuWrapper}
        {...overlayProps}
        id="list-item-context-menu"
        color={'primary' as const}
        style={{ position: 'fixed', left: `${x}px`, top: `${y}px` }}
        ref={overlayRef}
      >
        {contextMenuActions.map((item, index) => (
          <ButtonSimple
            key={index}
            aria-label={item?.text}
            onPress={() => {
              toggleContextMenu();
              item?.action();
            }}
          >
            {item?.text}
          </ButtonSimple>
        ))}
      </ModalContainer>
    );
  };

  const handleOnContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    // Don't allow to open more context-menus at the same time
    if (document.getElementById('list-item-context-menu')) {
      return;
    }

    const { pageX, pageY } = event;
    setContextMenuState({ x: pageX, y: pageY, isOpen: !contextMenuState.isOpen });
  };

  useEffect(() => {
    if (contextMenuActions) {
      ref.current.addEventListener('contextmenu', handleOnContextMenu);
    }
    return () => {
      ref.current?.removeEventListener('contextmenu', handleOnContextMenu);
    };
  }, []);

  return (
    <FocusRing isInset={shouldItemFocusBeInset}>
      <li
        tabIndex={listItemTabIndex}
        style={style}
        ref={ref}
        data-size={size}
        data-disabled={isDisabled}
        data-padded={isPadded}
        data-shape={shape}
        data-interactive={interactive}
        className={classnames(className, STYLE.wrapper, { active: isPressed || isSelected })}
        role={role}
        {...listItemPressProps}
      >
        {content}
        {contextMenuActions && contextMenuState.isOpen && renderContextMenu()}
      </li>
    </FocusRing>
  );
};

/**
 * List Item Base component that can be used inside Lists/Menus
 */

const _ListItemBase = forwardRef(ListItemBase);
_ListItemBase.displayName = 'ListItemBase';

export default _ListItemBase;
