import { TEAM_COLORS } from '../ThemeProvider/ThemeProvider.constants';
import { DEFAULTS, SIZES, TYPES } from './Avatar.constants';
import { PresenceType } from './Avatar.types';

export default {
  className: {
    defaultValue: undefined,
    description:
      'If present, the class name will be added to the underlying component. Used to override styles by consumers.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  size: {
    defaultValue: DEFAULTS.SIZE,
    description: 'Size represents the size of the avatar.',
    options: SIZES,
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: DEFAULTS.SIZE,
      },
    },
  },
  presence: {
    defaultValue: DEFAULTS.PRESENCE,
    description: 'Determines the current state of the user. (User is in meeting, presenting etc).',
    options: [...Object.values(PresenceType)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.PRESENCE,
      },
    },
  },
  src: {
    defaultValue: undefined,
    description: 'URL with profile image for the avatar.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  initials: {
    defaultValue: undefined,
    description: 'Initials to display inside the avatar.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  title: {
    defaultValue: undefined,
    description:
      'Name of person/space. The component will extract initials from this value and display accordingly',
    control: { type: 'text', required: true },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  color: {
    defaultValue: DEFAULTS.COLOR,
    description:
      'In case `src` is not provided, we can provide a color for the avatar using this property.',
    options: [...Object.values(TEAM_COLORS)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.COLOR,
      },
    },
  },
  icon: {
    defaultValue: undefined,
    description: 'Name of the icon to be displayed inside the Avatar. Must be a valid icon name.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  type: {
    defaultValue: DEFAULTS.TYPE,
    description: 'Determines whether the avatar is for a person or a space.',
    options: [...Object.values(TYPES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.TYPE,
      },
    },
  },
  isTyping: {
    defaultValue: false,
    description: 'Determines whether the user is typing.',
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
  failureBadge: {
    defaultValue: false,
    description: 'Determines if there is an error in the Avatar component.',
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
