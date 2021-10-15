import { Shape } from './Banner.types';

const CLASS_PREFIX = 'md-banner';

const SHAPES: Record<string, Shape> = {
  RECTANGLE: 'rectangle',
  SQUARE: 'square',
};

const DEFAULTS = {
  SHAPE: SHAPES.RECTANGLE,
};

const STYLE = {
  description: `${CLASS_PREFIX}-description`,
  details: `${CLASS_PREFIX}-details`,
  title: `${CLASS_PREFIX}-title`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, SHAPES, STYLE };
