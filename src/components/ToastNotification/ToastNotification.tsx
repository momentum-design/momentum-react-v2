import React, { FC, HTMLAttributes } from 'react';
import { isString } from 'lodash';

import classnames from 'classnames';
import ModalContainer from '../ModalContainer';
import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';
import Text from '../Text';

import { STYLE, KEYS } from './ToastNotification.constants';
import { Props } from './ToastNotification.types';
import './ToastNotification.style.scss';

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
    onToastMessageClick,
  } = props;

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === KEYS.ENTER_KEY) {
      onToastMessageClick(e as unknown as React.MouseEvent<HTMLElement, MouseEvent>);
    }
  };

  const divProps: HTMLAttributes<HTMLDivElement> = {
    className: STYLE.body,
    ...(onToastMessageClick && {
      onClick: onToastMessageClick,
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
        {isString(content) ? (
          <Text className={classnames(className, STYLE.content)} type="body-primary">
            {content}
          </Text>
        ) : (
          <div className={classnames(className, STYLE.content)}>{content}</div>
        )}

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
