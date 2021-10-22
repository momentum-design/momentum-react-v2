import {
  commonAriaButton,
  commonStyles,
  commonHTMLAttributes,
  extendArgTypes,
} from '../../storybook/helper.stories.argtypes';
import { buttonCircleArgTypes } from '../ButtonCircle/ButtonCircle.stories.args';

const addReactionButtonArgTypes = {};

export { addReactionButtonArgTypes };

export default {
  ...addReactionButtonArgTypes,
  ...commonStyles,
  ...commonHTMLAttributes,
  ...commonAriaButton,
  ...extendArgTypes('ButtonCircle', buttonCircleArgTypes, ['children', 'size']),
};
