import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { TippyProps } from '@tippyjs/react';
import type { Elevation, Round, Color } from '../ModalContainer/ModalContainer.types';

export type PlacementType = TippyProps['placement'];
export type TriggerType = TippyProps['trigger'];

export type PopoverInstance = {
  show: () => void;
  hide: () => void;
};

export type ContainerPropsType = {
  /**
   * Whether padding should be applied
   *
   * @default true
   */
  isPadded?: boolean;
  /**
   * borderRadius of the Container - each value corresponds to rem percentage (e.g. value 25 = 0.25rem)
   *
   * Possible values: 0 | 25 | 50 | 75 | 100 | 125 | 150
   */
  round?: Round;
  /**
   * elevation of the Container - each value corresponds to a box shadow applied to the container
   *
   * Possible values: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
   */
  elevation?: Elevation;
};

export interface Props {
  visible?: boolean;
  /**
   * Child components of this Popover (what will be shown within the Popover)
   */
  children: ReactNode;
  /**
   * Props to modify the Container around the content (=children)
   */
  containerProps?: ContainerPropsType;
  /**
   * Determines the events that cause the Popover to show. Multiple event names should be separated by spaces.
   * For example to allow both click and hover, use `click mouseenter` as the trigger.
   *
   * Possible event names: `click`, `mouseenter`, `focusin`, `manual` (to programmatically trigger the popover)
   *
   * @default `click`
   */
  trigger?: TriggerType;
  /**
   * The component which triggers the Popover
   */
  triggerComponent: ReactElement;
  /**
   * Placement of the Popover
   *
   * Possible values: `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`,
   * `left`, `left-start`, `left-end`, `auto`, `auto-start`, `auto-end`
   *
   * @default `bottom`
   */
  placement?: PlacementType;
  /**
   * Determines if the Popover has interactive content inside of it,
   * so that it can be hovered over and clicked inside without hiding.
   *
   * @default false
   */
  interactive?: boolean;
  /**
   * Color of the Container
   */
  color?: Color;
  /**
   * Whether the arrow should be shown
   *
   * @default true
   */
  showArrow?: boolean;
  /**
   * Delay in ms once a trigger event is fired before the Popover shows or hides.
   *
   * [`showDelay`, `hideDelay`]
   *
   * @default 0
   */
  delay?: [number, number];
  /**
   * setInstance - this function should be passed in when the instance
   * of the popover should be available on the parent of the Popover.
   *
   * With the instance of the popover the parent component can `show()` or `hide()` the Popover programmatically.
   *
   * setInstance is the setter function of a useState hook
   */
  setInstance?: React.Dispatch<React.SetStateAction<PopoverInstance>>;
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;
  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;
  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
