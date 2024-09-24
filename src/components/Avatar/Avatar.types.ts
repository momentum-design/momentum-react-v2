import { TeamColor } from '../ThemeProvider/ThemeProvider.types';
import { AriaButtonProps } from '@react-types/button';
import { SIZES } from './Avatar.constants';
import { InferredIconName } from '../Icon/Icon.types';

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
   * className prop for the button, in case onPress is passed in
   */
  buttonClassName?: string;

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
   * Initials to be displayed on the avatar
   */
  initials?: string;
  /**
   * Name of person/space. The component will extract initials from this value and display accordingly, it is used in the aria-label of this component.
   * e.g 'John Doe'
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
  icon?: InferredIconName;

  /**
   * The icon to display when Avatar is hovered or focused
   */
  iconOnHover?: InferredIconName;

  /**
   * The main description of the Avatar, which will be the first part of its aria-label.
   * e.g 'Avatar of Bob'
   */
  mainLabel?: string;

  /**
   * The name of the presence of the avatar's person, so that it is used in the aria-label of this component.
   * e.g 'Busy'
   */
  presenceLabel?: string;

  /**
   * The label that represents the user is typing,  so it is used in the aria-label of the container.
   * e.g 'is typing'
   */
  typingLabel?: string;

  /**
   * The label that represents additional description, it will be spliced to the end of the container aria-label.
   */
  extraLabel?: string;

  /**
   * Determines whether the user is typing.
   */
  isTyping?: boolean;

  /**
   * Determines if there is an error in the Avatar component
   */
  failureBadge?: boolean;
}
