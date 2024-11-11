import { LEVELS, DEFAULTS } from './ScreenReaderAnnouncer.constants';

const screenReaderAnnouncerArgTypes = {
  body: {
    description: 'A message to announce with a screen reader',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string | ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  level: {
    description: 'The aria-live value for the announcement',
    options: [undefined, LEVELS.POLITE, LEVELS.ASSERTIVE],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.LEVEL,
      },
    },
  },
  delay: {
    description:
      'The time in ms between triggering an announcement, and the announcement being available in the DOM. Avoids issues with browser compatibility',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: DEFAULTS.DELAY,
      },
    },
  },
  timeout: {
    description:
      'The time in ms between the announcement being available in the DOM and it being removed. Should be a large enough number for the entire announcement to be read out. Defaults to 20,000.',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: DEFAULTS.TIMEOUT,
      },
    },
  },
};

export { screenReaderAnnouncerArgTypes };

export default {
  ...screenReaderAnnouncerArgTypes,
};
