import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';

export default {
  ...commonStyles,
  // NOTE: Below is an example. See [Storybook argTypes documentation]{@link https://storybook.js.org/docs/react/api/argtypes}.
  firstLine: {
    description:
      'Text displayed on the first line of the item. (if only firstLine is provided, it will be centered).',
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
  secondLine: {
    description: 'Text displayed on the second line of the item. (Can be more than one string)',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string | string[]',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  teamColor: {
    description: 'Team color',
    control: { type: 'select' },
    options: [undefined, ...Object.values(TEAM_COLORS)],
    table: {
      type: {
        summary: 'TeamColor',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  avatar: {
    description: 'Avatar Component.',
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  isDraft: {
    description:
      'Determines whether there is a message draft inside the space that has not been sent',
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  isUnread: {
    description: 'Determines whether there is content inside the space that is not read.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  isNewActivity: {
    description: 'Determines weather there is new activity in this space (text appears in bold).',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  isMention: {
    description: 'Determines weather somebody mentioned the logged in user in this chat.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  isEnterRoom: {
    description: ' Determines weather the user has just been invited to this space.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  isAlert: {
    description: 'Determines weather alerts on this space are visible.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  isAlertMuted: {
    description: 'Determines weather alerts on this space are muted.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  action: {
    description: 'If provided, it will be displayed on the right side of the list item.',
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  isSelected: {
    defaultValue: false,
    description: 'Determines if the list item is selected.',
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
  isCompact: {
    defaultValue: false,
    description: 'Determines if the list item is compact.',
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
};
