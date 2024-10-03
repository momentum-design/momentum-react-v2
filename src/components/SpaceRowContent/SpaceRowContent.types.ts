import { ReactNode } from 'react';
import { TeamColor } from '../ThemeProvider/ThemeProvider.types';

type MenuItem = {
  key: string;
  text: string;
};

export interface SpaceRowContentMenuProps {
  menuItems?: MenuItem[];
  onSelectMenuItem?: (key: string) => void;
  menuTriggerLabel?: string;
}

export interface Props extends SpaceRowContentMenuProps {
  /**
   * Determines whether there is new activity in this space (text appears in bold).
   */
  isNewActivity?: boolean;

  /**
   * Draft text inside conversation (Can be also a staged file).
   */
  isDraft?: boolean;

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
   * Right icon tooltip shown on hover.
   */
  rightIconTooltip?: string;

  /**
   * Whether or not this SpaceRowContent should look disabled, but allowing actions like onPress to be passed.
   */
  isDisabled?: boolean;
}
