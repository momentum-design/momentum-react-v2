import classnames from 'classnames';
import React, { Children, cloneElement, FC, ReactElement } from 'react';

import { ButtonControlProps } from 'components/ButtonControl';

import { STYLE } from './ToastDetails.constants';
import { Props } from './ToastDetails.types';
import './ToastDetails.style.scss';

/**
 * The `<ToastDetails />` component. This component is meant to be consumed by only the `<Toast />` component.
 */
const ToastDetails: FC<Props> = (props: Props) => {
  const {
    badges,
    children,
    className,
    controls,
    id,
    image,
    info,
    infoColor,
    style,
    subject,
    title,
  } = props;

  const imageComponent = cloneElement(image, {
    className: classnames(STYLE.image, image.props.className),
    size: 32,
  });

  const infoComponent =
    badges && badges.length > 0 ? (
      <div className={STYLE.badges}>
        {badges.map((badge, index) => (
          <div key={index} className={STYLE.badge}>
            {badge}
          </div>
        ))}
      </div>
    ) : (
      <div className={STYLE.info} data-color={infoColor}>
        {info}
      </div>
    );

  const contentComponent = (
    <div className={STYLE.content}>
      <div className={STYLE.title} data-centered={!(badges || info || subject)}>
        {title || children}
      </div>
      {subject ? <div className={STYLE.subject}>{subject}</div> : null}
      {info || badges ? infoComponent : null}
    </div>
  );

  const controlsComponent =
    controls && Children.toArray(controls).length > 0 ? (
      <div className={STYLE.controls}>
        {Children.toArray(controls).map((control: ReactElement<ButtonControlProps>) =>
          cloneElement(control, { isCircular: true })
        )}
      </div>
    ) : null;

  return (
    <div className={classnames(className, STYLE.wrapper)} id={id} style={style}>
      {imageComponent}
      {contentComponent}
      {controlsComponent}
    </div>
  );
};

export default ToastDetails;
