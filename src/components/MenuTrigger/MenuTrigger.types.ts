import { CSSProperties, ReactElement } from 'react';
import { MenuTriggerProps } from '@react-types/menu';
import type { PopoverCommonStyleProps, PlacementType } from '../Popover/Popover.types';

export interface Props
  extends Omit<MenuTriggerProps, 'align' | 'direction' | 'shouldFlip' | 'defaultOpen'>,
    Omit<PopoverCommonStyleProps, 'placement'> {
  /**
   * Child components of this Popover (what will be shown within the Popover)
   */
  children: ReactElement[];

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
   * The component which triggers the Menu Overlay
   */
  triggerComponent: ReactElement;

  /**
   * Placement of the popover triggered by MenuTrigger
   *
   * Possible values: `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`,
   *
   * @default `bottom`
   */
  placement?: Omit<
    PlacementType,
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'
  >;
}
