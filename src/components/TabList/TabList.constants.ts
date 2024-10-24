import { Orientation } from '@react-types/shared';

const CLASS_PREFIX = 'md-tab-list';

const DEFAULTS = {
  ORIENTATION: 'horizontal' as Orientation,
  IS_SUBTAB_LIST: false,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
