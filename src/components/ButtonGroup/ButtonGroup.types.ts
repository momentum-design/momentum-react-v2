import { ReactElement } from 'react';

import { ButtonPill } from '@momentum-ui/react';

type SupportedComponents = typeof ButtonPill;

export interface Props {
  /**
   * Button shaped components.
   */
  children?: ReactElement<SupportedComponents> | Array<ReactElement<SupportedComponents>>;

  /**
   * Custom class name to be provided to this <ButtonGroup />.
   */
  className?: string;

  /**
   * Whether this <ButtonGroup /> is rounded.
   */
  round?: boolean;

  /**
   * Type of separators to use on this ButtonGroup.
   */
  separation?: 'full' | 'none' | 'partial';

  /**
   * Whether to include spacing around <SupportedComponents />.
   */
  spaced?: boolean;
}
