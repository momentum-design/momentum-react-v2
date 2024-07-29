import { AriaBaseButtonProps } from '@react-types/button';
import { Props as PopoverProps } from '../Popover/Popover.types';

/**
 * When it is
 * - 'none' not passing any aria props to the trigger component and hiding the tooltip's content from the screen reader
 * - 'label' passing content of the tooltip as aria-label prop to the trigger component
 * - 'description' passing aria-describedby to the trigger component which refers to the tooltip's content
 */
export type TooltipTypes = 'none' | 'label' | 'description';

export interface Props
  extends Pick<
    PopoverProps,
    | 'boundary'
    | 'children'
    | 'className'
    | 'color'
    | 'delay'
    | 'id'
    | 'offsetDistance'
    | 'offsetSkidding'
    | 'onAfterUpdate'
    | 'onBeforeUpdate'
    | 'onClickOutside'
    | 'onCreate'
    | 'onDestroy'
    | 'onHidden'
    | 'onHide'
    | 'onMount'
    | 'onShow'
    | 'onShown'
    | 'onTrigger'
    | 'onUntrigger'
    | 'placement'
    | 'strategy'
    | 'style'
    | 'triggerComponent'
    | 'variant'
    | 'setInstance'
  > {
  /**
   * Whether the tooltip content should provide the aria label, description or neither to the trigger component.
   * Possible values: 'label', 'description', 'none'.
   * Usually 'label' is used for buttons with no text, 'description' is used for buttons with text. 'none' is rarely used.
   */
  type: TooltipTypes;
  /**
   * When type is 'label' or 'desription', you can optionally use labelOrDescriptionId specify the id to use for labelling/describing.
   * This enables you to use the same id to label or describe e.g. a dialog, as is used by TooltipPopoverCombo.
   */
  labelOrDescriptionId?: string;
  /**
   * aria-haspopup will be passed through to the trigger component if provided.
   * This is only really useful for a nested component structure as in TooltipPopoverCombo.
   */
  'aria-haspopup'?: AriaBaseButtonProps['aria-haspopup'];
}
