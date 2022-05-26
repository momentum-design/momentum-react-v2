import React, { cloneElement, FC } from 'react';
import classnames from 'classnames';

import { STYLE } from './Chip.constants';
import { Props } from './Chip.types';
import './Chip.style.scss';

import ButtonPill from '../ButtonPill';
import Text from '../Text';
/**
 * The Chip component.
 */
const Chip: FC<Props> = (props: Props) => {
  const {
    text,
    avatar = undefined,
    leftIcon,
    rightIcon,
    className,
    id,
    style,
    children,
    error = false,
  } = props;

  const leftContent = avatar ? avatar : leftIcon;

  const changedText = text ? text : children;

  //const changedStyle = style ? style : { padding: '.25em' };

  return (
    <ButtonPill
      size={28}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      data-avatar={!!avatar}
      data-error={error}
      {...props}
    >
      {leftContent && (
        <div data-avatar={!!avatar} className={STYLE.left}>
          {leftContent}
        </div>
      )}
      <Text className={STYLE.center}>{changedText}</Text>
      {rightIcon && <div className={STYLE.right}>{rightIcon}</div>}
    </ButtonPill>
  );
};

export default Chip;
