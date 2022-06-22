import React, { FC } from 'react';
import classnames from 'classnames';

import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useFocusRing } from '@react-aria/focus';
import { usePress } from '@react-aria/interactions';

import { Props } from './Checkbox.types';
import { STYLE, DEFAULTS } from './Checkbox.constants';
import './Checkbox.style.scss';
import { useCheckbox } from 'react-aria';
import { useToggleState } from '@react-stately/toggle';

import Icon from '../Icon';

/**
 * The Checkbox component.
 */
const Checkbox: FC<Props> = (props: Props) => {
  const { children, className, isSelected, disabled, isIndeterminate, ...rest } = props;

  const state = useToggleState(props);
  const ref = React.useRef();
  const { inputProps } = useCheckbox(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  const selected = isSelected || state.isSelected || DEFAULTS.IS_SELECTED;
  const indeterminate = isIndeterminate || DEFAULTS.IS_INDETERMINATE;
  const isDisabled = disabled || DEFAULTS.DISABLED;

  const { pressProps } = usePress({
    isDisabled,
    ...rest,
  });

  const icon = (
    <div>
      <Icon
        className={STYLE.icon}
        name={indeterminate ? 'minus' : 'check'}
        weight="bold"
        scale={12}
      />
    </div>
  );

  const filled = selected || indeterminate;
  const checkbox = (
    <div
      className={classnames(
        {
          [STYLE.selected]: filled,
          [STYLE.notSelected]: !filled,
          [STYLE.focus]: isFocusVisible,
        },
        'checkbox'
      )}
    >
      {filled && icon}
    </div>
  );

  return (
    <label
      className={classnames(STYLE.wrapper, className)}
      data-disabled={isDisabled}
      {...pressProps}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      {checkbox}
      {children}
    </label>
  );
};

export default Checkbox;
