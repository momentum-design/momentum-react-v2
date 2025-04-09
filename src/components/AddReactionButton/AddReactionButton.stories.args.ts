import {
  commonAriaButton,
  commonStyles,
  extendArgTypes,
} from '../../storybook/helper.stories.argtypes';
import { buttonCircleArgTypes } from '../ButtonCircle/ButtonCircle.stories.args';

const addReactionButtonArgTypes = {};

export { addReactionButtonArgTypes };

export default {
  ...addReactionButtonArgTypes,
  ...commonStyles,
  ...commonAriaButton,
  ...extendArgTypes('ButtonCircle', buttonCircleArgTypes, ['children', 'size']),
  onClick: {
    action: 'onClick',
    description: 'Handler that is called when the button is clicked',
    table: {
      type: {
        summary: '(e: MouseEvent) => void',
      },
      defaultValue: {
        summary: 'undefined',
      },
    },
  },
};
