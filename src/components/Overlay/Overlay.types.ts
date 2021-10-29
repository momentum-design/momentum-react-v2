import { ReactNode } from 'react';
import { AriaDialogProps } from '@react-types/dialog';
import { ModalOptions } from '@react-aria/overlays';
import { OverlayProps } from '@react-types/overlays';

import { ModalContainerProps } from '../ModalContainer';

export interface Props extends AriaDialogProps, ModalContainerProps, ModalOptions, OverlayProps {
  /**
   * Child components of this component. This is now a required prop.
   */
  children: ReactNode;
}
