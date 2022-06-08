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
    size = DEFAULTS.SIZE,
    chipColor = DEFAULTS.COLOR,
    error = DEFAULTS.ERROR,
    modifier = DEFAULTS.MODIFIER,
  } = props;

  const leftContent = avatar ? avatar : leftIcon;
  const changedText = text ? text : children;

  return (
    <ButtonPill
      size={size}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      data-error={error}
      data-color={chipColor}
      data-modifier={modifier}
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
