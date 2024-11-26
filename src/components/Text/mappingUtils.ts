import { TYPES } from './Text.constants';
import { TYPE as FONT_TYPE } from '@momentum-design/components/dist/components/text/text.constants.js';
import type { FontStyle } from './Text.types';
import type { TextType } from '@momentum-design/components';

// this is to map from the old types from the
// old Web Specs to the new Momentum Global Web Library types
const mapOldToNewType = (type: FontStyle): TextType => {
  switch (type) {
    case TYPES.DISPLAY:
      return FONT_TYPE.HEADING_XLARGE_MEDIUM;
    case TYPES.BANNER_TERTIARY:
      return FONT_TYPE.HEADING_MIDSIZE_BOLD;
    case TYPES.BANNER_PRIMARY:
      return FONT_TYPE.HEADING_MIDSIZE_MEDIUM;
    case TYPES.BANNER_SECONDARY:
      return FONT_TYPE.HEADING_MIDSIZE_REGULAR;
    case TYPES.TITLE:
      return FONT_TYPE.HEADING_SMALL_MEDIUM;
    case TYPES.HEADER_PRIMARY:
      return FONT_TYPE.BODY_LARGE_BOLD;
    case TYPES.HEADER_SECONDARY:
      return FONT_TYPE.BODY_MIDSIZE_BOLD;
    case TYPES.SUBHEADER_PRIMARY:
      return FONT_TYPE.BODY_LARGE_MEDIUM;
    case TYPES.SUBHEADER_SECONDARY:
      return FONT_TYPE.BODY_MIDSIZE_MEDIUM;
    case TYPES.BODY_PRIMARY:
      return FONT_TYPE.BODY_LARGE_REGULAR;
    case TYPES.BODY_SECONDARY:
      return FONT_TYPE.BODY_MIDSIZE_REGULAR;
    case TYPES.BODY_COMPACT:
      return FONT_TYPE.BODY_SMALL_REGULAR;
    case TYPES.HIGHLIGHT_PRIMARY:
      return FONT_TYPE.BODY_LARGE_BOLD;
    case TYPES.HIGHLIGHT_SECONDARY:
      return FONT_TYPE.BODY_MIDSIZE_BOLD;
    case TYPES.HIGHLIGHT_COMPACT:
      return FONT_TYPE.BODY_SMALL_BOLD;
    case TYPES.HYPERLINK_PRIMARY:
      return FONT_TYPE.BODY_LARGE_REGULAR_UNDERLINE;
    case TYPES.HYPERLINK_SECONDARY:
      return FONT_TYPE.BODY_MIDSIZE_REGULAR_UNDERLINE;
    case TYPES.LABEL_COMPACT:
      return FONT_TYPE.BODY_SMALL_MEDIUM;
    default:
      return type as TextType;
  }
};
export { mapOldToNewType };
