import { IconScale, IconWeight } from '../Icon/Icon.types';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';
import { PresenceType } from './Avatar.types';

const CLASS_PREFIX = 'md-avatar';

const MAX_INITIALS_SPACE = 1;
const MAX_INITIALS_PERSON = 2;

const SIZES = [24, 32, 48, 64, 72, 88, 124] as const;

const AVATAR_PRESENCE_ICON_SIZE_MAPPING: Record<number, IconScale> = {
  24: 14,
  32: 14,
  48: 16,
  64: 18,
  72: 20,
  88: 28,
  124: 36,
};

const AVATAR_ICON_SIZE_MAPPING: Record<number, { scale: IconScale; weight: IconWeight }> = {
  24: { scale: 16, weight: 'bold' },
  32: { scale: 20, weight: 'regular' },
  48: { scale: 22, weight: 'regular' },
  64: { scale: 36, weight: 'regular' },
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
  SIZE: 24,
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
