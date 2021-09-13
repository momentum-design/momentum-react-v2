import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { TOAST_CONTENT_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  action: {
    description: 'Action the actor executed.',
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
  actionColor: {
    description: 'Action the actor executed.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.ACTION_COLORS)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  actions: {
    description:
      'Selectable actions that can be taken on behalf of the scope of this `<ToastDetails />`.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ButtonGroup',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  actor: {
    description: 'Actor for the action of this `<ToastContent />`.',
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
  children: {
    description:
      'Information associated with this `<ToastContent />`. The info prop overrides this.',
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
  info: {
    description:
      'Information associated with this `<ToastContent />`. This overrides the children prop.',
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
