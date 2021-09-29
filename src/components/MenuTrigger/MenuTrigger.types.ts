import { CSSProperties, ReactElement } from 'react';
import { MenuTriggerProps } from '@react-types/menu';
import { ModalContainerRadius } from '../ModalContainer/ModalContainer.types';

export interface Props extends Omit<MenuTriggerProps, 'align' | 'direction' | 'shouldFlip'> {
  children: ReactElement[];
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Radius of the modal container where menus are wrapped in.
   */
  overlayRadius?: ModalContainerRadius;
}
