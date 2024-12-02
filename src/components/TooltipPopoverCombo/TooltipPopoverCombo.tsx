import React, { FC, useCallback, useEffect, useState } from 'react';

import { Props } from './TooltipPopoverCombo.types';
import Popover from '../Popover';
import { TooltipPopoverComboProps } from '.';
import Tooltip from '../Tooltip/Tooltip';
import { PopoverInstance } from '../Popover/Popover.types';
import { useId } from '@react-aria/utils';

/**
 * The TooltipPopoverCombo component.
 */
const TooltipPopoverCombo: FC<Props> = (props: TooltipPopoverComboProps) => {
  const { triggerComponent, tooltipContent, popoverContent, otherPopoverProps, otherTooltipProps } =
    props;
  const [tooltipInstance, setTooltipInstance] = useState<PopoverInstance>();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const labelId = useId();
  const triggerComponentId = useId(triggerComponent.props?.id);

  // Modified tooltipSetInstance to call both setInstance and updateInstance
  const setMergedTooltipInstances = useCallback(
    (popoverInstance: PopoverInstance | undefined) => {
      otherTooltipProps?.setInstance?.(popoverInstance);
      setTooltipInstance(popoverInstance);
    },
    [otherTooltipProps]
  );

  const handleOnShowPopover = useCallback(
    (instance: PopoverInstance | undefined) => {
      otherPopoverProps?.onShow?.(instance);
      setIsPopoverOpen(true);
    },
    [otherPopoverProps]
  );

  const handleOnHidePopover = useCallback(
    (instance: PopoverInstance | undefined) => {
      otherPopoverProps?.onHide?.(instance);
      setIsPopoverOpen(false);
    },
    [otherPopoverProps]
  );

  const handleOnHideTooltip = useCallback(
    (instance: PopoverInstance | undefined) => {
      otherTooltipProps?.onHide?.(instance);
      setIsTooltipOpen(false);
    },
    [otherTooltipProps]
  );

  const handleOnShowTooltip = useCallback(
    (instance: PopoverInstance | undefined) => {
      otherTooltipProps?.onShow?.(instance);
      setIsTooltipOpen(true);
    },
    [otherTooltipProps]
  );

  // if the tooltip and popover are both open at the same time we close the tooltip to avoid them overlapping
  useEffect(() => {
    if (isPopoverOpen && isTooltipOpen) {
      tooltipInstance?.hide();
    }
  }, [isPopoverOpen, isTooltipOpen, tooltipInstance]);

  const popoverLabelledById =
    otherTooltipProps?.type === 'description' ? triggerComponentId : labelId;

  return (
    <Popover
      trigger="click"
      interactive
      aria-labelledby={popoverLabelledById}
      triggerComponent={
        <Tooltip
          type="label"
          triggerComponent={
            otherTooltipProps?.type === 'description'
              ? React.cloneElement(triggerComponent, { id: triggerComponentId })
              : triggerComponent
          }
          {...otherTooltipProps}
          onHide={handleOnHideTooltip}
          onShow={handleOnShowTooltip}
          setInstance={setMergedTooltipInstances}
          labelOrDescriptionId={labelId}
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
