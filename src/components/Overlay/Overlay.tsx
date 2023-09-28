import React, { FC } from 'react';
import classnames from 'classnames';
import FocusLock from 'react-focus-lock';

import { DEFAULTS, STYLE } from './Overlay.constants';
import { Props } from './Overlay.types';
import './Overlay.style.scss';

/**
 * The Overlay component.
 */
const Overlay: FC<Props> = (props: Props) => {
  const {
    children,
    className,
    color = DEFAULTS.COLOR,
    fullscreen = DEFAULTS.FULLSCREEN,
    id,
    style,
    focusLockProps,
  } = props;

  const content = (
    <div
      className={classnames(className, STYLE.wrapper)}
      data-color={color}
      data-fullscreen={fullscreen}
      id={id}
      style={style}
    >
      {children}
    </div>
  );

  if (!focusLockProps) {
    return <>{content}</>;
  }

  return <FocusLock {...focusLockProps}>{content}</FocusLock>;
};

export default Overlay;
