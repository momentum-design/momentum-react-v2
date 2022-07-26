import React, { FC, useContext, useRef } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useFocusRing } from '@react-aria/focus';
import { useRadio } from '@react-aria/radio';

import classnames from 'classnames';

import { STYLE, DEFAULTS } from './RadioGroup.constants';
import { Props } from './RadioGroup.types';
import { RadioContext } from './RadioGroup';

import Icon from '../Icon';

import './RadioGroup.style.scss';

const Radio: FC<Props> = (props: Props) => {
  const { className, isDisabled, id, style, label } = props;
  const state = useContext(RadioContext);
  const ref = useRef(null);
  const { inputProps } = useRadio({ 'aria-label': label, ...props }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const disabled = isDisabled || DEFAULTS.OPTION_DISABLED;
  const selected = state.selectedValue === props.value;

  return (
    <label
      data-disabled={disabled}
      className={classnames(STYLE.wrapper, className)}
      style={style}
      id={id}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {
        <div data-selected={selected} data-focused={isFocusVisible} className={STYLE.button}>
          {selected && (
            <Icon className={STYLE.icon} name="shape-circle" weight="filled" scale={8} />
          )}
        </div>
      }
      {label}
    </label>
  );
};

export default Radio;
