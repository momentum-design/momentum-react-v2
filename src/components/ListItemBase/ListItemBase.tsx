import React, { RefObject, forwardRef, ReactNode, useRef, useEffect, useState } from 'react';
import classnames from 'classnames';

import './ListItemBase.style.scss';
import { ContextMenuState, Props } from './ListItemBase.types';
import { DEFAULTS, SHAPES, SIZES, STYLE } from './ListItemBase.constants';
import ListItemBaseSection from '../ListItemBaseSection';
import { verifyTypes } from '../../helpers/verifyTypes';
import FocusRing from '../FocusRing';
import { usePress } from '@react-aria/interactions';
import ModalContainer from '../ModalContainer';
import { useOverlay } from '@react-aria/overlays';
import { useListContext } from '../List/List.utils';
import ButtonSimple from '../ButtonSimple';

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
    ...rest
  } = props;

  let content: ReactNode, start: ReactNode, middle: ReactNode, end: ReactNode;

  const listContext = useListContext();
  const focus = listContext?.currentFocus === itemIndex;
  const shouldFocusOnPress = listContext?.shouldFocusOnPress || false;
  const shouldItemFocusBeInset =
    listContext?.shouldItemFocusBeInset || DEFAULTS.SHOULD_ITEM_FOCUS_BE_INSET;

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
      } else {
        console.warn(
          'ListItemBase: this component can only receive ListItemBaseSection as children.'
        );
      }
    }
  } else {
    content = children;
  }

  const [contextMenuState, setContextMenuState] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
  });

  const toggleContextMenu = () => {
    setContextMenuState({ ...contextMenuState, isOpen: !contextMenuState.isOpen });
  };

  const { pressProps, isPressed } = usePress({
    preventFocusOnPress: !shouldFocusOnPress,
    ...rest,
  });

  function getKeyboardFocusableElements<T extends HTMLElement>(_ref: RefObject<T>) {
    const result = _ref.current.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
    );
    return Array.from(result).filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
    );
  }

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

  /**
   * Handle keyboard navigation for any focusable elements inside list items
   * Make them focusable only when the current list-item is focusable, otherwise
   * make them non-focusable.
   */

  useEffect(() => {
    // TODO: Maybe this should be performed only once?
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
  }, [focus, ref.current]);

  return (
    <FocusRing isInset={shouldItemFocusBeInset}>
      <li
        tabIndex={focus ? 0 : -1}
        style={style}
        ref={ref}
        data-size={size}
        data-disabled={isDisabled}
        data-padded={isPadded}
        data-shape={shape}
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
