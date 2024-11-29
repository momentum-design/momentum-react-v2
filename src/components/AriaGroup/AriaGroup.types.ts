import { AriaLabelingProps } from '@react-types/shared';
import { ReactNode } from 'react';
import { AriaLabelRequired } from '../../utils/a11y';

interface AriaGroupProps extends AriaLabelingProps {
  /**
   * Child components of this AriaGroup.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;
}

export type Props = AriaGroupProps & AriaLabelRequired;
