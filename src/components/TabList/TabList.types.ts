import { CSSProperties, ReactElement } from 'react';

import { TabProps } from '../Tab';

export type SupportedComponents = TabProps;
export type TabListOrientation = 'horizontal' | 'vertical';

export interface Props {
  /**
   * aria-label attribute for the tabList;
   */
  ariaLabel?: string;

  /**
   * aria-labelledby attribute for the tabList;
   */
  ariaLabelledby?: string;

  /**
   * aria-describedby attribute for the tabList;
   */
  ariaDescribedby?: string;

  /**
   * Child components of this TabList.
   */
  children?: ReactElement<SupportedComponents> | Array<ReactElement<SupportedComponents>>;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Orientation of TabList,  Default: `horizontal`
   * horizontal -> left/right keys to navigate
   * vertical -> up/down keys to navigate
   */
  orientation: TabListOrientation;

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
};
