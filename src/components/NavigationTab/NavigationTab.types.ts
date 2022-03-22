import { CSSProperties } from 'react';

import { AriaButtonProps } from '@react-types/button';

export interface Props extends AriaButtonProps {
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
   * Size index of this NavTab.
   */
  size?: number;

  /**
   * Size index of this NavTab.
   */
  label?: string;

  /**
   * Size index of this NavTab.
   */
  icon?: string;

  /**
   * The amount inside the badge of components of this NavTab. If 0, then it is not shown.
   */
  count?: number;

  /**
   * True if the tab is active.
   */
  active?: boolean;
}

export type NavTabSize = 48 | 200;
