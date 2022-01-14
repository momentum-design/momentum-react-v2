import { commonStyles } from '../../storybook/helper.stories.argtypes';

import { MODAL_CONTAINER_CONSTANTS as CONSTANTS } from '.';
import { PLACEMENTS } from '../ModalArrow/ModalArrow.constants';
import { DEFAULTS } from './ModalContainer.constants';

const modalContainerArgTypes = {
  showArrow: {
    description: `Whether the arrow should be shown
    <br/><br/>
    NOTE: showing the arrow and using the placement prop will not position it correctly - positioning of the arrow
    correctly will only be through the Popover component. Whenever there's the use case
    to show ModalContainer with a arrow, please use the Popover component instead.`,
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.SHOW_ARROW,
      },
    },
  },
  placement: {
    description: `Placement of the Modal relative to the trigger component. 
      <br/><br/>
    NOTE: showing the arrow and using the placement prop will not position it correctly - positioning of the arrow
    correctly will only be through the Popover component. Whenever there's the use case
    to show ModalContainer with a arrow, please use the Popover component instead.`,
    control: { type: 'select' },
    options: [undefined, ...Object.values(PLACEMENTS as Record<string, string>)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.PLACEMENT,
      },
    },
  },
  children: {
    description: 'Provides the child nodes for this component.',
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
    description: 'Provides the color of this component.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.COLORS)],
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: DEFAULTS.COLOR,
      },
    },
  },
  elevation: {
    description:
      'Provides the elevation for this component. This only applies to the box-shadow depth.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.ELEVATIONS)],
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: DEFAULTS.ELEVATION,
      },
    },
  },
  isPadded: {
    description: 'Identifies if this component should be rendered with padding.',
    control: { type: 'boolean' },
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: DEFAULTS.IS_PADDED,
      },
    },
  },
  round: {
    description:
      'Identifies if this component should be rendered with round corners and to what degree.',
    control: { type: 'select' },
    options: [undefined, ...Object.values(CONSTANTS.ROUNDS)],
    table: {
      type: {
        summary: 'number',
      },
      defaultValue: {
        summary: DEFAULTS.ROUND,
      },
    },
  },
};

export { modalContainerArgTypes };

export default {
  ...commonStyles,
  ...modalContainerArgTypes,
};
