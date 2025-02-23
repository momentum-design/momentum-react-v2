import { ICON_CONSTANTS as CONSTANTS } from './';
import { commonStyles } from '../../storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  autoScale: {
    defaultValue: CONSTANTS.DEFAULTS.AUTO_SCALE,
    description: 'If set to true, the icon size will match the parent size.',
    options: [undefined, true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.AUTO_SCALE,
      },
    },
  },
  fillColor: {
    defaultValue: undefined,
    description: 'Fill color for the icon.',
    control: { type: 'color' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  name: {
    defaultValue: 'accessibility',
    description: 'Name of the icon.',
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
  scale: {
    defaultValue: '100%',
    description: 'Scale represents the size/scale of te icon.',
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: '100%',
      },
    },
  },
  weight: {
    defaultValue: CONSTANTS.DEFAULTS.WEIGHT,
    description: 'Represents the style of the icon. Note: Not all icons have all 4 styles.',
    options: [undefined, ...Object.values(CONSTANTS.WEIGHTS)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.WEIGHT,
      },
    },
  },
  weightless: {
    defaultValue: CONSTANTS.DEFAULTS.WEIGHTLESS,
    description: "Indicates if the icon doesn't have a weight",
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.WEIGHTLESS,
      },
    },
  },
  title: {
    defaultValue: '',
    description: 'Visible accessibility label when icon is hovered',
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
  ariaLabel: {
    defaultValue: '',
    description:
      'Accessible name of the icon for screen reader in case icon is informative (not decorative)',
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
  tooltipProps: {
    description:
      'For accessibility, meaningful standalone icons needs to be labelled by a tooltip. If provided, a tooltip will be added to the icon and these props will be passed to the tooltip component.',
    defaultValue: undefined,
    control: { type: 'object' },
    table: {
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
