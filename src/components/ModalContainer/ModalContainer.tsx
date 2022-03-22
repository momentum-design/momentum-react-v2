import classnames from 'classnames';
import React, { forwardRef, RefObject } from 'react';

import ModalArrow from 'components/ModalArrow';

import { ARROW_ID, DEFAULTS, STYLE } from './ModalContainer.constants';
import { getArrowOrientation } from './ModalContainer.utils';
import './ModalContainer.style.scss';

import type { Props } from './ModalContainer.types';

const ModalContainer = (props: Props, ref: RefObject<HTMLDivElement>) => {
  const {
    showArrow = DEFAULTS.SHOW_ARROW,
    placement,
    children,
    elevation = DEFAULTS.ELEVATION,
    isPadded = DEFAULTS.IS_PADDED,
    round = DEFAULTS.ROUND,
    color = DEFAULTS.COLOR,
    id,
    className,
    style,
    ...otherProps
  } = props;

  const arrowOrientation = getArrowOrientation(placement);

  return (
    <div
      ref={ref}
      className={classnames(className, STYLE.wrapper)}
      id={id}
      style={style}
      data-placement={placement}
      data-arrow-orientation={arrowOrientation}
      data-color={color}
      data-elevation={elevation}
      data-padded={isPadded}
      data-round={round}
      {...otherProps}
    >
      {children}
      {
        /*arrow has to be wrapped in HTML element to allow Popover to style it*/
        showArrow && (
          <div id={ARROW_ID} data-popper-arrow className={classnames(STYLE.arrowWrapper)}>
            <ModalArrow placement={placement} color={color} />
          </div>
        )
      }
    </div>
  );
};

const _ModalContainer = forwardRef(ModalContainer);
_ModalContainer.displayName = 'ModalContainer';

export default _ModalContainer;
