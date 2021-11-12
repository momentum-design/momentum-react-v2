import {
  commonAriaDialog,
  commonAriaFocusScope,
  commonAriaOverlay,
  commonStyles,
  extendArgTypes,
} from '../../storybook/helper.stories.argtypes';
import { modalContainerArgTypes } from '../ModalContainer/ModalContainer.stories.args';

export default {
  ...commonAriaDialog,
  ...commonAriaFocusScope,
  ...extendArgTypes('ModalContainer', modalContainerArgTypes),
  ...commonAriaOverlay,
  ...commonStyles,
};
