import { commonStyles, extendArgTypes } from '../../storybook/helper.stories.argtypes';
import { buttonSimpleArgTypes } from '../ButtonSimple/ButtonSimple.stories.args';
import { cardArgTypes } from '../Card/Card.stories.args';
import { TEXT_CONSTANTS } from '../Text';

import { MEETING_CONTAINER_CONSTANTS as CONSTANTS } from './';

const meetingContainerArgTypes = {
  children: {
    description: 'The title of the meeting. It is overwritten by the `meetingTitle` prop',
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
  meetingTitle: {
    description: 'The title of the meeting. Overwrites the `children` prop',
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
  titleType: {
    description: 'The Text type assigned to `meetingTitle` prop',
    control: { type: 'select' },
    options: [undefined, ...Object.values(TEXT_CONSTANTS.TYPES)],
    table: {
      type: {
        summary: Object.values(TEXT_CONSTANTS.TYPES)
          .map((value) => `${value}`)
          .join('|'),
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  avatar: {
    description: 'User avatar supplied by the consumer.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'Avatar',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  actionButtons: {
    description: 'Group of action buttons supplied by the consumer.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'Array<ButtonPill | ButtonCircle>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  scheduleInfoFirst: {
    description:
      'Text supplied to left side of schedule info, such as "In progress" or "10:00am - 11:00am." Supplied by consumer.',
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
  scheduleInfoSecond: {
    description:
      'Text supplied to right side of schedule info, such as meeting duration or "In X minutes" or a date such as "Mon, Jan 1, 2023." Supplied by consumer.',
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
  scheduleInfoFirstColor: {
    description: 'Sets the color of the left side of scheduleInfo area.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.SCHEDULE_INFO_COLORS)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.SCHEDULE_INFO_COLORS)
          .map((value) => `${value}`)
          .join('|'),
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  scheduleInfoSecondColor: {
    description: 'Sets the color of the right side of the scheduleInfo area',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.SCHEDULE_INFO_COLORS)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.SCHEDULE_INFO_COLORS)
          .map((value) => `${value}`)
          .join('|'),
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  tags: {
    description: 'Group of tags supplied by the consumer.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'Array<Tag>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  spaceLink: {
    description: 'Link to meeting space or conversation supplied by the consumer.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ButtonHyperLink',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  disabled: {
    description: 'Boolean to disable the component.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.IS_DISABLED,
      },
    },
  },
};

export { meetingContainerArgTypes };

export default {
  ...commonStyles,
  ...extendArgTypes('Card', cardArgTypes, ['height']),
  ...extendArgTypes('ButtonSimple', buttonSimpleArgTypes),
  ...meetingContainerArgTypes,
};
