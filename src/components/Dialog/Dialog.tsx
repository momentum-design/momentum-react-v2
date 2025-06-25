import React, { FC } from 'react';
import { Dialog as MdcDialog } from '@momentum-design/components/dist/react';
import { DialogProps } from './Dialog.types';
import { DEFAULTS } from './Dialog.constants';
import { setupHideOnPlugin } from '../Popover/tippy-plugins/hideOnEscPlugin';

const Dialog: FC<DialogProps> = (props) => {
  const { children, size = DEFAULTS.SIZE, ...other } = props;

  const dialogProps = {
    visible: true, // Always visible when rendered, this is to match the behavior of OverlayAlert
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

  return (
    <MdcDialog {...dialogProps} size={size}>
      {children}
    </MdcDialog>
  );
};

export default Dialog;
