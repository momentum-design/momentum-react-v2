import React, { FC } from 'react';
import classnames from 'classnames';
import ModalContainer from '../ModalContainer';
import ButtonCircle from '../ButtonCircle';
import Icon from '../Icon';

import { STYLE } from './ToastNotification.constants';
import { Props } from './ToastNotification.types';
import './ToastNotification.style.scss';
import { PrimitiveConverter } from '../../utils';

/**
 * The ToastNotification component.
 */
const ToastNotification: FC<Props> = (props: Props) => {
  const { className, id, style, content, leadingVisual, buttonGroup, onClose } = props;

  return (
    <ModalContainer
      className={classnames(className, STYLE.wrapper)}
      isPadded
      id={id}
      style={style}
      round={50}
    >
      <div className={STYLE.body}>
        {leadingVisual && (
          <div className={classnames(className, STYLE.leadingVisual)}>{leadingVisual}</div>
        )}
        <PrimitiveConverter
          className={classnames(className, STYLE.content)}
          fontStyle="body-primary"
        >
          {content}
        </PrimitiveConverter>
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
