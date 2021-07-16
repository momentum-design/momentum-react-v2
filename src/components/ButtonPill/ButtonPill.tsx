import React, { useRef, FC } from 'react';
import { useButton } from '@react-aria/button';

import { DEFAULTS, STYLE } from './ButtonPill.constants';
import { Props } from './ButtonPill.types';
import './ButtonPill.style.scss';

const ButtonPill: FC<Props> = (props: Props) => {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button
      className={`${STYLE.wrapper}`}
      {...buttonProps}
      ref={ref}
      data-color={props.color || DEFAULTS.COLOR}
      data-ghost={props.ghost || DEFAULTS.GHOST}
      data-outline={props.outline || DEFAULTS.OUTLINE}
      data-size={props.size || DEFAULTS.SIZE}
      data-disabled={props.disabled || DEFAULTS.DISABLED}
    >
      <div>{children}</div>
    </button>
  );
};

/**
 * Prop Types
 * active: boolean
 * ariaLabel: string
 * ariaLabelledBy: string
 * ariaPressed: boolean | string
 * children: ReactNode
 * circle: boolean
 * className: string
 * color: string
 * containerLarge: boolean
 * disabled: boolean
 * disabled: boolean
 * eventKey: string
 * expand: boolean
 * href: string
 * id: string
 * keyboardKey: string
 * label: string
 * large: boolean
 * loading: boolean
 * onClick: function
 * parentKeyDown: function
 * parentOnSelect: function
 * preventKeyboardDoubleClick: boolean
 * removeStyle: boolean
 * size: string | number
 * style: Object
 * tag: 'button' | 'input' | 'a'
 * type: 'button' | 'reset' | 'submit'
 */

export default ButtonPill;
