import type { FontStyle } from './Text.types';
import { TYPE } from '@momentum-design/components/dist/components/text/text.constants.js';
const CLASS_PREFIX = 'md-text';

const DEFAULTS = {
  TYPE: 'body-primary',
} as const;

// Important: type is only a visual representation of the font style
// a type should never be connected to a tagName, like span or div.
// if a separate tagName is needed, it should be passed as a prop
const TYPES: Record<string, FontStyle> = {
  DISPLAY: 'display',
  BANNER_TERTIARY: 'banner-tertiary',
  BANNER_PRIMARY: 'banner-primary',
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
  ...TYPE,
};

const STYLE = {
  wrapper: `${CLASS_PREFIX}-wrapper`,
};

export { DEFAULTS, STYLE, TYPES };
