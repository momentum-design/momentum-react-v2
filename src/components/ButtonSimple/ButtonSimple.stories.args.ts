import {
  commonAriaButton,
  commonAriaHover,
  commonHTMLAttributes,
  commonStyles,
} from 'storybook/helper.stories.argtypes';

const buttonSimpleArgTypes = {
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
  // Override commonAriaButton, commonAriaHover
  isDisabled: {
    description: 'Disables all events on this component.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'Boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  useNativeKeyDown: {
    description:
      'Use the native onKeyDown event handler to allow `enter` & `space` keypress events fire a onClick (like a native HTML button does). This is necessary since `react-aria` supress that behaviour by design.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'Boolean',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { buttonSimpleArgTypes };

export default {
  ...commonStyles,
  ...commonHTMLAttributes,
  ...commonAriaHover,
  ...commonAriaButton,
  ...buttonSimpleArgTypes,
};
