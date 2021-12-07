import { ReactElement } from 'react';
import { AriaDialogProps } from '@react-types/dialog';
import { FocusScopeProps } from '@react-aria/focus';
import { ModalProps } from '@react-types/overlays';

import { ModalContainerProps } from '../ModalContainer';

export type Positioning = 'bottom' | 'left' | 'right' | 'top';
export interface TargetPosition {
  center: {
    x: number;
    y: number;
  };
  horizontalEdgeOffset: number;
  verticalEdgeOffset: number;
}

export interface Props extends AriaDialogProps, FocusScopeProps, ModalContainerProps, ModalProps {
  /**
   * Child components of this component. This is now a required prop.
   */
  children: ReactElement;

  /**
   * Whether this component is currently open.
   */
  isOpen?: boolean;

  /**
   * Position to place this element in correlation to the target position.
   */
  positioning?: Positioning;

  /**
   * Target element positioning in the event of a trigger.
   */
  targetPosition?: TargetPosition;
}
