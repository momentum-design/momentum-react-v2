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
  > {
  /**
   * When it is false it pass aria-labelby prop to the trigger component, otherwise pass aria-describeby
   */
  isDescription?: boolean;
}
