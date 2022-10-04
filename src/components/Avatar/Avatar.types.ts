import { TeamColor } from '../ThemeProvider/ThemeProvider.types';
import { AriaButtonProps } from '@react-types/button';
import { SIZES } from './Avatar.constants';

export enum PresenceType {
  Default = 'default',
  Active = 'active',
  Meet = 'meet',
  Schedule = 'schedule',
  Call = 'call',
  // Do not Disturb
  DND = 'DND',
  Presenting = 'presenting',
  QuietHours = 'quietHours',
  Away = 'away',
  // Out of Office
  OOO = 'OOO',
  Busy = 'busy',
  OnMobile = 'onMobile',
  OnDevice = 'onDevice',
  OnHold = 'onHold',
}

export type AvatarSize = typeof SIZES[number];
export type AvatarColor = TeamColor | 'yellow';

export interface Props extends Omit<AriaButtonProps, 'type'> {
  /**
   * className prop description
   */
  className?: string;

  /**
   * Size of the avatar
   * @default 32
   */
  size?: AvatarSize;

  /**
   * Determines the type of presence the user has. Eg: meet or presenting
   */
  presence?: PresenceType;

  /**
   * URL of image to display
   */
  src?: string;
  /**
   * Alternative text when image cannot be rendered
   */
  alt?: string;
  /**
   * Initials to be displayed on the avatar
   */
  initials?: string;
  /**
   * Name of person/space this avatar is for
   */
  title?: string;
  /**
   * Background color for avatar
   */
  color?: AvatarColor;
  /**
   * Determines if the avatar is for a space or person
   */
  type?: 'person' | 'space';
  /**
   * The icon name to display instead of initials or image
   */
  icon?: string;

  /**
   * Set the visibility of Avatar's default tooltip
   */
  hideDefaultTooltip?: boolean;

  /**
   * Determines whether the user is typing.
   */
  isTyping?: boolean;

  /**
   * Determines if there is an error in the Avatar component
   */
  failureBadge?: boolean;
}
