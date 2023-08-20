import { commonStyles } from '../../storybook/helper.stories.argtypes';
import { BUTTON_PILL_CONSTANTS } from '../ButtonPill';
import { DEFAULTS } from './FixedWidthButtonPillContent.constants';
import { SIZES as ICON_SIZES } from '../Icon/Icon.constants';

const fixedWidthButtonPillContentArgTypes = {
  children: {
    description: 'Provides the child nodes for this element.',
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
  buttonPillSize: {
    description: 'Modifies the size of the content to fit in any given `<ButtonPill />` component.',
    options: [...Object.values(BUTTON_PILL_CONSTANTS.SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: BUTTON_PILL_CONSTANTS.DEFAULTS.SIZE,
      },
    },
  },
  icon: {
    description: 'Whether the content of this component will contain an `<Icon />` component.',
    options: [true, false],
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.ICON,
      },
    },
  },
  iconScale: {
    description: 'The size of the `<Icon />` component if there is one.',
    options: [...Object.values(ICON_SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: DEFAULTS.ICON_SCALE,
      },
    },
  },
  stringContentVariations: {
    description:
      'An array of strings that will be used in the `<ButtonPill />` component. The longest string will dictate the fixed width of the `<ButtonPill />`',
    control: { type: 'text' },
    table: {
      type: {
        summary: 'string[]',
      },
      defaultValue: {
        summary: ['Long, longer, longest'],
      },
    },
  },
};

export { fixedWidthButtonPillContentArgTypes };

export default {
  ...commonStyles,
  ...fixedWidthButtonPillContentArgTypes,
};
