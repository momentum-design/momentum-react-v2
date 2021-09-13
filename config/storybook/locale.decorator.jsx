import React from 'react';

import './fonts.decorator.style.scss';
import { IntlProvider } from 'react-intl';

const Locale = (Story, { globals }) => {
  const { locale } = globals;

  return (
    <IntlProvider locale={locale}>
      <Story />
    </IntlProvider>
  );
};

export default Locale;
