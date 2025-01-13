import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { DEFAULTS } from '../ToastNotification/ToastNotification.constants';

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
  interruptsUserFlow: {
    description: 'Whether the notification interrupts user flow.  ',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.INTERRUPTS_USER_FLOW,
      },
    },
  },
};

export { toastNotificationArgTypes };

export default {
  ...commonStyles,
  ...toastNotificationArgTypes,
};
