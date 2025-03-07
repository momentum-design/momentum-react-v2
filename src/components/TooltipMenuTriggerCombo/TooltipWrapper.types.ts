import { ReactElement } from 'react';
import { TooltipProps } from '../Tooltip';

export type TooltipWrapperProps = {
  _tooltipProps: Omit<TooltipProps, 'triggerComponent'>;
  _triggerComponent: ReactElement;
} & Record<string, unknown>;
