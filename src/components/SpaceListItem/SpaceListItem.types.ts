import { PressEvents } from '@react-types/shared';
import { CSSProperties, ReactNode } from 'react';
import { ContextMenu } from '../ListItemBase/ListItemBase.types';
import { TeamColor } from '../ThemeProvider/ThemeProvider.types';

export interface Props extends PressEvents, ContextMenu {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Draft text inside conversation (Can be also a staged file).
   */
  isDraft?: boolean;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Avatar Component
   */
  avatar?: ReactNode;

  /**
   * Text displayed on the first line of the item. (if only firstLine is provided, it will be centered).
   */
  firstLine?: string;

  /**
   * Text displayed on the second line of the item. (Can be more than one string)
   */
  secondLine?: string | string[];

  /**
   * Determines whether there is content inside the space that is not read.
   */
  isUnread?: boolean;

  /**
   * Determines whether there is new activity in this space (text appears in bold).
   */
  isNewActivity?: boolean;

  /**
   * Team Color
   */
  teamColor?: TeamColor;

  /**
   * Determines whether somebody mentioned the logged in user in this chat.
   */
  isMention?: boolean;

  /**
   * Determines whether the user has just been invited to this space.
   */
  isEnterRoom?: boolean;

  /**
   * Determines whether alerts on this space are muted.
   */
  isAlertMuted?: boolean;

  /**
   * Determines whether we should display an alert icon.
   */
  isAlert?: boolean;

  /**
   * Determines if there's an error inside this space.
   */
  isError?: boolean;

  /**
   * If provided, it will be displayed on the right side of the list item.
   */
  action?: ReactNode;

  /**
   * Determines whether this list item is selected (part of ListItemBase)
   */
  isSelected?: boolean;

  /**
   * Determines whether the list item is compact or not
   */
  isCompact?: boolean;

  /**
   * Used to manage focus when this is used inside a list.
   */
  itemIndex?: number;

  /**
   * Right icon tooltip shown on hover.
   */
  rightIconTooltip?: string;
}

export interface SecondLineElementProps {
  /**
   * Text displayed as part of the second line of SpaceListItem component.
   */
  children: string;

  /**
   * Determines whether a DividerDot is shown before children prop or not.
   */
  showDividerDot?: boolean;
}
