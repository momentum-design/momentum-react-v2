import { ReactElement } from 'react';
import { MenuTriggerProps } from '../MenuTrigger';
import { TooltipProps } from '../Tooltip';

export interface Props {
  menuTriggerProps: Omit<MenuTriggerProps, 'children' | 'triggerComponent'>;
  menuContent: MenuTriggerProps['children'];
  tooltipProps: Omit<TooltipProps, 'children' | 'triggerComponent'>;
  tooltipContent: TooltipProps['children'];
  triggerComponent: ReactElement;
}
