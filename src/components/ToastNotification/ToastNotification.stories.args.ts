import { commonStyles } from '../../storybook/helper.stories.argtypes';

const toastNotificationArgTypes = {
  content: {
    description: 'Provides the notification content of this Notification Toast.',
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
  closeButtonLabel: {
    description: 'Accessible name of the close button',
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

export { toastNotificationArgTypes };

export default {
  ...commonStyles,
  ...toastNotificationArgTypes,
};
