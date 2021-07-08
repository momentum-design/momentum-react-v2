import React, { FC } from 'react';

import { STYLE, THEME_CLASS_PREFIX } from './ThemeProvider.constants';
import { Props } from './ThemeProvider.types';
import './ThemeProvider.style.scss';

/**
 * Provides a collection of CSSVariables based on a ThemeToken to all child elements.
 */
const ThemeProvider: FC<Props> = ({ children, theme }: Props) => (
  <div className={`${STYLE.root} ${THEME_CLASS_PREFIX}-${theme}`}>{children}</div>
);

export default ThemeProvider;
