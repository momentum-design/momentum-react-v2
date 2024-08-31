import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { Instance, LifecycleHooks } from 'tippy.js';
import type { TippyProps } from '@tippyjs/react';
import type { Color } from '../ModalContainer/ModalContainer.types';
import { ButtonCircleProps } from '../ButtonCircle';

// variant - based on Figma mockups:
export type VariantType = 'small' | 'medium';
export type BoundaryType = 'parent' | 'viewport' | 'window' | HTMLElement;
export type CloseButtonPlacement = 'top-left' | 'top-right' | 'none';

export type PlacementType = TippyProps['placement'];
export type TriggerType = TippyProps['trigger'];
export type PositioningStrategy = TippyProps['popperOptions']['strategy'];
export type AppendToType = TippyProps['appendTo'];

/**
 * Popover instance interface abstracted from Tippy.js
 */
export type PopoverInstance = Instance;

export type PopoverCommonStyleProps = {
  /**
   * Variant of the Popover - can be either small or medium
   *
   * @default `small`
   */
  variant?: VariantType;

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
   * Placement of the Popover
   *
   * Possible values: `top`, `top-start`, `top-end`, `right`, `right-start`, `right-end`, `bottom`, `bottom-start`, `bottom-end`,
   * `left`, `left-start`, `left-end`, `auto`, `auto-start`, `auto-end`
   *
   * @default `bottom`
   */
  placement?: PlacementType;

  /**
   * Overflow Boundary of Popover
   *
   * Possible values: `scrollParent`, `viewport`, `window`, or any `HTMLElement`
   *
   * @default `scollParent`
   */
  boundary?: BoundaryType;

  /**
   * Whether the popover should hide when Esc is pressed
   *
   * @default true
   */
  hideOnEsc?: boolean;

  /**
   * Whether the popover should hide when focus leaves from within the Popover
   *
   * @default false
   */
  hideOnBlur?: boolean;

  /**
   * Manual control of if the Popover contains child elements that may be open, and not nested within the
   * Popover. it's possible the focus may shift to something that in the DOM is not actually within the Popover,
   * but appears to be and therefore, do not blur it.
   *
   * @default false
   */
  isChildPopoverOpen?: boolean;

  /**
   * Whether or not an invisible backdrop is added behind the popover. A backdrop, when added, will hide the
   * popover when you click outside of it, preventing multiple popovers from opening at once.
   *
   * @default true
   */
  addBackdrop?: boolean;

  /**
   * The z-index of the tippy popover. If not supplied, tippy will default to 9999
   */
  zIndex?: number;
};

export interface Props extends PopoverCommonStyleProps, Partial<LifecycleHooks> {
  /**
   * Child components of this Popover (what will be shown within the Popover)
   */
  children: ReactNode;

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
   * Determines if the Popover has interactive content inside of it,
   * so that it can be hovered over and clicked inside without hiding.
   *
   * @default false
   */
  interactive?: boolean;

  /**
   * setInstance - this function should be passed in when the instance
   * of the popover should be available on the parent of the Popover.
   *
   * With the instance of the popover the parent component can `show()` or `hide()` the Popover programmatically.
   *
   * setInstance is the setter function of a useState hook
   */
  setInstance?: React.Dispatch<React.SetStateAction<PopoverInstance | undefined>>;

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

  /**
   * Position of the close button
   * @default `none`
   */
  closeButtonPlacement?: CloseButtonPlacement;

  /**
   * Props that are passed down to the close button.
   */
  closeButtonProps?: ButtonCircleProps;

  /**
   * Determines if the component will focus back on the trigger when the Popover is hidden.
   * @default `false`
   */
  focusBackOnTrigger?: boolean;

  /**
   * Describes the positioning strategy to use.
   * @default `absolute`
   */
  strategy?: PositioningStrategy;

  /**
   * The offset distance (in px) from the reference.
   * @default 'undefined'
   */
  offsetDistance?: number;

  /**
   * The offset skidding (in px) along the reference.
   * @default 'undefined'
   */
  offsetSkidding?: number;

  /**
   * The element used to focus on when the popover opens
   * See PopoverWithFirstFocus in storybook for example usage
   * @default 'undefined'
   */
  firstFocusElement?: HTMLElement;

  /**
   * Whether to auto focus the first focusable element in the focus scope of the Popover on mount.
   *
   * Example: set to false if the Popover Content itself wants to handle the auto focusing (i.e. MenuTrigger)
   *
   * Defaults: true
   */
  autoFocus?: boolean;

  /**
   * Role of the popover content
   */
  role?: string;

  /**
   * The element to append the popover to.
   */
  appendTo?: AppendToType;

  /**
   * Whether to allow the trigger event to continue to propagate after the Popover is triggered.
   */
  continuePropagationOnTrigger?: boolean;

  /**
   * aria-labelledby for an interactive popover only, defaults to the trigger component id.
   * Used in nested cases where the triggerComponent isn't the actual button.
   */
  'aria-labelledby'?: string;

  /**
   * aria-label for an interactive popover only. By default, it will be labelled by the triggerComponent.
   * Only required in the unusual circumstance where the popover label cannot match the trigger.
   */
  'aria-label'?: string;

  /**
   * If true, the focus lock will be disabled for the Popover content.
   * This is useful when you want to handle focus lock mechanism yourself, and to avoid having multiple focus locks.
   * @default `false`
   */
  disableFocusLock?: boolean;
}
