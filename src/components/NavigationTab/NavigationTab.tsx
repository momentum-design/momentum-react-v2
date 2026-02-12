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

/**
 * @deprecated Use the equivalent from momentum.design (NPM: `@momentum-design/components/dist/react`)
 */
const NavigationTab: FC<Props> = (props: Props) => {
  const {
    icon,
    label,
    count = DEFAULTS.COUNT,
    className,
    id,
    size,
    style,
    active,
    ...otherProps
  } = props;

  const iconComponent = icon ? (
    <Icon className={STYLE.icon} name={icon} scale={24} weight={'filled'} />
  ) : null;

  const labelComponent =
    size == 200 && label ? (
      <Text className={STYLE.label} type="subheader-secondary" tagName="h3">
        {label}
      </Text>
    ) : null;

  const badgeComponent =
    count > 0 ? (
      <Badge
        className={STYLE.count}
        type="counter"
        counter={count}
        maxCounter={99}
        overlay={size !== 200}
      />
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
