import { ReactNode } from 'react';

export interface Props {
  /**
   * Child components of this Badge.
   */
  children?: ReactNode;

  /**
   * Size index of this ButtonPill.
   */
  size?: string;
}
