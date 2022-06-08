import React, { FC } from 'react';
import classnames from 'classnames';

import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useFocusRing } from '@react-aria/focus';

import { Props } from './Checkbox.types';
import { STYLE, DEFAULTS } from './Checkbox.constants';
import './Checkbox.style.scss';
import { useCheckbox } from 'react-aria';
import { useToggleState } from '@react-stately/toggle';

import Text from '../Text';
import FocusRing from '../FocusRing';
import Icon from '../Icon';

/**
 * The Checkbox component.
 */
const Checkbox: FC<Props> = (props: Props) => {
  const { children, className, isSelected, disabled, isIndeterminate, label } = props;
  const state = useToggleState(props);
  const ref = React.useRef();
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps } = useFocusRing();
  const selected = isSelected || state.isSelected || DEFAULTS.IS_SELECTED;
  const indeterminate = isIndeterminate || DEFAULTS.IS_INDETERMINATE;
  const isDisabled = disabled || DEFAULTS.DISABLED;

  const icon = (
    <div>
      <Icon
        className={STYLE.icon}
        color={
          isDisabled ? 'var(--checkbox-checked-icon-disabled)' : 'var(--checkbox-checked-icon)'
        }
        name={indeterminate ? 'minus' : 'check'}
        weight="bold"
        scale={12}
      />
    </div>
  );

  return (
    <FocusRing>
      <label className={classnames(STYLE.wrapper, className)} data-disabled={isDisabled}>
        <VisuallyHidden>
          <input {...inputProps} {...focusProps} ref={ref} />
        </VisuallyHidden>
        {(selected || indeterminate) && <div className={STYLE.selected}>{icon}</div>}
        {!selected && !indeterminate && <div className={STYLE.notSelected} />}
        {label && <Text className={STYLE.label}>{label}</Text>}
        {children}
      </label>
    </FocusRing>
  );
};

export default Checkbox;
