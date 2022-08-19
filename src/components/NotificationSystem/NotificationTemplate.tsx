import React, { FC } from 'react';
import ToastNotification from '../ToastNotification';
import Icon from '../Icon';
import ButtonPill from '../ButtonPill';
import type { CloseButtonProps } from 'react-toastify';

/**
 * The NotificationTemplate component.
 */

interface NotificationTemplateProps {
  /**
   * Text content to be shown in notification
   */
  notificationText: string;

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
  const { notificationText, closeToast, closeButtonText, className } = props;

  const handleClose = React.useCallback((args: any) => {
    closeToast?.(args);
  }, []);

  return (
    <ToastNotification
      text={notificationText}
      onClose={handleClose}
      leadingVisual={<Icon name="info-circle" scale={24} weight="filled" fillColor="lightblue" />}
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
