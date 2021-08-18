const CLASS_PREFIX = 'md-text';

const DEFAULTS = {
  TYPE: 'body-primary',
};

const TYPES = {
  DISPLAY: 'display',
  BANNER_TERTIARY: 'banner-tertiary',
  BANNERPRIMARY: 'banner-primary',
  BANNER_SECONDARY: 'banner-secondary',
  TITLE: 'title',
  HEADER_PRIMARY: 'header-primary',
  HIGHLIGHT_PRIMARY: 'highlight-primary',
  SUBHEADER_PRIMARY: 'subheader-primary',
  BODY_PRIMARY: 'body-primary',
  HYPERLINK_PRIMARY: 'hyperlink-primary',
  SUBHEADER_SECONDARY: 'subheader-secondary',
  HIGHLIGHT_SECONDARY: 'highlight-secondary',
  HEADER_SECONDARY: 'header-secondary',
  BODY_SECONDARY: 'body-secondary',
  HYPERLINK_SECONDARY: 'hyperlink-secondary',
  HIGHLIGHT_COMPACT: 'highlight-compact',
  BODY_COMPACT: 'body-compact',
  LABEL_COMPACT: 'label-compact',
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
  color: `${CLASS_PREFIX}-color`,
};

export { DEFAULTS, STYLE, TYPES };
