import { CSSProperties, ReactNode } from 'react';
import { IconScale } from '../Icon';
import { AriaLabelRequired } from '../../utils/a11y';
import { AriaLabelingProps } from '@react-types/shared';
import { SpinnerSize, SpinnerVariant } from '@momentum-design/components';

export type Props = AriaLabelingProps &
  (
    | {
        /**
         * Whether this loading spinner should be hidden from SR as it's meaning is redundant
         */
        'aria-hidden': true;
      } // if aria-hidden is false or undefined, a label is required
    | ({ 'aria-hidden'?: false } & AriaLabelRequired)
  ) & {
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
     * Size of the loading spinner. Compatible with all icon sizes except for 'auto' and 'inherit'.
     * @default 24
     */
    scale?: Omit<IconScale, 'auto' | 'inherit'>;

    /**
     * Whether the spinner should use inverted colors. To be used when the spinner is used in an inverted color component, such as a Coachmark.
     * @default false
     */
    inverted?: boolean;

    /**
     * The variant of the spinner. Standalone is the default value and 'button' is to be used when the spinner is used in a button.
     * @default 'standalone'
     */
    variant?: SpinnerVariant;

    /**
     * The size of the spinner. If size if provided, it will override the scale prop.
     * @default 'midsize'
     */
    size?: SpinnerSize;
  };
