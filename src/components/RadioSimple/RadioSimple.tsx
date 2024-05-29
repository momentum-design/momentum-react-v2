import React, { FC, useContext, useRef } from 'react';
import classnames from 'classnames';
import { useRadio } from '@react-aria/radio';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';

import { STYLE, DEFAULTS } from './RadioSimple.constants';
import { RadioSimpleProps } from './RadioSimple.types';
import './RadioSimple.style.scss';
import { RadioSimpleGroupContext } from '../RadioSimpleGroup';

/**
 * The RadioSimple component.
 */
const RadioSimple: FC<RadioSimpleProps> = (props: RadioSimpleProps) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    children,
    className,
    id,
    isDisabled = DEFAULTS.DISABLED,
    style,
    value,
  } = props;
  const state  = useContext(RadioSimpleGroupContext);
  const ref = useRef(null);
  const isSelected = state?.selectedValue === value;
  const { focusProps, isFocusVisible } = useFocusRing();
  const { inputProps } = useRadio(
    { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props },
    state,
    ref
  );

  return (
    <label
      className={classnames(STYLE.wrapper, className)}
      data-focused={isFocusVisible}
      data-selected={isSelected}
      data-disabled={isDisabled}
      style={style}
      id={id}
    >
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      {children}
    </label>
  );
};

export default RadioSimple;
