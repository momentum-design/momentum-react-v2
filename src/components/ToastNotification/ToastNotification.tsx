import React, { FC } from 'react';
import { isString } from 'lodash';
import classnames from 'classnames';
import ModalContainer from '../ModalContainer';
import ButtonCircle from '../ButtonCircle';

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

  return (
    <ModalContainer
      className={classnames(className, STYLE.wrapper)}
      isPadded
      id={id}
      style={style}
      round={50}
      role="generic"
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
            <ButtonCircle
              size={20}
              variant="tertiary"
              onClick={onClose}
              aria-label={closeButtonLabel}
              prefixIcon="cancel-bold"
              stopPropagation={false}
            />
          </div>
        )}
      </div>
      {buttonGroup && <div className={classnames(className, STYLE.buttonGroup)}>{buttonGroup}</div>}
    </ModalContainer>
  );
};

export default ToastNotification;
