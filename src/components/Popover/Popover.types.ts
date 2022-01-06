import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { TippyProps } from '@tippyjs/react';

export type PlacementType = TippyProps['placement'];
export type TriggerType = TippyProps['trigger'];

export type Color = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type Round = 0 | 25 | 50 | 75 | 100 | 125 | 150;

export type ContainerPropsType = {
  /**
   * Whether padding should be applied
   *
   * Default: true
   */
  isPadded: boolean;
  /**
   * borderRadius of the Container - each value corresponds to rem percentage (e.g. value 25 = 0.25rem)
   *
   * Possible values: 0 | 25 | 50 | 75 | 100 | 125 | 150
   */
  round: Round;

  /**
   * Offset between triggerComponent and Popover Container
   *
   * Default: 5px
   */
  offset: number;
};

export interface Props {
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
   * Default: `click`
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
   * Default: `bottom`
   */
  placement?: PlacementType;
  /**
   * Determines if the Popover has interactive content inside of it,
   * so that it can be hovered over and clicked inside without hiding.
   *
   * Default: false
   */
  interactive?: boolean;
  /**
   * Color of the Container
   */
  color?: Color;
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
