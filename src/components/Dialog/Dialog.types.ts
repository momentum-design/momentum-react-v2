import type { MdcDialogProps } from '../../types';

export interface DialogProps extends MdcDialogProps {
  onClose?: () => void;
  footerButtonPrimary?: React.ReactElement;
  footerButtonSecondary?: React.ReactElement;
  footerLink?: React.ReactElement;
}
