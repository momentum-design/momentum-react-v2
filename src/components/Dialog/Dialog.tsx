import React, { FC, useCallback } from 'react';
import { Dialog as MdcDialog } from '@momentum-design/components/dist/react';
import { DialogProps } from './Dialog.types';
import { DEFAULTS, STYLE } from './Dialog.constants';
import { useShouldCloseOnEsc } from '../../hooks/useShouldCloseOnEsc';
import './Dialog.style.scss';
import { setupHideOnPlugin } from '../Popover/tippy-plugins/hideOnEscPlugin';

const Dialog: FC<DialogProps> = (props) => {
  const {
    children,
    onClose,
    size = DEFAULTS.SIZE,
    footerButtonPrimary,
    footerButtonSecondary,
    footerLink,
    ...other
  } = props;

  // Use the custom hook to determine if the dialog should close on Esc key press
  // Remove this once Popover, Tooltip etc are migrated to new momentum-design components
  const { shouldCloseOnEsc } = useShouldCloseOnEsc();
  const dialogProps = {
    visible: true, // Always visible when rendered, this is to match the behavior of OverlayAlert
    focusTrap: true, // Always true to match OverlayAlert behavior
    ...other,
  };

  // override the default hideOnEsc plugin to handle Esc key press
  // for any tooltips and popovers inside the dialog
  // Remove this once Popover, Tooltip etc are migrated to new momentum-design components
  setupHideOnPlugin({
    hideKeys: ['Escape'],
    stopEventPropagation: true,
    hideListenerTarget: 'this',
  });

  // Handle close event
  const handleClose = useCallback(() => {
    if (shouldCloseOnEsc) {
      onClose?.();
    }
  }, [onClose, shouldCloseOnEsc]);

  return (
    <MdcDialog {...dialogProps} size={size} onClose={handleClose}>
      <div className={STYLE.wrapper} slot="dialog-body">
        {children}
      </div>
      {footerButtonPrimary &&
        React.cloneElement(footerButtonPrimary, { slot: 'footer-button-primary' })}
      {footerButtonSecondary &&
        React.cloneElement(footerButtonSecondary, { slot: 'footer-button-secondary' })}
      {footerLink && React.cloneElement(footerLink, { slot: 'footer-link' })}
    </MdcDialog>
  );
};

export default Dialog;
