import { commonStyles } from '../../storybook/helper.stories.argtypes';

const sliderArgTypes = {
  ariaLabel: {
    description: 'ariaLabel attribute for the slider',
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
  value: {
    description: 'value attribute for the slider',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  minValue: {
    description: 'minValue of the slider',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  maxValue: {
    description: 'maxValue of the slider',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  step: {
    description: 'step size of the slider',
    control: { type: 'number' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  onChange: {
    description: 'value setter attribute for the slider',
    control: { type: 'function' },
    table: {
      type: {
        summary: 'function',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { sliderArgTypes };

export default {
  ...commonStyles,
  ...sliderArgTypes,
};
