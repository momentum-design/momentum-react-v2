import React, {
  RefObject,
  forwardRef,
  ReactNode,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

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
import { Tooltip as MdcTooltip } from '@momentum-design/components/dist/react';

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
    interactive = DEFAULTS.INTERACTIVE,
    onPress,
    lang,
    allowTextSelection = DEFAULTS.ALLOW_TEXT_SELECTION,
    onFocus,
    onBlur,
    onBlurWithin,
    onFocusWithin,
    tooltipProps,
    ...rest
  } = props;

  const [itemId] = useState(rest.id || uuidv4());

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
  const setCurrentFocus = listContext?.setCurrentFocus;
  const setUpdateFocusBlocked = listContext?.setUpdateFocusBlocked;
  const shouldFocusOnPress = listContext?.shouldFocusOnPress || false;
  const shouldItemFocusBeInset =
    listContext?.shouldItemFocusBeInset || DEFAULTS.SHOULD_ITEM_FOCUS_BE_INSET;
  const listFocusedWithin = listContext?.isFocusedWithin;
  const addFocusCallback = listContext?.addFocusCallback;

  const [itemHasFocus, setItemHasFocus] = useState(false);

  const listItemTabIndex = getListItemBaseTabIndex({
    interactive,
    listContext,
    focus: itemHasFocus,
  });

  const previousItemIndex = usePrevious(itemIndex);

  const previousItemHasFocus = usePrevious(itemHasFocus);

  // New elements have been added to the list, and the currently focused element has been pushed down
  // We don't want the focus to move to the new item, the one that now has this items original index
  // So we set the focus to new index of the originally focused item
  useLayoutEffect(() => {
    if (previousItemHasFocus && itemIndex !== previousItemIndex && listFocusedWithin) {
      setCurrentFocus(itemIndex);
    }
  }, [
    itemHasFocus,
    itemIndex,
    listFocusedWithin,
    previousItemHasFocus,
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
    getKeyboardFocusableElements(ref.current, { includeTabbableOnly: false })
      .filter((el) => el.closest(`.${STYLE.wrapper}`) === ref.current)
      .forEach((el) =>
        el.setAttribute(
          'tabindex',
          isFocusedWithin || focusChild ? listItemTabIndex.toString() : '-1'
        )
      );
  }, [ref, isFocusedWithin, focusChild, listItemTabIndex]);

  // We must not autofocus when rendering new elements
  // If a new element is rendered that has the same index as current focus (i.e. the focused element is replaced)
  // then it would otherwise try and focus, because focus is not blocked and the element is the current focus
  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const onFocusCallback = useCallback(
    (focused, focusBlocked) => {
      setItemHasFocus(focused);

      if (!focused || focusBlocked || isFirstRender.current) {
        return;
      }

      if (!ref.current) {
        return;
      }

      const firstFocusable = getKeyboardFocusableElements(ref.current, {
        includeTabbableOnly: false,
      }).filter((el) => el.closest(`.${STYLE.wrapper}`) === ref.current)[0];

      if (focusChild) {
        firstFocusable?.focus();
      } else {
        ref.current.focus();
      }
    },
    [focusChild, ref]
  );

  // This registers the list item base with the orientation based keyboard navigation hook
  // The hook will then tell the list item when it has focus and when the focus is blocked
  useLayoutEffect(() => {
    if (addFocusCallback) {
      addFocusCallback(itemIndex, onFocusCallback);

      return () => {
        addFocusCallback?.(itemIndex, undefined);
      };
    }
  }, [addFocusCallback, itemIndex, onFocusCallback]);

  // When the current focus moves from the things inside the list item
  // to the list item itself, we need to update the tab indexes of the things inside again
  useEffect(() => {
    if (listContext && !itemHasFocus && isFocusedWithin) {
      return;
    }
    updateTabIndexes();
  }, [updateTabIndexes, listContext, itemHasFocus, isFocusedWithin]);

  useMutationObservable(ref.current, updateTabIndexes);

  useLayoutEffect(() => {
    if (itemHasFocus) {
      setUpdateFocusBlocked?.(false);
    }
  }, [itemHasFocus, setUpdateFocusBlocked]);

  const listElement = (
    <>
      <li
        tabIndex={focusChild ? -1 : listItemTabIndex}
        style={style}
        ref={ref}
        data-size={size}
        data-disabled={isDisabled}
        data-padded={isPadded}
        data-shape={shape}
        data-interactive={interactive && !focusChild}
        data-allow-text-select={allowTextSelection}
        className={classnames(className, STYLE.wrapper, { active: isPressed || isSelected })}
        role={role}
        lang={lang}
        {...focusProps}
        {...listItemPressProps}
        {...rest}
        id={itemId}
      >
        {content}
      </li>
      {!!tooltipProps?.content && (
        <MdcTooltip showArrow placement="top" triggerID={itemId} {...tooltipProps}>
          {tooltipProps.content}
        </MdcTooltip>
      )}
    </>
  );

  if (focusChild) {
    return listElement;
  }

  return <FocusRing isInset={shouldItemFocusBeInset}>{listElement}</FocusRing>;
};

/**
 * List Item Base component that can be used inside Lists/Menus
 */
/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const _ListItemBase = forwardRef(ListItemBase);
_ListItemBase.displayName = 'ListItemBase';

export default _ListItemBase;
