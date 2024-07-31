import { SIZES } from '../ButtonPill/ButtonPill.constants';

const CLASS_PREFIX = 'md-button-pill-toggle';

const DEFAULTS = {
  SELECTED: false,
  OUTLINE: undefined,
  GHOST: true,
  DISABLED: false,
  ARIA_STATE_KEY: 'aria-pressed',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { CLASS_PREFIX, DEFAULTS, SIZES, STYLE };
