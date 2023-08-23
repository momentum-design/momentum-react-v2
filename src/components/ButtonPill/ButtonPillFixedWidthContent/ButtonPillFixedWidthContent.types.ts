import { ReactNode } from 'react';

export interface Props {
  /**
   * Child components of this ButtonPillFixedWidthContent.
   */
  children: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * The size of the being used with this component.
   */
  buttonPillSize: number;

  /**
   * Whether or not to include an icon.
   */
  includeIcon: boolean;

  /**
   * The different strings used for the content .
   */
  stringContentVariations: string[];
}
