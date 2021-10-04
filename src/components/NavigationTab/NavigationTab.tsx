import React, { FC } from 'react';
import classnames from 'classnames';
import FocusRing from '../FocusRing';

import Icon from '../Icon';
import Badge from '../Badge';
import Text from '../Text';
import ButtonSimple from '../ButtonSimple';

import { DEFAULTS, STYLE } from './NavigationTab.constants';
import { Props } from './NavigationTab.types';
import './NavigationTab.style.scss';

const NavigationTab: FC<Props> = (props: Props) => {
  const { icon, label, count = 0, className, id, size, style, active, ...otherProps } = props;

  const iconComponent = (
    <Icon
      className={STYLE.icon}
      name={icon || DEFAULTS.ICON}
      scale={24}
      weight={'filled'}
      strokeColor={'none'}
    />
  );

  const labelComponent =
    size == 200 ? (
      <Text className={STYLE.label} type="subheader-secondary">
        {label || DEFAULTS.LABEL}
      </Text>
    ) : null;

  //If the count is 100 or more, the count displayed should be :).
  const countToDisplay = (n: number) => {
    return n < 100 ? n.toString() : '+99';
  };

  const badgeComponent =
    count > 0 ? (
      <Badge className={STYLE.count} size={18}>
        {countToDisplay(count) || DEFAULTS.COUNT.toString()}
      </Badge>
    ) : null;

  return (
    <FocusRing>
      <ButtonSimple
        className={classnames(STYLE.wrapper, className)}
        data-active={active || DEFAULTS.ACTIVE}
        data-size={size || DEFAULTS.SIZE}
        id={id}
        style={style}
        {...otherProps}
      >
        {iconComponent}
        {labelComponent}
        {badgeComponent}
      </ButtonSimple>
    </FocusRing>
  );
};

export default NavigationTab;
