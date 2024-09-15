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
import { useFocusAndFocusWithinState } from '../../hooks/useFocusState';

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
    onFocus,
    onBlur,
    onBlurWithin,
    onFocusWithin,
    ...rest
  } = props;

  let content: ReactNode, start: ReactNode, middle: ReactNode, end: ReactNode;

  const listContext = useListContext();

  const internalRef = useRef<HTMLLIElement>();

  const [isAriaHidden, setIsAriaHidden] = useState(false);

  const { focusProps, isFocusedWithin, isFocused } = useFocusAndFocusWithinState({
    onFocus,
    onBlur,
    onBlurWithin,
    onFocusWithin,
  });

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

  // This is a workaround because react-aria is killing the mouse/pointer events
  // It determines whether to prevent default by whether the element is draggable or not
  // So we set it to draggable on mouse down and pointer down and then set it back to false
  // This allows text selection to work, which requires the pointer events but still allows
  // click to work via the usePress hook
  // see https://github.com/adobe/react-spectrum/issues/2956
  // If react-aria ever fix this, this workaround can be removed
  const listItemPressProps = {
    ...pressProps,
    onMouseDown: (event) => {
      event.target.draggable = true;
      pressProps.onMouseDown?.(event);
      event.target.draggable = false;
    },
    onPointerDown: (event) => {
      event.target.draggable = true;
      pressProps.onPointerDown?.(event);
      event.target.draggable = false;
    },
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
  const listFocusedWithin = listContext?.isFocusedWithin;

  const listItemTabIndex = getListItemBaseTabIndex({ interactive, listContext, focus });

  const previousItemIndex = usePrevious(itemIndex);
  const lastCurrentFocus = usePrevious(currentFocus);

  // When an item is added to the list, we need to reset the focus since the list size has changed
  // and maybe the item index has changed as well
  useLayoutEffect(() => {
    if (
      itemIndex !== previousItemIndex &&
      currentFocus === previousItemIndex &&
      listFocusedWithin
    ) {
      setCurrentFocus(itemIndex);
    }
  }, [
    currentFocus,
    itemIndex,
    lastCurrentFocus,
    listFocusedWithin,
    previousItemIndex,
    setCurrentFocus,
  ]);

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
    // if (rest.id === 'top' || rest.id === 'meeting-list-item') {
    //   console.log('updating tab indexes', rest.id, getKeyboardFocusableElements(ref.current, false));
    //   // debugger;
    // }

    /**
     * when should the list item change the focus of its children and which children?
     *
     * when the top list item is focused, immediate children i.e. not under the next list should have tabIndex set
     * test 1: !(focused within, but not focused)
     *
     */

    getKeyboardFocusableElements(ref.current, false)
      .filter((el) => {
        const closestListItemBase = (el.parentNode as Element).closest(`.${STYLE.wrapper}`);
        // const closestListItemBase = el.closest(`.${STYLE.wrapper}`);

        // console.log(closestListItemBase, closestListItemBase.getAttribute('data-is-current-focus'));

        // console.log(
        //   'closest list item base',
        //   closestListItemBase.id,
        //   el.id,
        //   closestListItemBase.getAttribute('data-isfocused'),
        //   closestListItemBase.getAttribute('data-isfocusedwithin'),
        //   el.getAttribute('data-isfocused'),
        //   el.getAttribute('data-isfocusedwithin'),
        //   'isFocusedWithin', isFocusedWithin,
        //   'setting to', isFocusedWithin || focusChild ? listItemTabIndex.toString() : '-1'
        // );

        return closestListItemBase === ref.current; // && (
        //!(closestListItemBase.getAttribute('data-isfocused') === 'false' && closestListItemBase.getAttribute('data-isfocusedwithin') === 'true')
        // (closestListItemBase.getAttribute('data-isfocused') === 'true' && closestListItemBase.getAttribute('data-isfocusedwithin') === 'true')
        //);
      }) // TODO: work out if this breaks things
      .forEach((el) => {
        const closestParentListItemBase = (el.parentNode as Element).closest(`.${STYLE.wrapper}`);
        let newFocusValue = isFocusedWithin || focusChild ? listItemTabIndex.toString() : '-1';

        // if (el.id.includes('inner')) {
        //   console.log('inner', el.classList.contains(STYLE.wrapper), el.classList, `.${STYLE.wrapper}`);
        //   // console.log('parent of inner 0', closestParentListItemBase.getAttribute('data-isfocused'));
        // }

        if (
          el.classList.contains(STYLE.wrapper) &&
          closestParentListItemBase &&
          closestParentListItemBase.getAttribute('data-isfocused') === 'false'
        ) {
          // console.log('parent is not focused, setting to -1', closestParentListItemBase.id, el.id);
          newFocusValue = '-1';
        }

        el.setAttribute('tabindex', newFocusValue);
      });
    // Also include "focus" in the dependencies to update the tab indexes when the focus changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, ref, isFocused, isFocusedWithin, focusChild, listItemTabIndex]);

  useLayoutEffect(() => {
    if (
      lastCurrentFocus !== undefined && // prevents focus of new elements
      (lastCurrentFocus !== currentFocus || (!isFocusedWithin && listFocusedWithin)) && // focuses the new element in up/down navigation
      focus && // only focus the actually focused item
      !isInitiallyRoving // Don't focus anything at all while the list is finding its initial focus
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
  }, [
    currentFocus,
    focus,
    focusChild,
    isFocused,
    isFocusedWithin,
    isInitiallyRoving,
    itemIndex,
    lastCurrentFocus,
    listFocusedWithin,
    listSize,
    previousItemIndex,
    ref,
  ]);

  /**
   * When the items inside the list context gets smaller (search/filter applied)
   * we want to silently update the currentFocus back to the first element in
   * case the index of the element focused before the list shrink is now outside
   * the size of the new list size (shrinked size)
   */
  useLayoutEffect(() => {
    // if (!!listSize && currentFocus >= listSize) {
    if (!!listSize && currentFocus >= listSize) {
      // set focus to last item
      listContext.setCurrentFocus(listSize - 1);
      updateTabIndexes();
    }
  }, [currentFocus, listContext, listSize, updateTabIndexes]);

  useEffect(() => {
    if (currentFocus === undefined) {
      return;
    }
    updateTabIndexes();
  }, [currentFocus, updateTabIndexes, isFocusedWithin]);

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
      data-is-current-focus={focus}
      data-isfocused={isFocused}
      data-isfocusedwithin={isFocusedWithin}
      data-interactive={interactive && !focusChild}
      data-allow-text-select={allowTextSelection}
      className={classnames(className, STYLE.wrapper, { active: isPressed || isSelected })}
      role={role}
      lang={lang}
      {...focusProps}
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
