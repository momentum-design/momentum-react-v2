import { CSSProperties, ReactElement } from 'react';

import { ButtonCircle, ButtonPill } from '@momentum-ui/react';

type SupportedComponents = typeof ButtonPill | typeof ButtonCircle;

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
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}
