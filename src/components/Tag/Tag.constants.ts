import type { Color, Format } from './Tag.types';

const CLASS_PREFIX = 'md-tag';

const COLORS: Record<string, Color> = {
  COLBALT: 'cobalt',
  GOLD: 'gold',
  LIME: 'lime',
  MINT: 'mint',
  ORANGE: 'orange',
  PRIMARY: 'primary',
  PURPLE: 'purple',
  SLATE: 'slate',
  VIOLET: 'violet',
};

const FORMATS: Record<string, Format> = {
  ERROR: 'error',
  NORMAL: 'normal',
  OVERLAY: 'overlay',
  STATIC: 'static',
};

const FORMATS_DISABLED: Array<Format> = [FORMATS.ERROR, FORMATS.OVERLAY, FORMATS.STATIC];

const DEFAULTS = {
  COLOR: COLORS.PRIMARY,
  FORMAT: FORMATS.NORMAL,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  pressable: `${CLASS_PREFIX}-pressable`,
};

export { CLASS_PREFIX, COLORS, DEFAULTS, STYLE, FORMATS, FORMATS_DISABLED };
