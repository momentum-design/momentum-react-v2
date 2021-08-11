import { ICON_CONSTANTS as CONSTANTS } from './';

export default {
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
    defaultValue: CONSTANTS.DEFAULTS.SCALE,
    description: 'Scale represents the size/scale of te icon.',
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SCALE,
      },
    },
  },
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
  className: {
    defaultValue: undefined,
    description:
      'If present, the class name will be added to the underlying svg. Used to override styles by consumers.',
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
  color: {
    defaultValue: undefined,
    description:
      'Color for the icon to be filled and stroked with. This overrides the `fillColor` and `strokeColor` props.',
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
};
