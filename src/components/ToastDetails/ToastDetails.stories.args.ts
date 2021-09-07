import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { TOAST_DETAILS_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  badges: {
    description: 'Badges to display on this `<ToastDetails />`. This overrides the `info` prop.',
    control: { type: 'object' },
    table: {
      type: {
        summary: 'string | Array<string>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  children: {
    description:
      'Provides the title of this `<ToastDetails />` component. Is overriden by the `title` prop.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  controls: {
    description:
      'Controls for this `<ToastDetails />`. These appear in the top-right corner of this `<ToastDetails />`.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ButtonControl | Array<ButtonControl>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  image: {
    description:
      'Image for this `<ToastDetails />`. Appears on the left-side of this `<ToastDetails />`.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'Avatar',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  info: {
    description:
      'Colorizable information to display within the subject section of this `<ToastDetails />`. Overrided by the `badges` prop.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  infoColor: {
    description: 'Color to use when rendering the `info` prop.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.INFO_COLORS)],
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  subject: {
    description: 'Subject of this `<ToastDetails />`.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  title: {
    description: '`<ToastDetails />` title. This overrides the `children` prop.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
