import React, { FC } from 'react';

import { DEFAULTS, STYLE } from './Text.constants';
import { Props } from './Text.types';
import './Text.style.scss';
import classnames from 'classnames';

const Text: FC<Props> = (props: Props) => {
  const { children, type = DEFAULTS.TYPE, className, id, style } = props;

  const h1Styles = new Set(['display', 'banner-tertiary', 'banner-primary', 'banner-secondary']);
  const h2Styles = new Set(['title']);
  const h3Styles = new Set([
    'header-primary',
    'highlight-primary',
    'subheader-primary',
    'header-secondary',
    'highlight-secondary',
    'subheader-secondary',
  ]);
  const pStyles = new Set(['body-primary', 'hyperlink-primary']);
  const smallStyles = new Set([
    'body-secondary',
    'hyperlink-secondary',
    'highlight-compact',
    'body-compact',
    'label-compact',
  ]);

  return (
    <>
      {h1Styles.has(type) ? (
        <h1
          className={classnames(STYLE.wrapper + ' ' + STYLE.color, className)}
          data-type={type}
          id={id}
          style={style}
        >
          {children}
        </h1>
      ) : h2Styles.has(type) ? (
        <h2
          className={classnames(STYLE.wrapper + ' ' + STYLE.color, className)}
          data-type={type}
          id={id}
          style={style}
        >
          {children}
        </h2>
      ) : h3Styles.has(type) ? (
        <h3
          className={classnames(STYLE.wrapper + ' ' + STYLE.color, className)}
          data-type={type}
          id={id}
          style={style}
        >
          {children}
        </h3>
      ) : pStyles.has(type) ? (
        <p
          className={classnames(STYLE.wrapper + ' ' + STYLE.color, className)}
          data-type={type}
          id={id}
          style={style}
        >
          {children}
        </p>
      ) : smallStyles.has(type) ? (
        <small
          className={classnames(STYLE.wrapper + ' ' + STYLE.color, className)}
          data-type={type}
          id={id}
          style={style}
        >
          {children}
        </small>
      ) : (
        <p
          className={classnames(STYLE.wrapper + ' ' + STYLE.color, className)}
          data-type={type}
          id={id}
          style={style}
        >
          {children}
        </p>
      )}
    </>
  );
};

export default Text;
