import classnames from 'classnames';
import React, { FC } from 'react';

import { DEFAULTS, STYLE, TYPES } from './Text.constants';
import './Text.style.scss';

import type { Props } from './Text.types';

const Text: FC<Props> = (props: Props) => {
  const { children, type = DEFAULTS.TYPE, className, id, style, ...rest } = props;

  const getElement = () => {
    switch (type) {
      case TYPES.DISPLAY:
      case TYPES.BANNER_TERTIARY:
      case TYPES.BANNER_SECONDARY:
      case TYPES.BANNER_PRIMARY:
        return (
          <h1
            className={classnames(STYLE.wrapper, className)}
            data-type={type}
            id={id}
            style={style}
            {...rest}
          >
            {children}
          </h1>
        );

      case TYPES.TITLE:
        return (
          <h2
            className={classnames(STYLE.wrapper, className)}
            data-type={type}
            id={id}
            style={style}
            {...rest}
          >
            {children}
          </h2>
        );

      case TYPES.HEADER_PRIMARY:
      case TYPES.HIGHLIGHT_PRIMARY:
      case TYPES.SUBHEADER_PRIMARY:
      case TYPES.HEADER_SECONDARY:
      case TYPES.HIGHLIGHT_SECONDARY:
      case TYPES.SUBHEADER_SECONDARY:
        return (
          <h3
            className={classnames(STYLE.wrapper, className)}
            data-type={type}
            id={id}
            style={style}
            {...rest}
          >
            {children}
          </h3>
        );

      case TYPES.BODY_PRIMARY:
      case TYPES.HYPERLINK_PRIMARY:
        return (
          <p
            className={classnames(STYLE.wrapper, className)}
            data-type={type}
            id={id}
            style={style}
            {...rest}
          >
            {children}
          </p>
        );

      case TYPES.BODY_SECONDARY:
      case TYPES.HYPERLINK_SECONDARY:
      case TYPES.HIGHLIGHT_COMPACT:
      case TYPES.BODY_COMPACT:
      case TYPES.LABEL_COMPACT:
        return (
          <small
            className={classnames(STYLE.wrapper, className)}
            data-type={type}
            id={id}
            style={style}
            {...rest}
          >
            {children}
          </small>
        );

      default:
        return (
          <p
            className={classnames(STYLE.wrapper, className)}
            data-type={type}
            id={id}
            style={style}
            {...rest}
          >
            {children}
          </p>
        );
    }
  };

  return getElement();
};

export default Text;
