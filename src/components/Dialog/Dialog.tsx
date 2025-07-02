import React, { FC, useEffect } from 'react';
import { Dialog as MdcDialog } from '@momentum-design/components/dist/react';
import { DialogProps } from './Dialog.types';
import { DEFAULTS } from './Dialog.constants';
import { setupHideOnPlugin } from '../Popover/tippy-plugins/hideOnEscPlugin';

// create a global stack of dialogs
const dialogStack: Array<string> = [];

const Dialog: FC<DialogProps> = (props) => {
  const { children, size = DEFAULTS.SIZE, ...other } = props;

  const dialogProps = {
    visible: true, // Always visible when rendered
    ...other,
  };

  useEffect(() => {
    // override the default hideOnEsc plugin to handle Esc key press
    // for any tooltips and popovers inside the dialog
    // Remove this once Popover, Tooltip etc are migrated to new momentum-design components
    setupHideOnPlugin({
      hideKeys: ['Escape'],
      stopEventPropagation: true,
      hideListenerTarget: 'this',
    });

    // Add the dialog to the global stack
    if (props.id) {
      dialogStack.push(props.id);
    }

    return () => {
      // Remove the dialog from the global stack
      if (props.id) {
        const index = dialogStack.indexOf(props.id);
        dialogStack.splice(index, 1);
      }

      // cleanup the hideOnEsc plugin only if stack is empty
      if (dialogStack.length === 0) {
        // Remove the event listener for Esc key press
        setupHideOnPlugin({
          hideKeys: ['Escape'],
          stopEventPropagation: false,
          hideListenerTarget: 'window',
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MdcDialog {...dialogProps} size={size}>
      {children}
    </MdcDialog>
  );
};

export default Dialog;
