import { IconScale } from '../Icon';
import { SearchFieldHeight } from './SearchInput.types';

const CLASS_PREFIX = 'md-search-input';

const HEIGHTS = [28, 32] as const;

const ARIA_ROLES = {
  COMBOBOX: 'combobox',
};

const WARNINGS = {
  ISCOMBOBOX_1_ISEXPANDED_0:
    'MRV2: Momentum requires the isExpanded prop for SearchInput with Combobox for accessibiltity compliance.',
  ISCOMBOBOX_0_CONTROLS_1:
    'MRV2: Momentum requires isCombobox set to true if using the controls prop.',
  ISCOMBOBOX_0_ISEXPANDED_1:
    'MRV2: Momentum requires isCombobox set to true if using the isExpanded prop.',
};

const ICON_HEIGHT_MAPPING: Record<SearchFieldHeight, IconScale> = {
  28: 12,
  32: 16,
};

const DEFAULTS = {
  HEIGHT: 32,
  ISCOMBOBOX: false,
} as const;

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  container: `${CLASS_PREFIX}-container`,
  search: `${CLASS_PREFIX}-search`,
  searching: `${CLASS_PREFIX}-searching`,
  clear: `${CLASS_PREFIX}-clear`,
};

export { CLASS_PREFIX, ARIA_ROLES, WARNINGS, HEIGHTS, ICON_HEIGHT_MAPPING, DEFAULTS, STYLE };
