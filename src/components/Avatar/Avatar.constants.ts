import { PresenceType } from './Avatar.types';

const CLASS_PREFIX = 'md-avatar';

const MAX_INITIALS_SPACE = 1;
const MAX_INITIALS_PERSON = 2;

const COLORS = {
  default: 'default',
  gold: 'gold',
  orange: 'orange',
  lime: 'lime',
  mint: 'mint',
  cyan: 'cyan',
  cobalt: 'cobalt',
  slate: 'slate',
  violet: 'violet',
  purple: 'purple',
  pink: 'pink',
};

const SIZES = {
  24: 24,
  32: 32,
  48: 48,
  72: 72,
  88: 88,
  124: 124,
};

const AVATAR_ICON_SIZE_MAPPING: Record<number, number> = {
  24: 8,
  32: 12,
  48: 14,
  72: 16,
  88: 20,
  124: 28,
};

const TYPES = {
  person: 'person',
  space: 'space',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  outerWrapper: `${CLASS_PREFIX}-outer-wrapper`,
  iconWrapper: `${CLASS_PREFIX}-icon-wrapper`,
  imageHidden: `${CLASS_PREFIX}-image-hidden`,
};

const DEFAULTS = {
  PRESENCE: PresenceType.Default,
  SIZE: SIZES[24],
  COLOR: COLORS.default,
  TYPE: TYPES.person,
};

export {
  DEFAULTS,
  SIZES,
  STYLE,
  CLASS_PREFIX,
  TYPES,
  MAX_INITIALS_SPACE,
  MAX_INITIALS_PERSON,
  AVATAR_ICON_SIZE_MAPPING,
  COLORS,
};
