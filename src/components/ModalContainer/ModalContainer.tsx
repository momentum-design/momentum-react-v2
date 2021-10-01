import React, { RefObject, forwardRef } from 'react';
import classnames from 'classnames';

import { DEFAULTS, STYLE } from './ModalContainer.constants';
import { Props } from './ModalContainer.types';
import './ModalContainer.style.scss';

/**
 * The ModalContainer component.
 */
const ModalContainer = (props: Props, ref: RefObject<HTMLDivElement>): JSX.Element => {
  const { className, children, color, elevation, id, isPadded, radius, style } = props;

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      data-color={color || DEFAULTS.COLOR}
      data-elevation={elevation || DEFAULTS.ELEVATION}
      data-padded={isPadded}
      data-radius={radius || DEFAULTS.RADIUS}
      id={id}
      style={style}
      ref={ref}
    >
      {children}
    </div>
  );
};

const _ModalContainer = forwardRef(ModalContainer);
_ModalContainer.displayName = 'ModalContainer';

export default _ModalContainer;
