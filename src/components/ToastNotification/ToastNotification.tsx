import React, { FC } from 'react';
import { isString } from 'lodash';
import classnames from 'classnames';
import ModalContainer from '../ModalContainer';
import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';

import { STYLE, DEFAULTS } from './ToastNotification.constants';
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
    interruptsUserFlow = DEFAULTS.INTERRUPTS_USER_FLOW,
    ...rest
  } = props;

  const isInteractiveDialog = !!onClose || !!buttonGroup;

  if (interruptsUserFlow && !isInteractiveDialog) {
    console.warn(
      'MRV2 ToastNotification: If a ToastNotification interrupts user flow, please make sure it has at least one interactive element inside for the user to act and continue the flow.'
    );
  }

  // If an alert toast interrupts a user's workflow to communicate an important message and require a response, then it should have role="alertdialog".
  // Otherwise, if the toast has interactive controls, it should have role="status".
  // Otherwise it should have role="alert".

  const role =
    props.role || (interruptsUserFlow ? 'alertdialog' : isInteractiveDialog ? 'status' : 'alert');

  const ariaHiddenProps =
    !interruptsUserFlow && !isInteractiveDialog ? { 'aria-hidden': true } : {};

  return (
    <ModalContainer
      className={classnames(className, STYLE.wrapper)}
      isPadded
      id={id}
      style={style}
      round={50}
      role={role}
      focusLockProps={{ autoFocus: interruptsUserFlow }}
      aria-live="off" // SR announcement is controlled by the NotificationSystem.announce() method
      {...ariaHiddenProps}
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
