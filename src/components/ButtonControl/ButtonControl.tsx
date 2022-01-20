import React, { FC } from 'react';
import classnames from 'classnames';

import ButtonSimple from '../ButtonSimple';
import Icon, { ICON_CONSTANTS, IconProps } from '../Icon';

import { ICONS, STYLE } from './ButtonControl.constants';
import { Props } from './ButtonControl.types';
import './ButtonControl.style.scss';

/**
 * `<ControlButtons />` are used to control [close, maximize, minimize, etc] components [usually panels] they are assigned to.
 */
const ButtonControl: FC<Props> = (props: Props) => {
  const { className, control, isCircular, ...otherProps } = props;

  const iconName = ICONS[control] || 'not-found';
  const iconProps: IconProps = {
    autoScale: true,
    name: iconName,
    weight: ICON_CONSTANTS.WEIGHTS.bold,
  };

  // Unique icon configurations, more variants will be added here once designed.
  switch (iconName) {
    case ICONS.favorite:
      iconProps.weight = ICON_CONSTANTS.WEIGHTS.filled;
      iconProps.color = props.isDisabled
        ? 'var(--button-primary-text-disabled)'
        : 'var(--theme-text-warning-normal)';
      break;
  }

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className)}
      data-circular={isCircular}
      data-disabled={props.isDisabled}
      {...otherProps}
    >
      <Icon {...iconProps} />
    </ButtonSimple>
  );
};

export default ButtonControl;
