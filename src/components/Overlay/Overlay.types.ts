import { ReactNode } from 'react';
import { AriaDialogProps } from '@react-types/dialog';
import { FocusScopeProps } from '@react-aria/focus';
import { OverlayProps } from '@react-types/overlays';

import { ModalContainerProps } from '../ModalContainer';

export interface Props extends AriaDialogProps, FocusScopeProps, ModalContainerProps, OverlayProps {
  /**
   * Child components of this component. This is now a required prop.
   */
  children: ReactNode;
}
