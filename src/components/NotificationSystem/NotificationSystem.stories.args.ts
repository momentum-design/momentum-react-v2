import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { POSITION, DEFAULTS, ENTER_ANIMATIONS } from './NotificationSystem.constants';

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
  enterAnimation: {
    description: `Enter animation`,
    options: [...Object.values(ENTER_ANIMATIONS)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.ENTER_ANIMATION,
      },
    },
  },
  newestOnTop: {
    description: `Determines wether new toast goes on top or bottom.`,
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.NEWEST_ON_TOP,
      },
    },
  },
};

export { notificationSystemArgTypes };

export default {
  ...commonStyles,
  ...notificationSystemArgTypes,
};
