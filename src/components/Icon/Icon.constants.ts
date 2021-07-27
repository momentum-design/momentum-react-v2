const CLASS_PREFIX = 'md-icon';

export const WEIGHTS: Record<string, string> = {
  light: 'light',
  regular: 'regular',
  bold: 'bold',
  filled: 'filled',
};

export const SIZES: Record<number, number> = {
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

const DEFAULTS = {
  WEIGHT: WEIGHTS.regular,
  SCALE: SIZES[32],
  AUTO_SCALE: false,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  notFound: `${CLASS_PREFIX}-not-found`,
  coloured: `${CLASS_PREFIX}-coloured`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
