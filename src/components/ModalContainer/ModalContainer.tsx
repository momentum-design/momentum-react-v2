import React, { forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import {FocusScope} from 'react-aria';

import ModalArrow from '../ModalArrow';

import { ARROW_ID, DEFAULTS, STYLE } from './ModalContainer.constants';
import type { Props } from './ModalContainer.types';
import './ModalContainer.style.scss';
import { getArrowOrientation } from './ModalContainer.utils';

const ModalContainer = (props: Props, ref: RefObject<HTMLDivElement>) => {
  const {
    arrowId = ARROW_ID,
    showArrow = DEFAULTS.SHOW_ARROW,
    placement,
    children,
    elevation = DEFAULTS.ELEVATION,
    isPadded = DEFAULTS.IS_PADDED,
    round = DEFAULTS.ROUND,
    color = DEFAULTS.COLOR,
    role = DEFAULTS.ROLE,
    ariaModal = true,
    id,
    className,
    style,
    focusLockProps,
    ...otherProps
  } = props;

  const arrowOrientation = getArrowOrientation(placement);

  const content = (<div
    ref={ref}
    role={role}
    aria-modal={ariaModal}
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
        <div id={arrowId} data-popper-arrow className={classnames(STYLE.arrowWrapper)}>
          <ModalArrow placement={placement} color={color} />
        </div>
      )
    }
  </div>);

  if (!focusLockProps) {
    return content;
  }

  // eslint-disable-next-line jsx-a11y/no-autofocus
  return <FocusScope contain autoFocus {...focusLockProps}>{content}</FocusScope>;
};

const _ModalContainer = forwardRef(ModalContainer);
_ModalContainer.displayName = 'ModalContainer';

export default _ModalContainer;
