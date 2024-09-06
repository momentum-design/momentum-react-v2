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
import { getListItemBaseTabIndex, handleEmptyListItem } from './ListItemBase.utils';
import { useMutationObservable } from '../../hooks/useMutationObservable';
import { usePrevious } from '../../hooks/usePrevious';
import { getKeyboardFocusableElements } from '../../utils/navigation';

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
    focusChild = DEFAULTS.FOCUS_CHILD,
    isSelected,
    style,
    itemIndex,
    contextMenuActions,
    interactive = DEFAULTS.INTERACTIVE,
    onPress,
    lang,
    allowTextSelection = DEFAULTS.ALLOW_TEXT_SELECTION,
    ...rest
  } = props;

  let content: ReactNode, start: ReactNode, middle: ReactNode, end: ReactNode;

  const listContext = useListContext();

  const internalRef = useRef<HTMLLIElement>();

  const [isAriaHidden, setIsAriaHidden] = useState(false);

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
  const internalOnPress = useCallback(
    (event) => {
      if (event.pointerType === 'keyboard') {
        ref.current.click();
      }
      if (onPress) {
        onPress(event);
      }
    },
    [onPress, ref]
  );

  const { pressProps, isPressed } = usePress({
    preventFocusOnPress: true, // we handle it ourselves
    isDisabled: !interactive,
    onPress: internalOnPress,
    ...rest,
  });

  // Prevent list item update because it can cause state lost in the focused component e.g. Menu
  const listItemPressProps = allowTextSelection
    ? { ...rest }
    : {
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
  const currentFocus = listContext?.currentFocus;
  const focus = currentFocus === itemIndex;
  const listSize = listContext?.listSize || 0;
  const noLoop = listContext?.noLoop || false;
  const direction = listContext?.direction || 'forward';
  const setCurrentFocus = listContext?.setCurrentFocus;
  const setDirection = listContext?.setDirection;
  const isInitiallyRoving = listContext?.isInitiallyRoving;
  const setIsInitlallyRoving = listContext?.setIsInitiallyRoving;
  const shouldFocusOnPress = listContext?.shouldFocusOnPress || false;
  const shouldItemFocusBeInset =
    listContext?.shouldItemFocusBeInset || DEFAULTS.SHOULD_ITEM_FOCUS_BE_INSET;

  const listItemTabIndex = getListItemBaseTabIndex({ interactive, listContext, focus });

  // makes sure that whenever an item is pressed, the list focus state gets updated as well
  useEffect(() => {
    if (
      setCurrentFocus &&
      isPressed &&
      shouldFocusOnPress &&
      itemIndex !== undefined &&
      !focusChild
    ) {
      ref.current.focus();
      setCurrentFocus(itemIndex);
    }
  }, [focusChild, isPressed, itemIndex, listContext, ref, setCurrentFocus, shouldFocusOnPress]);

  const updateTabIndexes = useCallback(() => {
    getKeyboardFocusableElements(ref.current, false)
      .filter((el) => el.closest(`.${STYLE.wrapper}`) === ref.current)
      .forEach((el) => el.setAttribute('tabindex', listItemTabIndex.toString()));
  }, [ref, listItemTabIndex]);

  const lastCurrentFocus = usePrevious(currentFocus);
  useLayoutEffect(() => {
    if (
      lastCurrentFocus !== undefined &&
      lastCurrentFocus !== currentFocus &&
      focus &&
      !isInitiallyRoving
    ) {
      const firstFocusable = getKeyboardFocusableElements(ref.current, false).filter(
        (el) => el.closest(`.${STYLE.wrapper}`) === ref.current
      )[0];

      if (focusChild) {
        firstFocusable?.focus();
      } else {
        ref.current.focus();
      }
    }
  }, [currentFocus, focus, focusChild, isInitiallyRoving, itemIndex, lastCurrentFocus, ref]);

  /**
   * When the items inside the list context gets smaller (search/filter applied)
   * we want to silently update the currentFocus back to the first element in
   * case the index of the element focused before the list shrink is now outside
   * the size of the new list size (shrinked size)
   */
  useLayoutEffect(() => {
    if (!!listSize && currentFocus >= listSize) {
      // set focus to first item
      listContext.setCurrentFocus(0);
      updateTabIndexes();
    }
  }, [currentFocus, listContext, listSize, updateTabIndexes]);

  useEffect(() => {
    if (currentFocus === undefined) {
      return;
    }
    updateTabIndexes();
  }, [currentFocus, updateTabIndexes]);

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

  const handleOnContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      // Don't allow to open more context-menus at the same time
      if (document.getElementById('list-item-context-menu')) {
        return;
      }

      const { pageX, pageY } = event;
      setContextMenuState({ x: pageX, y: pageY, isOpen: !contextMenuState.isOpen });
    },
    [contextMenuState.isOpen]
  );

  useEffect(() => {
    if (contextMenuActions) {
      ref.current.addEventListener('contextmenu', handleOnContextMenu);
    }
    return () => {
      ref.current?.removeEventListener('contextmenu', handleOnContextMenu);
    };
  }, [contextMenuActions, handleOnContextMenu, ref]);

  useLayoutEffect(() => {
    setIsAriaHidden(!ref.current.childNodes.length);

    if (!ref.current.childNodes.length && focus) {
      handleEmptyListItem({
        direction,
        itemIndex,
        setCurrentFocus,
        setDirection,
        listSize,
        noLoop,
      });
    } else if (focus) {
      setIsInitlallyRoving?.(false);
    }
  }, [
    itemIndex,
    direction,
    focus,
    setCurrentFocus,
    setDirection,
    listSize,
    noLoop,
    setIsInitlallyRoving,
    ref,
  ]);

  const listElement = (
    <li
      tabIndex={focusChild ? -1 : listItemTabIndex}
      style={style}
      ref={ref}
      data-size={size}
      aria-hidden={isAriaHidden ? 'true' : undefined}
      data-disabled={isDisabled}
      data-padded={isPadded}
      data-shape={shape}
      data-interactive={interactive && !focusChild}
      data-allow-text-select={allowTextSelection}
      className={classnames(className, STYLE.wrapper, { active: isPressed || isSelected })}
      role={role}
      lang={lang}
      {...listItemPressProps}
      {...rest}
    >
      {content}
      {contextMenuActions && contextMenuState.isOpen && renderContextMenu()}
    </li>
  );

  if (focusChild) {
    return listElement;
  }

  return <FocusRing isInset={shouldItemFocusBeInset}>{listElement}</FocusRing>;
};

/**
 * List Item Base component that can be used inside Lists/Menus
 */

const _ListItemBase = forwardRef(ListItemBase);
_ListItemBase.displayName = 'ListItemBase';

export default _ListItemBase;
