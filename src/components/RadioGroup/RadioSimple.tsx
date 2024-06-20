import React, { FC, useContext, useRef } from 'react';

import { FocusRing} from '@react-aria/focus';
import { useRadio } from '@react-aria/radio';

import { RadioContext } from './RadioGroup';
import { DEFAULTS } from './RadioGroup.constants';
import { RadioSimpleProps } from './RadioGroup.types';

import './RadioSimple.style.scss';

const RadioSimple: FC<RadioSimpleProps> = (props: RadioSimpleProps) => {
  const { ariaLabelledby, ariaLabel, children, className, id, isDisabled = DEFAULTS.OPTION_DISABLED } = props;
  const state = useContext(RadioContext);
  const ref = useRef(null);
  const { inputProps } = useRadio(props, state, ref);

  return (
    <label
      className={className}
      data-disabled={isDisabled}
      id={id}
    >
      <FocusRing>
        <input
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          className="hidden-radio"
          ref={ref}
          {...inputProps}
        />
      </FocusRing>
      {children}
    </label>
  );
};

export default RadioSimple;
