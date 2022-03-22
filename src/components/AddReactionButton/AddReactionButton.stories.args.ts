import { commonAriaButton, commonStyles, extendArgTypes } from 'storybook/helper.stories.argtypes';

import { buttonCircleArgTypes } from 'components/ButtonCircle/ButtonCircle.stories.args';

const addReactionButtonArgTypes = {};

export { addReactionButtonArgTypes };

export default {
  ...addReactionButtonArgTypes,
  ...commonStyles,
  ...commonAriaButton,
  ...extendArgTypes('ButtonCircle', buttonCircleArgTypes, ['children', 'size']),
};
