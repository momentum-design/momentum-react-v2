import { ListOrientation } from './List.types';

const CLASS_PREFIX = 'md-list';

const DEFAULTS = {
  ORIENTATION: 'vertical' as ListOrientation,
  INITIAL_FOCUS_NOT_SET: null,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
