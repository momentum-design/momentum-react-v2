import { commonStyles, extendArgTypes } from '../../storybook/helper.stories.argtypes';
import { overlayArgTypes } from '../Overlay/Overlay.stories.args';

const overlayAlertArgTypes = {
  actions: {
    description:
      'Provides a collection of action components to this component. These appear at the bottom of this component.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ButtonSimple | Array<ButtonSimple> | ButtonGroup | Array<ButtonGroup>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  children: {
    description: 'Provides the child nodes for this element. This overrides the `details` prop.',
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
  controls: {
    description:
      'Provides a collection of control components to this component. These appear at the top of this component.',
    control: { type: 'none' },
    table: {
      type: {
        summary: 'ButtonControl | Array<ButtonControl>',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  details: {
    description:
      'Provides details within this component as a `string`. This can be overwritten by the `children` prop.',
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
  title: {
    description: 'Provides the title within this component as a `string`.',
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

export { overlayAlertArgTypes };

export default {
  ...commonStyles,
  ...extendArgTypes('Overlay', overlayArgTypes),
  ...overlayAlertArgTypes,
};
