import { ReactNode } from 'react';
import { SelectDirection } from '../Select/Select.types';

export interface Props {
  /**
   * className prop description
   */
  className?: string;
  /**
   * children props
   */
  children?: ReactNode;
  direction?: SelectDirection;
}
