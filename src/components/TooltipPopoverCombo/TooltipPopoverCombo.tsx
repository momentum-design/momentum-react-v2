import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { Props } from './TooltipPopoverCombo.types';
import Popover from '../Popover';
import { TooltipPopoverComboProps } from '.';
import Tooltip from '../Tooltip/Tooltip';
import { PopoverInstance } from '../Popover/Popover.types';
import { v4 as uuidV4 } from 'uuid';

/**
 * The TooltipPopoverCombo component.
 */
const TooltipPopoverCombo: FC<Props> = (props: TooltipPopoverComboProps) => {
  const { 
    triggerComponent, 
    tooltipContent, 
    popoverContent, 
    otherPopoverProps,
    otherTooltipProps,
   } = props;
  const [tooltipInstance, setTooltipInstance] = useState<PopoverInstance>();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const triggerComponentId = useRef(triggerComponent.props?.id || uuidV4());

  const clonedTriggerComponent = React.cloneElement(triggerComponent, {id: triggerComponentId.current});

  // Modified tooltipSetInstance to call both setInstance and updateInstance
  const setMergedTooltipInstances = useCallback(
    (popoverInstance: PopoverInstance | undefined) => {
      otherTooltipProps?.setInstance?.(popoverInstance);
      setTooltipInstance(popoverInstance);
    },
    [otherTooltipProps?.setInstance, setTooltipInstance]
  );

  const handleOnShowPopover = useCallback((instance: PopoverInstance | undefined) => {
    otherPopoverProps?.onShow?.(instance);
    setIsPopoverOpen(true);
  }, [otherPopoverProps?.onShow, setIsPopoverOpen]);

  const handleOnHidePopover = useCallback((instance: PopoverInstance | undefined) => {
    otherPopoverProps?.onHide?.(instance);
    setIsPopoverOpen(false);
  }, [otherPopoverProps?.onHide, setIsPopoverOpen]);

  const handleOnHideTooltip = useCallback((instance: PopoverInstance | undefined) => {
    otherTooltipProps?.onHide?.(instance);
    setIsTooltipOpen(false);
  }, [otherTooltipProps?.onHide, setIsTooltipOpen]);

  const handleOnShowTooltip = useCallback((instance: PopoverInstance | undefined) => {
    otherTooltipProps?.onShow?.(instance);
    setIsTooltipOpen(true);
  }, [otherTooltipProps?.onShow, setIsTooltipOpen]);

  // if the tooltip and popover are both open at the same time we close the tooltip to avoid them overlapping
  useEffect(() => {
    if (isPopoverOpen && isTooltipOpen) {
      tooltipInstance?.hide();
    }
  }, [isPopoverOpen, isTooltipOpen]);


  return (
    <Popover
      trigger="click"
      interactive
      triggerComponent={
        <Tooltip    
          triggerComponent={clonedTriggerComponent}              
          {...otherTooltipProps}
          onHide={handleOnHideTooltip}
          onShow={handleOnShowTooltip}
          setInstance={setMergedTooltipInstances}
          id={triggerComponentId.current}
        >
          {tooltipContent}
        </Tooltip>
      }
      {...otherPopoverProps}
      onHide={handleOnHidePopover}
      onShow={handleOnShowPopover}
    >
      {popoverContent}
    </Popover>
);
};

export default TooltipPopoverCombo;
