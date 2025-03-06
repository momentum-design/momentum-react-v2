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

const SCALE_TO_REM = {
  8: 0.5,
  10: 0.625,
  12: 0.75,
  14: 0.875,
  16: 1,
  18: 1.125,
  20: 1.25,
  22: 1.375,
  24: 1.5,
  28: 1.75,
  32: 2,
  36: 2.25,
  40: 2.5,
  48: 3,
  56: 3.5,
  64: 4,
  120: 7.5,
  124: 7.75,
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

export { CLASS_PREFIX, DEFAULTS, STYLE, SIZES, SCALES, SCALE_TO_REM };
