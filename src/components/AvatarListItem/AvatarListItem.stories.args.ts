import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  /**
   * Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
   */
  isSchedulerUnknown: {
    description: 'If the scheduler is unknown, an appropriate icon will be displayed.',
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
  isSchedulerUnavailable: {
    description: 'If the scheduler is unavailable, an appropriate icon will be displayed.',
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
  isSchedulerAvailable: {
    description: 'If the scheduler is available, an appropriate icon will be displayed.',
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
  isSchedulerQHours: {
    description: 'If the scheduler is quiet hours, an appropriate icon will be displayed.',
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
  displayMuteAction: {
    description: 'Determines weather to display the mute icon button.',
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
  displayMoreAction: {
    description: 'Determines weather to display the more action menu list.',
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
  displayHoverAction: {
    description: 'If true, a close button will appear on hover.',
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
