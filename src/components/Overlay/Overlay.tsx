/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC } from 'react';
import classnames from 'classnames';

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
    onKeyDown,
    ...other
  } = props;

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      data-color={color}
      data-fullscreen={fullscreen}
      id={id}
      style={style}
      onKeyDown={onKeyDown}
      {...other}
    >
      {children}
    </div>
  );
};

export default Overlay;
