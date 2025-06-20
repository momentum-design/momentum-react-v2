import type { MdcDialogProps } from '../../types';

export interface DialogProps extends MdcDialogProps {
  onClose?: () => void;
  /**
   * footerButtonPrimary element to be rendered in the dialog footer.
   * This is typically a primary action button.
   * Make sure that the Button has variant="primary" set.
   */
  footerButtonPrimary?: React.ReactElement;
  /**
   * footerButtonSecondary element to be rendered in the dialog footer.
   * This is typically a secondary action button.
   * Make sure that the Button has variant="secondary" set.
   */
  footerButtonSecondary?: React.ReactElement;
  /**
   * footerLink element to be rendered in the dialog footer.
   * This is typically a link for additional actions or information.
   */
  footerLink?: React.ReactElement;
}
