import React, { FC, useContext, useRef } from 'react';
import classnames from 'classnames';
import { useRadio } from '@react-aria/radio';
import { useFocusRing, VisuallyHidden, mergeProps } from 'react-aria';
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
  const { focusProps } = useFocusRing();
  const { inputProps } = useRadio(
    { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props },
    state,
    ref
  );

  return (
    <label>
      {
        // If you see in the example https://codesandbox.io/p/sandbox/recursing-night-pu6w2g?file=%2Fsrc%2FCardGroup.tsx%3A53%2C20
        // They are faking the focus ring around the StyledCard label in line 50! because Description is a div and divs are not focusable
      }
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      {children}
    </label>
  );
};

export default RadioSimple;
