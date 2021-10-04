import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { SCHEDULER_STATES } from './AvatarMeetingsListItem.constants';

export default {
  ...commonStyles,
  /**
   * Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
   */
  schedulerState: {
    description: 'Determines the state of the scheduler and will display an according icon.',
    control: { type: 'select' },
    options: [...Object.values(SCHEDULER_STATES)],
    table: {
      type: {
        summary: "'available' | 'unavailable' | 'unknown' | 'quiet-hours' | 'none'",
      },
      defaultValue: {
        summary: SCHEDULER_STATES.none,
      },
    },
  },
  firstLine: {
    description:
      'Text displayed on the first line of the item. (if only firstLine is provided, it will be centered).',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'text',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
  secondLine: {
    description: 'Text displayed on the second line of the item.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'text',
      },
      defaultValue: {
        summary: '',
      },
    },
  },
  onHoverActionCallback: {
    action: 'onHoverActionCallback',
    description:
      'If this callback is present, a close button will appear on hover and this callback is passed as the event handler.',
    table: {
      type: {
        summary: '(e: PressEvent) => void;',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onPressMuteAction: {
    action: 'onPressMuteAction',
    description: 'Callback passed down to the mute/unmute button.',
    table: {
      type: {
        summary: '(e: PressEvent) => void;',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  isMuted: {
    description: 'Determines the style/color of the microphone icon button if present.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: false,
      },
    },
  },
  displayActions: {
    description: 'Determines what actions will be displayed inside the list item.',
    control: { type: 'array' },
    table: {
      type: {
        summary: 'array',
      },
      defaultValue: {
        summary: [],
      },
    },
  },

  //TODO: once Popover is implemented, add arg type for menuAction
  // moreActionMenu: {
  //   description: 'Contains the menu list.',
  //   control: { type: 'ReactElement' },
  //   table: {
  //     type: {
  //       summary: 'ReactElement',
  //     },
  //     defaultValue: {
  //       summary: undefined,
  //     },
  //   },
  // },
};
