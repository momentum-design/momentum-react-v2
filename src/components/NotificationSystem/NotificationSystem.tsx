import React, { FC } from 'react';
import classnames from 'classnames';
import { ToastContainer, cssTransition } from 'react-toastify';

import { ATTENTION, DEFAULTS, STYLE } from './NotificationSystem.constants';

import 'react-toastify/dist/ReactToastify.css';
import './NotificationSystem.style.scss';
import type { CompoundProps, Props } from './NotificationSystem.types';
import { dismiss, getContainerID, notify, update } from './NotificationSystem.utils';

const slideAndBlur = cssTransition({
  enter: 'slideInRight',
  exit: 'fadeOut',
});

/**
 * The NotificationSystem component.
 */
const NotificationSystem: FC<Props> & CompoundProps = (props: Props) => {
  const { position = DEFAULTS.POSITION, className, id, style } = props;

  const commonProps = {
    newestOnTop: true,
    enableMultiContainer: true,
    transition: slideAndBlur,
    hideProgressBar: true,
    closeOnClick: false,
    draggable: false,
    closeButton: false,
  };

  // get an attention order array to position the toastContainers correctly based on the `position` prop
  const attentionOrder = position.includes('top')
    ? [ATTENTION.MEDIUM, ATTENTION.LOW]
    : [ATTENTION.LOW, ATTENTION.MEDIUM];

  return (
    <div data-position={position} className={classnames(STYLE.wrapper, className)} style={style}>
      <ToastContainer
        {...commonProps}
        position={position}
        containerId={getContainerID(id, attentionOrder[0])}
      />
      <ToastContainer
        {...commonProps}
        position={position}
        containerId={getContainerID(id, attentionOrder[1])}
      />
    </div>
  );
};

export default NotificationSystem;
NotificationSystem.notify = notify;
NotificationSystem.update = update;
NotificationSystem.dismiss = dismiss;
NotificationSystem.ATTENTION = ATTENTION;
