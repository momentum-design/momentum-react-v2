import React, { FC } from 'react';
import { isString } from 'lodash';
import classnames from 'classnames';
import ModalContainer from '../ModalContainer';
import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';

import { STYLE } from './ToastNotification.constants';
import { Props } from './ToastNotification.types';
import './ToastNotification.style.scss';
import Text from '../Text';

/**
 * The ToastNotification component.
 */
const ToastNotification: FC<Props> = (props: Props) => {
  const {
    className,
    id,
    style,
    content,
    leadingVisual,
    buttonGroup,
    onClose,
    closeButtonLabel,
    ...rest
  } = props;

  const isInteractiveDialog = !!onClose || !!buttonGroup;

  // According to: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alertdialog_role
  // "The alertdialog role should only be used for alert messages that have associated interactive controls.
  // If an alert dialog only contains static content and has no interactive controls at all, use alert instead."
  // However, we have decided not to use role="alert" and use solely ScreenReaderAnnouncer instaed.
  // So for non-interactive ToastNotifications, we are adding role="generic" and aria-hidden="true"

  const role = props.role || (isInteractiveDialog ? 'alertdialog' : 'generic');

  const isAriaHidden = !isInteractiveDialog;

  return (
    <ModalContainer
      className={classnames(className, STYLE.wrapper)}
      isPadded
      id={id}
      style={style}
      round={50}
      role={role}
      aria-hidden={isAriaHidden}
      ariaModal={false}
      {...rest}
    >
      <div className={STYLE.body}>
        {leadingVisual && (
          <div className={classnames(className, STYLE.leadingVisual)}>{leadingVisual}</div>
        )}
        {isString(content) ? (
          <Text className={classnames(className, STYLE.content)} type="body-primary" tagName="p">
            {content}
          </Text>
        ) : (
          <div className={classnames(className, STYLE.content)}>{content}</div>
        )}
        {onClose && (
          <div className={classnames(className, STYLE.closeButton)}>
            <ButtonCircle size={20} ghost onPress={onClose} aria-label={closeButtonLabel}>
              <Icon name="cancel" weight="bold" scale={16} />
            </ButtonCircle>
          </div>
        )}
      </div>
      {buttonGroup && <div className={classnames(className, STYLE.buttonGroup)}>{buttonGroup}</div>}
    </ModalContainer>
  );
};

export default ToastNotification;
