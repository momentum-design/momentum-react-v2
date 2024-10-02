import { PressEvents } from '@react-types/shared';
import { CSSProperties } from 'react';
import { SpaceRowContentProps } from '../SpaceRowContent';
import { ContextMenuActionsProp } from '../ContextMenu/ContextMenu.types';

export interface Props extends PressEvents, ContextMenuActionsProp, SpaceRowContentProps {
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
   * Used to manage focus when this is used inside a list.
   */
  itemIndex?: number;

  /**
   * Title of this SpaceListItem. Appears below the item box.
   */
  title?: string;
}
