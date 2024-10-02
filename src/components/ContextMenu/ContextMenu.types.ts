import { CSSProperties, ReactNode, RefObject } from 'react';

export interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
}

type ContextMenuAction = {
  text?: string;
  action?: () => void;
};

export interface ContextMenuActionsProp {
  contextMenuActions?: ContextMenuAction[];
}

export interface Props extends ContextMenuActionsProp {
  /**
   * Child components of this ContextMenu.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Ref object of the context menu trigger.
   */
  triggerRef?: RefObject<HTMLElement>;
}
