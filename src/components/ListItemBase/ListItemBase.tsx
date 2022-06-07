import classnames from 'classnames';
import React, { RefObject, forwardRef, ReactNode, useRef, useEffect, useState } from 'react';

import './ListItemBase.style.scss';
import { usePress } from '@react-aria/interactions';
import { useOverlay } from '@react-aria/overlays';

import ButtonSimple from 'components/ButtonSimple';
import FocusRing from 'components/FocusRing';
import { useListContext } from 'components/List/List.utils';
import ListItemBaseSection from 'components/ListItemBaseSection';
import ModalContainer from 'components/ModalContainer';
import Text from 'components/Text';
import { verifyTypes } from 'helpers/verifyTypes';

import { DEFAULTS, SHAPES, SIZES, STYLE } from './ListItemBase.constants';
import { ContextMenuState, Props } from './ListItemBase.types';

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

  /**
   * Focus management
   */

  const focus = listContext?.currentFocus === itemIndex;
  const shouldFocusOnPress = listContext?.shouldFocusOnPress || false;
  const shouldItemFocusBeInset =
    listContext?.shouldItemFocusBeInset || DEFAULTS.SHOULD_ITEM_FOCUS_BE_INSET;

  // makes sure that whenever an item is pressed, the list focus state gets updated as well
  useEffect(() => {
    if (listContext && listContext?.setContext && isPressed && shouldFocusOnPress) {
      ref.current.focus();
      listContext.setContext(itemIndex);
    }
  }, [isPressed]);

  function getKeyboardFocusableElements<T extends HTMLElement>(_ref: RefObject<T>) {
    const result = _ref.current.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    );
    return Array.from(result).filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
    );
  }

  useEffect(() => {
    if (!listContext?.currentFocus) {
      return;
    }

    const focusableElements = getKeyboardFocusableElements(ref);

    if (focus) {
      ref.current.focus();

      focusableElements.forEach((element) => {
        element.setAttribute('tabindex', '0');
      });
    } else {
      focusableElements.forEach((element) => {
        element.setAttribute('tabindex', '-2');
      });
    }
  }, [listContext?.currentFocus]);

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
    () => {
      ref.current.removeEventListener('contextmenu', handleOnContextMenu);
    };
  }, []);

  return (
    <FocusRing isInset={shouldItemFocusBeInset}>
      <li
        tabIndex={listContext ? (focus ? 0 : -1) : 0}
        style={style}
        ref={ref}
        data-size={size}
        data-disabled={isDisabled}
        data-padded={isPadded}
        data-shape={shape}
        data-interactive={interactive}
        className={classnames(className, STYLE.wrapper, { active: isPressed || isSelected })}
        role={role}
        {...pressProps}
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
