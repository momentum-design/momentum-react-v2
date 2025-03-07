import React, { FC, forwardRef } from 'react';

import type { TooltipWrapperProps } from './TooltipWrapper.types';
import Tooltip from '../Tooltip';

/**
 * The TooltipWrapper component.
 *
 * MenuTrigger passes additional properties to its `triggerComponent` (for example, onPress, onPressStart)
 * Capture these props and pass them to the triggerComponent of the tooltip instead
 */
const TooltipWrapper: FC<TooltipWrapperProps> = forwardRef(
  ({ _tooltipProps, _triggerComponent, ...props }: TooltipWrapperProps, ref) => (
    <Tooltip
      {..._tooltipProps}
      triggerComponent={React.cloneElement(_triggerComponent, { ...props, ref })}
    />
  )
);

TooltipWrapper.displayName = 'TooltipWrapper';

export default TooltipWrapper;
