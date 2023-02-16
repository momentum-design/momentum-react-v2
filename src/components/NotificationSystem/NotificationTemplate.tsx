import React, { FC, ReactNode } from 'react';
import ToastNotification from '../ToastNotification';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';
import type { CloseButtonProps } from 'react-toastify';
import type { PressEvent } from '@react-types/shared';

import './NotificationTemplate.style.scss';

interface NotificationTemplateProps {
  /**
   * The content to be shown in notification
   */
  content: ReactNode;

  /**
   * Text of Close Button
   *
   * If undefined, the close button will not be shown
   */
  closeButtonText?: string;

  /**
   * Callback `closeToast` passed into NotificationTemplate when used directly as content
   *
   * This will be fired if the user clicks on the X or Close button to tell react-toastify then
   * to close the notification automatically.
   * https://fkhadra.github.io/react-toastify/render-what-you-want
   */
  closeToast?: CloseButtonProps['closeToast'];

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;
}

/**
 * NOTE: this component is only used for the stories
 */
const NotificationTemplate: FC<NotificationTemplateProps> = (props: NotificationTemplateProps) => {
  const { content, closeToast, closeButtonText, className } = props;

  const handleClose = React.useCallback((e: PressEvent) => {
    closeToast?.(e as unknown as React.MouseEvent<HTMLElement, MouseEvent>);
  }, []);

  return (
    <ToastNotification
      content={content}
      onClose={handleClose}
      leadingVisual={
        <Icon
          name="info-circle"
          className="icon"
          scale={24}
          weight="filled"
          fillColor="lightblue"
        />
      }
      buttonGroup={
        closeButtonText && (
          <ButtonPill outline size={28} onPress={handleClose}>
            {closeButtonText}
          </ButtonPill>
        )
      }
      className={className}
    />
  );
};

export default NotificationTemplate;
