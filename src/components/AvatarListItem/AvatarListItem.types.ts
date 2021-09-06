import { PressEvent } from '@react-types/shared';
import { CSSProperties, ReactElement, ReactNode } from 'react';
import { AvatarProps } from '../Avatar';

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
   * If the scheduler is unknown, an appropriate icon will be displayed.
   */
  isSchedulerUnknown?: boolean;

  /**
   * If the scheduler is unavailable, an appropriate icon will be displayed.
   */
  isSchedulerUnavailable?: boolean;

  /**
   * If the scheduler is available, an appropriate icon will be displayed.
   */
  isSchedulerAvailable?: boolean;

  /**
   * If the scheduler is quiet hours, an appropriate icon will be displayed.
   */
  isSchedulerQHours?: boolean;

  /**
   * Text displayed on the first line of the item. (if only firstLine is provided, it will be centered).
   */
  firstLine?: string;

  /**
   * Text displayed on the second line of the item.
   */
  secondLine?: string;

  /**
   * If true, a close button will appear on hover.
   */
  displayHoverAction?: boolean;

  /**
   *  Callback passed to hover close button as event handler.
   */
  onHoverActionCallback?: (e: PressEvent) => void;

  /**
   * Callback passed down to the mute/unmute button.
   */
  onPressMuteAction?: (e: PressEvent) => void;

  /**
   * Determines the style/color of the microphone icon button if present.
   */
  isMuted?: boolean;

  /**
   * Determines weather to display the mute icon button.
   */
  displayMuteAction?: boolean;

  /**
   * Determines weather to display the more action menu list.
   */
  displayMoreAction?: boolean;

  /**
   * Represents the actions menu displayed when the more button is pressed.
   */
  moreActionMenu?: ReactElement;
}
