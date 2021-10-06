import React, { RefObject, forwardRef } from 'react';
import classnames from 'classnames';

import ModalArrow from '../ModalArrow';

import { ARROWS, DEFAULTS, STYLE } from './ModalContainer.constants';
import { Props } from './ModalContainer.types';
import './ModalContainer.style.scss';

/**
 * The ModalContainer component.
 */
const ModalContainer = (props: Props, ref: RefObject<HTMLDivElement>) => {
  const { arrow, className, children, color, elevation, id, isPadded, round, style } = props;

  const arrowComponent = arrow ? <ModalArrow color={color} side={arrow} /> : undefined;

  return (
    <div
      ref={ref}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      data-arrow={arrow}
    >
      {arrowComponent}
      <div
        className={STYLE.content}
        data-color={color || DEFAULTS.COLOR}
        data-elevation={elevation || DEFAULTS.ELEVATION}
        data-horizontal-arrow={arrow === ARROWS.LEFT || arrow === ARROWS.RIGHT}
        data-vertical-arrow={arrow === ARROWS.BOTTOM || arrow === ARROWS.TOP}
        data-padded={isPadded}
        data-round={round || DEFAULTS.ROUND}
      >
        {children}
      </div>
    </div>
  );
};

const _ModalContainer = forwardRef(ModalContainer);
_ModalContainer.displayName = 'ModalContainer';

export default _ModalContainer;
