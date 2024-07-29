import React, { FC } from 'react';
import classnames from 'classnames';
import { ToastContainer, cssTransition } from 'react-toastify';
import { dismiss, getContainerID, isActive, notify, update } from './NotificationSystem.utils';
import { ATTENTION, DEFAULTS, POSITION, STYLE } from './NotificationSystem.constants';

import type { CompoundProps, Props } from './NotificationSystem.types';

import 'react-toastify/dist/ReactToastify.css';
import './NotificationSystem.style.scss';

/**
 * The `<NotificationSystem />` component allows consumers to trigger notifications on the defined position on the screen.
 *
 * This is a component written in the compound component pattern way, which means utils to trigger a notification for example
 * are exposed on the component directly, like `NotificationSystem.notify` or `NotificationSystem.update`
 */
const NotificationSystem: FC<Props> & CompoundProps = (props: Props) => {
  const {
    position = DEFAULTS.POSITION,
    zIndex = DEFAULTS.Z_INDEX,
    className,
    id,
    style,
    limit,
    newestOnTop = DEFAULTS.NEWEST_ON_TOP,
    enterAnimation = DEFAULTS.ENTER_ANIMATION,
    toastClassName,
    bodyClassName,
    containerClassName,
    ariaLabel
  } = props;

  const slideAndBlur = cssTransition({
    enter: enterAnimation,
    exit: 'fadeOut',
  });

  const commonProps = {
    newestOnTop,
    enableMultiContainer: true,
    transition: slideAndBlur,
    hideProgressBar: true,
    closeOnClick: false,
    draggable: false,
    closeButton: false,
    toastClassName,
    bodyClassName,
    className: containerClassName,
  };

  // get an attention order array to position the toastContainers correctly based on the `position` prop
  const attentionOrder = position.includes('top')
    ? [ATTENTION.MEDIUM, ATTENTION.LOW]
    : [ATTENTION.LOW, ATTENTION.MEDIUM];

  return (
    <section
      data-position={position}
      className={classnames(STYLE.wrapper, className)}
      style={{ ...style, zIndex: zIndex }}
      aria-label={ariaLabel}
    >
      <ToastContainer
        {...commonProps}
        position={position}
        limit={limit}
        containerId={getContainerID(id, attentionOrder[0])}
      />
      <ToastContainer
        {...commonProps}
        position={position}
        limit={limit}
        containerId={getContainerID(id, attentionOrder[1])}
      />
    </section>
  );
};

export default NotificationSystem;

NotificationSystem.notify = notify;
NotificationSystem.update = update;
NotificationSystem.dismiss = dismiss;
NotificationSystem.isActive = isActive;
NotificationSystem.ATTENTION = ATTENTION;
NotificationSystem.POSITION = POSITION;
