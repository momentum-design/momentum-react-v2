import React, { FC } from 'react';

import { CLASSES, THEME_CLASS_PREFIX } from './ThemeProvider.constants';
import { Props } from './ThemeProvider.types';
import './ThemeProvider.style.css';

/**
 * Provides a collection of CSSVariables based on a ThemeToken to all child elements.
 */
const ThemeProvider: FC<Props> = ({ children, theme }: Props) => (
  <div className={`${CLASSES.root} ${THEME_CLASS_PREFIX}-${theme}`}>{children}</div>
);

export default ThemeProvider;
