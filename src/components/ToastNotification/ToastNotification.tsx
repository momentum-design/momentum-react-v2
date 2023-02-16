import React, { FC, HTMLAttributes } from 'react';
import classnames from 'classnames';
import ModalContainer from '../ModalContainer';
import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';

import { STYLE, KEYS } from './ToastNotification.constants';
import { Props } from './ToastNotification.types';
import './ToastNotification.style.scss';
import { PrimitiveConverter } from '../../utils';

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
    onToastPress,
  } = props;

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === KEYS.ENTER_KEY) {
      onToastPress(e as unknown as React.MouseEvent<HTMLElement, MouseEvent>);
    }
  };

  const divProps: HTMLAttributes<HTMLDivElement> = {
    className: STYLE.body,
    ...(onToastPress && {
      onClick: onToastPress,
      onKeyDown: handleOnKeyDown,
      role: 'button',
      tabIndex: 0,
    }),
  };

  return (
    <ModalContainer
      className={classnames(className, STYLE.wrapper)}
      isPadded
      id={id}
      style={style}
      round={50}
    >
      <div {...divProps}>
        {leadingVisual && (
          <div className={classnames(className, STYLE.leadingVisual)}>{leadingVisual}</div>
        )}
          <PrimitiveConverter className={classnames(className, STYLE.content)} fontStyle='body-primary'>{content}</PrimitiveConverter>
        {onClose && (
          <div className={classnames(className, STYLE.closeButton)}>
            <ButtonCircle size={20} ghost onPress={onClose}>
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
