import React, {
  RefObject,
  forwardRef,
  ReactNode,
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
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
import { getListItemBaseTabIndex } from './ListItemBase.utils';
import { useMutationObservable } from '../../hooks/useMutationObservable';
import { usePrevious } from '../../hooks/usePrevious';
import { getKeyboardFocusableElements } from '../../utils/navigation';
import { useDidUpdateEffect } from '../../hooks/useDidUpdateEffect';

type RefOrCallbackRef = RefObject<HTMLLIElement> | ((instance: HTMLLIElement) => void);

//TODO: Implement multi-line
const ListItemBase = (props: Props, providedRef: RefOrCallbackRef) => {
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
    onPress,
    lang,
    ...rest
  } = props;

  let content: ReactNode, start: ReactNode, middle: ReactNode, end: ReactNode;

  const listContext = useListContext();

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
    if (providedRef) {
      if (typeof providedRef === 'function') {
        providedRef(ref.current);
      }
    }
  });

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

  // Prevent list item update because it can cause state lost in the focused component e.g. Menu
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
    getKeyboardFocusableElements(ref.current, false)
      .filter((el) => el.closest(`.${STYLE.wrapper}`) === ref.current)
      .forEach((el) => el.setAttribute('tabindex', listItemTabIndex.toString()));
  }, [ref, listItemTabIndex]);

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
        lang={lang}
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
