import React, { FC } from 'react';

import { CLASSES, THEME_CLASS_PREFIX } from './ThemeProvider.constants';
import { ThemeProviderProps as Props } from './ThemeProvider.types';
import './ThemeProvider.style.css';

/**
 * Provides a collection of CSSVariables based on a ThemeToken to all child elements.
 */
const ThemeProvider: FC<Props> = ({ children, token }: Props) => (
  <div className={`${CLASSES.main} ${THEME_CLASS_PREFIX}-${token}`}>{children}</div>
);

export default ThemeProvider;