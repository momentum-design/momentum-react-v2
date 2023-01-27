import { CSSProperties, ReactElement } from 'react';

import { ButtonCircleProps } from '../ButtonCircle';
import { ButtonPillProps } from '../ButtonPill';

export type SupportedComponents = ButtonCircleProps | ButtonPillProps;

export interface Props {
  /**
   * Button shaped components.
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
   * Whether this <ButtonGroup /> is rounded.
   */
  round?: boolean;

  /**
   * Whether to include spacing around <SupportedComponents />.
   */
  spaced?: boolean;

  /**
   * Whether to compress horizontal space and remove inner borders between <SupportedComponents />.
   */
  compressed?: boolean;

  /**
   * Whether to to add a separator line between <SupportedComponents />.
   */
  separator?: boolean;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Role for adding accessibility
   */
  role?: string;
}
