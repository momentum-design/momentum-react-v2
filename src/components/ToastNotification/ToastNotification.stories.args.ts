import { commonStyles } from '../../storybook/helper.stories.argtypes';

const toastNotificationArgTypes = {
  text: {
    description: 'Provides the text of this Notification Toast.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'text',
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
