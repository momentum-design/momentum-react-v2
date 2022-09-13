import { SIZES } from '../ButtonCircle/ButtonCircle.constants';

const CLASS_PREFIX = 'md-button-circle-toggle';

const DEFAULTS = {
  SELECTED: false,
  OUTLINE: undefined,
  GHOST: true,
  DISABLED: false,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, SIZES, STYLE };
