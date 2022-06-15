import React, { FC } from 'react';
import classnames from 'classnames';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useSwitch } from '@react-aria/switch';
import { useToggleState } from '@react-stately/toggle';
import { useFocusRing } from '@react-aria/focus';

import { STYLE } from './Toggle.constants';
import { Props } from './Toggle.types';
import './Toggle.style.scss';

/**
 * The Toggle component. Also known as Switch.
 */
const Toggle: FC<Props> = (props: Props) => {
  const { id, className, style, isDisabled, label } = props;

  const ref = React.useRef();

  const children = label && <span className={STYLE.label}>{label}</span>;
  const ariaProps = { ...props, children };

  const state = useToggleState(ariaProps);
  const { inputProps } = useSwitch(ariaProps, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      data-disabled={!!isDisabled}
      data-selected={state.isSelected}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div
        className={classnames(STYLE.toggle, {
          [STYLE.on]: state.isSelected,
          [STYLE.off]: !state.isSelected,
          [STYLE.disabled]: isDisabled,
          [STYLE.focused]: isFocusVisible,
        })}
      />
      {children}
    </label>
  );
};

export default Toggle;
