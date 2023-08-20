import { ReactNode } from 'react';
import { IconScale } from '../Icon/Icon.types';

export interface Props {
  /**
   * Child components of this FixedWidthButtonPillContent.
   */
  children: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * The size of the ButtonPill or ButtonPillToggle being used with this component.
   */
  buttonPillSize?: number;

  /**
   * Whether or not the ButtonPill or ButtonPillToggle contains an icon.
   */
  icon?: boolean;

  /**
   * The size of the icon used in the ButtonPill or ButtonPillToggle content.
   */
  iconScale?: IconScale;

  /**
   * The different strings used for the ButtonPill or ButtonPillToggle content .
   */
  stringContentVariations: string[];
}
