import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import ButtonSimple from '../ButtonSimple';

import { PrimitiveConverter } from '../../utils';

import { STYLE } from './AlertBadge.constants';
import { Props } from './AlertBadge.types';
import './AlertBadge.style.scss';

const AlertBadge = forwardRef((props: Props, providedRef: RefObject<HTMLButtonElement>) => {
  const { children, className, color, image, label, ...otherProps } = props;

  const mutatedChildren = children ? (
    <PrimitiveConverter>{children}</PrimitiveConverter>
  ) : (
    [
      image ? <PrimitiveConverter key={0}>{image}</PrimitiveConverter> : null,
      label ? <PrimitiveConverter key={1}>{label}</PrimitiveConverter> : null,
    ]
  );

  return (
    <ButtonSimple
      ref={providedRef}
      className={classnames(className, STYLE.wrapper)}
      data-color={color}
      {...otherProps}
    >
      {mutatedChildren}
    </ButtonSimple>
  );
});

AlertBadge.displayName = 'AlertBadge';

export default AlertBadge;
