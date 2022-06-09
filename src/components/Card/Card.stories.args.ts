import { commonStyles, extendArgTypes } from '../../storybook/helper.stories.argtypes';

import { CARD_CONSTANTS as CONSTANTS } from './';
import { CARD_STATUS_CONSTANTS as STATUS_CONSTANTS } from './CardStatus';
import { buttonSimpleArgTypes } from '../ButtonSimple/ButtonSimple.stories.args';

const cardArgTypes = {
  children: {
    description: 'Provides the child nodes for this element.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ReactNode',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  color: {
    description: 'Color of this component.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.COLORS)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.COLORS)
          .map((value) => `"${value}"`)
          .join(' | '),
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.COLOR,
      },
    },
  },
  height: {
    description: 'Height of this component.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.HEIGHTS)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.HEIGHTS)
          .map((value) => `"${value}"`)
          .join(' | '),
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.HEIGHT,
      },
    },
  },
  isStatic: {
    description: 'Turns off hover and active styling for the component.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  outline: {
    description: 'Whether to use an outline for this component.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  rounding: {
    description: 'Magnitude of element rounding for this component.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.ROUNDINGS)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.ROUNDINGS)
          .map((value) => `${value}`)
          .join(' | '),
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.ROUNDING,
      },
    },
  },
  statusColor: {
    description: 'Color of the status indicator for this component.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(STATUS_CONSTANTS.COLORS)],
    table: {
      type: {
        summary: Object.values(STATUS_CONSTANTS.COLORS)
          .map((value) => `${value}`)
          .join(' | '),
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
  statusStriped: {
    description: 'Whether the status indicator for this component is striped.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: undefined,
      },
    },
  },
};

export { cardArgTypes };

export default {
  ...commonStyles,
  ...extendArgTypes('ButtonSimple', buttonSimpleArgTypes),
  ...cardArgTypes,
};
