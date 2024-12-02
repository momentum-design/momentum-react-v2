import { ReactElement } from 'react';
import { PopoverProps } from '../Popover';
import { TooltipProps } from '../Tooltip';

export interface Props {
  /**
   * The content of the Popover.
   */
  popoverContent: ReactElement;

  /**
   * The content of the Tooltip
   */
  tooltipContent: ReactElement;

  /**
   * The trigger component of the Popover and Tooltip.
   */
  triggerComponent: ReactElement;

  /**
   * An object of Popover props to be passed through to the Popover component.
   */
  otherPopoverProps?: Partial<Omit<PopoverProps, 'id'>>;

  /**
   * An object of Tooltip props to be passed through to the Tooltip component.
   */
  otherTooltipProps?: Partial<Omit<TooltipProps, 'id'>>;
}
