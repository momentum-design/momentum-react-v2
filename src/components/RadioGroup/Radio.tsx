import React, { FC, useContext, useRef } from 'react';
import { FocusRing } from '@react-aria/focus';
import { useRadio } from '@react-aria/radio';

import classnames from 'classnames';

import { STYLE, DEFAULTS } from './RadioGroup.constants';
import { RadioProps } from './RadioGroup.types';
import { RadioContext } from './RadioGroup';

import './RadioGroup.style.scss';

const Radio: FC<RadioProps> = (props: RadioProps) => {
  const { className, isDisabled = DEFAULTS.OPTION_DISABLED, id, style, label } = props;
  const state = useContext(RadioContext);
  const ref = useRef(null);
  const { inputProps } = useRadio({ 'aria-label': label, ...props }, state, ref);
  return (
    <label
      data-disabled={isDisabled}
      className={classnames(STYLE.wrapper, className)}
      style={style}
      id={id}
    >
      <FocusRing>
        <input {...inputProps} className={STYLE.button} ref={ref} />
      </FocusRing>
      {label}
    </label>
  );
};

export default Radio;
