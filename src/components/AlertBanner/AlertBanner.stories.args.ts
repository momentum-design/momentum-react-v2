import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { ALERT_BANNER_CONSTANTS as CONSTANTS } from './';

export default {
  ...commonStyles,
  buttons: {
    description: 'Buttons available on this component.',

    table: {
      type: {
        summary: 'ButtonCircle | Array<ButtonCircle>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  children: {
    description: 'Label or message to display on this component.',
    control: { type: 'text' },
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
    description: 'If this component should have its contents centered.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.COLORS)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.COLOR,
      },
    },
  },
  isCentered: {
    description: 'If this component should have its contents centered.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.IS_CENTERED,
      },
    },
  },
  isGrown: {
    description: 'If this component should grow its width to the parent container.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.IS_GROWN,
      },
    },
  },
  isPilled: {
    description: 'If this component should be the pill shape.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.IS_PILLED,
      },
    },
  },
  isStatic: {
    description:
      'If this `<AlertBanner />` is for displaying static children. This overrides the `color` prop.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.IS_STATIC,
      },
    },
  },
  image: {
    description: 'Icon to display on this component.',

    table: {
      type: {
        summary: 'Icon',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  label: {
    description:
      'Label or message to display on this component. This overrides the `children` prop.',
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
  size: {
    description: 'Size of this component.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.SIZES)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
};
