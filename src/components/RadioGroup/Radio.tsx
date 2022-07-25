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
  const { className, children, isDisabled, id, style, label } = props;
  const state = useContext(RadioContext);
  const ref = useRef(null);
  const { inputProps } = useRadio({ 'aria-label': label, ...props }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const disabled = isDisabled || DEFAULTS.OPTION_DISABLED;
  const selected = state.selectedValue === props.value;

  const icon = <Icon className={STYLE.icon} name="shape-circle" weight="filled" scale={8} />;

  const radio = (
    <div
      data-selected={selected}
      className={classnames(
        STYLE.button,
        {
          [STYLE.focus]: isFocusVisible,
        },
        'radio'
      )}
    >
      {selected && icon}
    </div>
  );

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
      {radio}
      {children || label}
    </label>
  );
};

export default Radio;
