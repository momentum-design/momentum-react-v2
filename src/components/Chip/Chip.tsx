import React, { FC } from 'react';
import classnames from 'classnames';

import { STYLE, DEFAULTS } from './Chip.constants';
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
    avatar = DEFAULTS.AVATAR,
    leftIcon,
    rightIcon,
    className,
    id,
    style,
    children,
    error = DEFAULTS.ERROR,
  } = props;

  const leftContent = avatar ? avatar : leftIcon;
  const changedText = text ? text : children;

  return (
    <ButtonPill
      size={28}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      data-error={error}
      {...props}
    >
      {leftContent && (
        <div data-avatar={!!avatar} className={STYLE.leftSection}>
          {leftContent}
        </div>
      )}
      <Text className={STYLE.centerSection}>{changedText}</Text>
      {rightIcon && <div className={STYLE.rightSection}>{rightIcon}</div>}
    </ButtonPill>
  );
};

export default Chip;
