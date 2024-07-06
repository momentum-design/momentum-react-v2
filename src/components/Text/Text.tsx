import React, { FC } from 'react';

import { DEFAULTS, STYLE, TYPES } from './Text.constants';
import { Props } from './Text.types';
import './Text.style.scss';
import classnames from 'classnames';

const Text: FC<Props> = (props: Props) => {
  const { children, type = DEFAULTS.TYPE, className, id, style, tagName, ...rest } = props;

  const getTagName = (): keyof JSX.IntrinsicElements => {
    switch (type) {
      case TYPES.DISPLAY:
      case TYPES.BANNER_TERTIARY:
      case TYPES.BANNER_SECONDARY:
      case TYPES.BANNER_PRIMARY:
        return 'h1';

      case TYPES.TITLE:
        return 'h2';

      case TYPES.HEADER_PRIMARY:
      case TYPES.HIGHLIGHT_PRIMARY:
      case TYPES.SUBHEADER_PRIMARY:
      case TYPES.HEADER_SECONDARY:
      case TYPES.HIGHLIGHT_SECONDARY:
      case TYPES.SUBHEADER_SECONDARY:
        return 'h3';

      case TYPES.BODY_PRIMARY:
      case TYPES.HYPERLINK_PRIMARY:
        return 'p';

      case TYPES.BODY_SECONDARY:
      case TYPES.HYPERLINK_SECONDARY:
      case TYPES.HIGHLIGHT_COMPACT:
      case TYPES.BODY_COMPACT:
      case TYPES.LABEL_COMPACT:
        return 'small';

      default:
        return 'p';
    }
  };

  const TagName = tagName || getTagName();

  return (
    <TagName
      className={classnames(STYLE.wrapper, className)}
      data-type={type}
      id={id}
      style={style}
      {...rest}
    >
      {children}
    </TagName>
  );
};

export default Text;
