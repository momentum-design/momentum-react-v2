import { IconScale, IconWeight } from '../Icon/Icon.types';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';
import { PresenceType } from './Avatar.types';

const CLASS_PREFIX = 'md-avatar';

const MAX_INITIALS_SPACE = 1;
const MAX_INITIALS_PERSON = 2;

const SIZES = {
  24: 24,
  32: 32,
  48: 48,
  72: 72,
  88: 88,
  124: 124,
};

const AVATAR_PRESENCE_ICON_SIZE_MAPPING: Record<number, IconScale> = {
  24: 8,
  32: 12,
  48: 14,
  72: 16,
  88: 20,
  124: 28,
};

const AVATAR_ICON_SIZE_MAPPING: Record<number, { scale: IconScale; weight: IconWeight }> = {
  24: { scale: 16, weight: 'bold' },
  32: { scale: 20, weight: 'regular' },
  48: { scale: 28, weight: 'regular' },
  72: { scale: 40, weight: 'regular' },
  88: { scale: 48, weight: 'regular' },
  124: { scale: 64, weight: 'light' },
};

const AVATAR_COLORS = { ...TEAM_COLORS, yellow: 'yellow' };

const TYPES = {
  person: 'person',
  space: 'space',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  outerWrapper: `${CLASS_PREFIX}-outer-wrapper`,
  iconWrapper: `${CLASS_PREFIX}-icon-wrapper`,
  imageHidden: `${CLASS_PREFIX}-image-hidden`,
  presenceIconWrapper: `${CLASS_PREFIX}-presence-icon-wrapper`,
  buttonWrapper: `${CLASS_PREFIX}-button-wrapper`,
  animationWrapper: `${CLASS_PREFIX}-animation-wrapper`,
};

const DEFAULTS = {
  PRESENCE: PresenceType.Default,
  SIZE: SIZES[24],
  COLOR: AVATAR_COLORS.default,
  TYPE: TYPES.person,
  HIDE_DEFAULT_TOOLTIP: false,
};

export {
  DEFAULTS,
  SIZES,
  STYLE,
  CLASS_PREFIX,
  TYPES,
  MAX_INITIALS_SPACE,
  MAX_INITIALS_PERSON,
  AVATAR_PRESENCE_ICON_SIZE_MAPPING,
  AVATAR_ICON_SIZE_MAPPING,
  AVATAR_COLORS,
};
