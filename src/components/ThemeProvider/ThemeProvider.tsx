import React, { FC } from 'react';

// This import can be updated once css/scss modules are supported.
// import '@momentum-ui/design-tokens/dist/index.css';

// Imports all of the theme tokens. Use this until the artifact exists for yarn install.
import './tokens/index.style.css';

import { DEFAULTS, STYLE, THEME_CLASS_PREFIX } from './ThemeProvider.constants';
import { Props } from './ThemeProvider.types';
import './ThemeProvider.style.scss';

/**
 * Provides a collection of CSSVariables based on a ThemeToken to all child elements.
 */
const ThemeProvider: FC<Props> = ({ children, theme }: Props) => (
  <div className={`${STYLE.wrapper} ${THEME_CLASS_PREFIX}-${theme || DEFAULTS.THEME}`}>{children}</div>
);

export default ThemeProvider;
