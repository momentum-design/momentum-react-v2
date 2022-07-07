import React, { FC } from 'react';
import classnames from 'classnames';

import ButtonSimple from '../ButtonSimple';
import Text, { TEXT_CONSTANTS } from '../Text';

import { DEFAULTS, STYLE, FORMATS_DISABLED } from './Tag.constants';
import { Props } from './Tag.types';
import './Tag.style.scss';

/**
 * The Tag component.
 */
const Tag: FC<Props> = (props: Props) => {
  const {
    children,
    className,
    color = DEFAULTS.COLOR,
    isDisabled,
    format = DEFAULTS.FORMAT,
    ...otherProps
  } = props;

  const disabled = isDisabled || FORMATS_DISABLED.includes(format);
  const clsNames = [STYLE.wrapper, className];
  if (props.onPress && !disabled) {
    clsNames.push(STYLE.pressable);
  }

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className, {
         [STYLE.pressable]: props.onPress && !disabled,
      })}
      data-color={disabled ? DEFAULTS.COLOR : color}
      data-format={format}
      isDisabled={disabled}
      {...otherProps}
    >
      <Text type={TEXT_CONSTANTS.TYPES.SUBHEADER_SECONDARY}>{children}</Text>
    </ButtonSimple>
  );
};

export default Tag;
