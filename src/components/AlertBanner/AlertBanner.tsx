import React, { Children, cloneElement, FC, isValidElement } from 'react';
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
    isStatic,
    size,
    style,
  } = props;

  const mutatedButtons = Children.map(buttons, (button) =>
    cloneElement(button, {
      className: classnames(STYLE.button, button.props.className),
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

  let labelComponent;

  if (label) {
    labelComponent = <p className={STYLE.label}>{label}</p>;
  } else if (typeof children === 'string' || typeof children === 'number') {
    labelComponent = <p className={STYLE.label}>{children}</p>;
  } else if (isValidElement(children)) {
    labelComponent = <div className={STYLE.label}>{children}</div>;
  } else {
    labelComponent = <p className={STYLE.label} />;
  }

  return (
    <div
      data-centered={isCentered || DEFAULTS.IS_CENTERED}
      className={classnames(STYLE.wrapper, className)}
      data-color={isStatic ? undefined : color || DEFAULTS.COLOR}
      data-grow={isGrown || DEFAULTS.IS_GROWN}
      data-pill={isPilled || DEFAULTS.IS_PILLED}
      data-size={size || DEFAULTS.SIZE}
      data-static={isStatic || DEFAULTS.IS_STATIC}
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
