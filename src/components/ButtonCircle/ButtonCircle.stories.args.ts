import {
  commonMdcButton,
  commonHTMLAttributes,
  commonStyles,
} from '../../storybook/helper.stories.argtypes';

import { BUTTON_VARIANTS, ICON_BUTTON_SIZES, BUTTON_COLORS } from '@momentum-design/components';

// buttoncircle does not support children
delete commonMdcButton.children;

const buttonCircleArgTypes = {
  prefixIcon: {
    description: 'The icon to display in the button.',
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
  variant: {
    description: 'Modifies the variant of this component.',
    options: [undefined, ...Object.values(BUTTON_VARIANTS)],
    control: { type: 'select' },
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
    description:
      'Modifies the size of this component. \n\n**NOTE:** Size 20 is only supported for `variant="tertiary"`',
    options: [undefined, ...Object.values(ICON_BUTTON_SIZES)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: 32,
      },
    },
  },
  color: {
    description:
      'Modifies the color of this component. \n\n**NOTE:** Coloring is only supported for variants `primary` & `secondary`',
    options: [undefined, ...Object.values(BUTTON_COLORS)],
    control: { type: 'select' },
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  inverted: {
    description: 'Inverts the color of the button.',
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

export { buttonCircleArgTypes };

export default {
  ...commonStyles,
  ...commonMdcButton,
  ...commonHTMLAttributes,
  ...buttonCircleArgTypes,
};
