import React, { CSSProperties, ReactElement } from 'react';
import { MenuTriggerProps } from '@react-types/menu';
export interface Props extends MenuTriggerProps {
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

  button?: React.ReactElement;
}
