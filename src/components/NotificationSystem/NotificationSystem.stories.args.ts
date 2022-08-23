import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { POSITION, DEFAULTS } from './NotificationSystem.constants';

const notificationSystemArgTypes = {
  position: {
    description: `Position of the Notification system relative to the parent component`,
    options: [...Object.values(POSITION)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.POSITION,
      },
    },
  },
};

export { notificationSystemArgTypes };

export default {
  ...commonStyles,
  ...notificationSystemArgTypes,
};
