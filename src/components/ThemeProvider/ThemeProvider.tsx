import React, { FC } from 'react';
import classNames from 'classnames';
// TODO: legacy tokens - to be removed:
import '@momentum-ui/design-tokens/dist/index.css';
// TODO: we should not use core colors, only theme colors - to be removed:
import '@momentum-design/tokens/dist/css/core/complete.css';

// import Momentum fonts and typography defaults:
import '@momentum-design/fonts/dist/css/fonts.css';
import '@momentum-design/tokens/dist/css/typography/complete.css';

// import Momentum theme tokens:
import '@momentum-design/tokens/dist/css/theme/webex/dark-stable.css';
import '@momentum-design/tokens/dist/css/theme/webex/light-stable.css';
import { ThemeProvider as MdcThemeProvider } from '@momentum-design/components/dist/react';

import {
  DEFAULTS,
  STYLE,
  THEME_CLASS_PREFIX,
  THEME_CLASS_PREFIX_STABLE,
} from './ThemeProvider.constants';
import { Props } from './ThemeProvider.types';
import './ThemeProvider.style.scss';


/**
 * Provides a collection of CSSVariables based on a ThemeToken to all child elements inside of a rendered `<div />` element.
 */
const ThemeProvider: FC<Props> = ({ children, id, style, theme }: Props) => {
  // TODO: get rid of legacy theme
  const themeClass = `${THEME_CLASS_PREFIX}-${theme || DEFAULTS.THEME}`;
  const themeClassStable = `${THEME_CLASS_PREFIX_STABLE}-${theme || DEFAULTS.THEME}`;

  return (
    <MdcThemeProvider
      themeclass={themeClassStable}
      className={classNames(themeClass, STYLE.typography)}
    >
      <div className={`${STYLE.wrapper} ${STYLE.globals}`} style={style} id={id}>
        {children}
      </div>
    </MdcThemeProvider>
  );
};

export default ThemeProvider;
