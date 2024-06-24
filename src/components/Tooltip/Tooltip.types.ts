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
  type: TooltipTypes;
}
