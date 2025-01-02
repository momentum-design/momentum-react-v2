import { CSSProperties, ReactNode } from 'react';
import { AriaRadioGroupProps } from '@react-types/radio';
import { AriaLabelingProps } from '@react-types/shared';
import { AriaLabelRequired } from '../../utils/a11y';

export type RadioSimpleGroupProps = AriaRadioGroupProps &
  AriaLabelingProps &
  (
    | {
        /**
         * The RadioSimpleGroup's visible label (if any).
         */
        label: ReactNode;
      }
    | ({ label?: never } & AriaLabelRequired)
  ) & { // if a label is not provided, an aria-label(ledby) is required
    /**
     * Custom class for overriding this component's CSS.
     */
    className?: string;

    /**
     * A wrapper that contains the RadioSimples inside this RadioSimpleGroup
     */
    children: ReactNode;

    /**
     *  The RadioSimpleGroup description element, if any.
     */
    description?: ReactNode;

    /**
     * Custom style for overriding this component's CSS.
     */
    style?: CSSProperties;
  };
