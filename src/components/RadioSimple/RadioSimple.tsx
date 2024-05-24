import React, { FC, useContext, useRef } from 'react';
import classnames from 'classnames';
import { useRadio } from '@react-aria/radio';
import { useFocusRing, VisuallyHidden, mergeProps } from 'react-aria';

import { STYLE, DEFAULTS } from './RadioSimple.constants';
import { Props } from './RadioSimple.types';
import './RadioSimple.style.scss';
import { RadioSimpleGroupContext } from '../RadioSimpleGroup/RadioSimpleGroup';

// TODO: Update JSDOC for this component.
/**
 * The RadioSimple component.
 */
const RadioSimple: FC<Props> = (props: Props) => {
  const {
    className,
    isDisabled = DEFAULTS.DISABLED,
    id,
    style,
    value,
    children,
    ariaLabel,
    ariaLabelledBy,
  } = props;
  const state = useContext(RadioSimpleGroupContext);
  const ref = useRef(null);
  const isSelected = state.selectedValue === value;
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
