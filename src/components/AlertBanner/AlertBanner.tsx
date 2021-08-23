import React, { Children, cloneElement, FC } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './AlertBanner.constants';
import { Props } from './AlertBanner.types';
import './AlertBanner.style.scss';

const AlertBanner: FC<Props> = (props: Props) => {
  const {
    buttons,
    isCentered,
    children,
    className,
    color,
    isGrown,
    id,
    image,
    label,
    isPilled,
    size,
    style,
  } = props;

  const mutatedButtons = Children.map(buttons, (button) =>
    cloneElement(button, {
      className: classnames(button.props.className, STYLE.button),
      ghost: true,
    })
  );

  const buttonsComponent = <div className={STYLE.buttons}>{mutatedButtons}</div>;

  const imageComponent = image ? (
    cloneElement(image, {
      className: classnames(image.props.className, STYLE.image),
    })
  ) : (
    <div className={STYLE.image} />
  );

  const labelComponent = <p className={STYLE.label}>{children || label}</p>;

  return (
    <div
      data-centered={isCentered || DEFAULTS.ISCENTERED}
      className={classnames(STYLE.wrapper, className)}
      data-color={color || DEFAULTS.COLOR}
      data-grow={isGrown || DEFAULTS.ISGROWN}
      data-pill={isPilled || DEFAULTS.ISPILLED}
      data-size={size || DEFAULTS.SIZE}
      id={id}
      style={style}
    >
      {imageComponent}
      {labelComponent}
      {buttonsComponent}
    </div>
  );
};

export default AlertBanner;
