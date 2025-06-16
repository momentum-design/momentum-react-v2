import React, { FC, useCallback } from 'react';
import { Dialog as MdcDialog } from '@momentum-design/components/dist/react';
import { DialogProps } from './Dialog.types';
import { DEFAULTS } from './Dialog.constants';
import { useShouldCloseOnEsc } from '../../hooks/useShouldCloseOnEsc';

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

  const { shouldCloseOnEsc } = useShouldCloseOnEsc();
  // Map OverlayAlert props to Dialog web component props
  const dialogProps = {
    visible: true, // Always visible when rendered, this is to match the behavior of OverlayAlert
    focusTrap: true, // Always true to match OverlayAlert behavior
    ...other,
  };

  // Handle close event
  const handleClose = useCallback(() => {
    if (shouldCloseOnEsc) {
      onClose?.();
    }
  }, [onClose, shouldCloseOnEsc]);

  return (
    <MdcDialog {...dialogProps} size={size} onHidden={handleClose}>
      <div slot="dialog-body">{children}</div>
      {footerButtonPrimary &&
        React.cloneElement(footerButtonPrimary, { slot: 'footer-button-primary' })}
      {footerButtonSecondary &&
        React.cloneElement(footerButtonSecondary, { slot: 'footer-button-secondary' })}
      {footerLink && React.cloneElement(footerLink, { slot: 'footer-link' })}
    </MdcDialog>
  );
};

export default Dialog;
