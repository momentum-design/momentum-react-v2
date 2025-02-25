import React, { FC } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './LoadingSpinner.constants';
import { Props } from './LoadingSpinner.types';
import './LoadingSpinner.style.scss';
import { Spinner as MdcSpinner } from '@momentum-design/components/dist/react';

const LoadingSpinner: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    scale = DEFAULTS.SCALE,
    variant = DEFAULTS.VARIANT,
    inverted = DEFAULTS.INVERTED,
    size = DEFAULTS.SIZE,
    ...rest
  } = props;

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      {...rest}
      role="img"
    >
      <MdcSpinner
        size={size}
        variant={variant}
        inverted={inverted}
        style={size ? {} : ({ '--mdc-spinner-size': `${scale}px` } as React.CSSProperties)}
      />
    </div>
  );
};

export default LoadingSpinner;
