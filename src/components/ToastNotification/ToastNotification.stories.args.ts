import { commonStyles } from '../../storybook/helper.stories.argtypes';

const toastNotificationArgTypes = {
  content: {
    description:
      'Provides the notification content of this Notification Toast. It can be a free string, or a ReactElement or ReactElement[]',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string | ReactElement | ReactElement[]',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onToastMessageClick: {
    action: 'onClick',
    description: 'Handler that is called when the toast message is clicked.',
    table: {
      type: {
        summary: '(e: MouseEvent) => void',
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
