import classnames from 'classnames';
import React, { FC } from 'react';

import Badge from 'components/Badge';
import ButtonSimple from 'components/ButtonSimple';
import FocusRing from 'components/FocusRing';
import Icon from 'components/Icon';
import Text from 'components/Text';

import { DEFAULTS, STYLE } from './NavigationTab.constants';
import { Props } from './NavigationTab.types';
import './NavigationTab.style.scss';

const NavigationTab: FC<Props> = (props: Props) => {
  const { icon, label, count = 0, className, id, size, style, active, ...otherProps } = props;

  const iconComponent = icon ? (
    <Icon className={STYLE.icon} name={icon} scale={24} weight={'filled'} strokeColor={'none'} />
  ) : null;

  const labelComponent =
    size == 200 && label ? (
      <Text className={STYLE.label} type="subheader-secondary">
        {label}
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
