import { CSSProperties, ReactNode } from 'react';
import { AriaRadioGroupProps } from '@react-types/radio';
import { AriaLabelingProps } from '@react-types/shared';
import { RequireOneOf } from '../../utils/types';

interface Props extends AriaRadioGroupProps, AriaLabelingProps {
  /**
   * The RadioSimpleGroup's visible label (if any).
   */
  label?: ReactNode;
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
}

export type RadioSimpleGroupProps = Props &
  RequireOneOf<Props, ['label', 'aria-label', 'aria-labelledby']>;
