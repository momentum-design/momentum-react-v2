import { IconScale } from '../Icon';

const CLASS_PREFIX = 'md-search-input';

const HEIGHTS = {
  28: 28,
  32: 32,
};

const SEARCH_ICON_HEIGHT_MAPPING: Record<number, IconScale> = {
  28: 12,
  32: 16,
};

const DEFAULTS = {
  HEIGHT: HEIGHTS[32],
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  container: `${CLASS_PREFIX}-container`,
  search: `${CLASS_PREFIX}-search`,
  searching: `${CLASS_PREFIX}-searching`,
  clear: `${CLASS_PREFIX}-clear`,
};

export { CLASS_PREFIX, HEIGHTS, SEARCH_ICON_HEIGHT_MAPPING, DEFAULTS, STYLE };
