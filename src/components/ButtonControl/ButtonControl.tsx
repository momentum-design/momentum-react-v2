import React, { FC } from 'react';
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
  const { className, control, ...otherProps } = props;

  const iconName = ICONS[control] || 'not-found';

  const controlElement = <Icon name={iconName} weight="bold" autoScale />;

  return (
    <ButtonSimple className={classnames(STYLE.wrapper, className)} {...otherProps}>
      {controlElement}
    </ButtonSimple>
  );
};

export default ButtonControl;
