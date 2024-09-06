import { CSSProperties, ReactNode } from 'react';

import { TabProps } from '../Tab';

export type SupportedComponents = TabProps;
export type TabGroupOrientation = 'horizontal' | 'vertical';

export interface Props {
  /**
   * aria-label attribute for the tabGrup;
   */
  ariaLabel?: string;

  /**
   * aria-labelledby attribute for the tabGrup;
   */
  ariaLabelledby?: string;

  /**
   * aria-describedby attribute for the tabGrup;
   */
  ariaDescribedby?: string;

  /**
   * aria-details attribute for the tabGrup;
   */
  ariaDetails?: string;

  /**
   * Child components of this TabGroup.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Orientation of TabGroup,  Default: `horizontal`
   * horizontal -> left/right keys to navigate
   * vertical -> up/down keys to navigate
   */
  orientation?: TabGroupOrientation;

  /**
   * Role for adding accessibility
   */
  role?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Whether to include spacing around child components.
   */
  spaced?: boolean;
}
