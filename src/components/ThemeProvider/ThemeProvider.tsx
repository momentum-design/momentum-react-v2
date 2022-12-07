import React, { FC } from 'react';

import '@momentum-ui/design-tokens/dist/index.css';
import '@momentum-design/tokens/dist/css/core/complete.css';
import '@momentum-design/tokens/dist/css/theme/webex/dark-stable.css';
import '@momentum-design/tokens/dist/css/theme/webex/light-stable.css';

import { DEFAULTS, STYLE, THEME_CLASS_PREFIX, THEME_CLASS_STABLE } from './ThemeProvider.constants';
import { Props } from './ThemeProvider.types';
import './ThemeProvider.style.scss';

/**
 * Provides a collection of CSSVariables based on a ThemeToken to all child elements inside of a rendered `<div />` element.
 */
const ThemeProvider: FC<Props> = ({ children, id, style, theme }: Props) => {
  const themeClass = `${THEME_CLASS_PREFIX}-${theme || DEFAULTS.THEME}`;
  const themeClassStable = `${THEME_CLASS_PREFIX}-${THEME_CLASS_STABLE}-${theme || DEFAULTS.THEME}`;

  return (
    <div
      className={`${STYLE.wrapper} ${STYLE.globals} ${themeClass} ${themeClassStable}`}
      id={id}
      style={style}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
