import React, { FC, useCallback, useEffect, useState } from 'react';

import { Props } from './TooltipMenuTriggerCombo.types';
import './TooltipMenuTriggerCombo.style.scss';
import MenuTrigger from '../MenuTrigger';
import TooltipWrapper from './TooltipWrapper';
import { PopoverInstance } from '../Popover';

/**
 * The TooltipMenuTriggerCombo component.
 */
const TooltipMenuTriggerCombo: FC<Props> = (props: Props) => {
  const { menuContent, menuTriggerProps, tooltipContent, tooltipProps, triggerComponent } = props;

  const [tooltipInstance, setTooltipInstance] = useState<PopoverInstance>();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const setMergedTooltipInstances = useCallback(
    (popoverInstance: PopoverInstance | undefined) => {
      tooltipProps?.setInstance?.(popoverInstance);
      setTooltipInstance(popoverInstance);
    },
    [tooltipProps]
  );

  const handleMenuOpenChange = useCallback(
    (isOpen: boolean) => {
      menuTriggerProps?.onOpenChange?.(isOpen);
      setIsPopoverOpen(isOpen);
    },
    [menuTriggerProps]
  );

  const handleOnHideTooltip = useCallback(
    (instance: PopoverInstance | undefined) => {
      tooltipProps?.onHide?.(instance);
      setIsTooltipOpen(false);
    },
    [tooltipProps]
  );

  const handleOnShowTooltip = useCallback(
    (instance: PopoverInstance | undefined) => {
      tooltipProps?.onShow?.(instance);
      setIsTooltipOpen(true);
    },
    [tooltipProps]
  );

  // if the tooltip and popover are both open at the same time we close the tooltip to avoid them overlapping
  useEffect(() => {
    if (isPopoverOpen && isTooltipOpen) {
      tooltipInstance?.hide();
    }
  }, [isPopoverOpen, isTooltipOpen, tooltipInstance]);

  return (
    <MenuTrigger
      {...menuTriggerProps}
      onOpenChange={handleMenuOpenChange}
      triggerComponent={
        <TooltipWrapper
          _tooltipProps={{
            ...tooltipProps,
            onHide: handleOnHideTooltip,
            onShow: handleOnShowTooltip,
            setInstance: setMergedTooltipInstances,
            children: tooltipContent,
          }}
          _triggerComponent={triggerComponent}
        />
      }
    >
      {menuContent}
    </MenuTrigger>
  );
};

export default TooltipMenuTriggerCombo;
