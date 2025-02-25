const CLASS_PREFIX = 'md-loading-spinner';

const DEFAULTS = {
  SCALE: 24 as const,
  VARIANT: 'standalone' as const,
  INVERTED: false,
  SIZE: undefined,
};

const SCALES = {
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  18: 18,
  20: 20,
  22: 22,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
  120: 120,
  124: 124,
};

const SIZES = {
  SMALL: 'small',
  MIDSIZE: 'midsize',
  LARGE: 'large',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  arch: `${CLASS_PREFIX}-arch`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE, SIZES, SCALES };
