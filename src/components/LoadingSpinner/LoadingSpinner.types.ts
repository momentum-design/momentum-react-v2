import { CSSProperties, ReactNode } from 'react';
import { IconScale } from '../Icon';
import { AriaLabelRequired } from '../../utils/a11y';
import { AriaLabelingProps } from '@react-types/shared';

export type Props = AriaLabelingProps &
  (
    | {
        /**
         * Whether this loading spinner should be hidden from SR as it's meaning is redundant
         */
        'aria-hidden': boolean;
      }
    | ({ 'aria-hidden'?: never } & AriaLabelRequired)
  ) & { // if aria-hidden is not provided, a label is required
    /**
     * Child components of this LoadingSpinner.
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
     * Custom style for overriding this component's CSS.
     */
    style?: CSSProperties;

    /**
     * Size of the loading spinner (same as IconScale).
     * @default 24
     */
    scale?: IconScale;
  };
