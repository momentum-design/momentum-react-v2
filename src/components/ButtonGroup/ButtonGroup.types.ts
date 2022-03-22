import { CSSProperties, ReactElement } from 'react';

import { ButtonCircleProps } from 'components/ButtonCircle';
import { ButtonPillProps } from 'components/ButtonPill';

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
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
