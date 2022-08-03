import React, { FC, forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import { useSwitch } from '@react-aria/switch';
import { useToggleState } from '@react-stately/toggle';

import { STYLE } from './Toggle.constants';
import { Props } from './Toggle.types';
import './Toggle.style.scss';

/**
 * The Toggle component. Also known as Switch.
 */
const Toggle = (props: Props, providedRef: RefObject<HTMLInputElement>) => {
  const { id, className, style, isDisabled } = props;

  const internalRef = React.useRef<HTMLInputElement>();
  const ref = providedRef || internalRef;

  const state = useToggleState(props);
  const { inputProps } = useSwitch(props, state, ref);

  return (
    <input
      className={classnames(STYLE.toggle, className, {
        [STYLE.on]: state.isSelected,
        [STYLE.off]: !state.isSelected,
      })}
      id={id}
      style={style}
      data-disabled={!!isDisabled}
      data-selected={state.isSelected}
      {...inputProps}
      ref={ref}
    />
  );
};

const ToggleWithRef: FC<Props> = forwardRef(Toggle);
ToggleWithRef.displayName = 'Toggle';

export default ToggleWithRef;
