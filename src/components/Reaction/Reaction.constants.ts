const CLASS_PREFIX = 'md-reaction';

const DEFAULTS = {
  SIZE: 12,
};

const SIZES = {
  12: 12,
  16: 16,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  notFound: `${CLASS_PREFIX}-not-found`,
};

const REACTION_NAMES = {
  popper: 'popper',
  heart: 'heart',
  thumbUpYellow: 'thumb-up-yellow',
  smile: 'smile',
  haha: 'haha',
  wow: 'wow',
  sad: 'sad',
};

export { CLASS_PREFIX, DEFAULTS, REACTION_NAMES, SIZES, STYLE };
