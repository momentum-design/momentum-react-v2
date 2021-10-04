import { CSSProperties, ReactNode } from 'react';
import { AvatarProps } from '../Avatar';
import { TeamColor } from '../ThemeProvider/ThemeProvider.types';

export interface Props {
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
   * Props passed to the Avatar component, apart from size which is fixed.
   */
  avatarProps?: Omit<AvatarProps, 'size'>;

  /**
   * Text displayed on the first line of the item. (if only firstLine is provided, it will be centered).
   */
  firstLine?: string;

  /**
   * Text displayed on the second line of the item. (Can be more than one string)
   */
  secondLine?: string | string[];

  /**
   * Determines weather there is new activity in this space (text appears in bold).
   */
  isNewActivity?: boolean;

  /**
   * Team Color
   */
  teamColor?: TeamColor;

  /**
   * Determines weather somebody mentioned the logged in user in this chat.
   */
  isMention?: boolean;

  /**
   * Determines weather the user has just been invited to this space.
   */
  isEnterRoom?: boolean;

  /**
   * Determines weather alerts on this space are muted.
   */
  isAlertMuted?: boolean;

  /**
   * Determines if there's an error inside this space.
   */
  isError?: boolean;

  /**
   * If provided, it will be displayed on the right side of the list item.
   */
  action?: ReactNode;
}
