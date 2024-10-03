import { ListOrientation } from './List.types';

const CLASS_PREFIX = 'md-list';

const DEFAULTS = {
  ORIENTATION: 'vertical' as ListOrientation,
  INITIAL_FOCUS: 0,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, STYLE };
