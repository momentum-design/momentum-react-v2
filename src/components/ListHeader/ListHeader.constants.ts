import { OutlinePosition, OutlineColor } from './ListHeader.types';

const CLASS_PREFIX = 'md-list-header';

const OUTLINE_POSITION: Record<string, OutlinePosition> = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

const OUTLINE_COLOR: Record<string, OutlineColor> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

const DEFAULTS = {
  OUTLINE: false,
  OUTLINE_POSITION: OUTLINE_POSITION.BOTTOM,
  OUTLINE_COLOR: OUTLINE_COLOR.PRIMARY,
  BOLD: false,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  separator: 'list-header-separator'
};

export { CLASS_PREFIX, DEFAULTS, STYLE, OUTLINE_POSITION, OUTLINE_COLOR };
