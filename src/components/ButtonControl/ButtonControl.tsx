import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';

import ButtonSimple from '../ButtonSimple';
import Icon, { ICON_CONSTANTS, IconProps } from '../Icon';

import { ICONS, STYLE } from './ButtonControl.constants';
import { Props } from './ButtonControl.types';
import './ButtonControl.style.scss';

/**
 * `<ControlButtons />` are used to control [close, maximize, minimize, etc] components [usually panels] they are assigned to.
 */
const ButtonControl = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
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
        ? 'var(--mds-color-theme-text-primary-disabled)'
        : 'var(--mds-color-theme-text-warning-normal)';
      break;
  }

  return (
    <ButtonSimple
      ref={providedRef}
      className={classnames(STYLE.wrapper, className)}
      data-circular={isCircular}
      data-disabled={props.isDisabled}
      {...otherProps}
    >
      <Icon {...iconProps} />
    </ButtonSimple>
  );
});

ButtonControl.displayName = 'ButtonControl';

export default ButtonControl;
