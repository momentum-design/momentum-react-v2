import React, { FC } from 'react';
import { OverlayProvider } from '@react-aria/overlays';

import '@momentum-ui/design-tokens/dist/index.css';

import { DEFAULTS, STYLE, THEME_CLASS_PREFIX } from './ThemeProvider.constants';
import { Props } from './ThemeProvider.types';
import './ThemeProvider.style.scss';

/**
 * Provides a collection of CSSVariables based on a ThemeToken to all child elements.
 */
const ThemeProvider: FC<Props> = ({ children, id, theme }: Props) => (
  <div
    className={`${STYLE.wrapper} ${STYLE.globals} ${THEME_CLASS_PREFIX}-${theme || DEFAULTS.THEME}`}
    id={id}
  >
    <OverlayProvider>{children}</OverlayProvider>
  </div>
);

export default ThemeProvider;
