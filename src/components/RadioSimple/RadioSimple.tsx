import React, { FC, useContext, useRef } from 'react';
import classnames from 'classnames';
import { useRadio } from '@react-aria/radio';
import { useFocusRing, VisuallyHidden } from 'react-aria';
import FocusRing from '../FocusRing';

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
    children,
    ariaLabel,
    ariaLabelledBy,
  } = props;
  const state = useContext(RadioSimpleGroupContext);
  const ref = useRef(null);
  const { inputProps } = useRadio(
    { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props },
    state,
    ref
  );
  return (
    <div
      data-disabled={isDisabled}
      className={classnames(STYLE.wrapper, className)}
      style={style}
      id={id}
    >
      <VisuallyHidden>
        <input {...inputProps} ref={ref} />
      </VisuallyHidden>
      {children}
    </div>
  );
};

export default RadioSimple;
