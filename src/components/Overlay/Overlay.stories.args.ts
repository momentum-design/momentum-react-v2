import {
  commonAriaDialog,
  commonAriaFocusScope,
  commonAriaOverlay,
  commonStyles,
  extendArgTypes,
} from '../../storybook/helper.stories.argtypes';
import { modalContainerArgTypes } from '../ModalContainer/ModalContainer.stories.args';

import { OVERLAY_CONSTANTS as CONSTANTS } from '.';

const overlayArgTypes = {
  isOpen: {
    control: { type: 'boolean' },
    description: 'Whether this component is open or not.',
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  positioning: {
    control: { type: 'select' },
    description:
      'The positioning of this component in relation to the `target` prop element. Required and requires when using the `targetPosition` element.',
    options: [undefined, ...Object.values(CONSTANTS.POSITIONINGS)],
    table: {
      type: {
        summary: Object.values(CONSTANTS.POSITIONINGS)
          .map((value) => `"${value}"`)
          .join(' | '),
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
  targetPosition: {
    control: { type: 'object' },
    description:
      'The position object of the target element to apply the `positioning` prop value. This is typically handled by upstream components when used.',
    table: {
      type: {
        summary:
          '{ center: { x: number, y: number }, horizontalEdgeOffset: number, verticalEdgeOffset: number }',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};

export { overlayArgTypes };

export default {
  ...commonAriaDialog,
  ...commonAriaFocusScope,
  ...extendArgTypes('ModalContainer', modalContainerArgTypes),
  ...commonAriaOverlay,
  ...commonStyles,
  ...overlayArgTypes,
};
