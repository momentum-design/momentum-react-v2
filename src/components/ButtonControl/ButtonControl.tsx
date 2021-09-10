import React, { cloneElement, FC } from 'react';
import classnames from 'classnames';

import ButtonSimple from '../ButtonSimple';
import Icon from '../Icon';

import { ICONS, STYLE } from './ButtonControl.constants';
import { Props } from './ButtonControl.types';
import './ButtonControl.style.scss';

/**
 * `<ControlButtons />` are used to control [close, maximize, minimize, etc] components [usually panels] they are assigned to.
 */
const ButtonControl: FC<Props> = (props: Props) => {
  const { className, control, isCircular, ...otherProps } = props;

  const iconName = ICONS[control] || 'not-found';

  let controlElement = <Icon name={iconName} weight="bold" autoScale />;

  // Unique icon configurations
  switch (iconName) {
    case ICONS.favorite:
      controlElement = cloneElement(controlElement, {
        weight: 'filled',
        color: 'var(--theme-text-warning-normal)',
      });
      break;
  }

  return (
    <ButtonSimple
      className={classnames(STYLE.wrapper, className)}
      data-circular={isCircular}
      {...otherProps}
    >
      {controlElement}
    </ButtonSimple>
  );
};

export default ButtonControl;
