import { Props as PopoverProps } from '../Popover/Popover.types';

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
   * When it is false it passes aria-labelledby prop to the trigger component, otherwise pass aria-describedby
   */
  isDescription?: boolean;
}
