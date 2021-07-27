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

type AvatarColor =
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

export interface Props {
  /**
   * className prop description
   */
  className?: string;

  /**
   * Size of the avatar
   * @default 32
   */
  size?: 24 | 32 | 48 | 72 | 88 | 124;

  /**
   * Determines the type of presence the user has. Eg: meet or presenting
   */
  presence?: PresenceType;

  /**
   * URL of image to display
   */
  src?: string;
  initials?: string;
  color?: AvatarColor;
}
