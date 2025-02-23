import { IconScale } from '.';
import type { IconWeight } from './Icon.types';

const CLASS_PREFIX = 'md-icon';
const COLOR_INHERIT = 'currentColor';

const WEIGHTS: Record<string, IconWeight> = {
  light: 'light',
  regular: 'regular',
  bold: 'bold',
  filled: 'filled',
};

const SCALES = {
  25: 25,
  50: 50,
  75: 75,
  100: 100,
  125: 125,
  150: 150,
  175: 175,
  200: 200,
};

const SIZES: Record<IconScale, IconScale> = {
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
  auto: 'auto',
  inherit: 'inherit',
};

const DEFAULTS = {
  WEIGHT: WEIGHTS.regular,
  AUTO_SCALE: false,
  WEIGHTLESS: false,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  notFound: `${CLASS_PREFIX}-not-found`,
  coloured: `${CLASS_PREFIX}-coloured`,
  noShrink: `${CLASS_PREFIX}-no-shrink`,
  autoScales: `${CLASS_PREFIX}-auto-scales`,
  scales: `${CLASS_PREFIX}-scales`,
};

export { CLASS_PREFIX, COLOR_INHERIT, DEFAULTS, SCALES, SIZES, STYLE, WEIGHTS };
