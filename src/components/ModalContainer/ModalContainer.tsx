import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';

import ModalArrow from '../ModalArrow';

import { ARROW_ID, DEFAULTS, STYLE } from './ModalContainer.constants';
import type { Props } from './ModalContainer.types';
import './ModalContainer.style.scss';
import { getArrowOrientation } from './ModalContainer.utils';

/**
 * The `<ModalContainer/>` component, which is used by the Popover for example to wrap
 * the content of a Popover properly.
 *
 * The `showArrow` and `placement` prop of this `<ModalContainer/>` together are only necessary
 * for the Popover component, where the Arrow and the positioning are highly important.
 * Using the `<ModalContainer/>` component standalone with the `placement` and `showArrow` props
 * will just paint, but not position the arrow correctly (done through Popover component).
 *
 * Nevertheless this component could be used on its own as well.
 */
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
