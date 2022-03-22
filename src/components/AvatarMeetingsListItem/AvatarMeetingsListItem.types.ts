import { CSSProperties, ReactElement, ReactNode } from 'react';

import { PressEvent } from '@react-types/shared';

import { AvatarProps } from 'components/Avatar';

export enum AvatarMeetingsListItemActions {
  mute = 'mute',
  more = 'more',
  closeOnHover = 'close-on-hover',
}
export interface Props {
  /**
   * Child components of this ButtonPill.
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
   * Props passed to the Avatar component, apart from size which is fixed
   */
  avatarProps?: Omit<AvatarProps, 'size'>;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Determines the state of the scheduler and will display an according icon.
   */
  schedulerState?: 'available' | 'unavailable' | 'unknown' | 'quiet-hours' | 'none';

  /**
   * Text displayed on the first line of the item. (if only firstLine is provided, it will be centered).
   */
  firstLine?: string;

  /**
   * Text displayed on the second line of the item.
   */
  secondLine?: string;

  /**
   *  Callback passed to hover close button as event handler.
   */
  onHoverActionCallback?: (e: PressEvent) => void;

  /**
   * Callback passed down to the mute/unmute button.
   */
  onPressMuteAction?: (e: PressEvent) => void;

  /**
   * Determines what actions will be displayed inside the list item.
   */
  displayActions?: Array<AvatarMeetingsListItemActions>;

  /**
   * Determines the style/color of the microphone icon button if present.
   */
  isMuted?: boolean;
  /**
   * Represents the actions menu displayed when the more button is pressed.
   */
  moreActionMenu?: ReactElement;
}
