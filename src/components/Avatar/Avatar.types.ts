export enum PresenceType {
  Default = 'default',
  Active = 'active',
  Meet = 'meet',
  Schedule = 'schedule',
  // Do not Disturb
  DND = 'DND',
  Presenting = 'presenting',
  QuietHours = 'quietHours',
  Away = 'away',
  // Out of Office
  OOO = 'OOO',
}

export type AvatarColor =
  | 'default'
  | 'gold'
  | 'orange'
  | 'lime'
  | 'mint'
  | 'cyan'
  | 'cobalt'
  | 'slate'
  | 'violet'
  | 'purple'
  | 'pink';

export type AvatarSize = 24 | 32 | 48 | 72 | 88 | 124;

export interface Props {
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
}
