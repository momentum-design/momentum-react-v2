import { commonStyles } from 'storybook/helper.stories.argtypes';

export default {
  ...commonStyles,
  children: {
    description:
      '`<ToastDetails />` and `<ToastContent />` for this component. This will be overwritten by the content and details props. While a `<ToastDetails />` is required, `<ToastContent />` is not.',
    control: { type: 'none' },
    table: {
      type: {
        summary: '[ToastDetails, ToastContent?]',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  content: {
    description:
      '`<ToastContent />` for this `<Toast />`. This overrides the second child component.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ToastContent',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  controls: {
    description:
      'Controls for this `<Toast />`. These appear in the top-right corner of this `<Toast />`, or permeate to the nested `<ToastDetails />`.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'Array<ButtonControl>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  details: {
    description:
      '`<ToastDetails />` for this `<Toast />`. This overrides the first child component.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ToastDetails',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  title: {
    description: '`<Toast />` title. This appears in the header-bar for this `<Toast />`',
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
};
