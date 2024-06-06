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
   * When it is false it passes aria-labelledby prop to the trigger component, otherwise pass aria-describedby
   */
  isDescription?: boolean;

  /**
   * When it is true the tooltip can be opened/closed with click event, otherwise it will be activated with mouseenter/focus
   */
  isToggletip?: boolean;
}
