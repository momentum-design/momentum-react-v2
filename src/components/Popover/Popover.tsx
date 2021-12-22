import React, { FC } from 'react';
import Tippy from '@tippyjs/react';
import classnames from 'classnames';

import { STYLE } from './Popover.constants';
import { Props } from './Popover.types';
import './Popover.style.scss';
import { ModalContainer } from '..';

// TODO: Update JSDOC for this component.
/**
 * The Popover component.
 */
const Popover: FC<Props> = (props: Props) => {
  const {
    children,
    triggerComponent,
    containerProps,
    placement = 'bottom',
    className,
    id,
    style,
  } = props;

  return (
    <Tippy
      content={
        <ModalContainer isPadded {...containerProps}>
          {children}
        </ModalContainer>
      }
      placement={placement}
      trigger="click hover"
      appendTo="parent"
      offset={[0, 0]}
      arrow
    >
      {triggerComponent}
    </Tippy>
  );
};

export default Popover;
