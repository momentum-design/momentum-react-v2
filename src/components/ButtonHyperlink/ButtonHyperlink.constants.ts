const CLASS_PREFIX = 'md-button-hyperlink';

const DEFAULTS = {
  DISABLED: false,
  INVERTED: false,
};

const STYLE = {
  text: `${CLASS_PREFIX}-text`,
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export type roleType = 'button' | 'link';

export { CLASS_PREFIX, DEFAULTS, STYLE };
