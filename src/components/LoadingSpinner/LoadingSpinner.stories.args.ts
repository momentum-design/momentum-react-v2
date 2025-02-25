import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { SIZES as ICON_SIZES } from '../Icon/Icon.constants';
import { DEFAULTS } from './LoadingSpinner.constants';

const loadingSpinnerArgTypes = {
  scale: {
    defaultValue: DEFAULTS.SCALE,
    description: 'Size of the loading spinner (same as IconScale, minus "auto" and "inherit").',
    // an array which has all the values of the ICON_SIZES array, but with 'auto' and 'inherit' removed
    options: [
      undefined,
      ...Object.values(ICON_SIZES).filter((size) => size !== 'auto' && size !== 'inherit'),
    ],
    control: { type: 'select' },
    table: {
      type: {
        summary: "Omit<IconScale, 'auto' | 'inherit'>",
      },
      defaultValue: {
        summary: DEFAULTS.SCALE,
      },
    },
  },
  inverted: {
    defaultValue: DEFAULTS.INVERTED,
    description: 'Whether the spinner should use inverted colors.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'Boolean',
      },
      defaultValue: {
        summary: DEFAULTS.INVERTED,
      },
    },
  },
  variant: {
    defaultValue: DEFAULTS.VARIANT,
    description: 'The variant of the spinner.',
    options: [undefined, DEFAULTS.VARIANT, 'button'],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'Variant',
      },
      defaultValue: {
        summary: DEFAULTS.VARIANT,
      },
    },
  },
  'aria-label': {
    defaultValue: undefined,
    description: 'The variant of the spinner.',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'SpinnerVariant',
      },
    },
  },
  size: {
    defaultValue: undefined,
    description: 'The size of the spinner.',
    options: [undefined, 'large', 'midsize', 'small'],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'SpinnerSize',
      },
      defaultValue: {
        summary: DEFAULTS.SIZE,
      },
    },
  },
};

export { loadingSpinnerArgTypes };

export default {
  ...commonStyles,
  ...loadingSpinnerArgTypes,
};
