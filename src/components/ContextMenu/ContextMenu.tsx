import React, { FC, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

import { STYLE } from './ContextMenu.constants';
import { ContextMenuState, Props } from './ContextMenu.types';
import './ContextMenu.style.scss';
import { useOverlay } from 'react-aria';
import ModalContainer from '../ModalContainer';
import ButtonSimple from '../ButtonSimple';

/**
 * The ContextMenu component.
 */
const ContextMenu: FC<Props> = (props: Props) => {
  const { className, id = 'context-menu', style, contextMenuActions, triggerRef } = props;

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

  const handleOnContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    // Don't allow to open more context-menus at the same time
    if (document.getElementById(id)) {
      return;
    }

    const { pageX, pageY } = event;
    setContextMenuState({ x: pageX, y: pageY, isOpen: !contextMenuState.isOpen });
  };

  useEffect(() => {
    if (contextMenuActions) {
      triggerRef.current.addEventListener('contextmenu', handleOnContextMenu);
    }
    return () => {
      triggerRef.current?.removeEventListener('contextmenu', handleOnContextMenu);
    };
  }, []);

  if (!contextMenuActions || !contextMenuState.isOpen) {
    return null;
  }

  return (
    <ModalContainer
      isPadded
      round={75}
      className={classnames(className, STYLE.wrapper)}
      {...overlayProps}
      id={id}
      color={'primary' as const}
      style={{
        position: 'fixed',
        left: `${contextMenuState.x}px`,
        top: `${contextMenuState.y}px`,
        ...style,
      }}
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

export default ContextMenu;
