import React, { FC } from 'react';

import { DEFAULTS, STYLE, TYPES } from './Text.constants';
import { Props } from './Text.types';
import './Text.style.scss';
import classnames from 'classnames';

const Text: FC<Props> = (props: Props) => {
  const { children, type = DEFAULTS.TYPE, className, id, style } = props;

  const getElement = () => {
    switch (type) {
      case TYPES.DISPLAY:
      case TYPES.BANNER_TERTIARY:
      case TYPES.BANNER_SECONDARY:
      case TYPES.BANNER_PRIMARY:
        return (
          <h1
            className={classnames(STYLE.wrapper, STYLE.color, className)}
            data-type={type}
            id={id}
            style={style}
          >
            {children}
          </h1>
        );
        break;

      case TYPES.TITLE:
        return (
          <h2
            className={classnames(STYLE.wrapper, STYLE.color, className)}
            data-type={type}
            id={id}
            style={style}
          >
            {children}
          </h2>
        );
        break;

      case TYPES.HEADER_PRIMARY:
      case TYPES.HIGHLIGHT_PRIMARY:
      case TYPES.SUBHEADER_PRIMARY:
      case TYPES.HEADER_SECONDARY:
      case TYPES.HIGHLIGHT_SECONDARY:
      case TYPES.SUBHEADER_SECONDARY:
        return (
          <h3
            className={classnames(STYLE.wrapper, STYLE.color, className)}
            data-type={type}
            id={id}
            style={style}
          >
            {children}
          </h3>
        );
        break;

      case TYPES.BODY_PRIMARY:
      case TYPES.HYPERLINK_PRIMARY:
        return (
          <p
            className={classnames(STYLE.wrapper, STYLE.color, className)}
            data-type={type}
            id={id}
            style={style}
          >
            {children}
          </p>
        );
        break;

      case TYPES.BODY_SECONDARY:
      case TYPES.HYPERLINK_SECONDARY:
      case TYPES.HIGHLIGHT_COMPACT:
      case TYPES.BODY_COMPACT:
      case TYPES.LABEL_COMPACT:
        return (
          <small
            className={classnames(STYLE.wrapper, STYLE.color, className)}
            data-type={type}
            id={id}
            style={style}
          >
            {children}
          </small>
        );
        break;

      default:
        return (
          <p
            className={classnames(STYLE.wrapper, STYLE.color, className)}
            data-type={type}
            id={id}
            style={style}
          >
            {children}
          </p>
        );
    }
  };

  return getElement();
};

export default Text;
