import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';

import ModalArrow from '../ModalArrow';

import { ARROWS, DEFAULTS, STYLE } from './ModalContainer.constants';
import { Props } from './ModalContainer.types';
import './ModalContainer.style.scss';

/**
 * The ModalContainer component.
 */
const ModalContainer = forwardRef((props: Props, ref: RefObject<HTMLDivElement>) => {
  const {
    arrow,
    className,
    children,
    color,
    elevation,
    id,
    isPadded,
    round,
    style,
    ...otherProps
  } = props;

  const arrowComponent = arrow ? <ModalArrow color={color} side={arrow} /> : undefined;

  return (
    <div
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      data-arrow={arrow}
      {...otherProps}
    >
      {arrowComponent}
      <div
        ref={ref}
        className={STYLE.content}
        data-color={color || DEFAULTS.COLOR}
        data-elevation={elevation || DEFAULTS.ELEVATION}
        data-horizontal-arrow={arrow === ARROWS.LEFT || arrow === ARROWS.RIGHT}
        data-vertical-arrow={arrow === ARROWS.BOTTOM || arrow === ARROWS.TOP}
        data-padded={isPadded || DEFAULTS.IS_PADDED}
        data-round={round || DEFAULTS.ROUND}
      >
        {children}
      </div>
    </div>
  );
});

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
