import React, {
  RefObject,
  forwardRef,
  ReactNode,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import classnames from 'classnames';

import './ListItemBase.style.scss';
import { Props } from './ListItemBase.types';
import { DEFAULTS, KEYS, SHAPES, SIZES, STYLE } from './ListItemBase.constants';
import ListItemBaseSection from '../ListItemBaseSection';
import { verifyTypes } from '../../helpers/verifyTypes';
import FocusRing from '../FocusRing';
import { usePress } from '@react-aria/interactions';
import { useListContext } from '../List/List.utils';
import Text from '../Text';
import { getListItemBaseTabIndex } from './ListItemBase.utils';
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
    isFocused = DEFAULTS.IS_FOCUSED,
    isPadded = DEFAULTS.IS_PADDED,
    role = DEFAULTS.ROLE,
    focusChild = DEFAULTS.FOCUS_CHILD,
    isSelected,
    style,
    itemIndex,
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

  const { focusProps, isFocusedWithin } = useFocusAndFocusWithinState({
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
  const setCurrentFocus = listContext?.setCurrentFocus;
  const updateFocusBlocked = listContext?.updateFocusBlocked;
  const setUpdateFocusBlocked = listContext?.setUpdateFocusBlocked;
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
    getKeyboardFocusableElements(ref.current, false)
      .filter((el) => el.closest(`.${STYLE.wrapper}`) === ref.current)
      .forEach((el) =>
        el.setAttribute(
          'tabindex',
          isFocusedWithin || focusChild ? listItemTabIndex.toString() : '-1'
        )
      );
    // Also include "focus" in the dependencies to update the tab indexes when the focus changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, ref, isFocusedWithin, focusChild, listItemTabIndex]);

  useLayoutEffect(() => {
    if (
      lastCurrentFocus !== undefined && // prevents focus of new elements
      (lastCurrentFocus !== currentFocus || (!isFocusedWithin && listFocusedWithin)) && // focuses the new element in up/down navigation
      focus && // only focus the actually focused item
      !updateFocusBlocked // Don't focus anything at all while the list is finding its initial focus
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
    isFocusedWithin,
    updateFocusBlocked,
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
    if (!!listSize && currentFocus >= listSize) {
      // set focus to last item
      listContext.setCurrentFocus(listSize - 1);
      updateTabIndexes();
    }
  }, [currentFocus, listContext, listSize, updateTabIndexes]);

  useEffect(() => {
    if (listContext && currentFocus === undefined) {
      return;
    }
    updateTabIndexes();
  }, [currentFocus, updateTabIndexes, isFocusedWithin, listContext]);

  useMutationObservable(ref.current, updateTabIndexes);

  useLayoutEffect(() => {
    if (focus) {
      setUpdateFocusBlocked?.(false);
    }
  }, [focus, setUpdateFocusBlocked]);

  const listElement = (
    <li
      tabIndex={focusChild ? -1 : listItemTabIndex}
      style={style}
      ref={ref}
      data-size={size}
      data-disabled={isDisabled}
      data-padded={isPadded}
      data-shape={shape}
      data-focused={isFocused}
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
