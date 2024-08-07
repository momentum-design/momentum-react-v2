import { IconScale } from '../Icon';
import { SearchFieldHeight } from './SearchInput.types';

const CLASS_PREFIX = 'md-search-input';

const HEIGHTS = [28, 32] as const;

const ARIA_ROLES = {
  COMBOBOX: 'combobox',
  SEARCHBOX: 'searchbox',
};

const ICON_HEIGHT_MAPPING: Record<SearchFieldHeight, IconScale> = {
  28: 12,
  32: 16,
};

const DEFAULTS = {
  HEIGHT: 32,
  IS_COMBOBOX: false,
} as const;

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  container: `${CLASS_PREFIX}-container`,
  search: `${CLASS_PREFIX}-search`,
  searching: `${CLASS_PREFIX}-searching`,
  clear: `${CLASS_PREFIX}-clear`,
};

export { CLASS_PREFIX, ARIA_ROLES, HEIGHTS, ICON_HEIGHT_MAPPING, DEFAULTS, STYLE };
