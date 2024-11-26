import { CheckboxProps as AriaCheckboxProps } from '@react-types/checkbox';
import { AriaLabelingProps } from '@react-types/shared';
import { CSSProperties } from 'react';
import { RequireOneOf } from '../../utils/types';

interface CheckboxProps extends Omit<AriaCheckboxProps, 'children'>, AriaLabelingProps {
  /**
   * String that displays the label of this checkbox.
   */
  label?: string;

  /**
   * Description that displays underneath this checkbox.
   */
  description?: string;

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
}

export type Props = CheckboxProps &
  RequireOneOf<CheckboxProps, ['label', 'aria-label', 'aria-labelledby']>;
