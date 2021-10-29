import {
  commonAriaDialog,
  commonAriaModal,
  commonAriaOverlay,
  commonStyles,
  extendArgTypes,
} from '../../storybook/helper.stories.argtypes';
import { modalContainerArgTypes } from '../ModalContainer/ModalContainer.stories.args';

export default {
  ...commonAriaDialog,
  ...extendArgTypes('ModalContainer', modalContainerArgTypes),
  ...commonAriaModal,
  ...commonAriaOverlay,
  ...commonStyles,
};
